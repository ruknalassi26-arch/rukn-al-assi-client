"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { JobListItemEntity } from "../../../domain/entities/job.entity";
import { Briefcase, MapPin, Calendar, ChevronRight, ChevronLeft, ArrowDown } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface JobDetailHeroProps {
  job: JobListItemEntity;
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  const t = useTranslations("Careers");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  const scrollToApplication = () => {
    const el = document.getElementById("application-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-white/10">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-1 bg-radial-at-c from-slate-950/70 via-slate-950/90 to-slate-950 pointer-events-none" />

      <Container className="relative z-10">
        <div className="space-y-6 text-start">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide flex-wrap">
            <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">
              {tCommon("home")}
            </Link>
            <Chevron className="size-3.5 opacity-60" />
            <Link href={`/${locale}/careers`} className="hover:text-amber-400 transition-colors">
              {t("titleShort")}
            </Link>
            <Chevron className="size-3.5 opacity-60" />
            <span className="text-amber-400 font-semibold truncate max-w-xs">{job.title}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {job.department && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-amber-400 backdrop-blur-md shadow-xs">
                <Briefcase className="size-3.5" />
                <span>{job.department}</span>
              </div>
            )}
            {job.employmentType && (
              <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {job.employmentType.replace("_", " ")}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {job.title}
          </h1>

          {/* Location & Closing Date */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-amber-400 shrink-0" />
                <span>{job.location}</span>
              </div>
            )}
            {job.closesAt && (
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Calendar className="size-4 shrink-0" />
                <span>{t("applyBefore", { date: job.closesAt })}</span>
              </div>
            )}
          </div>

          <div className="pt-3">
            <Button
              onClick={scrollToApplication}
              size="lg"
              className="h-12 px-8 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2"
            >
              <span>{t("applyNow")}</span>
              <ArrowDown className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
