import { IProjectRepository } from "../repositories/i-project.repository";
import { ProjectEntity } from "../entities/project.entity";

export class GetRelatedProjectsUseCase {
  constructor(private readonly repository: IProjectRepository) {}

  async execute(currentProjectId: string, categoryId: string | null, language: string, limit: number = 3): Promise<ProjectEntity[]> {
    return this.repository.getRelatedProjects(currentProjectId, categoryId, language, limit);
  }
}
