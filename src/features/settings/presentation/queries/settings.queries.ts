import { useQuery } from "@tanstack/react-query";
import { SettingsRepository } from "../../data/repositories/settings.repository";
import { GetSiteSettingsUseCase } from "../../domain/usecases/get-site-settings.usecase";

const repository = new SettingsRepository();
const getSiteSettingsUseCase = new GetSiteSettingsUseCase(repository);

export const settingsQueryKeys = {
  all: ["settings"] as const,
  site: () => [...settingsQueryKeys.all, "site"] as const,
};

export function useSiteSettings() {
  return useQuery({
    queryKey: settingsQueryKeys.site(),
    queryFn: () => getSiteSettingsUseCase.execute(),
  });
}
