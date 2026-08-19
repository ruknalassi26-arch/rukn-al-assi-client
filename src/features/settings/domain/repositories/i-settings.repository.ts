import { SiteSettingsEntity } from "../entities/settings.entity";

export interface ISettingsRepository {
  getSettings(): Promise<SiteSettingsEntity>;
}
