"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Briefcase, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

export function ProjectsHeroSection() {
  const t = useTranslations("Projects");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-slate-950 text-white border-b border-white/10">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://pgslnuvcpwkhqcfiflpi.supabase.co/storage/v1/object/public/branding/about/1787128956167-pexels-tuba-sen-2151030023-37707297.jpg"
          alt="Engineering & Hydraulic Projects"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-radial-at-c from-slate-950/70 via-slate-950/90 to-slate-950" />
      </div>

      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 z-1 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl space-y-6 text-start">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide">
            <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">
              {tCommon("home")}
            </Link>
            <Chevron className="size-3.5 opacity-60" />
            <span className="text-amber-400 font-semibold">{t("eyebrow")}</span>
          </nav>

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md shadow-sm">
            <Briefcase className="size-3.5" />
            <span>{t("eyebrow")}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
            {t("subtitle")}
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-slate-300 font-medium border-t border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
              <span>{t("heroHighlight1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
              <span>{t("heroHighlight2")}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
