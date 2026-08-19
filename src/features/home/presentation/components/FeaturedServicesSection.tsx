"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ServicePreviewEntity } from "../../domain/entities/home.entity";
import {
  Wrench,
  Building2,
  Truck,
  Cpu,
  Cog,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@core/utils/cn";

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
    switch (iconName?.toLowerCase()) {
      case "building2":
      case "building":
        return <Building2 className="size-6 text-primary" />;
      case "truck":
        return <Truck className="size-6 text-primary" />;
      case "cpu":
        return <Cpu className="size-6 text-primary" />;
      case "cog":
        return <Cog className="size-6 text-primary" />;
      case "shieldcheck":
      case "shield":
        return <ShieldCheck className="size-6 text-primary" />;
      default:
        return <Wrench className="size-6 text-primary" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/25 border-b border-border">
      <Container className="space-y-16">
        {/* Section Header */}
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

        {/* Services Grid (1 col mobile, 2 tablet, 3 desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Optional Service Hero Thumbnail */}
              {service.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                </div>
              )}

              {/* Service Card Content */}
              <div className={cn("p-6 sm:p-8 flex flex-col flex-1 space-y-4", !service.imageUrl && "pt-8")}>
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <span className="group-hover:text-white transition-colors duration-300">
                    {getServiceIcon(service.icon)}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-border/60">
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline group/link"
                  >
                    <span>{tCommon("viewDetails")}</span>
                    <ArrowIcon className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
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
