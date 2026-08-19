import { IProductRepository } from "../repositories/i-product.repository";
import { ProductEntity } from "../entities/product.entity";

export class GetProductDetailsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(idOrSlug: string): Promise<ProductEntity | null> {
    return this.productRepository.getProductDetails(idOrSlug);
  }
}
