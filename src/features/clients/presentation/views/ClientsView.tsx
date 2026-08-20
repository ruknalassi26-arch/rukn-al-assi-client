"use client";

import React from "react";
import { PaginatedClientsEntity } from "../../domain/entities/client.entity";
import { ClientsHeroSection } from "../components/ClientsHeroSection";
import { ClientsFilterBar } from "../components/ClientsFilterBar";
import { ClientsGrid } from "../components/ClientsGrid";
import { ClientsPagination } from "../components/ClientsPagination";
import { ClientsCtaSection } from "../components/ClientsCtaSection";

interface ClientsViewProps {
  clientsData: PaginatedClientsEntity;
}

export function ClientsView({ clientsData }: ClientsViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Clients Hero */}
      <ClientsHeroSection />

      {/* 2. Search & Stats */}
      <ClientsFilterBar total={clientsData.total} />

      {/* 3. Clients Grid */}
      <ClientsGrid clients={clientsData.items} />

      {/* 4. Pagination */}
      <ClientsPagination
        page={clientsData.page}
        totalPages={clientsData.totalPages}
      />

      {/* 5. Request a Quote CTA */}
      <ClientsCtaSection />
    </div>
  );
}
