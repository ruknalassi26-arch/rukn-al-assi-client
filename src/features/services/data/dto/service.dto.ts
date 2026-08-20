export interface ServiceTranslationDto {
  service_id: string;
  language_code: string;
  slug: string;
  name: string;
  description: string | null;
  applications: string | null;
}

export interface ServiceImageDto {
  id: string;
  service_id: string;
  image_url: string;
  sort_order: number;
}

export interface ServiceFaqDto {
  id: string;
  service_id: string;
  sort_order: number;
  service_faq_translations?: Array<{
    language_code: string;
    question: string;
    answer: string;
  }>;
}

export interface ServiceRowDto {
  id: string;
  icon: string | null;
  hero_image_url: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number | null;
  sort_order: number;
  created_at: string;
  service_translations?: ServiceTranslationDto[];
  service_images?: ServiceImageDto[];
  service_faqs?: ServiceFaqDto[];
}
