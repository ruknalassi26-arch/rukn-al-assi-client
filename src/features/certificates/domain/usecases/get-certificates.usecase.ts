import { ICertificateRepository } from "../repositories/i-certificate.repository";
import { CertificateEntity } from "../entities/certificate.entity";

export class GetCertificatesUseCase {
  constructor(private readonly repository: ICertificateRepository) {}

  async execute(): Promise<CertificateEntity[]> {
    return this.repository.getCertificates();
  }
}
