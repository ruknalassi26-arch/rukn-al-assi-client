import { IProjectRepository, GetProjectsParams } from "../repositories/i-project.repository";
import { PaginatedProjectsEntity } from "../entities/project.entity";

export class GetProjectsUseCase {
  constructor(private readonly repository: IProjectRepository) {}

  async execute(params: GetProjectsParams): Promise<PaginatedProjectsEntity> {
    return this.repository.getProjects(params);
  }
}
