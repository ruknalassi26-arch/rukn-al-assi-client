export interface ClientEntity {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  sortOrder: number;
}

export interface PaginatedClientsEntity {
  items: ClientEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
