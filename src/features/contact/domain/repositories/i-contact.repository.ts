import { ContactMessageEntity } from "../entities/contact.entity";

export interface IContactRepository {
  sendMessage(message: ContactMessageEntity): Promise<boolean>;
}
