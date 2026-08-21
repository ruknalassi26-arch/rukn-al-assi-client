import { ICareersRepository } from "../repositories/i-careers.repository";
import { JobFilterOptionsEntity } from "../entities/job.entity";

export class GetCareersFilterOptionsUseCase {
  constructor(private readonly repository: ICareersRepository) {}

  async execute(): Promise<JobFilterOptionsEntity> {
    return this.repository.getFilterOptions();
  }
}
