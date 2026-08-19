import { setRequestLocale } from "next-intl/server";
import { ServicesView } from "@features/services/presentation/views/ServicesView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesView />;
}
