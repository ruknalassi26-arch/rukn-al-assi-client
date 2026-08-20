"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ProjectImageEntity } from "../../../domain/entities/project.entity";

interface ProjectDetailGalleryProps {
  images?: ProjectImageEntity[];
}

export function ProjectDetailGallery({ images }: ProjectDetailGalleryProps) {
  const t = useTranslations("Projects");

  if (!images || images.length <= 1) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted/20 border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Gallery"
          title={t("galleryTitle")}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={img.imageUrl}
                alt="Project photo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-106 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
