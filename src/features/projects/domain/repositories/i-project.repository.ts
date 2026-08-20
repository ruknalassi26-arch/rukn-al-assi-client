import { ProjectEntity, PaginatedProjectsEntity, ProjectCategoryEntity } from "../entities/project.entity";

export interface GetProjectsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  language?: string;
}

export interface IProjectRepository {
  getProjects(params: GetProjectsParams): Promise<PaginatedProjectsEntity>;
  getProjectBySlug(slug: string, language: string): Promise<ProjectEntity | null>;
  getRelatedProjects(currentProjectId: string, categoryId: string | null, language: string, limit?: number): Promise<ProjectEntity[]>;
  getCategories(language: string): Promise<ProjectCategoryEntity[]>;
}
