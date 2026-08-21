import { IContactRepository } from "../repositories/i-contact.repository";
import {
  ContactMessageInputEntity,
  ContactSubmitResultEntity,
} from "../entities/contact.entity";

export class SubmitContactMessageUseCase {
  constructor(private readonly repository: IContactRepository) {}

  async execute(input: ContactMessageInputEntity): Promise<ContactSubmitResultEntity> {
    return this.repository.submitMessage(input);
  }
}
