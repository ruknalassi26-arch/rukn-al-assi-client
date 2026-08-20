import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseClientRepository } from "@features/clients/data/repositories/supabase-client.repository";
import { GetClientsUseCase } from "@features/clients/domain/usecases/get-clients.usecase";
import { ClientsView } from "@features/clients/presentation/views/ClientsView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ClientsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    pageSize?: string;
  }>;
}

export default async function ClientsPage({ params, searchParams }: ClientsPageProps) {
  const { locale } = await params;
  const { page, search, pageSize } = await searchParams;

  setRequestLocale(locale);

  const currentPage = page ? parseInt(page, 10) || 1 : 1;
  const currentPageSize = pageSize ? parseInt(pageSize, 10) || 12 : 12;
  const currentSearch = search || "";

  const repository = new SupabaseClientRepository();
  const useCase = new GetClientsUseCase(repository);

  const clientsData = await useCase.execute({
    page: currentPage,
    pageSize: currentPageSize,
    search: currentSearch,
    language: locale,
  });

  return <ClientsView clientsData={clientsData} />;
}
