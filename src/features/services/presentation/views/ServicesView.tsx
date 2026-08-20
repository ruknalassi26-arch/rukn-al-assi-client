"use client";

import React from "react";
import { PaginatedServicesEntity } from "../../domain/entities/service.entity";
import { ServicesHeroSection } from "../components/ServicesHeroSection";
import { ServicesFilterBar } from "../components/ServicesFilterBar";
import { ServicesGrid } from "../components/ServicesGrid";
import { ServicesPagination } from "../components/ServicesPagination";
import { ServicesClientsSection } from "../components/ServicesClientsSection";
import { ServicesCtaSection } from "../components/ServicesCtaSection";

interface ServicesViewProps {
  servicesData: PaginatedServicesEntity;
}

export function ServicesView({ servicesData }: ServicesViewProps) {
  // Use first service hero image dynamically if available
  const heroImage =
    servicesData.items.length > 0 && servicesData.items[0].heroImageUrl
      ? servicesData.items[0].heroImageUrl
      : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section with dynamic background */}
      <ServicesHeroSection heroImageUrl={heroImage} />

      {/* 2. Filter & Search Controls */}
      <ServicesFilterBar total={servicesData.total} />

      {/* 3. Services Grid */}
      <ServicesGrid services={servicesData.items} />

      {/* 4. Pagination */}
      <ServicesPagination
        page={servicesData.page}
        totalPages={servicesData.totalPages}
      />

      {/* 5. Trusted Clients / Partners */}
      <ServicesClientsSection clients={servicesData.clients} />

      {/* 6. Request a Quote CTA */}
      <ServicesCtaSection />
    </div>
  );
}
