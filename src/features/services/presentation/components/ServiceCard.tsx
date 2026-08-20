"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ServiceEntity } from "../../domain/entities/service.entity";
import { ArrowRight, ArrowLeft, Wrench, Shield } from "lucide-react";

interface ServiceCardProps {
  service: ServiceEntity;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const fallbackImage =
    "https://pgslnuvcpwkhqcfiflpi.supabase.co/storage/v1/object/public/service-images/covers/1787209390123-pexels-tuba-sen-2151030023-37707297.jpg";

  const displayImage = service.heroImageUrl || fallbackImage;

  return (
    <div className="group rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Photo with One-Sided Accent Border */}
        <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden border-b border-border">
          <Image
            src={displayImage}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-106 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Floating Category / Icon Badge */}
          <div className="absolute bottom-3 start-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md border border-white/15">
              <Wrench className="size-3.5 text-amber-400" />
              <span>{service.isFeatured ? "Featured Solution" : "Engineering"}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {service.name}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {service.description}
          </p>

          {/* Applications Snippet */}
          {service.applications && (
            <div className="pt-2 flex items-start gap-1.5 text-[11px] text-muted-foreground">
              <Shield className="size-3.5 text-primary shrink-0 mt-0.5" />
              <span className="line-clamp-1">{service.applications}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-6 pb-6 pt-2 border-t border-border/50 flex items-center justify-between">
        <Link
          href={`/${locale}/services/${encodeURIComponent(service.slug)}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 group/link transition-colors"
        >
          <span>{t("viewDetails")}</span>
          <ArrowIcon className="size-4 shrink-0 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
