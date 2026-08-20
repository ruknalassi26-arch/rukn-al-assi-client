import { IProjectRepository, GetProjectsParams } from "../../domain/repositories/i-project.repository";
import { ProjectEntity, PaginatedProjectsEntity, ProjectCategoryEntity, ProjectClientEntity } from "../../domain/entities/project.entity";
import { ProjectDetailResponse } from "../../domain/entities/project-detail.entity";
import { ProjectCategoryDto } from "../dto/project.dto";
import { createClient } from "@supabase/supabase-js";

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

interface RpcProjectItem {
  id: string;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  clientName: string | null;
  location: string | null;
  completionDate: string | null;
  isFeatured: boolean;
  featuredOrder: number | null;
  title: string;
  slug: string;
  description: string | null;
  challenge: string | null;
  solution: string | null;
  images: Array<{
    id: string;
    imageUrl: string;
    mimeType: string | null;
    sortOrder: number;
  }>;
  createdAt: string;
}

interface RpcProjectsResponse {
  items: RpcProjectItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  language: string;
}

interface RpcDetailResult {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    challenge: string | null;
    solution: string | null;
    clientName: string | null;
    location: string | null;
    completionDate: string | null;
    isFeatured: boolean;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  images: Array<{
    id: string;
    imageUrl: string;
    mimeType: string | null;
    sortOrder: number;
  }>;
  relatedProjects: Array<{
    id: string;
    title: string;
    slug: string;
    image: string | null;
    category: string | null;
    location: string | null;
  }>;
}

export class SupabaseProjectRepository implements IProjectRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getCategories(language: string): Promise<ProjectCategoryEntity[]> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase
        .from("project_categories")
        .select(`
          id,
          status,
          project_category_translations (
            language_code,
            slug,
            name
          )
        `)
        .eq("status", "published")
        .is("deleted_at", null);

      if (error || !data) return [];

      return (data as unknown as ProjectCategoryDto[]).map((cat) => {
        const trans =
          (cat.project_category_translations || []).find((t) => t.language_code === langCode) ||
          (cat.project_category_translations || []).find((t) => t.language_code === "en") ||
          (cat.project_category_translations || [])[0];

        return {
          id: cat.id,
          slug: trans?.slug || cat.id,
          name: trans?.name || "Industrial Projects",
        };
      });
    } catch {
      return [];
    }
  }

  async getProjects({
    page = 1,
    pageSize = 12,
    search = "",
    category = "",
    language = "en",
  }: GetProjectsParams): Promise<PaginatedProjectsEntity> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const [rpcRes, categories, clientsRes] = await Promise.all([
        supabase.rpc("get_public_projects", {
          p_language_code: langCode,
          p_page: page,
          p_page_size: pageSize,
          p_search: search && search.trim() ? search.trim() : null,
          p_category_id: category && category !== "all" ? category : null,
        }),
        this.getCategories(language),
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

      if (rpcRes.error) {
        console.error("[SupabaseProjectRepository] Error in get_public_projects RPC:", rpcRes.error.message);
        return { items: [], categories: [], clients: [], total: 0, page, pageSize, totalPages: 0 };
      }

      const rpcData = rpcRes.data as RpcProjectsResponse;
      const rawItems = rpcData?.items || [];

      const items: ProjectEntity[] = rawItems.map((item) => {
        const sortedImages = (item.images || []).sort((a, b) => a.sortOrder - b.sortOrder);
        const coverImage = sortedImages.length > 0 ? sortedImages[0].imageUrl : "";

        return {
          id: item.id,
          categoryId: item.categoryId,
          categoryName: item.category?.name || null,
          categorySlug: item.category?.slug || null,
          clientName: item.clientName,
          location: item.location,
          completionDate: item.completionDate,
          status: "published",
          isFeatured: item.isFeatured,
          featuredOrder: item.featuredOrder,
          sortOrder: item.featuredOrder || 0,
          slug: item.slug || item.id,
          title: item.title || "Industrial Project",
          description: item.description || "",
          challenge: item.challenge,
          solution: item.solution,
          images: sortedImages.map((img) => ({
            id: img.id,
            imageUrl: img.imageUrl,
            sortOrder: img.sortOrder,
          })),
          coverImage,
          createdAt: item.createdAt,
        };
      });

      const total = rpcData?.pagination?.total ?? items.length;
      const totalPages = rpcData?.pagination?.totalPages ?? Math.ceil(total / pageSize);

      const clients: ProjectClientEntity[] = (clientsRes.data || []).map((c: ClientRow) => {
        const trans =
          (c.client_translations || []).find((t: ClientTranslationRow) => t.language_code === langCode) ||
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
        categories,
        clients,
        total,
        page,
        pageSize,
        totalPages,
      };
    } catch (err) {
      console.error("[SupabaseProjectRepository] Exception in getProjects:", err);
      return { items: [], categories: [], clients: [], total: 0, page, pageSize, totalPages: 0 };
    }
  }

  async getProjectDetailBySlug(slug: string, language: string): Promise<ProjectDetailResponse | null> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;
    const cleanSlug = decodeURIComponent(slug).trim();

    try {
      const [rpcRes, clientsRes] = await Promise.all([
        supabase.rpc("get_public_project_by_slug", {
          p_language_code: langCode,
          p_slug: cleanSlug,
        }),
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

      if (rpcRes.error || !rpcRes.data) {
        console.warn("[SupabaseProjectRepository] Error fetching project detail:", slug, rpcRes.error?.message);
        return null;
      }

      const raw = rpcRes.data as RpcDetailResult;
      if (!raw.project || !raw.project.id) {
        return null;
      }

      const clients: ProjectClientEntity[] = (clientsRes.data || []).map((c: ClientRow) => {
        const trans =
          (c.client_translations || []).find((t: ClientTranslationRow) => t.language_code === langCode) ||
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
        project: {
          id: raw.project.id,
          title: raw.project.title || "Engineering Project",
          slug: raw.project.slug || raw.project.id,
          description: raw.project.description || null,
          challenge: raw.project.challenge || null,
          solution: raw.project.solution || null,
          clientName: raw.project.clientName || null,
          location: raw.project.location || null,
          completionDate: raw.project.completionDate || null,
          isFeatured: raw.project.isFeatured || false,
        },
        category: raw.category
          ? {
              id: raw.category.id,
              name: raw.category.name,
              slug: raw.category.slug,
            }
          : null,
        images: (raw.images || []).map((img) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          sortOrder: img.sortOrder,
        })),
        relatedProjects: (raw.relatedProjects || []).map((rp) => ({
          id: rp.id,
          title: rp.title,
          slug: rp.slug,
          image: rp.image || null,
          category: rp.category || null,
          location: rp.location || null,
        })),
        clients,
      };
    } catch (err) {
      console.error("[SupabaseProjectRepository] Exception in getProjectDetailBySlug:", err);
      return null;
    }
  }

  async getProjectBySlug(slug: string, language: string): Promise<ProjectEntity | null> {
    const detail = await this.getProjectDetailBySlug(slug, language);
    if (!detail) return null;

    const coverImage = detail.images.length > 0 ? detail.images[0].imageUrl : "";

    return {
      id: detail.project.id,
      categoryId: detail.category?.id || null,
      categoryName: detail.category?.name || null,
      categorySlug: detail.category?.slug || null,
      clientName: detail.project.clientName,
      location: detail.project.location,
      completionDate: detail.project.completionDate,
      status: "published",
      isFeatured: detail.project.isFeatured,
      featuredOrder: 0,
      sortOrder: 0,
      slug: detail.project.slug,
      title: detail.project.title,
      description: detail.project.description || "",
      challenge: detail.project.challenge,
      solution: detail.project.solution,
      images: detail.images,
      coverImage,
      createdAt: new Date().toISOString(),
    };
  }

  async getRelatedProjects(
    currentProjectId: string,
    categoryId: string | null,
    language: string,
    limit: number = 3
  ): Promise<ProjectEntity[]> {
    const projects = await this.getProjects({ page: 1, pageSize: limit + 1, language });
    return projects.items.filter((p) => p.id !== currentProjectId).slice(0, limit);
  }
}
