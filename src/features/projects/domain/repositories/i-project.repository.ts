import { ProjectEntity } from "../entities/project.entity";

export interface IProjectRepository {
  getProjects(category?: string): Promise<ProjectEntity[]>;
  getProjectDetails(idOrSlug: string): Promise<ProjectEntity | null>;
}
