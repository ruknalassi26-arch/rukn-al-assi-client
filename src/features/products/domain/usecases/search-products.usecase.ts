import { IProductRepository } from "../repositories/i-product.repository";
import { ProductEntity } from "../entities/product.entity";

export class SearchProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(query: string): Promise<ProductEntity[]> {
    return this.productRepository.searchProducts(query);
  }
}
