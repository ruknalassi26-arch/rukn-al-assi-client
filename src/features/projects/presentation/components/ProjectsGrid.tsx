"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectCard } from "./ProjectCard";
import { Briefcase } from "lucide-react";

interface ProjectsGridProps {
  projects: ProjectEntity[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const t = useTranslations("Projects");

  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 text-center rounded-3xl bg-muted/20 border border-border space-y-4 max-w-xl mx-auto">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground mx-auto">
          <Briefcase className="size-8 opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground">{t("noProjects")}</h3>
          <p className="text-sm text-muted-foreground">{t("noProjectsDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
