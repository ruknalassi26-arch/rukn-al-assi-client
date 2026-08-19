"use client";

import Link from "next/link";
import { useProducts } from "../hooks/useProducts";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { useLocale } from "next-intl";

export function ProductsView() {
  const { products, isLoading, searchQuery, setSearchQuery } = useProducts();
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <PageBanner
        title={isAr ? "دليل المنتجات والتوريدات" : "Products & Supplies Catalog"}
        subtitle={
          isAr
            ? "تصفح كتالوج المواد والمعدات الصناعية والإنشائية المعتمدة."
            : "Browse our comprehensive catalog of high-grade construction and industrial supply materials."
        }
        breadcrumbItems={[{ label: isAr ? "المنتجات" : "Products" }]}
      />
      <Section>
        <Container className="space-y-8">
          <div className="max-w-md">
            <Input
              placeholder={isAr ? "بحث عن منتج..." : "Search product..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-6 border rounded-2xl bg-card shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 bg-muted rounded-full">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-xl text-foreground">
                    {isAr ? product.nameAr : product.nameEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {isAr ? product.descriptionAr : product.descriptionEn}
                  </p>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/products/${product.slug}`}>
                      {isAr ? "تفاصيل المنتج" : "Product Details"}
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/rfq">{isAr ? "طلب تسعير" : "Get Quote"}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
