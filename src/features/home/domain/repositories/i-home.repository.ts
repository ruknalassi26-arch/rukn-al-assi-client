import { HomePageEntity } from "../entities/home.entity";

export interface IHomeRepository {
  getHomePageData(locale: string): Promise<HomePageEntity>;
}
