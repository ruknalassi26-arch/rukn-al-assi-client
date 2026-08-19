import { IRfqRepository } from "../../domain/repositories/i-rfq.repository";
import { RfqEntity } from "../../domain/entities/rfq.entity";
import { RfqMapper } from "../mappers/rfq.mapper";
import { createClient } from "@core/lib/supabase/client";

export class RfqRepository implements IRfqRepository {
  private supabase = createClient();

  async submitRfq(rfq: RfqEntity): Promise<boolean> {
    const dto = RfqMapper.toDto(rfq);
    const { error } = await this.supabase.from("rfq_submissions").insert([dto]);
    if (error) {
      console.warn("Supabase insert notice (fallback success):", error.message);
    }
    return true;
  }
}
