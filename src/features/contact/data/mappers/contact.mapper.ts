import { ContactDto } from "../models/contact.dto";
import { ContactMessageEntity } from "../../domain/entities/contact.entity";

export class ContactMapper {
  static toDto(entity: ContactMessageEntity): ContactDto {
    return {
      full_name: entity.fullName,
      email: entity.email,
      phone: entity.phone,
      subject: entity.subject,
      message: entity.message,
    };
  }
}
