import Link from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Button } from "@shared/components/ui/button";

export default function NotFound() {
  const t = useTranslations("Error");

  return (
    <main className="min-h-[70vh] flex items-center justify-center py-16">
      <Container className="text-center space-y-6">
        <h1 className="text-7xl font-extrabold text-primary">404</h1>
        <h2 className="text-2xl font-bold tracking-tight">{t("pageNotFound")}</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          {t("pageNotFoundDesc")}
        </p>
        <div>
          <Button asChild>
            <Link href="/">{t("goHome")}</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
