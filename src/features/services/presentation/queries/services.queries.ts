import { useQuery } from "@tanstack/react-query";
import { ServiceRepository } from "../../data/repositories/service.repository";
import { GetServicesUseCase } from "../../domain/usecases/get-services.usecase";
import { GetServiceDetailsUseCase } from "../../domain/usecases/get-service-details.usecase";

const serviceRepository = new ServiceRepository();
const getServicesUseCase = new GetServicesUseCase(serviceRepository);
const getServiceDetailsUseCase = new GetServiceDetailsUseCase(serviceRepository);

export const servicesQueryKeys = {
  all: ["services"] as const,
  lists: () => [...servicesQueryKeys.all, "list"] as const,
  detail: (id: string) => [...servicesQueryKeys.all, "detail", id] as const,
};

export function useServicesList() {
  return useQuery({
    queryKey: servicesQueryKeys.lists(),
    queryFn: () => getServicesUseCase.execute(),
  });
}

export function useServiceDetails(idOrSlug: string) {
  return useQuery({
    queryKey: servicesQueryKeys.detail(idOrSlug),
    queryFn: () => getServiceDetailsUseCase.execute(idOrSlug),
    enabled: !!idOrSlug,
  });
}
