import { setRequestLocale } from "next-intl/server";
import { ProductDetailsView } from "@features/products/presentation/views/ProductDetailsView";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ProductDetailsView id={id} />;
}
