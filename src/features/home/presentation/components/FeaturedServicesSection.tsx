"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ServicePreviewEntity } from "../../domain/entities/home.entity";
import { ArrowRight, ArrowLeft, Wrench, Cog, Factory, Flame, Shield, Layers } from "lucide-react";

interface FeaturedServicesSectionProps {
  services: ServicePreviewEntity[];
}

export function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  const t = useTranslations("Home.services");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (!services || services.length === 0) return null;

  const getServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "cog":
        return <Cog className="size-6 text-primary" />;
      case "factory":
        return <Factory className="size-6 text-primary" />;
      case "flame":
        return <Flame className="size-6 text-primary" />;
      case "shield":
        return <Shield className="size-6 text-primary" />;
      case "layers":
        return <Layers className="size-6 text-primary" />;
      default:
        return <Wrench className="size-6 text-primary" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/20 border-b border-border">
      <Container className="space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("heading")}
            description={t("subheading")}
          />

          <Button asChild variant="outline" className="hidden md:inline-flex shrink-0 font-bold">
            <Link href={`/${locale}/services`} className="flex items-center gap-2">
              <span>{tCommon("viewAllServices")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Services Grid (Max 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon or Thumbnail */}
                {service.imageUrl ? (
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 bg-muted">
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2">
                    {getServiceIcon(service.icon)}
                  </div>
                )}

                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                  {service.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-border/60">
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline group/link"
                >
                  <span>{tCommon("learnMore")}</span>
                  <ArrowIcon className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="text-center md:hidden pt-4">
          <Button asChild className="w-full font-bold" size="lg">
            <Link href={`/${locale}/services`} className="flex items-center justify-center gap-2">
              <span>{tCommon("viewAllServices")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
