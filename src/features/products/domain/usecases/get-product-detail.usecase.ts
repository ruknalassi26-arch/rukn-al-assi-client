import { IProductRepository, GetProductBySlugParams } from "../repositories/i-product.repository";
import { ProductDetailEntity } from "../entities/product-detail.entity";

export class GetProductDetailUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(params: GetProductBySlugParams): Promise<ProductDetailEntity | null> {
    return this.repository.getProductBySlug(params);
  }
}
