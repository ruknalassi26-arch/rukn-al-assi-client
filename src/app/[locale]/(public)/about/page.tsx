import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseAboutRepository } from "@features/about/data/repositories/supabase-about.repository";
import { GetAboutPageUseCase } from "@features/about/domain/usecases/get-about-page.usecase";
import { AboutView } from "@features/about/presentation/views/AboutView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const repository = new SupabaseAboutRepository();
  const useCase = new GetAboutPageUseCase(repository);
  const aboutData = await useCase.execute(locale);

  return <AboutView aboutData={aboutData} />;
}
