import { useCertificatesList } from "../queries/certificates.queries";
import { useCertificatesStore } from "../stores/useCertificatesStore";

export function useCertificates() {
  const { data: certificates, isLoading, error } = useCertificatesList();
  const { selectedYear, setSelectedYear } = useCertificatesStore();

  return {
    certificates: certificates || [],
    isLoading,
    error,
    selectedYear,
    setSelectedYear,
  };
}
