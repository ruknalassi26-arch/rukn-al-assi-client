import { useHomepageData } from "../queries/home.queries";
import { useLocale } from "next-intl";

export function useHome() {
  const locale = useLocale();
  const { data, isLoading, error } = useHomepageData(locale);

  return {
    homeData: data,
    isLoading,
    error,
  };
}
