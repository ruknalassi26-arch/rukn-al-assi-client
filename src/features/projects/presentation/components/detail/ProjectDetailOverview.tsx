"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { ProjectEntity } from "../../../domain/entities/project.entity";
import { ShieldAlert, Lightbulb } from "lucide-react";

interface ProjectDetailOverviewProps {
  project: ProjectEntity;
}

export function ProjectDetailOverview({ project }: ProjectDetailOverviewProps) {
  const t = useTranslations("Projects");

  return (
    <section className="py-16 lg:py-24 bg-background border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative, Challenge & Solution (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-start">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {t("overviewTitle")}
              </h2>
              <div className="prose prose-slate max-w-none text-base sm:text-lg text-foreground/90 leading-relaxed font-normal whitespace-pre-line">
                {project.description}
              </div>
            </div>

            {/* Engineering Challenge */}
            {project.challenge && (
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-wider">
                  <ShieldAlert className="size-5" />
                  <span>{t("challengeTitle")}</span>
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* Technical Solution */}
            {project.solution && (
              <div className="p-6 sm:p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <Lightbulb className="size-5" />
                  <span>{t("solutionTitle")}</span>
                </div>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {/* Project Details Specifications Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs space-y-6">
              <h3 className="font-bold text-lg text-foreground border-b border-border pb-4">
                {t("detailsTitle")}
              </h3>

              <div className="space-y-4 text-sm">
                {project.clientName && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      {t("clientLabel")}
                    </span>
                    <p className="font-semibold text-foreground">{project.clientName}</p>
                  </div>
                )}

                {project.location && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      {t("locationLabel")}
                    </span>
                    <p className="font-semibold text-foreground">{project.location}</p>
                  </div>
                )}

                {project.categoryName && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      {t("categoryLabel")}
                    </span>
                    <p className="font-semibold text-foreground">{project.categoryName}</p>
                  </div>
                )}

                {project.completionDate && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      {t("completionDateLabel")}
                    </span>
                    <p className="font-semibold text-foreground">{project.completionDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
