import { useServicesList } from "../queries/services.queries";
import { useServicesStore } from "../stores/useServicesStore";

export function useServices() {
  const { data: services, isLoading, error } = useServicesList();
  const { searchQuery, setSearchQuery } = useServicesStore();

  const filteredServices = services?.filter((service) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      service.titleEn.toLowerCase().includes(query) ||
      service.titleAr.includes(query) ||
      service.descriptionEn.toLowerCase().includes(query)
    );
  });

  return {
    services: filteredServices || [],
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
