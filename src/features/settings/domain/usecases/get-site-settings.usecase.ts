import { ISettingsRepository } from "../repositories/i-settings.repository";
import { SiteSettingsEntity } from "../entities/settings.entity";

export class GetSiteSettingsUseCase {
  constructor(private readonly repository: ISettingsRepository) {}

  async execute(): Promise<SiteSettingsEntity> {
    return this.repository.getSettings();
  }
}
