import { IServiceRepository, GetServicesParams } from "../repositories/i-service.repository";
import { PaginatedServicesEntity } from "../entities/service.entity";

export class GetServicesUseCase {
  constructor(private readonly repository: IServiceRepository) {}

  async execute(params: GetServicesParams): Promise<PaginatedServicesEntity> {
    return this.repository.getServices(params);
  }
}
