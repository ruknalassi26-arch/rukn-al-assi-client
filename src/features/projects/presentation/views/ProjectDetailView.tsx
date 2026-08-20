"use client";

import React from "react";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectDetailHero } from "../components/detail/ProjectDetailHero";
import { ProjectDetailOverview } from "../components/detail/ProjectDetailOverview";
import { ProjectDetailGallery } from "../components/detail/ProjectDetailGallery";
import { RelatedProjectsSection } from "../components/detail/RelatedProjectsSection";
import { ProjectsCtaSection } from "../components/ProjectsCtaSection";

interface ProjectDetailViewProps {
  project: ProjectEntity;
  relatedProjects: ProjectEntity[];
}

export function ProjectDetailView({ project, relatedProjects }: ProjectDetailViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero */}
      <ProjectDetailHero project={project} />

      {/* 2. Overview & Challenge/Solution */}
      <ProjectDetailOverview project={project} />

      {/* 3. Photo Gallery */}
      <ProjectDetailGallery images={project.images} />

      {/* 4. Related Projects */}
      <RelatedProjectsSection relatedProjects={relatedProjects} />

      {/* 5. Closing CTA */}
      <ProjectsCtaSection />
    </div>
  );
}
