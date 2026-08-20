import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SupabaseProjectRepository } from "@features/projects/data/repositories/supabase-project.repository";
import { GetProjectBySlugUseCase } from "@features/projects/domain/usecases/get-project-by-slug.usecase";
import { GetRelatedProjectsUseCase } from "@features/projects/domain/usecases/get-related-projects.usecase";
import { ProjectDetailView } from "@features/projects/presentation/views/ProjectDetailView";

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const repository = new SupabaseProjectRepository();
  const getProjectUseCase = new GetProjectBySlugUseCase(repository);
  const getRelatedUseCase = new GetRelatedProjectsUseCase(repository);

  const project = await getProjectUseCase.execute(slug, locale);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedUseCase.execute(project.id, project.categoryId, locale, 3);

  return <ProjectDetailView project={project} relatedProjects={relatedProjects} />;
}
