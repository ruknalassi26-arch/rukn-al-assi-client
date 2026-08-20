"use client";

import React from "react";
import { ServiceEntity } from "../../domain/entities/service.entity";
import { ServiceDetailHero } from "../components/detail/ServiceDetailHero";
import { ServiceDetailOverview } from "../components/detail/ServiceDetailOverview";
import { ServiceDetailFaqs } from "../components/detail/ServiceDetailFaqs";
import { RelatedServicesSection } from "../components/detail/RelatedServicesSection";
import { ServicesCtaSection } from "../components/ServicesCtaSection";

interface ServiceDetailViewProps {
  service: ServiceEntity;
  relatedServices: ServiceEntity[];
}

export function ServiceDetailView({ service, relatedServices }: ServiceDetailViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero */}
      <ServiceDetailHero service={service} />

      {/* 2. Overview & Capabilities */}
      <ServiceDetailOverview service={service} />

      {/* 3. FAQs (Accordion) */}
      <ServiceDetailFaqs faqs={service.faqs} />

      {/* 4. Related Services */}
      <RelatedServicesSection relatedServices={relatedServices} />

      {/* 5. Closing CTA */}
      <ServicesCtaSection />
    </div>
  );
}
