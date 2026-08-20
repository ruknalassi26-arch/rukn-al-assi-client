"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { AboutPreviewEntity } from "../../domain/entities/home.entity";
import { CheckCircle2, ArrowRight, ArrowLeft, Target, Eye, ShieldCheck } from "lucide-react";

interface AboutSectionProps {
  about: AboutPreviewEntity;
}

const DEFAULT_ABOUT_IMAGE =
  "https://pgslnuvcpwkhqcfiflpi.supabase.co/storage/v1/object/public/branding/about/1787128956167-pexels-tuba-sen-2151030023-37707297.jpg";

export function AboutSection({ about }: AboutSectionProps) {
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const displayImage = about.imageUrl || DEFAULT_ABOUT_IMAGE;

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-start">
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.title}
              description={about.description}
            />

            {/* Capability Checklist */}
            {about.highlights && about.highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                {about.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-foreground">
                    <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-4 text-primary" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Mission & Vision Cards */}
            {(about.mission || about.vision) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {about.mission && (
                  <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-xs hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                      <Target className="size-4" />
                      <span>{locale === "ar" ? "مهمتنا" : locale === "ckb" ? "ئەرکی ئێمە" : "Our Mission"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {about.mission}
                    </p>
                  </div>
                )}

                {about.vision && (
                  <div className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-xs hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                      <Eye className="size-4" />
                      <span>{locale === "ar" ? "رؤيتنا" : locale === "ckb" ? "دیدگای ئێمە" : "Our Vision"}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {about.vision}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action CTA */}
            {about.ctaText && about.ctaUrl && (
              <div className="pt-4">
                <Button asChild size="lg" className="font-bold shadow-md h-12 px-7">
                  <Link href={`/${locale}${about.ctaUrl}`} className="flex items-center gap-2.5">
                    <span>{about.ctaText}</span>
                    <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Media Column (5 cols) with One-Sided Architectural Border Frame */}
          <div className="lg:col-span-5 relative">
            {/* Background Decorative Accent Line/Border */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Image Frame with One-Sided Bold Accent Border */}
              <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-4/5 w-full rounded-3xl overflow-hidden bg-muted shadow-2xl border border-border border-s-6 border-s-primary group">
                <Image
                  src={displayImage}
                  alt={about.title || "About Rukn Al Assi"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              </div>

              {/* Floating Architectural Badge with Side Accent */}
              <div className="absolute -bottom-6 end-6 sm:-bottom-8 sm:end-8 p-4 sm:p-5 rounded-2xl bg-slate-950/95 text-white border border-white/15 border-s-4 border-s-amber-400 shadow-2xl backdrop-blur-xl max-w-[220px] space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
