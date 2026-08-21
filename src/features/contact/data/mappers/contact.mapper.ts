import {
  BranchEntity,
  ContactPageEntity,
} from "../../domain/entities/contact.entity";
import { RpcBranchDto, RpcContactPageResponseDto } from "../dto/contact.dto";

export class ContactMapper {
  static toBranchEntity(dto: RpcBranchDto): BranchEntity {
    return {
      id: dto.id,
      name: dto.name || "Branch Office",
      address: dto.address || null,
      phone: dto.phone || null,
      email: dto.email || null,
      whatsappNumber: dto.whatsappNumber || null,
      mapLat: dto.mapLat !== null && dto.mapLat !== undefined ? Number(dto.mapLat) : null,
      mapLng: dto.mapLng !== null && dto.mapLng !== undefined ? Number(dto.mapLng) : null,
    };
  }

  static toContactPageEntity(dto: RpcContactPageResponseDto): ContactPageEntity {
    return {
      branches: (dto.branches || []).map((b) => this.toBranchEntity(b)),
      language: dto.language || "en",
    };
  }
}
