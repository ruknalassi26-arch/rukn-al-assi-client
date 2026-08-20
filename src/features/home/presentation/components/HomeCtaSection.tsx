"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { HomeCtaEntity } from "../../domain/entities/home.entity";
import { ArrowRight, ArrowLeft, MessageSquare } from "lucide-react";

interface HomeCtaSectionProps {
  cta: HomeCtaEntity;
}

export function HomeCtaSection({ cta }: HomeCtaSectionProps) {
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-24 lg:py-32 bg-slate-950 text-white overflow-hidden">
      {/* Background Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial Vignette and Glow Overlays */}
      <div className="absolute inset-0 z-1 bg-radial-at-c from-transparent via-slate-950/60 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-radial-at-t from-primary/30 via-transparent to-transparent pointer-events-none" />

      <Container className="relative z-10 text-center max-w-3xl space-y-8">
        {cta.eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md shadow-sm">
            <MessageSquare className="size-3.5" />
            <span>{cta.eyebrow}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          {cta.title}
        </h2>

        {cta.description && (
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            {cta.description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] group"
          >
            <Link
              href={cta.primaryButtonUrl.startsWith("/") ? `/${locale}${cta.primaryButtonUrl}` : cta.primaryButtonUrl}
              className="flex items-center gap-2.5"
            >
              <span>{cta.primaryButtonText}</span>
              <ArrowIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>

          {cta.secondaryButtonText && cta.secondaryButtonUrl && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-bold border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              <Link
                href={cta.secondaryButtonUrl.startsWith("/") ? `/${locale}${cta.secondaryButtonUrl}` : cta.secondaryButtonUrl}
              >
                {cta.secondaryButtonText}
              </Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
