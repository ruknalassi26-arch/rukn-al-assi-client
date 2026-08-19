import { setRequestLocale } from "next-intl/server";
import { RfqView } from "@features/rfq/presentation/views/RfqView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function RfqPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RfqView />;
}
