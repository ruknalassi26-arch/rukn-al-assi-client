import { useSeoMetadata } from "../queries/seo.queries";

export function useSeo(pageRoute = "/") {
  const { data: seoData, isLoading, error } = useSeoMetadata(pageRoute);

  return {
    seoData,
    isLoading,
    error,
  };
}
