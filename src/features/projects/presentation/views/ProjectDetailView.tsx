"use client";

import React from "react";
import { ProjectDetailResponse } from "../../domain/entities/project-detail.entity";
import { ProjectDetailHero } from "../components/detail/ProjectDetailHero";
import { ProjectDetailOverview } from "../components/detail/ProjectDetailOverview";
import { ProjectDetailGallery } from "../components/detail/ProjectDetailGallery";
import { ProjectDetailRelated } from "../components/detail/ProjectDetailRelated";
import { ProjectsClientsSection } from "../components/ProjectsClientsSection";
import { ProjectsCtaSection } from "../components/ProjectsCtaSection";

interface ProjectDetailViewProps {
  data: ProjectDetailResponse;
}

export function ProjectDetailView({ data }: ProjectDetailViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero & Breadcrumbs */}
      <ProjectDetailHero
        project={data.project}
        category={data.category}
        images={data.images}
      />

      {/* 2. Overview, Specifications, Challenge & Solution */}
      <ProjectDetailOverview
        project={data.project}
        category={data.category}
      />

      {/* 3. Photo Gallery with Fullscreen Lightbox */}
      <ProjectDetailGallery images={data.images} />

      {/* 4. Related Projects */}
      <ProjectDetailRelated relatedProjects={data.relatedProjects} />

      {/* 5. Trusted Clients / Partners */}
      <ProjectsClientsSection clients={data.clients} />

      {/* 6. Request a Quote CTA */}
      <ProjectsCtaSection />
    </div>
  );
}
