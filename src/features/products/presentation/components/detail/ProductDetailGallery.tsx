"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductImageEntity } from "../../../domain/entities/product-detail.entity";
import { Package, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailGalleryProps {
  images: ProductImageEntity[];
  productName: string;
}

export function ProductDetailGallery({ images, productName }: ProductDetailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-4/3 w-full rounded-3xl bg-slate-900 border border-border flex items-center justify-center text-slate-600">
        <Package className="size-20 opacity-30" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setLightboxOpen(true);
        }}
        className="group relative aspect-4/3 w-full rounded-3xl bg-slate-900 border border-border overflow-hidden cursor-pointer"
      >
        <Image
          src={activeImage.imageUrl}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center">
          <div className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Maximize2 className="size-5" />
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={img.id || index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative size-20 sm:size-24 rounded-2xl bg-slate-900 border-2 overflow-hidden shrink-0 transition-all ${
                  isActive
                    ? "border-primary ring-2 ring-primary/30 scale-105"
                    : "border-border/80 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.imageUrl}
                  alt={`${productName} thumb ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10">
            <h4 className="text-sm font-bold text-white truncate max-w-md">
              {productName} ({selectedIndex + 1} / {images.length})
            </h4>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-h-[80vh] max-w-5xl mx-auto flex items-center justify-center">
              <Image
                src={activeImage.imageUrl}
                alt={productName}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute start-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute end-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
