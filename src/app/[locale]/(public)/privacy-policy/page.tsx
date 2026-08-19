import { setRequestLocale } from "next-intl/server";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { PageBanner } from "@shared/components/layouts/PageBanner";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <PageBanner
        title="Privacy Policy"
        subtitle="Our commitment to safeguarding your privacy and data."
        breadcrumbItems={[{ label: "Privacy Policy" }]}
      />
      <Section>
        <Container>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm space-y-4">
            <p>Rukn Al Assi is committed to protecting your privacy...</p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
