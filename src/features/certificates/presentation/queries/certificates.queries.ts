import { useQuery } from "@tanstack/react-query";
import { CertificateRepository } from "../../data/repositories/certificate.repository";
import { GetCertificatesUseCase } from "../../domain/usecases/get-certificates.usecase";

const repository = new CertificateRepository();
const getCertificatesUseCase = new GetCertificatesUseCase(repository);

export const certificatesQueryKeys = {
  all: ["certificates"] as const,
  list: () => [...certificatesQueryKeys.all, "list"] as const,
};

export function useCertificatesList() {
  return useQuery({
    queryKey: certificatesQueryKeys.list(),
    queryFn: () => getCertificatesUseCase.execute(),
  });
}
