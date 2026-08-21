"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { Send, CheckCircle2, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { ContactMessageInputEntity } from "../../domain/entities/contact.entity";
import { SupabaseContactRepository } from "../../data/repositories/supabase-contact.repository";
import { SubmitContactMessageUseCase } from "../../domain/usecases/submit-contact-message.usecase";

export function ContactForm() {
  const t = useTranslations("Contact");

  const [formData, setFormData] = useState<ContactMessageInputEntity>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName || !formData.fullName.trim()) {
      errs.fullName = t("requiredField");
    }

    if (!formData.message || !formData.message.trim()) {
      errs.message = t("requiredField");
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = t("invalidEmail");
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const repo = new SupabaseContactRepository();
      const useCase = new SubmitContactMessageUseCase(repo);
      const res = await useCase.execute(formData);

      if (res.success) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitError(res.message || t("errorMessage"));
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-sm space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {t("formTitle")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t("formSubtitle")}
        </p>
      </div>

      {isSuccess ? (
        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in duration-300">
          <div className="size-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
            {t("successTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-700/90 dark:text-emerald-400 max-w-sm mx-auto leading-relaxed">
            {t("successMessage")}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSuccess(false)}
            className="mt-2 text-xs font-bold gap-2 border-emerald-600/30 text-emerald-700 hover:bg-emerald-500/10"
          >
            <RotateCcw className="size-3.5" />
            <span>{t("sendAnother")}</span>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitError && (
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-xs text-destructive font-medium">
              <AlertCircle className="size-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {t("fullName")} <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              placeholder={t("fullNamePlaceholder")}
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: "" });
              }}
              className={`h-11 rounded-xl bg-background border-border text-xs sm:text-sm ${
                errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-destructive font-semibold">{errors.fullName}</p>
            )}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                {t("email")}
              </label>
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={formData.email || ""}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={`h-11 rounded-xl bg-background border-border text-xs sm:text-sm ${
                  errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-destructive font-semibold">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                {t("phone")}
              </label>
              <Input
                type="text"
                dir="ltr"
                placeholder={t("phonePlaceholder")}
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-11 rounded-xl bg-background border-border text-xs sm:text-sm text-start"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {t("subject")}
            </label>
            <Input
              type="text"
              placeholder={t("subjectPlaceholder")}
              value={formData.subject || ""}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="h-11 rounded-xl bg-background border-border text-xs sm:text-sm"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {t("message")} <span className="text-destructive">*</span>
            </label>
            <textarea
              rows={5}
              placeholder={t("messagePlaceholder")}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: "" });
              }}
              className={`flex w-full rounded-2xl border border-input bg-background px-3.5 py-2.5 text-xs sm:text-sm shadow-2xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                errors.message ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-destructive font-semibold">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>{t("sendingButton")}</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>{t("sendButton")}</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
