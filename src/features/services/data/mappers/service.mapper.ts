import { ServiceEntity, ServiceImageEntity, ServiceFaqEntity } from "../../domain/entities/service.entity";
import { ServiceRowDto } from "../dto/service.dto";

export class ServiceMapper {
  static toEntity(row: ServiceRowDto, locale: string): ServiceEntity {
    const langCode = locale === "ckb" ? "ku" : locale;

    const translations = row.service_translations || [];
    const translation =
      translations.find((t) => t.language_code === langCode) ||
      translations.find((t) => t.language_code === "en") ||
      translations[0] || {
        slug: row.id,
        name: "",
        description: "",
        applications: null,
      };

    const images: ServiceImageEntity[] = (row.service_images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => ({
        id: img.id,
        imageUrl: img.image_url,
        sortOrder: img.sort_order,
      }));

    const faqs: ServiceFaqEntity[] = (row.service_faqs || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((faq) => {
        const faqTrans = faq.service_faq_translations || [];
        const t =
          faqTrans.find((ft) => ft.language_code === langCode) ||
          faqTrans.find((ft) => ft.language_code === "en") ||
          faqTrans[0] || { question: "", answer: "" };

        return {
          id: faq.id,
          question: t.question || "",
          answer: t.answer || "",
          sortOrder: faq.sort_order,
        };
      })
      .filter((f) => f.question.trim().length > 0);

    return {
      id: row.id,
      icon: row.icon,
      heroImageUrl: row.hero_image_url,
      status: row.status,
      isFeatured: row.is_featured,
      featuredOrder: row.featured_order,
      sortOrder: row.sort_order,
      slug: translation.slug || row.id,
      name: translation.name || "Industrial Service",
      description: translation.description || "",
      applications: translation.applications || null,
      images,
      faqs,
      createdAt: row.created_at,
    };
  }
}
