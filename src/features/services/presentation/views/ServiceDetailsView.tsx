"use client";

import { useServiceDetails } from "../queries/services.queries";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { Button } from "@shared/components/ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";

export function ServiceDetailsView({ id }: { id: string }) {
  const { data: service, isLoading } = useServiceDetails(id);
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  const title = service
    ? isAr
      ? service.titleAr
      : service.titleEn
    : isAr
      ? "تفاصيل الخدمة"
      : "Service Details";

  return (
    <main>
      <PageBanner
        title={title}
        subtitle={
          service
            ? isAr
              ? service.descriptionAr
              : service.descriptionEn
            : "Detailed specification and breakdown of service offerings."
        }
        breadcrumbItems={[
          { label: isAr ? "الخدمات" : "Services", href: "/services" },
          { label: title },
        ]}
      />
      <Section>
        <Container className="space-y-6">
          <div className="p-8 border rounded-2xl bg-card space-y-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {service
                ? isAr
                  ? service.descriptionAr
                  : service.descriptionEn
                : "Service specifications."}
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/rfq">{isAr ? "طلب عرض سعر لهذه الخدمة" : "Request Quote for this Service"}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
