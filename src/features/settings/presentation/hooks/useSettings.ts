import { useSiteSettings } from "../queries/settings.queries";

export function useSettings() {
  const { data: settings, isLoading, error } = useSiteSettings();

  return {
    settings,
    isLoading,
    error,
  };
}
