"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BranchEntity } from "../../domain/entities/contact.entity";
import { Building2, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

interface BranchCardProps {
  branch: BranchEntity;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function BranchCard({ branch, isSelected, onSelect }: BranchCardProps) {
  const t = useTranslations("Contact");

  // Normalize WhatsApp link safely
  const formatWhatsappUrl = (raw: string) => {
    const cleanNum = raw.replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNum}`;
  };

  const hasCoords = branch.mapLat !== null && branch.mapLng !== null;

  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-3xl bg-card border transition-all duration-300 space-y-5 cursor-pointer ${
        isSelected
          ? "border-primary ring-2 ring-primary/20 shadow-md bg-card"
          : "border-border hover:border-primary/40 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Building2 className="size-4" />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              {branch.name}
            </h3>
          </div>

          {branch.address && (
            <p className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground pt-1">
              <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
              <span>{branch.address}</span>
            </p>
          )}
        </div>

        {hasCoords && (
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {t("selectBranch")}
          </span>
        )}
      </div>

      {/* Contact Channels Strip */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60 text-xs">
        {branch.phone && (
          <a
            href={`tel:${branch.phone.replace(/\s+/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 hover:bg-muted text-foreground font-semibold transition-colors"
          >
            <Phone className="size-3.5 text-primary" />
            <span dir="ltr">{branch.phone}</span>
          </a>
        )}

        {branch.email && (
          <a
            href={`mailto:${branch.email}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/60 hover:bg-muted text-foreground font-semibold transition-colors"
          >
            <Mail className="size-3.5 text-primary" />
            <span>{branch.email}</span>
          </a>
        )}

        {branch.whatsappNumber && (
          <a
            href={formatWhatsappUrl(branch.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 font-bold transition-colors"
          >
            <MessageCircle className="size-3.5" />
            <span>{t("whatsapp")}</span>
          </a>
        )}
      </div>
    </div>
  );
}
