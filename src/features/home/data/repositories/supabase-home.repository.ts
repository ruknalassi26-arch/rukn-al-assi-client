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
      // 1. Fetch RPC and Settings table in parallel
      const [rpcRes, settingsRes] = await Promise.all([
        supabase.rpc("get_public_homepage"),
        supabase.from("settings").select("key, value"),
      ]);

      const rpcData = (rpcRes.data || {}) as PublicHomepageRpcDto;

      // 2. Map database settings table rows into a key-value dictionary
      if (settingsRes.data && Array.isArray(settingsRes.data)) {
        const settingsMap: Record<string, string> = {};
        for (const row of settingsRes.data) {
          if (row.key && typeof row.value === "string") {
            settingsMap[row.key] = row.value;
          }
        }
        rpcData.settings = { ...settingsMap, ...(rpcData.settings || {}) };
      }

      return HomeMapper.toEntity(rpcData, locale);
    } catch (err) {
      console.error("[SupabaseHomeRepository] Exception calling homepage data:", err);
      return HomeMapper.toEntity({}, locale);
    }
  }
}
