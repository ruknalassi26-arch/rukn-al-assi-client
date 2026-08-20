"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ProjectImageEntity } from "../../../domain/entities/project.entity";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";

interface ProjectDetailGalleryProps {
  images?: ProjectImageEntity[];
}

export function ProjectDetailGallery({ images }: ProjectDetailGalleryProps) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const validImages = (images || []).filter((img) => img.imageUrl && img.imageUrl.trim().length > 0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  // Handle Keyboard Navigation (Esc, Arrows) & Lock Scroll
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") {
        if (isRtl) showPrev();
        else showNext();
      }
      if (e.key === "ArrowLeft") {
        if (isRtl) showNext();
        else showPrev();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, isRtl, showNext, showPrev, closeLightbox]);

  if (!validImages || validImages.length === 0) return null;

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <>
      <section className="py-20 lg:py-28 bg-muted/20 border-b border-border">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Portfolio Showcase"
            title={t("galleryTitle")}
            description={
              locale === "ar"
                ? "انقر على أي صورة لتكبيرها واستعراضها بملء الشاشة مع تفاصيل المشروع."
                : locale === "ckb"
                ? "کلیک لەسەر هەر وێنەیەک بکە بۆ بینینی بە تەواوی شاشە."
                : "Click on any photograph to inspect construction details in high-resolution full-screen mode."
            }
            align="center"
          />

          {/* Construction-Standard Asymmetrical Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {validImages.map((img, idx) => {
              // Layout math: first image or every 5th image gets panoramic 8-col span
              const isPanoramic = idx === 0 || idx % 5 === 0;
              const colSpan = isPanoramic ? "md:col-span-8 aspect-16/10" : "md:col-span-4 aspect-4/3";

              return (
                <div
                  key={img.id || idx}
                  onClick={() => openLightbox(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openLightbox(idx);
                  }}
                  className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-border shadow-md hover:border-primary/60 hover:shadow-2xl transition-all duration-500 cursor-pointer ${colSpan}`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={`Project detail ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Top Bar Index Badge */}
                  <div className="absolute top-4 start-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 text-white text-xs font-mono font-bold tracking-wider backdrop-blur-md border border-white/15">
                      {String(idx + 1).padStart(2, "0")} / {String(validImages.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Center/Bottom Hover Action Badge */}
                  <div className="absolute bottom-4 end-4 flex items-center gap-2">
                    <div className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Maximize2 className="size-4" />
                    </div>
                  </div>

                  {/* Floating Caption on Hover */}
                  <div className="absolute bottom-4 start-4 end-16 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-semibold text-slate-200 truncate block">
                      {locale === "ar" ? "اضغط للتكبير بملء الشاشة" : locale === "ckb" ? "کلیک بکە بۆ تەواوی شاشە" : "Click to view full screen"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* HIGH-END CONSTRUCTION LIGHTBOX FULL-SCREEN MODAL                         */}
      {/* ========================================================================= */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between z-20 pb-2 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Camera className="size-4.5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white font-mono">
                  {currentIndex + 1} / {validImages.length}
                </span>
                <span className="text-xs text-slate-400 ms-2">
                  {locale === "ar" ? "معرض الصور عالي الدقة" : locale === "ckb" ? "وێنەی کوالێتی بەرز" : "High-Resolution Showcase"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeLightbox}
                className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close Fullscreen View"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Main Image & Floating Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Previous Button */}
            <button
              type="button"
              onClick={showPrev}
              className="absolute start-2 sm:start-6 z-30 size-12 sm:size-14 rounded-full bg-slate-900/80 hover:bg-primary text-white border border-white/15 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Previous image"
            >
              <PrevIcon className="size-6" />
            </button>

            {/* Current Active Image */}
            <div className="relative w-full h-full max-h-[75vh] max-w-6xl mx-auto flex items-center justify-center">
              <Image
                src={validImages[currentIndex].imageUrl}
                alt={`Full photo ${currentIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={showNext}
              className="absolute end-2 sm:end-6 z-30 size-12 sm:size-14 rounded-full bg-slate-900/80 hover:bg-primary text-white border border-white/15 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Next image"
            >
              <NextIcon className="size-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="z-20 pt-3 border-t border-white/10 flex items-center justify-center gap-3 overflow-x-auto py-2 scrollbar-none max-w-4xl mx-auto w-full">
            {validImages.map((img, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative size-14 sm:size-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                    isActive
                      ? "border-amber-400 ring-2 ring-amber-400/40 scale-105"
                      : "border-white/20 opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
