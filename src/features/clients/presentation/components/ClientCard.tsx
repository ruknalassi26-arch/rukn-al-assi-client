"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ClientEntity } from "../../domain/entities/client.entity";
import { Building, ExternalLink } from "lucide-react";

interface ClientCardProps {
  client: ClientEntity;
}

export function ClientCard({ client }: ClientCardProps) {
  const t = useTranslations("Clients");

  return (
    <div className="group relative rounded-2xl bg-card border border-border/80 p-6 flex flex-col items-center justify-between hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      {/* Normalized Logo Frame */}
      <div className="relative h-20 w-full flex items-center justify-center py-2">
        {client.logoUrl ? (
          <div className="relative size-full max-h-16 max-w-[160px]">
            <Image
              src={client.logoUrl}
              alt={client.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              className="object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
            />
          </div>
        ) : (
          <div className="size-12 rounded-xl bg-muted/60 flex items-center justify-center text-muted-foreground">
            <Building className="size-6 opacity-40" />
          </div>
        )}
      </div>

      {/* Name and Optional External Website Link */}
      <div className="w-full pt-4 border-t border-border/50 text-center space-y-2">
        <h3 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
          {client.name}
        </h3>

        {client.websiteUrl ? (
          <a
            href={client.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>{t("visitWebsite")}</span>
            <ExternalLink className="size-3" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
