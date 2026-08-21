"use client";

import React from "react";
import { PaginatedCertificationsEntity } from "../../domain/entities/certification.entity";
import { CertificationsHeroSection } from "../components/CertificationsHeroSection";
import { CertificationsGrid } from "../components/CertificationsGrid";
import { CertificationsPagination } from "../components/CertificationsPagination";
import { CertificationsTrustCtaSection } from "../components/CertificationsTrustCtaSection";

interface CertificationsViewProps {
  certificationsData: PaginatedCertificationsEntity;
}

export function CertificationsView({ certificationsData }: CertificationsViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Certifications Hero */}
      <CertificationsHeroSection />

      {/* 2. Certifications Grid */}
      <CertificationsGrid certifications={certificationsData.items} />

      {/* 3. Pagination */}
      <CertificationsPagination
        page={certificationsData.page}
        totalPages={certificationsData.totalPages}
      />

      {/* 4. Trust & RFQ CTA */}
      <CertificationsTrustCtaSection />
    </div>
  );
}
