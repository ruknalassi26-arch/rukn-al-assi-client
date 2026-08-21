"use client";

import React, { useState } from "react";
import {
  PaginatedJobsEntity,
  JobFilterOptionsEntity,
} from "../../domain/entities/job.entity";
import { CareersHeroSection } from "../components/CareersHeroSection";
import { CareersWhyJoinSection } from "../components/CareersWhyJoinSection";
import { CareersFilterBar } from "../components/CareersFilterBar";
import { JobsGrid } from "../components/JobsGrid";
import { JobsPagination } from "../components/JobsPagination";
import { GeneralApplicationCta } from "../components/GeneralApplicationCta";
import { ApplicationFormModal } from "../components/modal/ApplicationFormModal";

interface CareersViewProps {
  jobsData: PaginatedJobsEntity;
  filterOptions: JobFilterOptionsEntity;
}

export function CareersView({ jobsData, filterOptions }: CareersViewProps) {
  const [isGeneralModalOpen, setIsGeneralModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero */}
      <CareersHeroSection />

      {/* 2. Why Join Us */}
      <CareersWhyJoinSection />

      {/* 3. Filter Bar (Search + Department + Type) */}
      <CareersFilterBar
        departments={filterOptions.departments}
        employmentTypes={filterOptions.employmentTypes}
        total={jobsData.total}
      />

      {/* 4. Jobs Grid */}
      <JobsGrid
        jobs={jobsData.items}
        onOpenGeneralModal={() => setIsGeneralModalOpen(true)}
      />

      {/* 5. Pagination */}
      <JobsPagination
        page={jobsData.page}
        totalPages={jobsData.totalPages}
      />

      {/* 6. General Application CTA */}
      <GeneralApplicationCta
        onOpenModal={() => setIsGeneralModalOpen(true)}
      />

      {/* General Application Modal */}
      <ApplicationFormModal
        isOpen={isGeneralModalOpen}
        onClose={() => setIsGeneralModalOpen(false)}
        jobPostingId={null}
      />
    </div>
  );
}
