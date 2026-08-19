"use client";

import { useContact } from "../hooks/useContact";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useLocale } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export function ContactView() {
  const { submitContactForm, isSubmitting, isSubmitted } = useContact();
  const locale = useLocale();
  const isAr = locale === "ar";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error(isAr ? "يرجى تعبئة الحقول المطلوبة" : "Please fill required fields");
      return;
    }
    await submitContactForm(formData);
    toast.success(isAr ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!");
  };

  return (
    <main>
      <PageBanner
        title={isAr ? "تواصل معنا" : "Contact Us"}
        subtitle={
          isAr
            ? "نحن هنا للإجابة على جميع استفساراتكم والبدء في تقديم خدماتنا لكم."
            : "Get in touch with our team for inquiries, consultations, or office visits."
        }
        breadcrumbItems={[{ label: isAr ? "اتصل بنا" : "Contact Us" }]}
      />
      <Section>
        <Container>
          <div className="max-w-xl mx-auto p-8 border rounded-2xl bg-card shadow-sm space-y-6">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <h3 className="text-2xl font-bold text-emerald-600">
                  {isAr ? "شكراً لتواصلك معنا!" : "Thank You for Reaching Out!"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isAr
                    ? "تم استلام رسالتك وسيقوم فريقنا بالتواصل معك في أقرب وقت."
                    : "Your message has been received. Our team will get back to you shortly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    {isAr ? "الاسم الكامل *" : "Full Name *"}
                  </label>
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
                    <label className="text-sm font-medium">
                      {isAr ? "البريد الإلكتروني *" : "Email Address *"}
                    </label>
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
                    <label className="text-sm font-medium">
                      {isAr ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    {isAr ? "الموضوع" : "Subject"}
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    {isAr ? "الرسالة *" : "Message *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting
                    ? isAr
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : isAr
                      ? "إرسال الرسالة"
                      : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
