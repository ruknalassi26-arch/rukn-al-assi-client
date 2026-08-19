import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
  getProducts(category?: string): Promise<ProductEntity[]>;
  getProductDetails(idOrSlug: string): Promise<ProductEntity | null>;
  searchProducts(query: string): Promise<ProductEntity[]>;
}
