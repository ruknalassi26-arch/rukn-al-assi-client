"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { Send, FileText } from "lucide-react";

interface GeneralApplicationCtaProps {
  onOpenModal: () => void;
}

export function GeneralApplicationCta({ onOpenModal }: GeneralApplicationCtaProps) {
  const t = useTranslations("Careers");

  return (
    <section className="py-16 bg-muted/30 border-t border-border">
      <Container>
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-3 text-start max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <FileText className="size-3.5" />
              <span>{t("generalAppTitle")}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t("generalAppTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {t("generalAppDesc")}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              onClick={onOpenModal}
              size="lg"
              className="h-12 px-7 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg gap-2"
            >
              <Send className="size-4" />
              <span>{t("generalAppButton")}</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
