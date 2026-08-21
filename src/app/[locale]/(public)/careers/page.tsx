import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseCareersRepository } from "@features/careers/data/repositories/supabase-careers.repository";
import { GetJobsUseCase } from "@features/careers/domain/usecases/get-jobs.usecase";
import { GetCareersFilterOptionsUseCase } from "@features/careers/domain/usecases/get-careers-filter-options.usecase";
import { CareersView } from "@features/careers/presentation/views/CareersView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface CareersPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    department?: string;
    employmentType?: string;
    pageSize?: string;
  }>;
}

export default async function CareersPage({ params, searchParams }: CareersPageProps) {
  const { locale } = await params;
  const { page, search, department, employmentType, pageSize } = await searchParams;

  setRequestLocale(locale);

  const currentPage = page ? parseInt(page, 10) || 1 : 1;
  const currentPageSize = pageSize ? parseInt(pageSize, 10) || 12 : 12;

  const repo = new SupabaseCareersRepository();
  const getJobsUseCase = new GetJobsUseCase(repo);
  const getFilterOptionsUseCase = new GetCareersFilterOptionsUseCase(repo);

  const [jobsData, filterOptions] = await Promise.all([
    getJobsUseCase.execute({
      page: currentPage,
      pageSize: currentPageSize,
      search: search || "",
      department: department || "",
      employmentType: employmentType || "",
      language: locale,
    }),
    getFilterOptionsUseCase.execute(),
  ]);

  return <CareersView jobsData={jobsData} filterOptions={filterOptions} />;
}
