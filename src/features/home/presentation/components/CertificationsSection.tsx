"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { CertificationPreviewEntity } from "../../domain/entities/home.entity";
import { Award, ShieldCheck, Calendar } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group space-y-4"
            >
              <div className="flex items-start gap-4">
                {cert.imageUrl ? (
                  <div className="relative size-14 shrink-0 rounded-xl overflow-hidden border border-border bg-muted/50 p-1">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="size-6 text-primary" />
                  </div>
                )}

                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  {cert.issuedBy && (
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                      <ShieldCheck className="size-3.5 shrink-0" />
                      <span>{cert.issuedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {cert.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {cert.description}
                </p>
              )}

              {cert.issuedDate && (
                <div className="pt-3 border-t border-border/60 flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                  <Calendar className="size-3 shrink-0" />
                  <span>{cert.issuedDate}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
