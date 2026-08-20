export interface ProjectTranslationDto {
  project_id: string;
  language_code: string;
  slug: string;
  title: string;
  description: string | null;
  challenge: string | null;
  solution: string | null;
}

export interface ProjectImageDto {
  id: string;
  project_id: string;
  image_url: string;
  sort_order: number;
}

export interface ProjectCategoryTranslationDto {
  language_code: string;
  slug: string;
  name: string;
}

export interface ProjectCategoryDto {
  id: string;
  status: string;
  project_category_translations?: ProjectCategoryTranslationDto[];
}

export interface ProjectRowDto {
  id: string;
  category_id: string | null;
  client_name: string | null;
  location: string | null;
  completion_date: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number | null;
  sort_order: number;
  created_at: string;
  project_translations?: ProjectTranslationDto[];
  project_images?: ProjectImageDto[];
  project_categories?: ProjectCategoryDto | ProjectCategoryDto[] | null;
}
