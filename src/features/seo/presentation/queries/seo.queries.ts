import { useQuery } from "@tanstack/react-query";
import { SeoRepository } from "../../data/repositories/seo.repository";
import { GetSeoMetadataUseCase } from "../../domain/usecases/get-seo-metadata.usecase";

const repository = new SeoRepository();
const getSeoMetadataUseCase = new GetSeoMetadataUseCase(repository);

export const seoQueryKeys = {
  all: ["seo"] as const,
  route: (pageRoute: string) => [...seoQueryKeys.all, "route", pageRoute] as const,
};

export function useSeoMetadata(pageRoute: string) {
  return useQuery({
    queryKey: seoQueryKeys.route(pageRoute),
    queryFn: () => getSeoMetadataUseCase.execute(pageRoute),
  });
}
