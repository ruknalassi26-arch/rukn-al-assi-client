"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ClientItemEntity } from "../../domain/entities/service.entity";

interface ServicesClientsSectionProps {
  clients: ClientItemEntity[];
}

export function ServicesClientsSection({ clients }: ServicesClientsSectionProps) {
  const t = useTranslations("Services");

  if (!clients || clients.length === 0) return null;

  // Duplicate items for continuous marquee loop
  const marqueeList = [...clients, ...clients, ...clients];

  return (
    <section className="py-20 lg:py-24 bg-muted/20 border-b border-border overflow-hidden">
      <Container className="space-y-12 text-center">
        <SectionHeading
          eyebrow={t("clientsEyebrow")}
          title={t("clientsHeading")}
          description={t("clientsSubheading")}
          align="center"
        />

        {/* Continuous Smooth Logo Marquee Wrapper */}
        <div className="relative w-full overflow-hidden mask-gradient group/marquee">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 start-0 w-16 sm:w-24 bg-linear-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-16 sm:w-24 bg-linear-to-l from-background to-transparent z-10" />

          {/* Marquee Track with pause on hover/focus */}
          <div className="animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] flex items-center gap-6 sm:gap-10 py-4">
            {marqueeList.map((client, idx) => {
              const content = (
                <div className="relative h-20 w-44 sm:w-52 shrink-0 flex items-center justify-center p-4 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-300 group">
                  {client.logoUrl ? (
                    <div className="relative h-12 w-full">
                      <Image
                        src={client.logoUrl}
                        alt={client.name}
                        fill
                        sizes="200px"
                        className="object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
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
                    key={`${client.id}-${idx}`}
                    href={client.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={client.name}
                    className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={`${client.id}-${idx}`} className="shrink-0">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
