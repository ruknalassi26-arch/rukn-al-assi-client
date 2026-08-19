"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";
import { logger } from "@core/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    logger.error("Unhandled Global Error Boundary caught error", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center py-16">
      <Container className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-destructive">500</h1>
        <h2 className="text-2xl font-bold tracking-tight">{t("serverError")}</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          {t("serverErrorDesc")}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>{t("tryAgain")}</Button>
        </div>
      </Container>
    </main>
  );
}
