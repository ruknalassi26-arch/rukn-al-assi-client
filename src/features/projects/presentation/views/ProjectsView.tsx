"use client";

import React from "react";
import { PaginatedProjectsEntity } from "../../domain/entities/project.entity";
import { ProjectsHeroSection } from "../components/ProjectsHeroSection";
import { ProjectsFilterBar } from "../components/ProjectsFilterBar";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { ProjectsPagination } from "../components/ProjectsPagination";
import { ProjectsClientsSection } from "../components/ProjectsClientsSection";
import { ProjectsCtaSection } from "../components/ProjectsCtaSection";
import { Container } from "@shared/components/layouts/Container";

interface ProjectsViewProps {
  projectsData: PaginatedProjectsEntity;
}

export function ProjectsView({ projectsData }: ProjectsViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Projects Hero */}
      <ProjectsHeroSection />

      {/* 2, 3, 4, 5. Search, Category Filter, Projects Grid, Pagination */}
      <section className="py-16 lg:py-24 bg-background border-b border-border">
        <Container className="space-y-10">
          <ProjectsFilterBar
            total={projectsData.total}
            categories={projectsData.categories}
          />
          <ProjectsGrid projects={projectsData.items} />
          <ProjectsPagination
            page={projectsData.page}
            totalPages={projectsData.totalPages}
          />
        </Container>
      </section>

      {/* 6. Trusted Clients Marquee */}
      <ProjectsClientsSection clients={projectsData.clients} />

      {/* 7. Request Quote CTA */}
      <ProjectsCtaSection />
    </div>
  );
}
