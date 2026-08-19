import { setRequestLocale } from "next-intl/server";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { PageBanner } from "@shared/components/layouts/PageBanner";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <PageBanner
        title="Terms & Conditions"
        subtitle="Terms governing the use of the Rukn Al Assi corporate website."
        breadcrumbItems={[{ label: "Terms of Service" }]}
      />
      <Section>
        <Container>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm space-y-4">
            <p>Welcome to Rukn Al Assi. By accessing or using our services...</p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
