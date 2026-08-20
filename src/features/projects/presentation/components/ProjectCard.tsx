"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { MapPin, Building, ArrowRight, ArrowLeft, Briefcase } from "lucide-react";

interface ProjectCardProps {
  project: ProjectEntity;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="group rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Cover Photo from DB */}
        <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden border-b border-border">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-106 transition-transform duration-500"
            />
          ) : (
            <div className="size-full flex items-center justify-center bg-slate-800 text-slate-500">
              <Briefcase className="size-10 opacity-40" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Floating Category Badge */}
          {project.categoryName && (
            <div className="absolute top-3 start-3">
              <span className="px-3 py-1 rounded-md bg-slate-900/90 text-amber-400 text-xs font-semibold backdrop-blur-md border border-white/15">
                {project.categoryName}
              </span>
            </div>
          )}

          {/* Floating Location Badge */}
          {project.location && (
            <div className="absolute bottom-3 start-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-xs font-medium backdrop-blur-md border border-white/10">
                <MapPin className="size-3 text-amber-400" />
                <span>{project.location}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Client Badge */}
          {project.clientName && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Building className="size-3.5 text-primary shrink-0" />
              <span className="truncate">{project.clientName}</span>
            </div>
          )}

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-6 pb-6 pt-2 border-t border-border/50 flex items-center justify-between">
        <Link
          href={`/${locale}/projects/${encodeURIComponent(project.slug)}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 group/link transition-colors"
        >
          <span>{t("viewProject")}</span>
          <ArrowIcon className="size-4 shrink-0 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
