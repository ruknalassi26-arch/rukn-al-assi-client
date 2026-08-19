import { setRequestLocale } from "next-intl/server";
import { ContactView } from "@features/contact/presentation/views/ContactView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactView />;
}
