"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { JobListItemEntity } from "../../domain/entities/job.entity";
import { JobCard } from "./JobCard";
import { Briefcase, RotateCcw } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface JobsGridProps {
  jobs: JobListItemEntity[];
  onOpenGeneralModal?: () => void;
}

export function JobsGrid({ jobs, onOpenGeneralModal }: JobsGridProps) {
  const t = useTranslations("Careers");
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  if (!jobs || jobs.length === 0) {
    return (
      <section className="py-20 bg-background min-h-[380px] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center space-y-4 p-8 rounded-3xl bg-card border border-border shadow-xs">
            <div className="size-14 mx-auto rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
              <Briefcase className="size-7 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {t("noJobsTitle")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("noJobsDesc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-10 px-5 gap-2 text-xs font-bold border-border"
              >
                <RotateCcw className="size-3.5" />
                <span>{t("clearFilters")}</span>
              </Button>

              {onOpenGeneralModal && (
                <Button
                  onClick={onOpenGeneralModal}
                  className="h-10 px-5 text-xs font-bold bg-primary text-primary-foreground"
                >
                  <span>{t("generalAppButton")}</span>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </section>
  );
}
