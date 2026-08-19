import { IServiceRepository } from "../repositories/i-service.repository";
import { ServiceEntity } from "../entities/service.entity";

export class GetServicesUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(): Promise<ServiceEntity[]> {
    return this.serviceRepository.getServices();
  }
}
