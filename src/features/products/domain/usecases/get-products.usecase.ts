import { IProductRepository } from "../repositories/i-product.repository";
import { ProductEntity } from "../entities/product.entity";

export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(category?: string): Promise<ProductEntity[]> {
    return this.productRepository.getProducts(category);
  }
}
