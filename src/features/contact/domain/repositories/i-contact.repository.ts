import {
  ContactPageEntity,
  ContactMessageInputEntity,
  ContactSubmitResultEntity,
} from "../entities/contact.entity";

export interface IContactRepository {
  getContactPage(language?: string): Promise<ContactPageEntity>;
  submitMessage(input: ContactMessageInputEntity): Promise<ContactSubmitResultEntity>;
}
