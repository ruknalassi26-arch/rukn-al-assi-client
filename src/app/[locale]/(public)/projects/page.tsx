import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseProjectRepository } from "@features/projects/data/repositories/supabase-project.repository";
import { GetProjectsUseCase } from "@features/projects/domain/usecases/get-projects.usecase";
import { ProjectsView } from "@features/projects/presentation/views/ProjectsView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const { locale } = await params;
  const { page, search, category } = await searchParams;
  setRequestLocale(locale);

  const currentPage = page ? parseInt(page, 10) || 1 : 1;
  const currentSearch = search || "";
  const currentCategory = category || "";

  const repository = new SupabaseProjectRepository();
  const useCase = new GetProjectsUseCase(repository);

  const projectsData = await useCase.execute({
    page: currentPage,
    pageSize: 12,
    search: currentSearch,
    category: currentCategory,
    language: locale,
  });

  return <ProjectsView projectsData={projectsData} />;
}
