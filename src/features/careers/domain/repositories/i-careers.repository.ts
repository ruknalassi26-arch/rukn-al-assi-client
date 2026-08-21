import {
  JobListItemEntity,
  PaginatedJobsEntity,
  JobFilterOptionsEntity,
} from "../entities/job.entity";
import {
  JobApplicationInputEntity,
  JobApplicationResultEntity,
} from "../entities/job-application.entity";

export interface GetJobsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  department?: string;
  employmentType?: string;
  language?: string;
}

export interface GetJobBySlugParams {
  slug: string;
  language?: string;
}

export interface ICareersRepository {
  getJobs(params: GetJobsParams): Promise<PaginatedJobsEntity>;
  getJobBySlug(params: GetJobBySlugParams): Promise<JobListItemEntity | null>;
  getFilterOptions(): Promise<JobFilterOptionsEntity>;
  submitApplication(input: JobApplicationInputEntity): Promise<JobApplicationResultEntity>;
  uploadCv(file: File): Promise<{ fileUrl: string; fileName: string }>;
}
