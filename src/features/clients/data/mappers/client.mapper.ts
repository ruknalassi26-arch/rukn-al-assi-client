import { ClientDto } from "../models/client.dto";
import { ClientEntity } from "../../domain/entities/client.entity";

export class ClientMapper {
  static toEntity(dto: ClientDto): ClientEntity {
    return {
      id: dto.id,
      nameEn: dto.name_en,
      nameAr: dto.name_ar,
      sectorEn: dto.sector_en,
      sectorAr: dto.sector_ar,
      logoUrl: dto.logo_url,
    };
  }
}
