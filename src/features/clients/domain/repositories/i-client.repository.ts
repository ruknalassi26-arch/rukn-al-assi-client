import { ClientEntity } from "../entities/client.entity";

export interface IClientRepository {
  getClients(): Promise<ClientEntity[]>;
}
