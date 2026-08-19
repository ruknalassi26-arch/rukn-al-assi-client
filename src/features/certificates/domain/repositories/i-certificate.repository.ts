import { CertificateEntity } from "../entities/certificate.entity";

export interface ICertificateRepository {
  getCertificates(): Promise<CertificateEntity[]>;
}
