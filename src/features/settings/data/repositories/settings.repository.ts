import { ISettingsRepository } from "../../domain/repositories/i-settings.repository";
import { SiteSettingsEntity } from "../../domain/entities/settings.entity";
import { SettingsMapper } from "../mappers/settings.mapper";
import { createClient } from "@core/lib/supabase/client";

export class SettingsRepository implements ISettingsRepository {
  private supabase = createClient();

  async getSettings(): Promise<SiteSettingsEntity> {
    const { data: rows } = await this.supabase
      .from("settings")
      .select("key, value");

    const map: Record<string, string> = {};
    if (rows) {
      for (const row of rows) {
        if (row.key && row.value !== null && row.value !== undefined) {
          map[row.key] = row.value;
        }
      }
    }

    const dto = {
      site_name_en: map["company_name_en"] || "",
      site_name_ar: map["company_name_ar"] || "",
      contact_email: map["contact_email"] || "",
      contact_phone: map["contact_phone"] || "",
      whatsapp_number: map["whatsapp_number"] || "",
      maintenance_mode: map["maintenance_mode"] === "true",
    };

    return SettingsMapper.toEntity(dto);
  }
}
