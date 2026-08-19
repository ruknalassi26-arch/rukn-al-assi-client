import { IProjectRepository } from "../../domain/repositories/i-project.repository";
import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectMapper } from "../mappers/project.mapper";
import { createClient } from "@core/lib/supabase/client";

export class ProjectRepository implements IProjectRepository {
  private supabase = createClient();

  async getProjects(category?: string): Promise<ProjectEntity[]> {
    let query = this.supabase
      .from("projects")
      .select("id, category_id, client_name, location, completion_date, status, is_featured, featured_order, sort_order")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    if (category) {
      query = query.eq("category_id", category);
    }

    const { data: projects } = await query;
    const { data: translations } = await this.supabase
      .from("project_translations")
      .select("project_id, language_code, slug, title, description");

    if (!projects || projects.length === 0) return [];

    return projects.map((prj) => {
      const trEn = translations?.find((t) => t.project_id === prj.id && t.language_code === "en");
      const trAr = translations?.find((t) => t.project_id === prj.id && t.language_code === "ar");
      const compYear = prj.completion_date ? new Date(prj.completion_date).getFullYear() : 2024;

      return ProjectMapper.toEntity({
        id: prj.id,
        slug: trEn?.slug || trAr?.slug || prj.id,
        title_en: trEn?.title || "",
        title_ar: trAr?.title || "",
        client_name_en: prj.client_name || "",
        client_name_ar: prj.client_name || "",
        category: prj.category_id || "GENERAL",
        location_en: prj.location || "",
        location_ar: prj.location || "",
        completion_year: isNaN(compYear) ? 2024 : compYear,
        description_en: trEn?.description || "",
        description_ar: trAr?.description || "",
      });
    });
  }

  async getProjectDetails(idOrSlug: string): Promise<ProjectEntity | null> {
    const { data: translation } = await this.supabase
      .from("project_translations")
      .select("project_id, language_code, slug, title, description")
      .or(`slug.eq.${idOrSlug},project_id.eq.${idOrSlug}`)
      .limit(1)
      .maybeSingle();

    const projectId = translation?.project_id || idOrSlug;

    const { data: project } = await this.supabase
      .from("projects")
      .select("id, category_id, client_name, location, completion_date, status")
      .eq("id", projectId)
      .maybeSingle();

    if (!project) return null;

    const { data: allTranslations } = await this.supabase
      .from("project_translations")
      .select("project_id, language_code, slug, title, description")
      .eq("project_id", project.id);

    const trEn = allTranslations?.find((t) => t.language_code === "en");
    const trAr = allTranslations?.find((t) => t.language_code === "ar");
    const compYear = project.completion_date ? new Date(project.completion_date).getFullYear() : 2024;

    return ProjectMapper.toEntity({
      id: project.id,
      slug: trEn?.slug || trAr?.slug || project.id,
      title_en: trEn?.title || "",
      title_ar: trAr?.title || "",
      client_name_en: project.client_name || "",
      client_name_ar: project.client_name || "",
      category: project.category_id || "GENERAL",
      location_en: project.location || "",
      location_ar: project.location || "",
      completion_year: isNaN(compYear) ? 2024 : compYear,
      description_en: trEn?.description || "",
      description_ar: trAr?.description || "",
    });
  }
}
