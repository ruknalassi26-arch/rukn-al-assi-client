import { setRequestLocale } from "next-intl/server";
import { GalleryView } from "@features/gallery/presentation/views/GalleryView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GalleryView />;
}
