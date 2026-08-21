import { IProductRepository, GetProductsParams } from "../repositories/i-product.repository";
import { PaginatedProductsEntity } from "../entities/product.entity";

export class GetProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(params: GetProductsParams): Promise<PaginatedProductsEntity> {
    return this.repository.getProducts(params);
  }
}
