"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { ClientEntity } from "../../domain/entities/client.entity";
import { ClientCard } from "./ClientCard";
import { Building2, RotateCcw } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface ClientsGridProps {
  clients: ClientEntity[];
}

export function ClientsGrid({ clients }: ClientsGridProps) {
  const t = useTranslations("Clients");
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  if (!clients || clients.length === 0) {
    return (
      <section className="py-20 bg-background min-h-[380px] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center space-y-4 p-8 rounded-3xl bg-card border border-border shadow-xs">
            <div className="size-14 mx-auto rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
              <Building2 className="size-7 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {t("noResultsTitle")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("noResultsDesc")}
            </p>
            <Button
              onClick={handleReset}
              variant="outline"
              className="mt-2 h-10 px-5 gap-2 text-xs font-bold border-border"
            >
              <RotateCcw className="size-3.5" />
              <span>{t("clearSearch")}</span>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <Container>
        {/* Mobile: 2 cols, Tablet: 3 cols, Desktop: 4-5 cols */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </Container>
    </section>
  );
}
