import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SupabaseProjectRepository } from "@features/projects/data/repositories/supabase-project.repository";
import { GetProjectDetailUseCase } from "@features/projects/domain/usecases/get-project-detail.usecase";
import { ProjectDetailView } from "@features/projects/presentation/views/ProjectDetailView";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const repository = new SupabaseProjectRepository();
  const useCase = new GetProjectDetailUseCase(repository);

  const data = await useCase.execute(slug, locale);

  if (!data || !data.project) {
    notFound();
  }

  return <ProjectDetailView data={data} />;
}
