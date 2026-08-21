"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { JobListItemEntity } from "../../domain/entities/job.entity";
import { JobDetailHero } from "../components/detail/JobDetailHero";
import { JobDetailContent } from "../components/detail/JobDetailContent";
import { JobApplicationSection } from "../components/detail/JobApplicationSection";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface JobDetailViewProps {
  job: JobListItemEntity;
}

export function JobDetailView({ job }: JobDetailViewProps) {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero Header */}
      <JobDetailHero job={job} />

      {/* 2. Main Section: Left Content (Description & Specs), Right Sticky Form */}
      <section className="py-12 lg:py-20 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-8">
              <JobDetailContent job={job} />

              <div className="pt-2">
                <Link
                  href={`/${locale}/careers`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
                >
                  <ArrowIcon className="size-4" />
                  <span>{t("backToCareers")}</span>
                </Link>
              </div>
            </div>

            {/* Right Application Form */}
            <div id="application-form-section" className="lg:col-span-6 xl:col-span-5 sticky top-24">
              <JobApplicationSection
                jobPostingId={job.id}
                jobTitle={job.title}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
