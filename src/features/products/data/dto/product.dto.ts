export interface RpcProductCategoryDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder?: number;
}

export interface RpcProductPrimaryImageDto {
  id?: string;
  imageUrl: string;
  mimeType: string | null;
  sortOrder?: number;
}

export interface RpcProductListItemDto {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  shortDescription: string | null;
  datasheetUrl: string | null;
  isFeatured: boolean;
  featuredOrder: number | null;
  primaryImage: RpcProductPrimaryImageDto | null;
  category: RpcProductCategoryDto | null;
}

export interface RpcProductsResponseDto {
  items: RpcProductListItemDto[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  language?: string;
}

export interface RpcProductImageDto {
  id: string;
  imageUrl: string;
  mimeType: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface RpcRelatedProductDto {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  primaryImage: { imageUrl: string; mimeType: string | null } | null;
}

export interface RpcProductDetailResponseDto {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  shortDescription: string | null;
  datasheetUrl: string | null;
  isFeatured: boolean;
  specifications: Record<string, string | number | boolean> | null;
  category: RpcProductCategoryDto | null;
  images: RpcProductImageDto[];
  relatedProducts: RpcRelatedProductDto[];
}
