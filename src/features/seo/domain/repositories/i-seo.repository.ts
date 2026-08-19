import { SeoMetadataEntity } from "../entities/seo.entity";

export interface ISeoRepository {
  getSeoMetadata(pageRoute: string): Promise<SeoMetadataEntity | null>;
}
