"use client";

import { useProductDetails } from "../queries/products.queries";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { Button } from "@shared/components/ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";

export function ProductDetailsView({ id }: { id: string }) {
  const { data: product, isLoading } = useProductDetails(id);
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  const name = product
    ? isAr
      ? product.nameAr
      : product.nameEn
    : isAr
      ? "تفاصيل المنتج"
      : "Product Details";

  return (
    <main>
      <PageBanner
        title={name}
        subtitle={product?.sku ? `SKU: ${product.sku}` : "Product Details"}
        breadcrumbItems={[
          { label: isAr ? "المنتجات" : "Products", href: "/products" },
          { label: name },
        ]}
      />
      <Section>
        <Container className="space-y-6">
          <div className="p-8 border rounded-2xl bg-card space-y-4">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product
                ? isAr
                  ? product.descriptionAr
                  : product.descriptionEn
                : "Product specifications placeholder."}
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/rfq">{isAr ? "طلب عرض سعر لهذا المنتج" : "Request Quote for Product"}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
