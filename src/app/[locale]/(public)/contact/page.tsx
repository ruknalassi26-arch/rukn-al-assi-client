import React from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@core/config/i18n";
import { SupabaseContactRepository } from "@features/contact/data/repositories/supabase-contact.repository";
import { GetContactPageUseCase } from "@features/contact/domain/usecases/get-contact-page.usecase";
import { ContactView } from "@features/contact/presentation/views/ContactView";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const repository = new SupabaseContactRepository();
  const useCase = new GetContactPageUseCase(repository);
  const data = await useCase.execute(locale);

  return <ContactView data={data} />;
}
