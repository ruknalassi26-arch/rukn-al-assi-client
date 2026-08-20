"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Shield, CheckCircle2 } from "lucide-react";

export function AboutHeroSection() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-slate-950 text-white border-b border-white/10">
      {/* Background Architectural Glow & Blueprint Grid */}
      <div
        className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-1 bg-radial-at-c from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-radial-at-t from-primary/30 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl space-y-6 text-start">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md shadow-sm">
            <Shield className="size-3.5" />
            <span>{t("eyebrow")}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            {t("subtitle")}
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-slate-300 font-medium border-t border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
              <span>
                {locale === "ar"
                  ? "معايير هندسية معتمدة دولياً"
                  : locale === "ckb"
                  ? "ستانداردی ئەندازیاری باوەڕپێکراو"
                  : "Certified International Engineering Standards"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
              <span>
                {locale === "ar"
                  ? "خبرة عريقة في التوريدات والمعدات الصناعية"
                  : locale === "ckb"
                  ? "ئەزموونی دەوڵەمەند لە کەرەستەی پیشەسازی"
                  : "Decades of Industrial Supply & Hydraulics Expertise"}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
