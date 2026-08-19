export interface ProjectDto {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  client_name_en?: string;
  client_name_ar?: string;
  category: string;
  location_en?: string;
  location_ar?: string;
  completion_year?: number;
  description_en: string;
  description_ar: string;
  image_url?: string;
}
