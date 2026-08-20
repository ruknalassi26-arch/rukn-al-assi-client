import { IProjectRepository, GetProjectsParams } from "../../domain/repositories/i-project.repository";
import { ProjectEntity, PaginatedProjectsEntity, ProjectCategoryEntity, ProjectClientEntity } from "../../domain/entities/project.entity";
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
      // 1. Parallel fetch using public.get_public_projects RPC, categories, and clients
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

  async getProjectBySlug(slug: string, language: string): Promise<ProjectEntity | null> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;
    const cleanSlug = decodeURIComponent(slug).trim();

    try {
      // Use get_public_projects with search parameter to find matching project by slug or ID
      const { data, error } = await supabase.rpc("get_public_projects", {
        p_language_code: langCode,
        p_page: 1,
        p_page_size: 1,
        p_search: cleanSlug,
        p_category_id: null,
      });

      if (error || !data) {
        console.warn("[SupabaseProjectRepository] Project not found for slug:", slug, error?.message);
        return null;
      }

      const rpcData = data as RpcProjectsResponse;
      const item = rpcData.items?.find((p) => p.slug === cleanSlug || p.id === cleanSlug) || rpcData.items?.[0];

      if (!item) return null;

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
    } catch (err) {
      console.error("[SupabaseProjectRepository] Exception in getProjectBySlug:", err);
      return null;
    }
  }

  async getRelatedProjects(
    currentProjectId: string,
    categoryId: string | null,
    language: string,
    limit: number = 3
  ): Promise<ProjectEntity[]> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_projects", {
        p_language_code: langCode,
        p_page: 1,
        p_page_size: limit + 1,
        p_search: null,
        p_category_id: categoryId || null,
      });

      if (error || !data) return [];

      const rpcData = data as RpcProjectsResponse;
      return (rpcData.items || [])
        .filter((item) => item.id !== currentProjectId)
        .slice(0, limit)
        .map((item) => {
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
    } catch {
      return [];
    }
  }
}
