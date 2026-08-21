import { PaginatedProductsEntity, ProductCategoryEntity } from "../entities/product.entity";
import { ProductDetailEntity } from "../entities/product-detail.entity";

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  language?: string;
}

export interface GetProductBySlugParams {
  slug: string;
  language?: string;
}

export interface IProductRepository {
  getProducts(params: GetProductsParams): Promise<PaginatedProductsEntity>;
  getProductBySlug(params: GetProductBySlugParams): Promise<ProductDetailEntity | null>;
  getCategories(language?: string): Promise<ProductCategoryEntity[]>;
}
