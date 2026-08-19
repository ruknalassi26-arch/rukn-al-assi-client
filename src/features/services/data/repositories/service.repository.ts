import { IServiceRepository } from "../../domain/repositories/i-service.repository";
import { ServiceEntity } from "../../domain/entities/service.entity";
import { ServiceMapper } from "../mappers/service.mapper";
import { createClient } from "@core/lib/supabase/client";

export class ServiceRepository implements IServiceRepository {
  private supabase = createClient();

  async getServices(): Promise<ServiceEntity[]> {
    const { data: services } = await this.supabase
      .from("services")
      .select("id, icon, hero_image_url, status, is_featured, featured_order, sort_order")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    const { data: translations } = await this.supabase
      .from("service_translations")
      .select("service_id, language_code, slug, name, description");

    if (!services || services.length === 0) return [];

    return services.map((srv) => {
      const trEn = translations?.find((t) => t.service_id === srv.id && t.language_code === "en");
      const trAr = translations?.find((t) => t.service_id === srv.id && t.language_code === "ar");

      return ServiceMapper.toEntity({
        id: srv.id,
        slug: trEn?.slug || trAr?.slug || srv.id,
        title_en: trEn?.name || "",
        title_ar: trAr?.name || "",
        description_en: trEn?.description || "",
        description_ar: trAr?.description || "",
        icon_name: srv.icon || "Wrench",
      });
    });
  }

  async getServiceDetails(idOrSlug: string): Promise<ServiceEntity | null> {
    const { data: translation } = await this.supabase
      .from("service_translations")
      .select("service_id, language_code, slug, name, description")
      .or(`slug.eq.${idOrSlug},service_id.eq.${idOrSlug}`)
      .limit(1)
      .maybeSingle();

    const serviceId = translation?.service_id || idOrSlug;

    const { data: service } = await this.supabase
      .from("services")
      .select("id, icon, hero_image_url, status")
      .eq("id", serviceId)
      .maybeSingle();

    if (!service) return null;

    const { data: allTranslations } = await this.supabase
      .from("service_translations")
      .select("service_id, language_code, slug, name, description")
      .eq("service_id", service.id);

    const trEn = allTranslations?.find((t) => t.language_code === "en");
    const trAr = allTranslations?.find((t) => t.language_code === "ar");

    return ServiceMapper.toEntity({
      id: service.id,
      slug: trEn?.slug || trAr?.slug || service.id,
      title_en: trEn?.name || "",
      title_ar: trAr?.name || "",
      description_en: trEn?.description || "",
      description_ar: trAr?.description || "",
      icon_name: service.icon || "Wrench",
    });
  }
}
