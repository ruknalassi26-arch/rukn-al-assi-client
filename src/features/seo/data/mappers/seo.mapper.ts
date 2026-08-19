import { SeoDto } from "../models/seo.dto";
import { SeoMetadataEntity } from "../../domain/entities/seo.entity";

export class SeoMapper {
  static toEntity(dto: SeoDto): SeoMetadataEntity {
    return {
      pageRoute: dto.page_route,
      titleEn: dto.title_en,
      titleAr: dto.title_ar,
      descriptionEn: dto.description_en,
      descriptionAr: dto.description_ar,
      ogImageUrl: dto.og_image_url,
      keywordsEn: dto.keywords_en,
      keywordsAr: dto.keywords_ar,
    };
  }
}
