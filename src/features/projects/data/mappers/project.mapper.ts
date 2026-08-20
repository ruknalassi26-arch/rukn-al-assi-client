import { ProjectEntity, ProjectImageEntity } from "../../domain/entities/project.entity";
import { ProjectRowDto, ProjectCategoryDto } from "../dto/project.dto";

export class ProjectMapper {
  static toEntity(row: ProjectRowDto, locale: string): ProjectEntity {
    const langCode = locale === "ckb" ? "ku" : locale;

    // 1. Resolve translation
    const translations = row.project_translations || [];
    const translation =
      translations.find((t) => t.language_code === langCode) ||
      translations.find((t) => t.language_code === "en") ||
      translations[0] || {
        slug: row.id,
        title: "Engineering Project",
        description: "",
        challenge: null,
        solution: null,
      };

    // 2. Resolve category (handle either single object or array)
    let catObj: ProjectCategoryDto | undefined;
    if (Array.isArray(row.project_categories)) {
      catObj = row.project_categories[0];
    } else if (row.project_categories) {
      catObj = row.project_categories;
    }

    const catTranslations = catObj?.project_category_translations || [];
    const catTrans =
      catTranslations.find((ct) => ct.language_code === langCode) ||
      catTranslations.find((ct) => ct.language_code === "en") ||
      catTranslations[0];

    // 3. Resolve images directly from db
    const images: ProjectImageEntity[] = (row.project_images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => ({
        id: img.id,
        imageUrl: img.image_url,
        sortOrder: img.sort_order,
      }));

    const coverImage = images.length > 0 ? images[0].imageUrl : "";

    return {
      id: row.id,
      categoryId: row.category_id,
      categoryName: catTrans?.name || null,
      categorySlug: catTrans?.slug || null,
      clientName: row.client_name,
      location: row.location,
      completionDate: row.completion_date,
      status: row.status,
      isFeatured: row.is_featured,
      featuredOrder: row.featured_order,
      sortOrder: row.sort_order,
      slug: translation.slug || row.id,
      title: translation.title || "Industrial Project",
      description: translation.description || "",
      challenge: translation.challenge || null,
      solution: translation.solution || null,
      images,
      coverImage,
      createdAt: row.created_at,
    };
  }
}
