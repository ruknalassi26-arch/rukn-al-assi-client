import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseProductRepository } from "@features/products/data/repositories/supabase-product.repository";
import { GetProductsUseCase } from "@features/products/domain/usecases/get-products.usecase";
import { GetProductCategoriesUseCase } from "@features/products/domain/usecases/get-product-categories.usecase";
import { SupabaseHomeRepository } from "@features/home/data/repositories/supabase-home.repository";
import { GetHomePageUseCase } from "@features/home/domain/usecases/get-home-page.usecase";
import { ProductsView } from "@features/products/presentation/views/ProductsView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    pageSize?: string;
  }>;
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { page, search, category, pageSize } = await searchParams;

  setRequestLocale(locale);

  const currentPage = page ? parseInt(page, 10) || 1 : 1;
  const currentPageSize = pageSize ? parseInt(pageSize, 10) || 12 : 12;
  const currentSearch = search || "";
  const currentCategory = category || "";

  const productRepo = new SupabaseProductRepository();
  const getProductsUseCase = new GetProductsUseCase(productRepo);
  const getCategoriesUseCase = new GetProductCategoriesUseCase(productRepo);

  const homeRepo = new SupabaseHomeRepository();
  const getHomePageUseCase = new GetHomePageUseCase(homeRepo);

  const [productsData, categories, homeData] = await Promise.all([
    getProductsUseCase.execute({
      page: currentPage,
      pageSize: currentPageSize,
      search: currentSearch,
      categoryId: currentCategory,
      language: locale,
    }),
    getCategoriesUseCase.execute(locale),
    getHomePageUseCase.execute(locale),
  ]);

  return (
    <ProductsView
      productsData={productsData}
      categories={categories}
      clients={homeData.clients || []}
    />
  );
}
