"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { CertificationEntity } from "../../domain/entities/certification.entity";
import { CertificationCard } from "./CertificationCard";
import { Award } from "lucide-react";

interface CertificationsGridProps {
  certifications: CertificationEntity[];
}

export function CertificationsGrid({ certifications }: CertificationsGridProps) {
  const t = useTranslations("Certifications");

  if (!certifications || certifications.length === 0) {
    return (
      <section className="py-20 bg-background min-h-[380px] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center space-y-4 p-8 rounded-3xl bg-card border border-border shadow-xs">
            <div className="size-14 mx-auto rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
              <Award className="size-7 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{t("emptyTitle")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("emptyDesc")}</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </div>
      </Container>
    </section>
  );
}
