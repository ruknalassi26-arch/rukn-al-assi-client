export interface RpcJobListItemDto {
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

export interface RpcJobsResponseDto {
  items: RpcJobListItemDto[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  language?: string;
}

export interface RpcSubmitApplicationResponseDto {
  success: boolean;
  id?: string;
  message?: string;
}
