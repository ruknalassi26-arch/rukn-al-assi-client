export interface CertificationEntity {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  issuedBy: string | null;
  issuedDate: string | null;
  sortOrder: number;
}

export interface PaginatedCertificationsEntity {
  items: CertificationEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
