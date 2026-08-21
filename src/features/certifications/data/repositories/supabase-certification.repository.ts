import { ICertificationRepository, GetCertificationsParams } from "../../domain/repositories/i-certification.repository";
import { PaginatedCertificationsEntity } from "../../domain/entities/certification.entity";
import { CertificationMapper } from "../mappers/certification.mapper";
import { RpcCertificationsResponseDto } from "../dto/certification.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseCertificationRepository implements ICertificationRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getCertifications({
    page = 1,
    pageSize = 12,
    language = "en",
  }: GetCertificationsParams): Promise<PaginatedCertificationsEntity> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_certifications", {
        p_language_code: langCode,
        p_page: page,
        p_page_size: pageSize,
      });

      if (error || !data) {
        console.error("[SupabaseCertificationRepository] Error calling get_public_certifications:", error?.message);
        return { items: [], total: 0, page, pageSize, totalPages: 0 };
      }

      return CertificationMapper.toPaginatedEntity(data as RpcCertificationsResponseDto);
    } catch (err) {
      console.error("[SupabaseCertificationRepository] Exception in getCertifications:", err);
      return { items: [], total: 0, page, pageSize, totalPages: 0 };
    }
  }
}
