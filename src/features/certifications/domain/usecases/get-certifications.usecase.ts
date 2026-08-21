import { ICertificationRepository, GetCertificationsParams } from "../repositories/i-certification.repository";
import { PaginatedCertificationsEntity } from "../entities/certification.entity";

export class GetCertificationsUseCase {
  constructor(private readonly repository: ICertificationRepository) {}

  async execute(params: GetCertificationsParams): Promise<PaginatedCertificationsEntity> {
    return this.repository.getCertifications(params);
  }
}
