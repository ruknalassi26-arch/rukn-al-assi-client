import { ICareersRepository } from "../repositories/i-careers.repository";
import {
  JobApplicationInputEntity,
  JobApplicationResultEntity,
} from "../entities/job-application.entity";

export class SubmitJobApplicationUseCase {
  constructor(private readonly repository: ICareersRepository) {}

  async execute(input: JobApplicationInputEntity): Promise<JobApplicationResultEntity> {
    return this.repository.submitApplication(input);
  }
}
