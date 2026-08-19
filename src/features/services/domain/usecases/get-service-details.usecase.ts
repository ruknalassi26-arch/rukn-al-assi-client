import { IServiceRepository } from "../repositories/i-service.repository";
import { ServiceEntity } from "../entities/service.entity";

export class GetServiceDetailsUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(idOrSlug: string): Promise<ServiceEntity | null> {
    return this.serviceRepository.getServiceDetails(idOrSlug);
  }
}
