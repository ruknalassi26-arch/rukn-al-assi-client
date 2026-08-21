import { IProductRepository } from "../repositories/i-product.repository";
import { ProductCategoryEntity } from "../entities/product.entity";

export class GetProductCategoriesUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(language?: string): Promise<ProductCategoryEntity[]> {
    return this.repository.getCategories(language);
  }
}
