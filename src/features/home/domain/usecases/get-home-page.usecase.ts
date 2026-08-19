import { IHomeRepository } from "../repositories/i-home.repository";
import { HomePageEntity } from "../entities/home.entity";

export class GetHomePageUseCase {
  constructor(private readonly homeRepository: IHomeRepository) {}

  async execute(locale: string): Promise<HomePageEntity> {
    return this.homeRepository.getHomePageData(locale);
  }
}
