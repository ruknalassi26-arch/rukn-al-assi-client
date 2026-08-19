import { useCompanyOverview } from "../queries/about.queries";
import { useAboutStore } from "../stores/useAboutStore";

export function useAbout() {
  const { data, isLoading, error } = useCompanyOverview();
  const { activeTab, setActiveTab } = useAboutStore();

  return {
    aboutData: data,
    isLoading,
    error,
    activeTab,
    setActiveTab,
  };
}
