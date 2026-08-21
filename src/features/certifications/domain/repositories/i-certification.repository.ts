import { PaginatedCertificationsEntity } from "../entities/certification.entity";

export interface GetCertificationsParams {
  page?: number;
  pageSize?: number;
  language?: string;
}

export interface ICertificationRepository {
  getCertifications(params: GetCertificationsParams): Promise<PaginatedCertificationsEntity>;
}
