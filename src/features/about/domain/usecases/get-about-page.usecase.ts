import { IAboutRepository } from "../repositories/i-about.repository";
import { AboutPageEntity } from "../entities/about-page.entity";

export class GetAboutPageUseCase {
  constructor(private readonly repository: IAboutRepository) {}

  async execute(locale: string): Promise<AboutPageEntity> {
    return this.repository.getAboutPageData(locale);
  }
}
