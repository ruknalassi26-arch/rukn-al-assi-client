"use client";

import { useGallery } from "../hooks/useGallery";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { useLocale } from "next-intl";
import { Image as ImageIcon } from "lucide-react";

export function GalleryView() {
  const { items, isLoading } = useGallery();
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <PageBanner
        title={isAr ? "معرض الصور والمشاريع" : "Photo & Project Gallery"}
        subtitle={
          isAr
            ? "لقطات وثائقية لعمليات التنفيذ الميدانية والمعدات الصناعية والمباني المكتملة."
            : "Visual highlights of our site operations, completed structures, and team work."
        }
        breadcrumbItems={[{ label: isAr ? "معرض الصور" : "Gallery" }]}
      />
      <Section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 border rounded-2xl bg-card shadow-xs space-y-4"
            >
              <div className="h-48 w-full bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                <ImageIcon className="size-12" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  {item.category}
                </span>
                <h3 className="font-bold text-lg text-foreground">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </main>
  );
}
