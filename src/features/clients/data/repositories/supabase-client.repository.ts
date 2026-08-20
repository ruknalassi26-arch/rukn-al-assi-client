import { IClientRepository, GetClientsParams } from "../../domain/repositories/i-client.repository";
import { PaginatedClientsEntity } from "../../domain/entities/client.entity";
import { ClientMapper } from "../mappers/client.mapper";
import { RpcClientsResponseDto } from "../dto/client.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseClientRepository implements IClientRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getClients({
    page = 1,
    pageSize = 12,
    search = "",
    language = "en",
  }: GetClientsParams): Promise<PaginatedClientsEntity> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_clients", {
        p_language_code: langCode,
        p_page: page,
        p_page_size: pageSize,
        p_search: search && search.trim() ? search.trim() : null,
      });

      if (error || !data) {
        console.error("[SupabaseClientRepository] Error calling get_public_clients:", error?.message);
        return { items: [], total: 0, page, pageSize, totalPages: 0 };
      }

      return ClientMapper.toPaginatedEntity(data as RpcClientsResponseDto);
    } catch (err) {
      console.error("[SupabaseClientRepository] Exception in getClients:", err);
      return { items: [], total: 0, page, pageSize, totalPages: 0 };
    }
  }
}
