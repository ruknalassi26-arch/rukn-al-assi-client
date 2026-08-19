import { Metadata } from "next";
import { siteConfig } from "@core/config/site";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  locale?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
  locale = "ar",
}: GenerateMetadataOptions = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: metaTitle,
    description,
    openGraph: {
      title: metaTitle,
      description,
      images: [{ url: image }],
      siteName: siteConfig.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
