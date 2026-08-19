export interface SeoDto {
  page_route: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  og_image_url?: string;
  keywords_en?: string[];
  keywords_ar?: string[];
}
