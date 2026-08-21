export interface RpcCertificationItemDto {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  issuedBy: string | null;
  issuedDate: string | null;
  sortOrder?: number;
}

export interface RpcCertificationsResponseDto {
  items: RpcCertificationItemDto[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  language?: string;
}
