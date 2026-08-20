"use client";

import React from "react";
import { PaginatedProjectsEntity } from "../../domain/entities/project.entity";
import { ProjectsHeroSection } from "../components/ProjectsHeroSection";
import { ProjectsFilterBar } from "../components/ProjectsFilterBar";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { ProjectsPagination } from "../components/ProjectsPagination";
import { ProjectsClientsSection } from "../components/ProjectsClientsSection";
import { ProjectsCtaSection } from "../components/ProjectsCtaSection";

interface ProjectsViewProps {
  projectsData: PaginatedProjectsEntity;
}

export function ProjectsView({ projectsData }: ProjectsViewProps) {
  // Use first project cover image dynamically if available
  const heroImage =
    projectsData.items.length > 0 && projectsData.items[0].coverImage
      ? projectsData.items[0].coverImage
      : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Section with dynamic background */}
      <ProjectsHeroSection heroImageUrl={heroImage} />

      {/* 2. Filter & Search Controls */}
      <ProjectsFilterBar
        categories={projectsData.categories}
        total={projectsData.total}
      />

      {/* 3. Projects Grid */}
      <ProjectsGrid projects={projectsData.items} />

      {/* 4. Pagination */}
      <ProjectsPagination
        page={projectsData.page}
        totalPages={projectsData.totalPages}
      />

      {/* 5. Trusted Clients / Partners */}
      <ProjectsClientsSection clients={projectsData.clients} />

      {/* 6. Request a Quote CTA */}
      <ProjectsCtaSection />
    </div>
  );
}
