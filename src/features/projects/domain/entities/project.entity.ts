export interface ProjectEntity {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  clientNameEn?: string;
  clientNameAr?: string;
  category: string;
  locationEn?: string;
  locationAr?: string;
  completionYear?: number;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl?: string;
}
