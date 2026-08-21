export interface JobApplicationInputEntity {
  jobPostingId: string | null;
  fullName: string;
  email: string;
  phone?: string | null;
  coverMessage?: string | null;
  cvFileUrl: string;
  cvFileName: string;
}

export interface JobApplicationResultEntity {
  success: boolean;
  id?: string;
  message?: string;
}
