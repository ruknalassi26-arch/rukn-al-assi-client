"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ServiceEntity } from "../../domain/entities/service.entity";
import { ServiceCard } from "./ServiceCard";
import { Wrench } from "lucide-react";

interface ServicesGridProps {
  services: ServiceEntity[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  const t = useTranslations("Services");

  if (!services || services.length === 0) {
    return (
      <div className="py-20 text-center rounded-3xl bg-muted/20 border border-border space-y-4 max-w-xl mx-auto">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mx-auto">
          <Wrench className="size-8 opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground">{t("noServices")}</h3>
          <p className="text-sm text-muted-foreground">{t("noServicesDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
