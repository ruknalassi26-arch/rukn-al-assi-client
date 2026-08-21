"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import {
  Upload,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Send,
  RotateCcw,
} from "lucide-react";
import { SupabaseCareersRepository } from "../../../data/repositories/supabase-careers.repository";
import { SubmitJobApplicationUseCase } from "../../../domain/usecases/submit-job-application.usecase";
import { UploadCvUseCase } from "../../../domain/usecases/upload-cv.usecase";

interface JobApplicationSectionProps {
  jobPostingId: string | null;
  jobTitle?: string;
  onSuccessCallback?: () => void;
}

export function JobApplicationSection({
  jobPostingId,
  jobTitle,
  onSuccessCallback,
}: JobApplicationSectionProps) {
  const t = useTranslations("Careers");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverMessage, setCoverMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cv: t("fileTooLarge") }));
      return;
    }

    // Validate format
    const validExtensions = ["pdf", "doc", "docx"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setErrors((prev) => ({ ...prev, cv: t("fileInvalidType") }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.cv;
      return next;
    });
    setSelectedFile(file);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = t("requiredField");
    if (!email.trim()) {
      errs.email = t("requiredField");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = t("invalidEmail");
      }
    }

    if (!selectedFile) {
      errs.cv = t("fileRequired");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;
    if (!selectedFile) return;

    setIsSubmitting(true);

    try {
      const repo = new SupabaseCareersRepository();
      const uploadCvUseCase = new UploadCvUseCase(repo);
      const submitAppUseCase = new SubmitJobApplicationUseCase(repo);

      // 1. Upload CV to career-cvs storage bucket
      const { fileUrl, fileName } = await uploadCvUseCase.execute(selectedFile);

      // 2. Submit application record through RPC
      const result = await submitAppUseCase.execute({
        jobPostingId,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        coverMessage: coverMessage.trim() || null,
        cvFileUrl: fileUrl,
        cvFileName: fileName,
      });

      if (result.success) {
        setIsSuccess(true);
        setFullName("");
        setEmail("");
        setPhone("");
        setCoverMessage("");
        setSelectedFile(null);
        if (onSuccessCallback) onSuccessCallback();
      } else {
        setSubmitError(result.message || "Failed to submit application");
      }
    } catch (err) {
      console.error("[JobApplication] Error:", err);
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-sm space-y-6">
      <div className="space-y-1 text-start">
        <h3 className="text-xl sm:text-2xl font-black text-foreground">
          {t("applicationFormTitle")}
        </h3>
        {jobTitle && (
          <p className="text-xs sm:text-sm font-semibold text-primary">
            {jobTitle}
          </p>
        )}
      </div>

      {isSuccess ? (
        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in duration-300">
          <div className="size-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <CheckCircle2 className="size-6" />
          </div>
          <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
            {t("appSuccessTitle")}
          </h4>
          <p className="text-xs sm:text-sm text-emerald-700/90 dark:text-emerald-400 max-w-sm mx-auto leading-relaxed">
            {t("appSuccessDesc")}
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
        <form onSubmit={handleSubmit} className="space-y-4 text-start">
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
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
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

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                {t("email")} <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-xl bg-background border-border text-xs sm:text-sm text-start"
              />
            </div>
          </div>

          {/* Cover Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {t("coverMessage")}
            </label>
            <textarea
              rows={4}
              placeholder={t("coverMessagePlaceholder")}
              value={coverMessage}
              onChange={(e) => setCoverMessage(e.target.value)}
              className="flex w-full rounded-2xl border border-input bg-background px-3.5 py-2.5 text-xs sm:text-sm shadow-2xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          {/* CV Document Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {t("cvUploadTitle")} <span className="text-destructive">*</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />

            {selectedFile ? (
              <div className="p-4 rounded-2xl bg-muted/60 border border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileCheck className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-foreground truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-primary hover:text-primary/80"
                  >
                    {t("changeFile")}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-1 rounded-full text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-2 ${
                  errors.cv
                    ? "border-destructive/60 bg-destructive/5"
                    : "border-border hover:border-primary/60 hover:bg-muted/30"
                }`}
              >
                <div className="size-10 mx-auto rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Upload className="size-5" />
                </div>
                <p className="text-xs font-bold text-foreground">
                  {t("dropFileHere")}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            )}

            {errors.cv && (
              <p className="text-[11px] text-destructive font-semibold">{errors.cv}</p>
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
                <span>{t("submittingApplication")}</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>{t("submitApplication")}</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
