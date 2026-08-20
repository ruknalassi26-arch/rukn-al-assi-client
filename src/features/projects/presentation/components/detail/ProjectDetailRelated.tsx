"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { RelatedProjectItemEntity } from "../../../domain/entities/project-detail.entity";
import { MapPin, ArrowRight, ArrowLeft, Briefcase } from "lucide-react";

interface ProjectDetailRelatedProps {
  relatedProjects: RelatedProjectItemEntity[];
}

export function ProjectDetailRelated({ relatedProjects }: ProjectDetailRelatedProps) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

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
            <div
              key={project.id}
              className="group rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden border-b border-border">
                  {project.image ? (
                    <Image
                      src={project.image}
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

                  {project.category && (
                    <div className="absolute top-3 start-3">
                      <span className="px-3 py-1 rounded-md bg-slate-900/90 text-amber-400 text-xs font-semibold backdrop-blur-md border border-white/15">
                        {project.category}
                      </span>
                    </div>
                  )}

                  {project.location && (
                    <div className="absolute bottom-3 start-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-xs font-medium backdrop-blur-md border border-white/10">
                        <MapPin className="size-3 text-amber-400" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                </div>
              </div>

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
          ))}
        </div>
      </Container>
    </section>
  );
}
