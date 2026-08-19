import { ProductDto } from "../models/product.dto";
import { ProductEntity } from "../../domain/entities/product.entity";

export class ProductMapper {
  static toEntity(dto: ProductDto): ProductEntity {
    return {
      id: dto.id,
      slug: dto.slug,
      nameEn: dto.name_en,
      nameAr: dto.name_ar,
      category: dto.category,
      descriptionEn: dto.description_en,
      descriptionAr: dto.description_ar,
      sku: dto.sku,
      imageUrl: dto.image_url,
      isFeatured: dto.is_featured,
    };
  }
}
