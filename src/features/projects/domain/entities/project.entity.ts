export interface ProjectImageEntity {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

export interface ProjectCategoryEntity {
  id: string;
  slug: string;
  name: string;
}

export interface ProjectClientEntity {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
}

export interface ProjectEntity {
  id: string;
  categoryId: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  clientName: string | null;
  location: string | null;
  completionDate: string | null;
  status: string;
  isFeatured: boolean;
  featuredOrder: number | null;
  sortOrder: number;
  slug: string;
  title: string;
  description: string;
  challenge: string | null;
  solution: string | null;
  images: ProjectImageEntity[];
  coverImage: string;
  createdAt: string;
}

export interface PaginatedProjectsEntity {
  items: ProjectEntity[];
  categories: ProjectCategoryEntity[];
  clients: ProjectClientEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
