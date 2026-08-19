import { useQuery } from "@tanstack/react-query";
import { AboutRepository } from "../../data/repositories/about.repository";
import { GetCompanyOverviewUseCase } from "../../domain/usecases/get-company-overview.usecase";

const aboutRepository = new AboutRepository();
const getCompanyOverviewUseCase = new GetCompanyOverviewUseCase(aboutRepository);

export const aboutQueryKeys = {
  all: ["about"] as const,
  overview: () => [...aboutQueryKeys.all, "overview"] as const,
};

export function useCompanyOverview() {
  return useQuery({
    queryKey: aboutQueryKeys.overview(),
    queryFn: () => getCompanyOverviewUseCase.execute(),
  });
}
