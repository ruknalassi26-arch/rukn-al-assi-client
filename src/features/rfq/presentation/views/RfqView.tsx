"use client";

import { useRfq } from "../hooks/useRfq";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function RfqView() {
  const { handleRfqSubmit, isSubmitting, isSubmitted } = useRfq();
  const locale = useLocale();
  const t = useTranslations("RFQ");
  const isAr = locale === "ar";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    details: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.details) {
      toast.error(isAr ? "يرجى إكمال البيانات المطلوبة" : "Please fill required fields");
      return;
    }
    await handleRfqSubmit(formData);
    toast.success(t("submitSuccess"));
  };

  return (
    <main>
      <PageBanner
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbItems={[{ label: t("title") }]}
      />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto p-8 border rounded-2xl bg-card shadow-sm space-y-6">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <h3 className="text-2xl font-bold text-emerald-600">
                  {isAr ? "تم استلام طلبك بنجاح!" : "RFQ Submitted Successfully!"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isAr
                    ? "سيعكف فريق الهندسة والتسعير على مراجعة طلبك وإرسال عرض السعر."
                    : "Our engineering and estimation team will review your scope and issue a formal quote."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t("fullName")} *</label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{t("email")} *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">{t("phone")} *</label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t("company")}</label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">{t("projectScope")} *</label>
                  <textarea
                    required
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting
                    ? isAr
                      ? "جاري إرسال الطلب..."
                      : "Submitting..."
                    : isAr
                      ? "تقديم طلب عرض السعر"
                      : "Submit Request for Quote"}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
