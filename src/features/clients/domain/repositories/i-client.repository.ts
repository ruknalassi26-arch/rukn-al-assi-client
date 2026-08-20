import { PaginatedClientsEntity } from "../entities/client.entity";

export interface GetClientsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  language?: string;
}

export interface IClientRepository {
  getClients(params: GetClientsParams): Promise<PaginatedClientsEntity>;
}
