import { IProjectRepository } from "../repositories/i-project.repository";
import { ProjectDetailResponse } from "../entities/project-detail.entity";

export class GetProjectDetailUseCase {
  constructor(private readonly repository: IProjectRepository) {}

  async execute(slug: string, language: string): Promise<ProjectDetailResponse | null> {
    return this.repository.getProjectDetailBySlug(slug, language);
  }
}
