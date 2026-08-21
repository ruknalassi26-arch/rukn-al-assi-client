"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Download, Sliders } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface ProductDetailSpecsProps {
  specifications: Record<string, string | number | boolean>;
  datasheetUrl?: string | null;
}

export function ProductDetailSpecs({ specifications, datasheetUrl }: ProductDetailSpecsProps) {
  const t = useTranslations("Products");
  const specEntries = Object.entries(specifications || {});

  return (
    <div className="space-y-6 pt-6 border-t border-border">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 text-base font-bold text-foreground">
          <Sliders className="size-4 text-primary" />
          <span>{t("specifications")}</span>
        </div>

        {datasheetUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-10 px-4 rounded-xl border-border font-bold text-xs gap-2 text-primary hover:text-primary hover:bg-primary/10"
          >
            <a href={datasheetUrl} target="_blank" rel="noopener noreferrer">
              <Download className="size-3.5" />
              <span>{t("downloadDatasheet")}</span>
            </a>
          </Button>
        )}
      </div>

      {specEntries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {specEntries.map(([key, value]) => (
            <div
              key={key}
              className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between gap-4 text-xs sm:text-sm"
            >
              <span className="font-semibold text-muted-foreground">{key}</span>
              <span className="font-bold text-foreground text-end">{String(value)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
