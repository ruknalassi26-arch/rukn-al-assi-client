import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GetHomePageUseCase } from "@features/home/domain/usecases/get-home-page.usecase";
import { SupabaseHomeRepository } from "@features/home/data/repositories/supabase-home.repository";
import { HomeView } from "@features/home/presentation/views/HomeView";
import { routing, Locale } from "@core/config/i18n";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Cache and revalidate every hour for high performance

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const homeRepository = new SupabaseHomeRepository();
  const getHomePageUseCase = new GetHomePageUseCase(homeRepository);
  const homeData = await getHomePageUseCase.execute(locale);

  const title = homeData.brandSettings.siteName
    ? `${homeData.brandSettings.siteName}${homeData.brandSettings.tagline ? ` | ${homeData.brandSettings.tagline}` : ""}`
    : process.env.NEXT_PUBLIC_APP_NAME || "Rukn Al Assi";

  const description =
    homeData.about.description ||
    homeData.hero.body ||
    "";

  const ogImage =
    homeData.hero.backgroundImage ||
    homeData.brandSettings.logoUrl ||
    "/og.jpg";

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  return {
    title,
    description,
    metadataBase: new URL(appUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        ckb: "/ckb",
      } as Record<string, string>,
    },
    openGraph: {
      title,
      description,
      url: `${appUrl}/${locale}`,
      siteName: homeData.brandSettings.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "ar" ? "ar_SA" : locale === "ckb" ? "ckb_IQ" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const homeRepository = new SupabaseHomeRepository();
  const getHomePageUseCase = new GetHomePageUseCase(homeRepository);
  const homeData = await getHomePageUseCase.execute(locale);

  return <HomeView homeData={homeData} />;
}
