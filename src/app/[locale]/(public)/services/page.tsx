import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseServiceRepository } from "@features/services/data/repositories/supabase-service.repository";
import { GetServicesUseCase } from "@features/services/domain/usecases/get-services.usecase";
import { ServicesView } from "@features/services/presentation/views/ServicesView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function ServicesPage({ params, searchParams }: ServicesPageProps) {
  const { locale } = await params;
  const { page, search } = await searchParams;
  setRequestLocale(locale);

  const currentPage = page ? parseInt(page, 10) || 1 : 1;
  const currentSearch = search || "";

  const repository = new SupabaseServiceRepository();
  const useCase = new GetServicesUseCase(repository);

  const servicesData = await useCase.execute({
    page: currentPage,
    pageSize: 12,
    search: currentSearch,
    language: locale,
  });

  return <ServicesView servicesData={servicesData} />;
}
