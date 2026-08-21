"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { JobListItemEntity } from "../../../domain/entities/job.entity";
import { FileText, CheckCircle2 } from "lucide-react";

interface JobDetailContentProps {
  job: JobListItemEntity;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  const t = useTranslations("Careers");

  return (
    <div className="space-y-8">
      {/* Job Description */}
      {job.description && (
        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 shadow-2xs text-start">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <FileText className="size-4" />
            <span>{t("jobDescription")}</span>
          </div>
          <div className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>
      )}

      {/* Key Requirements & Qualifications */}
      {job.requirements && (
        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 shadow-2xs text-start">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
            <CheckCircle2 className="size-4" />
            <span>{t("jobRequirements")}</span>
          </div>
          <div className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
            {job.requirements}
          </div>
        </div>
      )}
    </div>
  );
}
