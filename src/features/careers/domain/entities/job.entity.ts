export interface JobListItemEntity {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  employmentType: string | null;
  location: string | null;
  closesAt: string | null;
  description: string | null;
  requirements: string | null;
}

export interface PaginatedJobsEntity {
  items: JobListItemEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface JobFilterOptionsEntity {
  departments: string[];
  employmentTypes: string[];
}
