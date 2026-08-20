import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { Container } from "@shared/components/layouts/Container";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 bg-background min-h-screen">
      <Container className="max-w-4xl space-y-6">
        <h1 className="text-3xl font-black text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground leading-relaxed">
          Rukn Al Assi is committed to protecting your privacy and personal data.
        </p>
      </Container>
    </div>
  );
}
