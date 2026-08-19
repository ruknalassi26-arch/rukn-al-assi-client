import { useQuery } from "@tanstack/react-query";
import { SupabaseHomeRepository } from "../../data/repositories/supabase-home.repository";
import { GetHomePageUseCase } from "../../domain/usecases/get-home-page.usecase";

const homeRepository = new SupabaseHomeRepository();
const getHomePageUseCase = new GetHomePageUseCase(homeRepository);

export const homeQueryKeys = {
  all: ["home"] as const,
  overview: (locale: string) => [...homeQueryKeys.all, "overview", locale] as const,
};

export function useHomepageData(locale: string = "ar") {
  return useQuery({
    queryKey: homeQueryKeys.overview(locale),
    queryFn: () => getHomePageUseCase.execute(locale),
  });
}
