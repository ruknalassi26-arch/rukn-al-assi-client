"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { AboutPreviewEntity } from "../../domain/entities/home.entity";
import { CheckCircle2, ArrowRight, ArrowLeft, Target, Eye } from "lucide-react";

interface AboutSectionProps {
  about: AboutPreviewEntity;
}

export function AboutSection({ about }: AboutSectionProps) {
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className={about.imageUrl ? "lg:col-span-7 space-y-8 text-start" : "lg:col-span-12 space-y-8 text-start"}>
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
                  <div className="p-5 rounded-xl bg-card border border-border space-y-2">
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
                  <div className="p-5 rounded-xl bg-card border border-border space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
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
                <Button asChild size="lg" className="font-bold shadow-sm">
                  <Link href={`/${locale}${about.ctaUrl}`} className="flex items-center gap-2">
                    <span>{about.ctaText}</span>
                    <ArrowIcon className="size-4 shrink-0" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Media Column */}
          {about.imageUrl && (
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden border border-border bg-muted shadow-xl">
                <Image
                  src={about.imageUrl}
                  alt={about.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
