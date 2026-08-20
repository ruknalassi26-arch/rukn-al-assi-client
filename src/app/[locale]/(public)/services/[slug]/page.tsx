import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SupabaseServiceRepository } from "@features/services/data/repositories/supabase-service.repository";
import { GetServiceBySlugUseCase } from "@features/services/domain/usecases/get-service-by-slug.usecase";
import { GetRelatedServicesUseCase } from "@features/services/domain/usecases/get-related-services.usecase";
import { ServiceDetailView } from "@features/services/presentation/views/ServiceDetailView";

interface ServiceDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const repository = new SupabaseServiceRepository();
  const getServiceUseCase = new GetServiceBySlugUseCase(repository);
  const getRelatedUseCase = new GetRelatedServicesUseCase(repository);

  const service = await getServiceUseCase.execute(slug, locale);

  if (!service) {
    notFound();
  }

  const relatedServices = await getRelatedUseCase.execute(service.id, locale, 3);

  return <ServiceDetailView service={service} relatedServices={relatedServices} />;
}
