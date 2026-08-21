import { ProductCategoryEntity } from "./product.entity";

export interface ProductImageEntity {
  id: string;
  imageUrl: string;
  mimeType: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface RelatedProductItemEntity {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  primaryImage: { imageUrl: string; mimeType: string | null } | null;
}

export interface ProductDetailEntity {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  shortDescription: string | null;
  datasheetUrl: string | null;
  isFeatured: boolean;
  specifications: Record<string, string | number | boolean>;
  category: ProductCategoryEntity | null;
  images: ProductImageEntity[];
  relatedProducts: RelatedProductItemEntity[];
}
