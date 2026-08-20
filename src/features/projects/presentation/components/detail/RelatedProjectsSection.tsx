"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ProjectEntity } from "../../../domain/entities/project.entity";
import { ProjectCard } from "../ProjectCard";

interface RelatedProjectsSectionProps {
  relatedProjects: ProjectEntity[];
}

export function RelatedProjectsSection({ relatedProjects }: RelatedProjectsSectionProps) {
  const t = useTranslations("Projects");

  if (!relatedProjects || relatedProjects.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-background border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={t("relatedEyebrow")}
          title={t("relatedTitle")}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
