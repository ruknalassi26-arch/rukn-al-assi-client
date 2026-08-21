import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SupabaseCareersRepository } from "@features/careers/data/repositories/supabase-careers.repository";
import { GetJobDetailUseCase } from "@features/careers/domain/usecases/get-job-detail.usecase";
import { JobDetailView } from "@features/careers/presentation/views/JobDetailView";

interface JobDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const repo = new SupabaseCareersRepository();
  const useCase = new GetJobDetailUseCase(repo);

  const job = await useCase.execute({
    slug,
    language: locale,
  });

  if (!job) {
    notFound();
  }

  return <JobDetailView job={job} />;
}
