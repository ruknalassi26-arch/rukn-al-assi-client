export interface ProductCategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
}

export interface ProductPrimaryImageEntity {
  id: string;
  imageUrl: string;
  mimeType: string | null;
  sortOrder: number;
}

export interface ProductListItemEntity {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  shortDescription: string | null;
  datasheetUrl: string | null;
  isFeatured: boolean;
  featuredOrder: number | null;
  primaryImage: ProductPrimaryImageEntity | null;
  category: ProductCategoryEntity | null;
}

export interface ClientItemEntity {
  id: string;
  name: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
}

export interface PaginatedProductsEntity {
  items: ProductListItemEntity[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
