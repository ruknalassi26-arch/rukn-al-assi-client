import { IClientRepository, GetClientsParams } from "../repositories/i-client.repository";
import { PaginatedClientsEntity } from "../entities/client.entity";

export class GetClientsUseCase {
  constructor(private readonly repository: IClientRepository) {}

  async execute(params: GetClientsParams): Promise<PaginatedClientsEntity> {
    return this.repository.getClients(params);
  }
}
