import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { GalleryView } from "@features/gallery/presentation/views/GalleryView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GalleryView />;
}
