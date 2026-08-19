import { setRequestLocale } from "next-intl/server";
import { ClientsView } from "@features/clients/presentation/views/ClientsView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ClientsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ClientsView />;
}
