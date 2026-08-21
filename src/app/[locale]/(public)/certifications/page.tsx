import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseCertificationRepository } from "@features/certifications/data/repositories/supabase-certification.repository";
import { GetCertificationsUseCase } from "@features/certifications/domain/usecases/get-certifications.usecase";
import { CertificationsView } from "@features/certifications/presentation/views/CertificationsView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface CertificationsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}

export default async function CertificationsPage({ params, searchParams }: CertificationsPageProps) {
  const { locale } = await params;
  const { page, pageSize } = await searchParams;

  setRequestLocale(locale);

  const currentPage = page ? parseInt(page, 10) || 1 : 1;
  const currentPageSize = pageSize ? parseInt(pageSize, 10) || 12 : 12;

  const repository = new SupabaseCertificationRepository();
  const useCase = new GetCertificationsUseCase(repository);

  const certificationsData = await useCase.execute({
    page: currentPage,
    pageSize: currentPageSize,
    language: locale,
  });

  return <CertificationsView certificationsData={certificationsData} />;
}
