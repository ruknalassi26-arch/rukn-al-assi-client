import { IAboutRepository } from "../../domain/repositories/i-about.repository";
import { AboutPageEntity } from "../../domain/entities/about-page.entity";
import { AboutMapper } from "../mappers/about.mapper";
import { PublicAboutPageRpcDto } from "../dto/about.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseAboutRepository implements IAboutRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  async getAboutPageData(locale: string): Promise<AboutPageEntity> {
    const supabase = this.getSupabase();
    const langCode = locale === "ckb" ? "ku" : locale;

    try {
      const { data, error } = await supabase.rpc("get_public_about_page", {
        p_language_code: langCode,
      });

      if (error || !data) {
        console.warn("[SupabaseAboutRepository] RPC error or empty data:", error?.message);
        return AboutMapper.toEntity({});
      }

      return AboutMapper.toEntity(data as PublicAboutPageRpcDto);
    } catch (err) {
      console.error("[SupabaseAboutRepository] Exception calling get_public_about_page:", err);
      return AboutMapper.toEntity({});
    }
  }
}
