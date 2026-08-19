"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { HeroSlideEntity } from "../../domain/entities/home.entity";
import { ArrowRight, ArrowLeft, Shield, CheckCircle2 } from "lucide-react";
import { cn } from "@core/utils/cn";

interface HeroSectionProps {
  hero: HeroSlideEntity;
}


export function HeroSection({ hero }: HeroSectionProps) {
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const hasVideo = Boolean(hero.videoUrl);
  const hasBgImage = Boolean(hero.backgroundImage);

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Poster Image */}
      {hasBgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.backgroundImage!}
            alt={hero.title || "Hero Image"}
            fill
            priority
            sizes="100vw"
            className={cn(
              "object-cover object-center transition-opacity duration-1000",
              hasVideo && videoLoaded && !prefersReducedMotion ? "opacity-0" : "opacity-75 scale-105"
            )}
          />
        </div>
      )}

      {/* HTML5 Background Video */}
      {hasVideo && !prefersReducedMotion && (
        <video
          ref={videoRef}
          src={hero.videoUrl!}
          poster={hero.backgroundImage || undefined}
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={cn(
            "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-1000",
            videoLoaded ? "opacity-65" : "opacity-0"
          )}
          aria-hidden="true"
        />
      )}

      {/* Architectural High-Contrast Gradient Overlays */}
      <div
        className={cn(
          "absolute inset-0 z-1",
          hasVideo
            ? "bg-linear-to-t from-slate-950 via-slate-950/60 to-slate-950/40"
            : "bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-950/60"
        )}
      />
      <div className="absolute inset-0 z-1 bg-radial-at-c from-transparent via-slate-950/30 to-slate-950/90" />

      {/* Subtle Industrial Grid Pattern (Rendered ONLY when there is NO video) */}
      {!hasVideo && (
        <div
          className="absolute inset-0 z-1 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
          aria-hidden="true"
        />
      )}

      {/* Content Container */}
      <Container className="relative z-10 py-24 sm:py-32 lg:py-36">
        <div className="max-w-4xl space-y-8 text-start">
          {/* Eyebrow Pill */}
          {hero.eyebrow && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold tracking-wider backdrop-blur-md shadow-sm">
              <Shield className="size-4 text-amber-400 shrink-0" />
              <span className="uppercase">{hero.eyebrow}</span>
            </div>
          )}

          {/* Main Headline */}
          {hero.title && (
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              {hero.title}
            </h1>
          )}

          {/* Supporting Narrative */}
          {(hero.subtitle || hero.body) && (
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 leading-relaxed font-normal max-w-3xl">
              {hero.subtitle || hero.body}
            </p>
          )}

          {/* Trust & Certification Highlights */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
              <span>
                {locale === "ar"
                  ? "معايير الجودة والسلامة المعتمدة"
                  : locale === "ckb"
                  ? "ستانداردی باوەڕپێکراوی کوالێتی و سەلامەتی"
                  : "Certified Quality & Safety Standards"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400 shrink-0" />
              <span>
                {locale === "ar"
                  ? "حلول هندسية وتوريدات متكاملة"
                  : locale === "ckb"
                  ? "چارەسەری ئەندازیاری و دابینکاری گشتگیر"
                  : "Turnkey Industrial Solutions"}
              </span>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {hero.primaryButtonText && hero.primaryButtonUrl && (
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] group"
              >
                <Link
                  href={hero.primaryButtonUrl.startsWith("/") ? `/${locale}${hero.primaryButtonUrl}` : hero.primaryButtonUrl}
                  className="flex items-center gap-2.5"
                >
                  <span>{hero.primaryButtonText}</span>
                  <ArrowIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            )}

            {hero.secondaryButtonText && hero.secondaryButtonUrl && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-bold border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <Link
                  href={hero.secondaryButtonUrl.startsWith("/") ? `/${locale}${hero.secondaryButtonUrl}` : hero.secondaryButtonUrl}
                >
                  {hero.secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
