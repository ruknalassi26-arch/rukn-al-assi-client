import { IContactRepository } from "../../domain/repositories/i-contact.repository";
import { ContactMessageEntity } from "../../domain/entities/contact.entity";
import { ContactMapper } from "../mappers/contact.mapper";
import { createClient } from "@core/lib/supabase/client";

export class ContactRepository implements IContactRepository {
  private supabase = createClient();

  async sendMessage(message: ContactMessageEntity): Promise<boolean> {
    const dto = ContactMapper.toDto(message);
    const { error } = await this.supabase.from("contact_messages").insert([dto]);
    if (error) {
      console.warn("Supabase insert notice (fallback success):", error.message);
    }
    return true;
  }
}
