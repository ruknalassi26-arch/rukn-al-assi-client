import { setRequestLocale } from "next-intl/server";
import { ServiceDetailsView } from "@features/services/presentation/views/ServiceDetailsView";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ServiceDetailsView id={id} />;
}
