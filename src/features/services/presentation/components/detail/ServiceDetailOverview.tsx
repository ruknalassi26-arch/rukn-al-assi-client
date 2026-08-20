"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { ServiceEntity } from "../../../domain/entities/service.entity";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

interface ServiceDetailOverviewProps {
  service: ServiceEntity;
}

export function ServiceDetailOverview({ service }: ServiceDetailOverviewProps) {
  const t = useTranslations("Services");

  return (
    <section className="py-16 lg:py-24 bg-background border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Description (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-start">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {t("overviewTitle")}
            </h2>

            <div className="prose prose-slate max-w-none text-base sm:text-lg text-foreground/90 leading-relaxed font-normal whitespace-pre-line">
              {service.description}
            </div>

            {/* Applications & Industries Box */}
            {service.applications && (
              <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border space-y-4 shadow-xs mt-8">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <ShieldCheck className="size-5" />
                  <span>{t("applications")}</span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {service.applications}
                </p>
              </div>
            )}
          </div>

          {/* Quick Specifications / Highlights Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs space-y-6">
              <h3 className="font-bold text-lg text-foreground border-b border-border pb-4">
                {t("serviceHighlightsTitle")}
              </h3>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/90 font-medium">
                    {t("highlight1")}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/90 font-medium">
                    {t("highlight2")}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/90 font-medium">
                    {t("highlight3")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
