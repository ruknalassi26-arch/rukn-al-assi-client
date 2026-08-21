"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Sparkles, Cog, GraduationCap, ShieldCheck } from "lucide-react";

export function CareersWhyJoinSection() {
  const t = useTranslations("Careers");

  const values = [
    {
      icon: Cog,
      title: t("whyJoin1Title"),
      desc: t("whyJoin1Desc"),
    },
    {
      icon: GraduationCap,
      title: t("whyJoin2Title"),
      desc: t("whyJoin2Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("whyJoin3Title"),
      desc: t("whyJoin3Desc"),
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-muted/20 border-b border-border">
      <Container className="space-y-12">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            <span>{t("whyJoinEyebrow")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            {t("whyJoinTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
