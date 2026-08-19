import { GalleryDto } from "../models/gallery.dto";
import { GalleryItemEntity } from "../../domain/entities/gallery.entity";

export class GalleryMapper {
  static toEntity(dto: GalleryDto): GalleryItemEntity {
    return {
      id: dto.id,
      titleEn: dto.title_en,
      titleAr: dto.title_ar,
      category: dto.category,
      imageUrl: dto.image_url,
    };
  }
}
