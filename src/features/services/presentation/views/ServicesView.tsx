"use client";

import React from "react";
import { PaginatedServicesEntity } from "../../domain/entities/service.entity";
import { ServicesHeroSection } from "../components/ServicesHeroSection";
import { ServicesFilterBar } from "../components/ServicesFilterBar";
import { ServicesGrid } from "../components/ServicesGrid";
import { ServicesPagination } from "../components/ServicesPagination";
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

      {/* 2. Catalog Section with Search & Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <Container className="space-y-10">
          <ServicesFilterBar total={servicesData.total} />
          <ServicesGrid services={servicesData.items} />
          <ServicesPagination
            page={servicesData.page}
            totalPages={servicesData.totalPages}
          />
        </Container>
      </section>

      {/* 3. Final CTA */}
      <ServicesCtaSection />
    </div>
  );
}
