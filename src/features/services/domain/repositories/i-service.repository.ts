import { ServiceEntity, PaginatedServicesEntity } from "../entities/service.entity";

export interface GetServicesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  language?: string;
}

export interface IServiceRepository {
  getServices(params: GetServicesParams): Promise<PaginatedServicesEntity>;
  getServiceBySlug(slug: string, language: string): Promise<ServiceEntity | null>;
  getRelatedServices(currentServiceId: string, language: string, limit?: number): Promise<ServiceEntity[]>;
}
