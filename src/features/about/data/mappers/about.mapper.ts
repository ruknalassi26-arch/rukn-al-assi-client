import { AboutDto } from "../models/about.dto";
import { AboutCompanyEntity } from "../../domain/entities/about.entity";

export class AboutMapper {
  static toEntity(dto: AboutDto): AboutCompanyEntity {
    return {
      visionEn: dto.vision_en,
      visionAr: dto.vision_ar,
      missionEn: dto.mission_en,
      missionAr: dto.mission_ar,
      valuesEn: dto.values_en,
      valuesAr: dto.values_ar,
    };
  }
}
