import { ICareersRepository, GetJobBySlugParams } from "../repositories/i-careers.repository";
import { JobListItemEntity } from "../entities/job.entity";

export class GetJobDetailUseCase {
  constructor(private readonly repository: ICareersRepository) {}

  async execute(params: GetJobBySlugParams): Promise<JobListItemEntity | null> {
    return this.repository.getJobBySlug(params);
  }
}
