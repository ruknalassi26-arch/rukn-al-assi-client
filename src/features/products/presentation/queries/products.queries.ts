import { useQuery } from "@tanstack/react-query";
import { ProductRepository } from "../../data/repositories/product.repository";
import { GetProductsUseCase } from "../../domain/usecases/get-products.usecase";
import { GetProductDetailsUseCase } from "../../domain/usecases/get-product-details.usecase";
import { SearchProductsUseCase } from "../../domain/usecases/search-products.usecase";

const productRepository = new ProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);
const getProductDetailsUseCase = new GetProductDetailsUseCase(productRepository);
const searchProductsUseCase = new SearchProductsUseCase(productRepository);

export const productsQueryKeys = {
  all: ["products"] as const,
  lists: (category?: string) => [...productsQueryKeys.all, "list", category] as const,
  detail: (id: string) => [...productsQueryKeys.all, "detail", id] as const,
  search: (query: string) => [...productsQueryKeys.all, "search", query] as const,
};

export function useProductsList(category?: string) {
  return useQuery({
    queryKey: productsQueryKeys.lists(category),
    queryFn: () => getProductsUseCase.execute(category),
  });
}

export function useProductDetails(idOrSlug: string) {
  return useQuery({
    queryKey: productsQueryKeys.detail(idOrSlug),
    queryFn: () => getProductDetailsUseCase.execute(idOrSlug),
    enabled: !!idOrSlug,
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: productsQueryKeys.search(query),
    queryFn: () => searchProductsUseCase.execute(query),
    enabled: !!query,
  });
}
