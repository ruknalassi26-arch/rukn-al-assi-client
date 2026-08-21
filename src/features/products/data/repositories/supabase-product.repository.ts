import {
  IProductRepository,
  GetProductsParams,
  GetProductBySlugParams,
} from "../../domain/repositories/i-product.repository";
import { PaginatedProductsEntity, ProductCategoryEntity } from "../../domain/entities/product.entity";
import { ProductDetailEntity } from "../../domain/entities/product-detail.entity";
import { ProductMapper } from "../mappers/product.mapper";
import {
  RpcProductsResponseDto,
  RpcProductDetailResponseDto,
  RpcProductCategoryDto,
} from "../dto/product.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseProductRepository implements IProductRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getProducts({
    page = 1,
    pageSize = 12,
    search = "",
    categoryId,
    language = "en",
  }: GetProductsParams): Promise<PaginatedProductsEntity> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_products", {
        p_language_code: langCode,
        p_page: page,
        p_page_size: pageSize,
        p_search: search && search.trim() ? search.trim() : null,
        p_category_id: categoryId && categoryId.trim() ? categoryId.trim() : null,
      });

      if (error || !data) {
        console.error("[SupabaseProductRepository] Error calling get_public_products:", error?.message);
        return { items: [], total: 0, page, pageSize, totalPages: 0 };
      }

      return ProductMapper.toPaginatedProductsEntity(data as RpcProductsResponseDto);
    } catch (err) {
      console.error("[SupabaseProductRepository] Exception in getProducts:", err);
      return { items: [], total: 0, page, pageSize, totalPages: 0 };
    }
  }

  async getProductBySlug({
    slug,
    language = "en",
  }: GetProductBySlugParams): Promise<ProductDetailEntity | null> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_product_by_slug", {
        p_language_code: langCode,
        p_slug: slug,
      });

      if (error || !data) {
        console.error("[SupabaseProductRepository] Error calling get_public_product_by_slug:", error?.message);
        return null;
      }

      return ProductMapper.toProductDetailEntity(data as RpcProductDetailResponseDto);
    } catch (err) {
      console.error("[SupabaseProductRepository] Exception in getProductBySlug:", err);
      return null;
    }
  }

  async getCategories(language: string = "en"): Promise<ProductCategoryEntity[]> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_product_categories", {
        p_language_code: langCode,
      });

      if (error || !data || !Array.isArray(data)) {
        console.error("[SupabaseProductRepository] Error calling get_public_product_categories:", error?.message);
        return [];
      }

      return (data as RpcProductCategoryDto[]).map((cat) => ProductMapper.toCategoryEntity(cat));
    } catch (err) {
      console.error("[SupabaseProductRepository] Exception in getCategories:", err);
      return [];
    }
  }
}
