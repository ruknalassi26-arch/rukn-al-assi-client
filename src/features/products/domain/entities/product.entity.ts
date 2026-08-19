export interface ProductEntity {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  category: string;
  descriptionEn: string;
  descriptionAr: string;
  sku?: string;
  imageUrl?: string;
  isFeatured?: boolean;
}
