import { IAboutRepository } from "../repositories/i-about.repository";
import { AboutCompanyEntity } from "../entities/about.entity";

export class GetCompanyOverviewUseCase {
  constructor(private readonly repository: IAboutRepository) {}

  async execute(): Promise<AboutCompanyEntity> {
    return this.repository.getCompanyOverview();
  }
}
