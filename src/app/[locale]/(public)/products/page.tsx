import { setRequestLocale } from "next-intl/server";
import { ProductsView } from "@features/products/presentation/views/ProductsView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsView />;
}
