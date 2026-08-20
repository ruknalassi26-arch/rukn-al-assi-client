"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { Award, ShieldCheck, CheckCircle } from "lucide-react";

interface CompanyStorySectionProps {
  history?: string;
}

export function CompanyStorySection({ history }: CompanyStorySectionProps) {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols): Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <SectionHeading
              eyebrow={t("storyEyebrow")}
              title={t("storyHeading")}
            />

            <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border space-y-4 shadow-xs">
              <div className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                {history ? (
                  <p className="whitespace-pre-line">{history}</p>
                ) : (
                  <p>{t("storyFallback")}</p>
                )}
              </div>

              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-primary shrink-0" />
                  <span>{t("storyCheck1")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-primary shrink-0" />
                  <span>{t("storyCheck2")}</span>
                </div>
              </div>
            </div>

            {/* Quality & Precision Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-card border border-border flex items-start gap-3 shadow-xs">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Award className="size-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">
                    {t("storyQualityTitle")}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {t("storyQualityDesc")}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border flex items-start gap-3 shadow-xs">
                <div className="size-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                  <ShieldCheck className="size-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">
                    {t("storyIntegrityTitle")}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {t("storyIntegrityDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): High-Res Image with One-Sided Accent Border */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with One-Sided Bold Accent Border */}
              <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-4/5 w-full rounded-3xl overflow-hidden bg-muted shadow-2xl border border-border border-s-6 border-s-primary group">
                <Image
                  src="https://pgslnuvcpwkhqcfiflpi.supabase.co/storage/v1/object/public/branding/about/1787128956167-pexels-tuba-sen-2151030023-37707297.jpg"
                  alt="Rukn Al Assi Industrial Engineering"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              </div>

              {/* Floating Architectural Badge with Side Accent */}
              <div className="absolute -bottom-6 end-6 sm:-bottom-8 sm:end-8 p-4 sm:p-5 rounded-2xl bg-slate-950/95 text-white border border-white/15 border-s-4 border-s-amber-400 shadow-2xl backdrop-blur-xl max-w-[220px] space-y-1">
                <div className="flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="size-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {locale === "ar" ? "اعتماد وجودة" : locale === "ckb" ? "متمانە و کوالێتی" : "Certified"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium leading-snug">
                  {locale === "ar"
                    ? "حلول هندسية وتجهيزات صناعية متكاملة"
                    : locale === "ckb"
                    ? "چارەسەری ئەندازیاری و دابینکاری پیشەسازی"
                    : "Precision-driven turnkey industrial solutions"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
