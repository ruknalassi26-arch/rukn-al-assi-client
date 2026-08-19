import { RfqDto } from "../models/rfq.dto";
import { RfqEntity } from "../../domain/entities/rfq.entity";

export class RfqMapper {
  static toDto(entity: RfqEntity): RfqDto {
    return {
      full_name: entity.fullName,
      email: entity.email,
      phone: entity.phone,
      company_name: entity.companyName,
      service_id: entity.serviceId,
      details: entity.details,
      attachment_url: entity.attachmentUrl,
    };
  }
}
