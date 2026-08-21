"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BranchEntity } from "../../domain/entities/contact.entity";
import { MapPin, ExternalLink } from "lucide-react";

interface ContactMapProps {
  selectedBranch: BranchEntity | null;
}

export function ContactMap({ selectedBranch }: ContactMapProps) {
  const t = useTranslations("Contact");

  if (!selectedBranch || selectedBranch.mapLat === null || selectedBranch.mapLng === null) {
    return null;
  }

  const lat = selectedBranch.mapLat;
  const lng = selectedBranch.mapLng;
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  // OpenStreetMap embed URL
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.01}%2C${lng + 0.015}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          <span>{selectedBranch.name}</span>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          <span>{t("openInGoogleMaps")}</span>
          <ExternalLink className="size-3" />
        </a>
      </div>

      <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-3xl overflow-hidden border border-border bg-slate-900 shadow-sm">
        <iframe
          title={`Map for ${selectedBranch.name}`}
          src={osmUrl}
          className="size-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
