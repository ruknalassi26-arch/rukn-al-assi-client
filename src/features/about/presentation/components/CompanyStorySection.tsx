"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { History, Award, CheckCircle } from "lucide-react";

interface CompanyStorySectionProps {
  history?: string;
}

export function CompanyStorySection({ history }: CompanyStorySectionProps) {
  const t = useTranslations("About");

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, Heading & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow={t("storyEyebrow")}
              title={t("storyHeading")}
            />

            <div className="pt-4 space-y-4">
              <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 shadow-xs">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="size-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">
                    {t("storyQualityTitle")}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("storyQualityDesc")}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-4 shadow-xs">
                <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                  <History className="size-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">
                    {t("storyIntegrityTitle")}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("storyIntegrityDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 lg:ps-6">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-muted/40 border border-border/80 space-y-6">
              <div className="space-y-4 text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                {history ? (
                  <p className="whitespace-pre-line">{history}</p>
                ) : (
                  <p>{t("storyFallback")}</p>
                )}
              </div>

              <div className="pt-6 border-t border-border flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-primary" />
                  <span>{t("storyCheck1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-primary" />
                  <span>{t("storyCheck2")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
