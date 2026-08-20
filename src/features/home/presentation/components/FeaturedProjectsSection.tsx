"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ProjectPreviewEntity } from "../../domain/entities/home.entity";
import { MapPin, Building, ArrowRight, ArrowLeft } from "lucide-react";

interface FeaturedProjectsSectionProps {
  projects: ProjectPreviewEntity[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const t = useTranslations("Home.projects");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border">
      <Container className="space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("heading")}
            description={t("subheading")}
          />

          <Button asChild variant="outline" className="hidden md:inline-flex shrink-0 font-bold">
            <Link href={`/${locale}/projects`} className="flex items-center gap-2">
              <span>{tCommon("viewAllProjects")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid (Max 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Project Image */}
              {project.imageUrl ? (
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Metadata Badges */}
                  <div className="absolute bottom-4 start-4 end-4 flex flex-wrap items-center gap-2">
                    {project.clientName && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-md border border-white/10">
                        <Building className="size-3 text-primary" />
                        <span>{project.clientName}</span>
                      </span>
                    )}

                    {project.location && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 text-slate-200 text-xs font-medium backdrop-blur-md border border-white/10">
                        <MapPin className="size-3 text-emerald-400" />
                        <span>{project.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-muted/40 border-b border-border flex flex-wrap items-center gap-2">
                  {project.clientName && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-card text-foreground text-xs font-semibold border border-border">
                      <Building className="size-3 text-primary" />
                      <span>{project.clientName}</span>
                    </span>
                  )}
                  {project.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-card text-muted-foreground text-xs font-medium border border-border">
                      <MapPin className="size-3 text-primary" />
                      <span>{project.location}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Project Details */}
              <div className="p-6 sm:p-8 space-y-3 flex flex-col flex-1 justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border/60">
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline group/link"
                  >
                    <span>{tCommon("viewDetails")}</span>
                    <ArrowIcon className="size-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="text-center md:hidden pt-4">
          <Button asChild className="w-full font-bold" size="lg">
            <Link href={`/${locale}/projects`} className="flex items-center justify-center gap-2">
              <span>{tCommon("viewAllProjects")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
