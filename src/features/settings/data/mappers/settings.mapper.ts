import { SettingsDto } from "../models/settings.dto";
import { SiteSettingsEntity } from "../../domain/entities/settings.entity";

export class SettingsMapper {
  static toEntity(dto: SettingsDto): SiteSettingsEntity {
    return {
      siteNameEn: dto.site_name_en,
      siteNameAr: dto.site_name_ar,
      contactEmail: dto.contact_email,
      contactPhone: dto.contact_phone,
      whatsappNumber: dto.whatsapp_number,
      maintenanceMode: dto.maintenance_mode,
    };
  }
}
