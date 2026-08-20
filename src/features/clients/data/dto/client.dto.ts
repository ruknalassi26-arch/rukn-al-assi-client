export interface RpcClientItemDto {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  sortOrder: number;
}

export interface RpcClientsResponseDto {
  items: RpcClientItemDto[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
