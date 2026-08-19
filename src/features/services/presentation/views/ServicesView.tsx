"use client";

import Link from "next/link";
import { useServices } from "../hooks/useServices";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { Button } from "@shared/components/ui/button";
import { useLocale } from "next-intl";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function ServicesView() {
  const { services, isLoading } = useServices();
  const locale = useLocale();
  const isAr = locale === "ar";
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <PageBanner
        title={isAr ? "خدماتنا" : "Our Services"}
        subtitle={
          isAr
            ? "استكشف خدماتنا الهندسية والمقاولات والتوريدات المتخصصة."
            : "Explore our comprehensive range of specialized engineering, construction, and general supply services."
        }
        breadcrumbItems={[{ label: isAr ? "الخدمات" : "Services" }]}
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-8 border rounded-2xl bg-card shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-foreground">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {isAr ? service.descriptionAr : service.descriptionEn}
                  </p>
                </div>
                <div className="pt-6">
                  <Button asChild variant="outline" size="sm" className="w-full gap-2">
                    <Link href={`/services/${service.slug}`}>
                      <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
                      <ArrowIcon className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
