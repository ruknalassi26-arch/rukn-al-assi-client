import { IContactRepository } from "../repositories/i-contact.repository";
import { ContactMessageEntity } from "../entities/contact.entity";

export class SendContactMessageUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(message: ContactMessageEntity): Promise<boolean> {
    return this.contactRepository.sendMessage(message);
  }
}
