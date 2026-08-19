"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ClientPreviewEntity } from "../../domain/entities/home.entity";

interface ClientsSectionProps {
  clients: ClientPreviewEntity[];
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  const t = useTranslations("Home.clients");

  if (!clients || clients.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-muted/20 border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("heading")}
          description={t("subheading")}
          align="center"
        />

        {/* Responsive Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
          {clients.map((client) => {
            const logoEl = (
              <div className="relative h-16 w-full flex items-center justify-center p-3 rounded-xl bg-card border border-border/80 shadow-2xs hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
                {client.logoUrl ? (
                  <div className="relative h-10 w-full">
                    <Image
                      src={client.logoUrl}
                      alt={client.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-75 group-hover:opacity-100"
                    />
                  </div>
                ) : (
                  <span className="text-xs font-bold text-muted-foreground text-center truncate px-2">
                    {client.name}
                  </span>
                )}
              </div>
            );

            if (client.websiteUrl) {
              return (
                <a
                  key={client.id}
                  href={client.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={client.name}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                >
                  {logoEl}
                </a>
              );
            }

            return <div key={client.id}>{logoEl}</div>;
          })}
        </div>
      </Container>
    </section>
  );
}
