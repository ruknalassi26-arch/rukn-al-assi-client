import { AboutCompanyEntity } from "../entities/about.entity";

export interface IAboutRepository {
  getCompanyOverview(): Promise<AboutCompanyEntity>;
}
