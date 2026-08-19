import { useQuery } from "@tanstack/react-query";
import { ClientRepository } from "../../data/repositories/client.repository";
import { GetClientsUseCase } from "../../domain/usecases/get-clients.usecase";

const repository = new ClientRepository();
const getClientsUseCase = new GetClientsUseCase(repository);

export const clientsQueryKeys = {
  all: ["clients"] as const,
  list: () => [...clientsQueryKeys.all, "list"] as const,
};

export function useClientsList() {
  return useQuery({
    queryKey: clientsQueryKeys.list(),
    queryFn: () => getClientsUseCase.execute(),
  });
}
