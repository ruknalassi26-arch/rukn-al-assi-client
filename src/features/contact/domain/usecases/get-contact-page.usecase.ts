import { IContactRepository } from "../repositories/i-contact.repository";
import { ContactPageEntity } from "../entities/contact.entity";

export class GetContactPageUseCase {
  constructor(private readonly repository: IContactRepository) {}

  async execute(language?: string): Promise<ContactPageEntity> {
    return this.repository.getContactPage(language);
  }
}
