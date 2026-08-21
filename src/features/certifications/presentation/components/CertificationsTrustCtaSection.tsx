"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { ShieldCheck, ArrowRight, ArrowLeft, PhoneCall } from "lucide-react";

export function CertificationsTrustCtaSection() {
  const t = useTranslations("Certifications");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full py-20 bg-slate-950 text-white overflow-hidden border-t border-white/10">
      <div
        className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-1 bg-radial-at-c from-slate-950/60 via-slate-950/90 to-slate-950 pointer-events-none" />

      <Container className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md">
          <ShieldCheck className="size-3.5" />
          <span>{t("trustCtaEyebrow")}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          {t("trustCtaTitle")}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {t("trustCtaSubtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
          >
            <Link href={`/${locale}/rfq`} className="flex items-center gap-2">
              <span>{t("requestQuote")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-7 text-sm font-bold bg-white/5 hover:bg-white/10 border-white/20 text-white"
          >
            <Link href={`/${locale}/contact`} className="flex items-center gap-2">
              <PhoneCall className="size-4 text-amber-400" />
              <span>{t("contactUs")}</span>
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
