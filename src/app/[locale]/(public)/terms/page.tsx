import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { Container } from "@shared/components/layouts/Container";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 bg-background min-h-screen">
      <Container className="max-w-4xl space-y-6">
        <h1 className="text-3xl font-black text-foreground">Terms of Service</h1>
        <p className="text-muted-foreground leading-relaxed">
          Terms and conditions for utilizing Rukn Al Assi engineering services and site access.
        </p>
      </Container>
    </div>
  );
}
