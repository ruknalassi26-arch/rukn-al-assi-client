import { IServiceRepository } from "../repositories/i-service.repository";
import { ServiceEntity } from "../entities/service.entity";

export class GetRelatedServicesUseCase {
  constructor(private readonly repository: IServiceRepository) {}

  async execute(currentServiceId: string, language: string, limit: number = 3): Promise<ServiceEntity[]> {
    return this.repository.getRelatedServices(currentServiceId, language, limit);
  }
}
