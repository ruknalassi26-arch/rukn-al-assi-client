import { ICertificateRepository } from "../../domain/repositories/i-certificate.repository";
import { CertificateEntity } from "../../domain/entities/certificate.entity";
import { CertificateMapper } from "../mappers/certificate.mapper";
import { createClient } from "@core/lib/supabase/client";

export class CertificateRepository implements ICertificateRepository {
  private supabase = createClient();

  async getCertificates(): Promise<CertificateEntity[]> {
    const { data: certificates } = await this.supabase
      .from("certifications")
      .select("id, image_url, issued_by, issued_date, sort_order, status")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    const { data: translations } = await this.supabase
      .from("certification_translations")
      .select("certification_id, language_code, title, description");

    if (!certificates || certificates.length === 0) return [];

    return certificates.map((cert) => {
      const trEn = translations?.find(
        (t) => t.certification_id === cert.id && t.language_code === "en"
      );
      const trAr = translations?.find(
        (t) => t.certification_id === cert.id && t.language_code === "ar"
      );
      const year = cert.issued_date ? new Date(cert.issued_date).getFullYear() : 2024;

      return CertificateMapper.toEntity({
        id: cert.id,
        title_en: trEn?.title || trAr?.title || "",
        title_ar: trAr?.title || trEn?.title || "",
        authority_en: cert.issued_by || "",
        authority_ar: cert.issued_by || "",
        year: isNaN(year) ? 2024 : year,
      });
    });
  }
}
