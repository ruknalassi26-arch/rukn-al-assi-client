import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 bg-background min-h-screen">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Media & Gallery"
          title="Project & Facility Gallery"
          align="center"
        />
        <p className="text-center text-muted-foreground max-w-xl mx-auto">
          Explore photographs from our active job sites, heavy equipment operations, and completed projects.
        </p>
      </Container>
    </div>
  );
}
