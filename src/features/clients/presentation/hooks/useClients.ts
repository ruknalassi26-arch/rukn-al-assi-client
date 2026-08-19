import { useClientsList } from "../queries/clients.queries";
import { useClientsStore } from "../stores/useClientsStore";

export function useClients() {
  const { data: clients, isLoading, error } = useClientsList();
  const { selectedSector, setSelectedSector } = useClientsStore();

  return {
    clients: clients || [],
    isLoading,
    error,
    selectedSector,
    setSelectedSector,
  };
}
