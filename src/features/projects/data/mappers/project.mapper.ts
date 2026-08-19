import { ProjectDto } from "../models/project.dto";
import { ProjectEntity } from "../../domain/entities/project.entity";

export class ProjectMapper {
  static toEntity(dto: ProjectDto): ProjectEntity {
    return {
      id: dto.id,
      slug: dto.slug,
      titleEn: dto.title_en,
      titleAr: dto.title_ar,
      clientNameEn: dto.client_name_en,
      clientNameAr: dto.client_name_ar,
      category: dto.category,
      locationEn: dto.location_en,
      locationAr: dto.location_ar,
      completionYear: dto.completion_year,
      descriptionEn: dto.description_en,
      descriptionAr: dto.description_ar,
      imageUrl: dto.image_url,
    };
  }
}
