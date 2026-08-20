import { ClientEntity, PaginatedClientsEntity } from "../../domain/entities/client.entity";
import { RpcClientsResponseDto } from "../dto/client.dto";

export class ClientMapper {
  static toPaginatedEntity(dto: RpcClientsResponseDto): PaginatedClientsEntity {
    const rawItems = dto?.items || [];
    const items: ClientEntity[] = rawItems.map((item) => ({
      id: item.id,
      name: item.name || "Client Partner",
      logoUrl: item.logoUrl || null,
      websiteUrl: item.websiteUrl || null,
      sortOrder: item.sortOrder || 0,
    }));

    const total = dto?.pagination?.total ?? items.length;
    const page = dto?.pagination?.page ?? 1;
    const pageSize = dto?.pagination?.pageSize ?? 12;
    const totalPages = dto?.pagination?.totalPages ?? Math.ceil(total / pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  }
}
