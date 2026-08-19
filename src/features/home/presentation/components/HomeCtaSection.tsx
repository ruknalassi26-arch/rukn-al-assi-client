"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { HomeCtaEntity } from "../../domain/entities/home.entity";
import { ArrowRight, ArrowLeft, PhoneCall, FileText } from "lucide-react";

interface HomeCtaSectionProps {
  cta: HomeCtaEntity;
}

export function HomeCtaSection({ cta }: HomeCtaSectionProps) {
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950 text-white">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-radial-at-t from-primary/30 via-slate-950 to-slate-950" />
      <div
        className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary-foreground text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{cta.eyebrow}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
            {cta.title}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {cta.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-[1.02]"
            >
              <Link href={`/${locale}${cta.primaryButtonUrl}`} className="flex items-center gap-2.5">
                <FileText className="size-5 shrink-0" />
                <span>{cta.primaryButtonText}</span>
                <ArrowIcon className="size-5 shrink-0" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-bold border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-xs transition-all hover:scale-[1.02]"
            >
              <Link href={`/${locale}${cta.secondaryButtonUrl}`} className="flex items-center gap-2">
                <PhoneCall className="size-5 shrink-0" />
                <span>{cta.secondaryButtonText}</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
