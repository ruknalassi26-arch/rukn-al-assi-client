import { setRequestLocale } from "next-intl/server";
import { CertificatesView } from "@features/certificates/presentation/views/CertificatesView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CertificatesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CertificatesView />;
}
