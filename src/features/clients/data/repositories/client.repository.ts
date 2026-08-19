import { IClientRepository } from "../../domain/repositories/i-client.repository";
import { ClientEntity } from "../../domain/entities/client.entity";
import { ClientMapper } from "../mappers/client.mapper";
import { createClient } from "@core/lib/supabase/client";

export class ClientRepository implements IClientRepository {
  private supabase = createClient();

  async getClients(): Promise<ClientEntity[]> {
    const { data: clients } = await this.supabase
      .from("clients")
      .select("id, logo_url, website_url, sort_order, status")
      .eq("status", "published")
      .is("deleted_at", null)
      .order("sort_order", { ascending: true });

    const { data: translations } = await this.supabase
      .from("client_translations")
      .select("client_id, language_code, name");

    if (!clients || clients.length === 0) return [];

    return clients.map((cl) => {
      const trEn = translations?.find((t) => t.client_id === cl.id && t.language_code === "en");
      const trAr = translations?.find((t) => t.client_id === cl.id && t.language_code === "ar");

      return ClientMapper.toEntity({
        id: cl.id,
        name_en: trEn?.name || trAr?.name || "",
        name_ar: trAr?.name || trEn?.name || "",
        sector_en: "",
        sector_ar: "",
      });
    });
  }
}
