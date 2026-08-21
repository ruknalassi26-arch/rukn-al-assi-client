"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { ProductListItemEntity } from "../../domain/entities/product.entity";
import { ProductCard } from "./ProductCard";
import { PackageSearch, RotateCcw } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface ProductsGridProps {
  products: ProductListItemEntity[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const t = useTranslations("Products");
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  if (!products || products.length === 0) {
    return (
      <section className="py-20 bg-background min-h-[380px] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center space-y-4 p-8 rounded-3xl bg-card border border-border shadow-xs">
            <div className="size-14 mx-auto rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
              <PackageSearch className="size-7 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {t("noProductsTitle")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("noProductsDesc")}
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              className="mt-2 h-10 px-5 gap-2 text-xs font-bold border-border"
            >
              <RotateCcw className="size-3.5" />
              <span>{t("clearFilters")}</span>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <Container>
        {/* Desktop: 3-4 cols, Tablet: 2 cols, Mobile: 1-2 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
