export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  code?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  code: string;
  details?: Record<string, unknown>;
}
