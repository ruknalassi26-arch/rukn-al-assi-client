"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { CertificationPreviewEntity } from "../../domain/entities/home.entity";
import { Award } from "lucide-react";

interface CertificationsSectionProps {
  certifications: CertificationPreviewEntity[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const t = useTranslations("Home.certifications");

  if (!certifications || certifications.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-background border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          description={t("subheading")}
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
            >
              {cert.imageUrl ? (
                <div className="relative size-16 sm:size-20 mb-2">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    sizes="80px"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Award className="size-7" />
                </div>
              )}

              <h4 className="font-bold text-sm sm:text-base text-foreground leading-tight">
                {cert.title}
              </h4>

              {cert.issuedBy && (
                <p className="text-xs text-muted-foreground font-medium">
                  {cert.issuedBy}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
