import { IAboutRepository } from "../../domain/repositories/i-about.repository";
import { AboutCompanyEntity } from "../../domain/entities/about.entity";
import { AboutMapper } from "../mappers/about.mapper";
import { createClient } from "@core/lib/supabase/client";

export class AboutRepository implements IAboutRepository {
  private supabase = createClient();

  async getCompanyOverview(): Promise<AboutCompanyEntity> {
    const { data: translations } = await this.supabase
      .from("company_profile_translations")
      .select("company_profile_id, language_code, history, mission, vision");

    const trEn = translations?.find((t) => t.language_code === "en");
    const trAr = translations?.find((t) => t.language_code === "ar");

    const { data: settings } = await this.supabase.from("settings").select("key, value");

    const map: Record<string, string> = {};
    if (settings) {
      for (const s of settings) {
        if (s.key && s.value) map[s.key] = s.value;
      }
    }

    const dto = {
      vision_en: trEn?.vision || map["vision_en"] || "",
      vision_ar: trAr?.vision || map["vision_ar"] || "",
      mission_en: trEn?.mission || map["mission_en"] || "",
      mission_ar: trAr?.mission || map["mission_ar"] || "",
      values_en: ["Excellence", "Integrity", "Safety", "Precision"],
      values_ar: ["التميز", "النزاهة", "السلامة", "الدقة"],
    };

    return AboutMapper.toEntity(dto);
  }
}
