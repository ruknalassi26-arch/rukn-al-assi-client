import { ServiceDto } from "../models/service.dto";
import { ServiceEntity } from "../../domain/entities/service.entity";

export class ServiceMapper {
  static toEntity(dto: ServiceDto): ServiceEntity {
    return {
      id: dto.id,
      slug: dto.slug,
      titleEn: dto.title_en,
      titleAr: dto.title_ar,
      descriptionEn: dto.description_en,
      descriptionAr: dto.description_ar,
      iconName: dto.icon_name,
      imageUrl: dto.image_url,
    };
  }
}
