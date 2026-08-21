"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { RelatedProductItemEntity } from "../../../domain/entities/product-detail.entity";
import { ArrowRight, ArrowLeft, Package, Sparkles } from "lucide-react";

interface ProductDetailRelatedProps {
  relatedProducts: RelatedProductItemEntity[];
}

export function ProductDetailRelated({ relatedProducts }: ProductDetailRelatedProps) {
  const t = useTranslations("Products");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30 border-t border-border">
      <Container>
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {t("relatedProducts")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.slug}`}
                className="group rounded-3xl bg-card border border-border p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-900 overflow-hidden mb-3">
                    {product.primaryImage?.imageUrl ? (
                      <Image
                        src={product.primaryImage.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center text-slate-600">
                        <Package className="size-10 opacity-30" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {product.shortDescription}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary">
                  <span>{t("viewProduct")}</span>
                  <ArrowIcon className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
