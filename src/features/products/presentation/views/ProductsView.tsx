"use client";

import React from "react";
import {
  PaginatedProductsEntity,
  ProductCategoryEntity,
  ClientItemEntity,
} from "../../domain/entities/product.entity";
import { ProductsHeroSection } from "../components/ProductsHeroSection";
import { ProductsFilterBar } from "../components/ProductsFilterBar";
import { ProductsGrid } from "../components/ProductsGrid";
import { ProductsPagination } from "../components/ProductsPagination";
import { ProductsClientsSection } from "../components/ProductsClientsSection";
import { ProductsCtaSection } from "../components/ProductsCtaSection";

interface ProductsViewProps {
  productsData: PaginatedProductsEntity;
  categories: ProductCategoryEntity[];
  clients: ClientItemEntity[];
}

export function ProductsView({ productsData, categories, clients }: ProductsViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Hero */}
      <ProductsHeroSection />

      {/* 2. Filter Bar (Search + Categories) */}
      <ProductsFilterBar categories={categories} total={productsData.total} />

      {/* 3. Products Grid */}
      <ProductsGrid products={productsData.items} />

      {/* 4. Pagination */}
      <ProductsPagination page={productsData.page} totalPages={productsData.totalPages} />

      {/* 5. Trusted Clients */}
      <ProductsClientsSection clients={clients} />

      {/* 6. RFQ CTA */}
      <ProductsCtaSection />
    </div>
  );
}
