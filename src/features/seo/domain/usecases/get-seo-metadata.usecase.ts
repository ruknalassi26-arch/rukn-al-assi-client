import { ISeoRepository } from "../repositories/i-seo.repository";
import { SeoMetadataEntity } from "../entities/seo.entity";

export class GetSeoMetadataUseCase {
  constructor(private readonly repository: ISeoRepository) {}

  async execute(pageRoute: string): Promise<SeoMetadataEntity | null> {
    return this.repository.getSeoMetadata(pageRoute);
  }
}
