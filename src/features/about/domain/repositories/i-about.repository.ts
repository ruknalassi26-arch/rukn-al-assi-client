import { AboutPageEntity } from "../entities/about-page.entity";

export interface IAboutRepository {
  getAboutPageData(locale: string): Promise<AboutPageEntity>;
}
