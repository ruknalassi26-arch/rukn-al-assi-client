import {
  JobListItemEntity,
  PaginatedJobsEntity,
} from "../../domain/entities/job.entity";
import { RpcJobListItemDto, RpcJobsResponseDto } from "../dto/job.dto";

export class JobMapper {
  static toJobEntity(dto: RpcJobListItemDto): JobListItemEntity {
    return {
      id: dto.id,
      slug: dto.slug || dto.id,
      title: dto.title || "Position",
      department: dto.department || null,
      employmentType: dto.employmentType || null,
      location: dto.location || null,
      closesAt: dto.closesAt || null,
      description: dto.description || null,
      requirements: dto.requirements || null,
    };
  }

  static toPaginatedJobsEntity(dto: RpcJobsResponseDto): PaginatedJobsEntity {
    const rawItems = dto?.items || [];
    const items = rawItems.map((item) => this.toJobEntity(item));
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
