import { IProjectRepository } from "../repositories/i-project.repository";
import { ProjectEntity } from "../entities/project.entity";

export class GetProjectDetailsUseCase {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async execute(idOrSlug: string): Promise<ProjectEntity | null> {
    return this.projectRepository.getProjectDetails(idOrSlug);
  }
}
