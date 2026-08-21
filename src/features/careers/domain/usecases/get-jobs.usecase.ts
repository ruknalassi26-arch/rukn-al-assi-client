import { ICareersRepository, GetJobsParams } from "../repositories/i-careers.repository";
import { PaginatedJobsEntity } from "../entities/job.entity";

export class GetJobsUseCase {
  constructor(private readonly repository: ICareersRepository) {}

  async execute(params: GetJobsParams): Promise<PaginatedJobsEntity> {
    return this.repository.getJobs(params);
  }
}
