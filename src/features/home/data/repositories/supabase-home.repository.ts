import { IHomeRepository } from "../../domain/repositories/i-home.repository";
import { HomePageEntity } from "../../domain/entities/home.entity";
import { HomeMapper } from "../mappers/home.mapper";
import { PublicHomepageRpcDto } from "../dto/home.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseHomeRepository implements IHomeRepository {
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

  async getHomePageData(locale: string): Promise<HomePageEntity> {
    const supabase = this.getSupabase();

    try {
      // 1. Single Server-Side Database RPC Call
      const { data, error } = await supabase.rpc("get_public_homepage");

      if (error || !data) {
        console.warn("[SupabaseHomeRepository] RPC error or empty data:", error?.message);
        return HomeMapper.toEntity({}, locale);
      }

      return HomeMapper.toEntity(data as PublicHomepageRpcDto, locale);
    } catch (err) {
      console.error("[SupabaseHomeRepository] Exception calling get_public_homepage:", err);
      return HomeMapper.toEntity({}, locale);
    }
  }
}
