"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Clock, ShieldCheck } from "lucide-react";

export function ContactInfoSection() {
  const t = useTranslations("Contact");

  return (
    <div className="p-8 rounded-3xl bg-card border border-border space-y-6 shadow-xs">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">
          {t("infoTitle")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t("infoSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        {/* Working Hours */}
        <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1.5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Clock className="size-4" />
            <span>{t("workingHours")}</span>
          </div>
          <p className="text-muted-foreground font-medium">
            {t("workingHoursValue")}
          </p>
        </div>

        {/* Quality Guarantee */}
        <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-1.5">
          <div className="flex items-center gap-2 text-amber-500 font-bold">
            <ShieldCheck className="size-4" />
            <span>ISO 9001:2015</span>
          </div>
          <p className="text-muted-foreground font-medium">
            {t("heroHighlight1")}
          </p>
        </div>
      </div>
    </div>
  );
}
