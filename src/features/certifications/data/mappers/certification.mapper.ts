import { CertificationEntity, PaginatedCertificationsEntity } from "../../domain/entities/certification.entity";
import { RpcCertificationsResponseDto } from "../dto/certification.dto";

export class CertificationMapper {
  static toPaginatedEntity(dto: RpcCertificationsResponseDto): PaginatedCertificationsEntity {
    const rawItems = dto?.items || [];
    const items: CertificationEntity[] = rawItems.map((item) => ({
      id: item.id,
      title: item.title || "ISO Certification",
      description: item.description || null,
      imageUrl: item.imageUrl || "",
      issuedBy: item.issuedBy || null,
      issuedDate: item.issuedDate || null,
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
