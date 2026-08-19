import { ISeoRepository } from "../../domain/repositories/i-seo.repository";
import { SeoMetadataEntity } from "../../domain/entities/seo.entity";
import { SeoMapper } from "../mappers/seo.mapper";
import { createClient } from "@core/lib/supabase/client";

export class SeoRepository implements ISeoRepository {
  private supabase = createClient();

  async getSeoMetadata(pageRoute: string): Promise<SeoMetadataEntity | null> {
    const { data: seoRows } = await this.supabase
      .from("seo_meta")
      .select("meta_title, meta_description, language_code, canonical_url, og_image_url")
      .eq("entity_type", pageRoute);

    const trEn = seoRows?.find((r) => r.language_code === "en");
    const trAr = seoRows?.find((r) => r.language_code === "ar");

    const dto = {
      page_route: pageRoute,
      title_en: trEn?.meta_title || process.env.NEXT_PUBLIC_APP_NAME || "",
      title_ar: trAr?.meta_title || trEn?.meta_title || process.env.NEXT_PUBLIC_APP_NAME || "",
      description_en: trEn?.meta_description || "",
      description_ar: trAr?.meta_description || trEn?.meta_description || "",
      canonical_url: trEn?.canonical_url || trAr?.canonical_url || undefined,
      og_image_url: trEn?.og_image_url || trAr?.og_image_url || undefined,
    };

    return SeoMapper.toEntity(dto);
  }
}
