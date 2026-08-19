import { ServiceEntity } from "../entities/service.entity";

export interface IServiceRepository {
  getServices(): Promise<ServiceEntity[]>;
  getServiceDetails(idOrSlug: string): Promise<ServiceEntity | null>;
}
