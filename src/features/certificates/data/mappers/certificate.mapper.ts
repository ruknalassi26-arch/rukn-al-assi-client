import { CertificateDto } from "../models/certificate.dto";
import { CertificateEntity } from "../../domain/entities/certificate.entity";

export class CertificateMapper {
  static toEntity(dto: CertificateDto): CertificateEntity {
    return {
      id: dto.id,
      titleEn: dto.title_en,
      titleAr: dto.title_ar,
      issuingAuthorityEn: dto.authority_en,
      issuingAuthorityAr: dto.authority_ar,
      issueYear: dto.year,
      imageUrl: dto.image_url,
    };
  }
}
