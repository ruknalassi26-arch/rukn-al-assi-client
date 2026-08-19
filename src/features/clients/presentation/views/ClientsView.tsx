"use client";

import { useClients } from "../hooks/useClients";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { useLocale } from "next-intl";
import { Building } from "lucide-react";

export function ClientsView() {
  const { clients, isLoading } = useClients();
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <PageBanner
        title={isAr ? "شركاء النجاح والعملاء" : "Our Esteemed Clients"}
        subtitle={
          isAr
            ? "نفخر بثقة كبرى الجهات الحكومية والشركات الصناعية والخاصة بخدمات شركة ركن العاصي."
            : "Trusted by leading government entities, private enterprises, and industrial leaders."
        }
        breadcrumbItems={[{ label: isAr ? "العملاء" : "Clients" }]}
      />
      <Section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="p-6 border rounded-2xl bg-card shadow-xs flex items-center gap-4"
            >
              <div className="p-4 bg-primary/10 rounded-xl text-primary shrink-0">
                <Building className="size-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase">
                  {isAr ? client.sectorAr : client.sectorEn}
                </span>
                <h3 className="font-bold text-lg text-foreground">
                  {isAr ? client.nameAr : client.nameEn}
                </h3>
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </main>
  );
}
