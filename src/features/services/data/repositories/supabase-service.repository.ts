interface ClientTranslationRow {
  language_code: string;
  name: string;
}

interface ClientRow {
  id: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  client_translations?: ClientTranslationRow[];
}

import { IServiceRepository, GetServicesParams } from "../../domain/repositories/i-service.repository";
import { ServiceEntity, PaginatedServicesEntity, ClientItemEntity } from "../../domain/entities/service.entity";
import { ServiceMapper } from "../mappers/service.mapper";
import { ServiceRowDto } from "../dto/service.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseServiceRepository implements IServiceRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getServices({
    page = 1,
    pageSize = 12,
    search = "",
    language = "en",
  }: GetServicesParams): Promise<PaginatedServicesEntity> {
    const supabase = this.getSupabase();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const langCode = language === "ckb" ? "ku" : language;

    try {
      let query = supabase
        .from("services")
        .select(
          `
          id,
          icon,
          hero_image_url,
          status,
          is_featured,
          featured_order,
          sort_order,
          created_at,
          service_translations (
            service_id,
            language_code,
            slug,
            name,
            description,
            applications
          )
        `,
          { count: "exact" }
        )
        .eq("status", "published")
        .is("deleted_at", null)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (search && search.trim().length > 0) {
        const cleanSearch = search.trim();
        query = query.or(
          `service_translations.name.ilike.%${cleanSearch}%,service_translations.description.ilike.%${cleanSearch}%`
        );
      }

      // Fetch services and clients in parallel
      const [servicesRes, clientsRes] = await Promise.all([
        query.range(from, to),
        supabase
          .from("clients")
          .select(`
            id,
            logo_url,
            website_url,
            sort_order,
            client_translations (
              language_code,
              name
            )
          `)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order", { ascending: true })
          .limit(10),
      ]);

      if (servicesRes.error) {
        console.error("[SupabaseServiceRepository] Error querying services:", servicesRes.error.message);
        return { items: [], clients: [], total: 0, page, pageSize, totalPages: 0 };
      }

      const rawItems = (servicesRes.data || []) as ServiceRowDto[];
      const items = rawItems.map((row) => ServiceMapper.toEntity(row, language));
      const total = servicesRes.count || items.length;
      const totalPages = Math.ceil(total / pageSize);

      // Map clients
      const clients: ClientItemEntity[] = (clientsRes.data || []).map((c: ClientRow) => {
        const trans = (c.client_translations || []).find((t: ClientTranslationRow) => t.language_code === langCode) ||
          (c.client_translations || []).find((t: ClientTranslationRow) => t.language_code === "en") ||
          (c.client_translations || [])[0];

        return {
          id: c.id,
          name: trans?.name || "Client Partner",
          logoUrl: c.logo_url || null,
          websiteUrl: c.website_url || null,
        };
      });

      return {
        items,
        clients,
        total,
        page,
        pageSize,
        totalPages,
      };
    } catch (err) {
      console.error("[SupabaseServiceRepository] Exception in getServices:", err);
      return { items: [], clients: [], total: 0, page, pageSize, totalPages: 0 };
    }
  }

  async getServiceBySlug(slug: string, language: string): Promise<ServiceEntity | null> {
    const supabase = this.getSupabase();
    const cleanSlug = decodeURIComponent(slug).trim();

    try {
      let serviceId: string | null = null;
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanSlug);

      if (isUuid) {
        serviceId = cleanSlug;
      } else {
        const { data: transData } = await supabase
          .from("service_translations")
          .select("service_id")
          .eq("slug", cleanSlug)
          .limit(1);

        if (transData && transData.length > 0) {
          serviceId = transData[0].service_id;
        }
      }

      if (!serviceId) {
        return null;
      }

      const { data, error } = await supabase
        .from("services")
        .select(
          `
          id,
          icon,
          hero_image_url,
          status,
          is_featured,
          featured_order,
          sort_order,
          created_at,
          service_translations (
            service_id,
            language_code,
            slug,
            name,
            description,
            applications
          ),
          service_images (
            id,
            service_id,
            image_url,
            sort_order
          ),
          service_faqs (
            id,
            service_id,
            sort_order,
            service_faq_translations (
              language_code,
              question,
              answer
            )
          )
        `
        )
        .eq("id", serviceId)
        .eq("status", "published")
        .is("deleted_at", null)
        .single();

      if (error || !data) {
        console.warn("[SupabaseServiceRepository] Service not found for slug:", slug, error?.message);
        return null;
      }

      return ServiceMapper.toEntity(data as ServiceRowDto, language);
    } catch (err) {
      console.error("[SupabaseServiceRepository] Exception in getServiceBySlug:", err);
      return null;
    }
  }

  async getRelatedServices(
    currentServiceId: string,
    language: string,
    limit: number = 3
  ): Promise<ServiceEntity[]> {
    const supabase = this.getSupabase();

    try {
      const { data, error } = await supabase
        .from("services")
        .select(
          `
          id,
          icon,
          hero_image_url,
          status,
          is_featured,
          featured_order,
          sort_order,
          created_at,
          service_translations (
            service_id,
            language_code,
            slug,
            name,
            description,
            applications
          )
        `
        )
        .eq("status", "published")
        .is("deleted_at", null)
        .neq("id", currentServiceId)
        .order("sort_order", { ascending: true })
        .limit(limit);

      if (error || !data) {
        return [];
      }

      return (data as ServiceRowDto[]).map((row) => ServiceMapper.toEntity(row, language));
    } catch (err) {
      console.error("[SupabaseServiceRepository] Exception in getRelatedServices:", err);
      return [];
    }
  }
}
