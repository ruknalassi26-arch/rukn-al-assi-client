import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SupabaseProductRepository } from "@features/products/data/repositories/supabase-product.repository";
import { GetProductDetailUseCase } from "@features/products/domain/usecases/get-product-detail.usecase";
import { SupabaseHomeRepository } from "@features/home/data/repositories/supabase-home.repository";
import { GetHomePageUseCase } from "@features/home/domain/usecases/get-home-page.usecase";
import { ProductDetailView } from "@features/products/presentation/views/ProductDetailView";

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const productRepo = new SupabaseProductRepository();
  const getProductDetailUseCase = new GetProductDetailUseCase(productRepo);

  const homeRepo = new SupabaseHomeRepository();
  const getHomePageUseCase = new GetHomePageUseCase(homeRepo);

  const [product, homeData] = await Promise.all([
    getProductDetailUseCase.execute({
      slug,
      language: locale,
    }),
    getHomePageUseCase.execute(locale),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} clients={homeData.clients || []} />;
}
