import { IHomeRepository } from "../../domain/repositories/i-home.repository";
import { HomePageEntity } from "../../domain/entities/home.entity";
import { HomeMapper } from "../mappers/home.mapper";
import { HomePageRawDto, LanguageRow } from "../dto/home.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseHomeRepository implements IHomeRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  async getHomePageData(locale: string): Promise<HomePageEntity> {
    const supabase = this.getSupabase();

    try {
      // 1. Fetch active languages via RPC function with fallback to direct table query
      let languagesData: LanguageRow[] = [];
      try {
        const { data: rpcLangs, error: rpcErr } = await supabase.rpc("get_active_languages");
        if (!rpcErr && Array.isArray(rpcLangs) && rpcLangs.length > 0) {
          languagesData = rpcLangs as LanguageRow[];
        } else {
          const { data: tableLangs } = await supabase
            .from("languages")
            .select("code, name, native_name, is_rtl, is_required, is_default, is_active, sort_order")
            .eq("is_active", true)
            .order("sort_order", { ascending: true });
          languagesData = (tableLangs || []) as LanguageRow[];
        }
      } catch (err) {
        console.warn("[SupabaseHomeRepository] Failed to fetch languages via RPC:", err);
      }

      // 2. Fetch all other homepage data in parallel
      const [
        sectionsRes,
        settingsRes,
        servicesRes,
        serviceTrRes,
        projectsRes,
        projectTrRes,
        projectImgRes,
        clientsRes,
        clientTrRes,
        certificationsRes,
        certificationTrRes,
        companyProfileTrRes,
      ] = await Promise.all([
        supabase
          .from("homepage_sections")
          .select("id, section_key, is_visible, sort_order, settings")
          .eq("is_visible", true)
          .order("sort_order", { ascending: true }),

        supabase.from("settings").select("key, value, category, value_type, description"),

        supabase
          .from("services")
          .select("id, icon, hero_image_url, status, is_featured, featured_order, sort_order")
          .eq("status", "published")
          .is("deleted_at", null)
          .order("is_featured", { ascending: false })
          .order("featured_order", { ascending: true })
          .order("sort_order", { ascending: true })
          .limit(6),

        supabase
          .from("service_translations")
          .select("service_id, language_code, slug, name, description, applications"),

        supabase
          .from("projects")
          .select(
            "id, category_id, client_name, location, completion_date, status, is_featured, featured_order, sort_order"
          )
          .eq("status", "published")
          .is("deleted_at", null)
          .order("is_featured", { ascending: false })
          .order("featured_order", { ascending: true })
          .order("sort_order", { ascending: true })
          .limit(4),

        supabase
          .from("project_translations")
          .select("project_id, language_code, slug, title, description, challenge, solution"),

        supabase
          .from("project_images")
          .select("id, project_id, image_url, sort_order")
          .order("sort_order", { ascending: true }),

        supabase
          .from("clients")
          .select("id, logo_url, website_url, sort_order, status")
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order", { ascending: true })
          .limit(12),

        supabase.from("client_translations").select("client_id, language_code, name"),

        supabase
          .from("certifications")
          .select("id, image_url, issued_by, issued_date, sort_order, status")
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order", { ascending: true })
          .limit(6),

        supabase
          .from("certification_translations")
          .select("certification_id, language_code, title, description"),

        supabase
          .from("company_profile_translations")
          .select("company_profile_id, language_code, history, mission, vision"),
      ]);

      const rawDto: HomePageRawDto = {
        sections: sectionsRes.data || [],
        settings: settingsRes.data || [],
        languages: languagesData,
        services: servicesRes.data || [],
        serviceTranslations: serviceTrRes.data || [],
        projects: projectsRes.data || [],
        projectTranslations: projectTrRes.data || [],
        projectImages: projectImgRes.data || [],
        clients: clientsRes.data || [],
        clientTranslations: clientTrRes.data || [],
        certifications: certificationsRes.data || [],
        certificationTranslations: certificationTrRes.data || [],
        companyProfileTranslations: companyProfileTrRes.data || [],
      };

      return HomeMapper.toEntity(rawDto, locale);
    } catch (error) {
      console.error("[SupabaseHomeRepository] Error fetching home data:", error);
      const emptyDto: HomePageRawDto = {
        sections: [],
        settings: [],
        languages: [],
        services: [],
        serviceTranslations: [],
        projects: [],
        projectTranslations: [],
        projectImages: [],
        clients: [],
        clientTranslations: [],
        certifications: [],
        certificationTranslations: [],
        companyProfileTranslations: [],
      };
      return HomeMapper.toEntity(emptyDto, locale);
    }
  }
}
