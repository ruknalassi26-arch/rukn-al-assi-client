import { IProjectRepository } from "../repositories/i-project.repository";
import { ProjectEntity } from "../entities/project.entity";

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(category?: string): Promise<ProjectEntity[]> {
    return this.projectRepository.getProjects(category);
  }
}
