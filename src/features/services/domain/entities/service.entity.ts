export interface ServiceImageEntity {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

export interface ServiceFaqEntity {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface ServiceEntity {
  id: string;
  icon: string | null;
  heroImageUrl: string | null;
  status: string;
  isFeatured: boolean;
  featuredOrder: number | null;
  sortOrder: number;
  slug: string;
  name: string;
  description: string;
  applications: string | null;
  images?: ServiceImageEntity[];
  faqs?: ServiceFaqEntity[];
  createdAt: string;
}

export interface PaginatedServicesEntity {
  items: ServiceEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
