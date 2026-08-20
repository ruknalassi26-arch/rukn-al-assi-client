"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ServiceEntity } from "../../../domain/entities/service.entity";
import { ServiceCard } from "../ServiceCard";

interface RelatedServicesSectionProps {
  relatedServices: ServiceEntity[];
}

export function RelatedServicesSection({ relatedServices }: RelatedServicesSectionProps) {
  const t = useTranslations("Services");

  if (!relatedServices || relatedServices.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-background border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={t("relatedEyebrow")}
          title={t("relatedTitle")}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
