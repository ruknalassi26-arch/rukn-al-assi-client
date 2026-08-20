"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("Error");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <main className="min-h-[75vh] flex items-center justify-center py-20 bg-background text-foreground">
      <Container className="text-center space-y-8 max-w-lg">
        <div className="space-y-4">
          <span className="text-8xl font-black text-primary tracking-tight font-mono">
            404
          </span>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            {t("pageNotFound")}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            {t("pageNotFoundDesc")}
          </p>
        </div>

        <div className="pt-4">
          <Button asChild size="lg" className="font-bold px-8 h-12 shadow-md">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span>{t("goHome")}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
