"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { ProductDetailEntity } from "../../domain/entities/product-detail.entity";
import { ClientItemEntity } from "../../domain/entities/product.entity";
import { ProductDetailGallery } from "../components/detail/ProductDetailGallery";
import { ProductDetailSpecs } from "../components/detail/ProductDetailSpecs";
import { ProductDetailRelated } from "../components/detail/ProductDetailRelated";
import { ProductsClientsSection } from "../components/ProductsClientsSection";
import { ProductsCtaSection } from "../components/ProductsCtaSection";
import { ChevronRight, ChevronLeft, Layers, Send, ArrowLeft, ArrowRight } from "lucide-react";

interface ProductDetailViewProps {
  product: ProductDetailEntity;
  clients?: ClientItemEntity[];
}

export function ProductDetailView({ product, clients = [] }: ProductDetailViewProps) {
  const t = useTranslations("Products");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Detail Header with Blueprint Grid Overlay */}
      <section className="relative w-full py-16 lg:py-20 overflow-hidden bg-slate-950 text-white border-b border-white/10">
        {/* Blueprint Grid Background */}
        <div
          className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-1 bg-radial-at-c from-slate-950/70 via-slate-950/90 to-slate-950 pointer-events-none" />

        <Container className="relative z-10">
          <div className="space-y-5 text-start">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium tracking-wide flex-wrap">
              <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">
                {tCommon("home")}
              </Link>
              <Chevron className="size-3.5 opacity-60" />
              <Link href={`/${locale}/products`} className="hover:text-amber-400 transition-colors">
                {t("titleShort")}
              </Link>
              {product.category && (
                <>
                  <Chevron className="size-3.5 opacity-60" />
                  <span className="text-slate-300">{product.category.name}</span>
                </>
              )}
              <Chevron className="size-3.5 opacity-60" />
              <span className="text-amber-400 font-semibold truncate max-w-xs">{product.name}</span>
            </nav>

            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap pt-1">
              {product.category && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md shadow-xs">
                  <Layers className="size-3.5" />
                  <span>{product.category.name}</span>
                </div>
              )}
              {product.sku && (
                <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-300">
                  {t("sku")}: {product.sku}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {product.name}
            </h1>
          </div>
        </Container>
      </section>

      {/* Main Detail Section (Gallery on left, Info on right) */}
      <section className="py-12 lg:py-20 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Gallery Column */}
            <div className="lg:col-span-6 xl:col-span-7">
              <ProductDetailGallery images={product.images} productName={product.name} />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {product.name}
                </h2>

                {product.shortDescription && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              {/* RFQ Action */}
              <div className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md gap-2"
                >
                  <Link
                    href={`/${locale}/rfq?product=${encodeURIComponent(product.slug)}&name=${encodeURIComponent(product.name)}`}
                  >
                    <Send className="size-4" />
                    <span>{t("requestQuote")}</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full h-11 rounded-xl text-xs font-bold border-border gap-2"
                >
                  <Link href={`/${locale}/products`}>
                    <ArrowIcon className="size-3.5" />
                    <span>{t("backToProducts")}</span>
                  </Link>
                </Button>
              </div>

              {/* Technical Specifications */}
              <ProductDetailSpecs
                specifications={product.specifications}
                datasheetUrl={product.datasheetUrl}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      <ProductDetailRelated relatedProducts={product.relatedProducts} />

      {/* Trusted Clients */}
      {clients && clients.length > 0 && <ProductsClientsSection clients={clients} />}

      {/* Closing RFQ CTA */}
      <ProductsCtaSection />
    </div>
  );
}
