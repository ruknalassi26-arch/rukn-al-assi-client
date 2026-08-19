export interface ProductDto {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  category: string;
  description_en: string;
  description_ar: string;
  sku?: string;
  image_url?: string;
  is_featured?: boolean;
}
