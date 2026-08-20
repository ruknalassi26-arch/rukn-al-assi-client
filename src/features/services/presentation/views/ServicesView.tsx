"use client";

import React from "react";
import { PaginatedServicesEntity } from "../../domain/entities/service.entity";
import { ServicesHeroSection } from "../components/ServicesHeroSection";
import { ServicesFilterBar } from "../components/ServicesFilterBar";
import { ServicesGrid } from "../components/ServicesGrid";
import { ServicesPagination } from "../components/ServicesPagination";
import { ServicesClientsSection } from "../components/ServicesClientsSection";
import { ServicesCtaSection } from "../components/ServicesCtaSection";
import { Container } from "@shared/components/layouts/Container";

interface ServicesViewProps {
  servicesData: PaginatedServicesEntity;
}

export function ServicesView({ servicesData }: ServicesViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Services Hero */}
      <ServicesHeroSection />

      {/* 2, 3, 4. Search / Filters, Services Grid, Pagination */}
      <section className="py-16 lg:py-24 bg-background border-b border-border">
        <Container className="space-y-10">
          <ServicesFilterBar total={servicesData.total} />
          <ServicesGrid services={servicesData.items} />
          <ServicesPagination
            page={servicesData.page}
            totalPages={servicesData.totalPages}
          />
        </Container>
      </section>

      {/* 5. Trusted Clients / Partners */}
      <ServicesClientsSection clients={servicesData.clients} />

      {/* 6. Request a Quote CTA */}
      <ServicesCtaSection />
    </div>
  );
}
