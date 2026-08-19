import { IProductRepository } from "../../domain/repositories/i-product.repository";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductMapper } from "../mappers/product.mapper";
import { createClient } from "@core/lib/supabase/client";

export class ProductRepository implements IProductRepository {
  private supabase = createClient();

  async getProducts(category?: string): Promise<ProductEntity[]> {
    let query = this.supabase
      .from("products")
      .select("id, category_id, sku, status, is_featured, sort_order")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    if (category) {
      query = query.eq("category_id", category);
    }

    const { data: products } = await query;
    const { data: translations } = await this.supabase
      .from("product_translations")
      .select("product_id, language_code, slug, name, short_description");

    if (!products || products.length === 0) return [];

    return products.map((prod) => {
      const trEn = translations?.find((t) => t.product_id === prod.id && t.language_code === "en");
      const trAr = translations?.find((t) => t.product_id === prod.id && t.language_code === "ar");

      return ProductMapper.toEntity({
        id: prod.id,
        slug: trEn?.slug || trAr?.slug || prod.id,
        name_en: trEn?.name || "",
        name_ar: trAr?.name || "",
        category: prod.category_id || "GENERAL",
        description_en: trEn?.short_description || "",
        description_ar: trAr?.short_description || "",
        sku: prod.sku || "",
        is_featured: prod.is_featured || false,
      });
    });
  }

  async getProductDetails(idOrSlug: string): Promise<ProductEntity | null> {
    const { data: translation } = await this.supabase
      .from("product_translations")
      .select("product_id, language_code, slug, name, short_description")
      .or(`slug.eq.${idOrSlug},product_id.eq.${idOrSlug}`)
      .limit(1)
      .maybeSingle();

    const productId = translation?.product_id || idOrSlug;

    const { data: product } = await this.supabase
      .from("products")
      .select("id, category_id, sku, status, is_featured")
      .eq("id", productId)
      .maybeSingle();

    if (!product) return null;

    const { data: allTranslations } = await this.supabase
      .from("product_translations")
      .select("product_id, language_code, slug, name, short_description")
      .eq("product_id", product.id);

    const trEn = allTranslations?.find((t) => t.language_code === "en");
    const trAr = allTranslations?.find((t) => t.language_code === "ar");

    return ProductMapper.toEntity({
      id: product.id,
      slug: trEn?.slug || trAr?.slug || product.id,
      name_en: trEn?.name || "",
      name_ar: trAr?.name || "",
      category: product.category_id || "GENERAL",
      description_en: trEn?.short_description || "",
      description_ar: trAr?.short_description || "",
      sku: product.sku || "",
      is_featured: product.is_featured || false,
    });
  }

  async searchProducts(query: string): Promise<ProductEntity[]> {
    const q = query.toLowerCase();
    const all = await this.getProducts();
    return all.filter(
      (p) =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.descriptionEn.toLowerCase().includes(q)
    );
  }
}
