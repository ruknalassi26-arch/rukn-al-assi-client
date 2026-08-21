"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ProductListItemEntity } from "../../domain/entities/product.entity";
import { ArrowRight, ArrowLeft, Layers, Package } from "lucide-react";

interface ProductCardProps {
  product: ProductListItemEntity;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("Products");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Frame */}
        <Link
          href={`/${locale}/products/${product.slug}`}
          className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden block"
        >
          {product.primaryImage?.imageUrl ? (
            <Image
              src={product.primaryImage.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="size-full flex items-center justify-center text-slate-600">
              <Package className="size-16 opacity-30" />
            </div>
          )}

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-3 start-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 border border-white/10 shadow-xs">
              <Layers className="size-3" />
              <span>{product.category.name}</span>
            </div>
          )}

          {/* SKU Badge if available */}
          {product.sku && (
            <div className="absolute top-3 end-3 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-mono font-bold text-slate-300 border border-white/15">
              {product.sku}
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="p-6 space-y-3">
          <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            <Link href={`/${locale}/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {product.shortDescription && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
        <Link
          href={`/${locale}/products/${product.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary/80 transition-colors"
        >
          <span>{t("viewProduct")}</span>
          <ArrowIcon className="size-3.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
