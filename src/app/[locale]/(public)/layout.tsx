import React from "react";
import { PublicHeader } from "@shared/components/layouts/PublicHeader";
import { PublicFooter } from "@shared/components/layouts/PublicFooter";
import { FloatingWhatsApp } from "@shared/components/layouts/FloatingWhatsApp";
import { ScrollToTop } from "@shared/components/layouts/ScrollToTop";
import { SupabaseHomeRepository } from "@features/home/data/repositories/supabase-home.repository";
import { GetHomePageUseCase } from "@features/home/domain/usecases/get-home-page.usecase";

interface PublicLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function PublicLayout({ children, params }: PublicLayoutProps) {
  const { locale } = await params;
  const homeRepository = new SupabaseHomeRepository();
  const getHomePageUseCase = new GetHomePageUseCase(homeRepository);
  const homeData = await getHomePageUseCase.execute(locale);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader brandSettings={homeData.brandSettings} languages={homeData.languages} />
      <main className="flex-1">{children}</main>
      <PublicFooter brandSettings={homeData.brandSettings} languages={homeData.languages} />
      <FloatingWhatsApp whatsappNumber={homeData.brandSettings?.whatsappNumber} />
      <ScrollToTop />
    </div>
  );
}
