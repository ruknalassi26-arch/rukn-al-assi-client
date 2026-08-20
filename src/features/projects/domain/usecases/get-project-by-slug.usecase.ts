import { IProjectRepository } from "../repositories/i-project.repository";
import { ProjectEntity } from "../entities/project.entity";

export class GetProjectBySlugUseCase {
  constructor(private readonly repository: IProjectRepository) {}

  async execute(slug: string, language: string): Promise<ProjectEntity | null> {
    return this.repository.getProjectBySlug(slug, language);
  }
}
