"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { ArrowRight, ArrowLeft, Wrench } from "lucide-react";

export function ProductsCtaSection() {
  const t = useTranslations("Products");
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
          <Wrench className="size-3.5" />
          <span>{t("ctaEyebrow")}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
          {t("ctaTitle")}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {t("ctaSubtitle")}
        </p>

        <div className="pt-2">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
          >
            <Link href={`/${locale}/rfq`} className="flex items-center gap-2">
              <span>{t("ctaButton")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
