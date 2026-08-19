"use client";

import { useCertificates } from "../hooks/useCertificates";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { useLocale } from "next-intl";
import { ShieldCheck } from "lucide-react";

export function CertificatesView() {
  const { certificates, isLoading } = useCertificates();
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <PageBanner
        title={isAr ? "الشهادات والاعتمادات" : "Accreditations & Certificates"}
        subtitle={
          isAr
            ? "استعرض شهادات الجودة والسلامة والتراخيص الحكومية المعتمدة لشركة ركن العاصي."
            : "Our ISO certifications, safety accreditations, and quality licenses."
        }
        breadcrumbItems={[{ label: isAr ? "الشهادات" : "Certificates" }]}
      />
      <Section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 border rounded-2xl bg-card shadow-xs flex items-start gap-4"
            >
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <ShieldCheck className="size-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  {cert.issueYear}
                </span>
                <h3 className="font-bold text-lg text-foreground">
                  {isAr ? cert.titleAr : cert.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isAr ? cert.issuingAuthorityAr : cert.issuingAuthorityEn}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </main>
  );
}
