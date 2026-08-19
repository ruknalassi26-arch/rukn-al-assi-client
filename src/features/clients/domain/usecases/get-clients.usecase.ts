import { IClientRepository } from "../repositories/i-client.repository";
import { ClientEntity } from "../entities/client.entity";

export class GetClientsUseCase {
  constructor(private readonly repository: IClientRepository) {}

  async execute(): Promise<ClientEntity[]> {
    return this.repository.getClients();
  }
}
