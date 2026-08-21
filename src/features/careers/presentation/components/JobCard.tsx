"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { JobListItemEntity } from "../../domain/entities/job.entity";
import { Briefcase, MapPin, ArrowRight, ArrowLeft, Calendar } from "lucide-react";

interface JobCardProps {
  job: JobListItemEntity;
}

export function JobCard({ job }: JobCardProps) {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="group rounded-3xl bg-card border border-border p-6 sm:p-7 hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {job.department && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">
              <Briefcase className="size-3" />
              <span>{job.department}</span>
            </span>
          )}

          {job.employmentType && (
            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold uppercase text-[11px] tracking-wider">
              {job.employmentType.replace("_", " ")}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
          <Link href={`/${locale}/careers/${job.slug}`}>
            {job.title}
          </Link>
        </h3>

        {/* Location & Closing Date */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
          {job.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span>{job.location}</span>
            </div>
          )}

          {job.closesAt && (
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
              <Calendar className="size-3.5 shrink-0" />
              <span>{t("applyBefore", { date: job.closesAt })}</span>
            </div>
          )}
        </div>

        {/* Short description preview if available */}
        {job.description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}
      </div>

      {/* Footer Action */}
      <div className="pt-4 border-t border-border/50 flex items-center justify-between">
        <Link
          href={`/${locale}/careers/${job.slug}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:text-primary/80 transition-colors"
        >
          <span>{t("viewPosition")}</span>
          <ArrowIcon className="size-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
