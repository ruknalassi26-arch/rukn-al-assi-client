"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { ServiceEntity } from "../../../domain/entities/service.entity";
import { Wrench, ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface ServiceDetailHeroProps {
  service: ServiceEntity;
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const t = useTranslations("Services");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-slate-950 text-white border-b border-white/10">
      <div
        className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-1 bg-radial-at-c from-slate-950/70 via-slate-950/90 to-slate-950 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide">
              <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">
                {tCommon("home")}
              </Link>
              <Chevron className="size-3.5 opacity-60" />
              <Link href={`/${locale}/services`} className="hover:text-amber-400 transition-colors">
                {t("titleShort")}
              </Link>
              <Chevron className="size-3.5 opacity-60" />
              <span className="text-amber-400 font-semibold truncate max-w-[200px]">
                {service.name}
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md">
              <Wrench className="size-3.5" />
              <span>{service.isFeatured ? "Featured Capability" : "Industrial Solution"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {service.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {service.description}
            </p>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="h-12 px-7 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
              >
                <Link
                  href={`/${locale}/rfq?service=${encodeURIComponent(service.name)}`}
                  className="flex items-center gap-2"
                >
                  <span>{t("requestQuote")}</span>
                  <ArrowIcon className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image with One-Sided Accent Border */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 sm:aspect-5/4 lg:aspect-4/3 w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-border border-s-6 border-s-primary group">
              {service.heroImageUrl ? (
                <Image
                  src={service.heroImageUrl}
                  alt={service.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="size-full flex items-center justify-center bg-slate-800 text-slate-500">
                  <Wrench className="size-16 opacity-40" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
