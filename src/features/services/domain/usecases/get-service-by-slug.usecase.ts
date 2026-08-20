import { IServiceRepository } from "../repositories/i-service.repository";
import { ServiceEntity } from "../entities/service.entity";

export class GetServiceBySlugUseCase {
  constructor(private readonly repository: IServiceRepository) {}

  async execute(slug: string, language: string): Promise<ServiceEntity | null> {
    return this.repository.getServiceBySlug(slug, language);
  }
}
