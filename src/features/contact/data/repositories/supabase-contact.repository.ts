import { IContactRepository } from "../../domain/repositories/i-contact.repository";
import {
  ContactPageEntity,
  ContactMessageInputEntity,
  ContactSubmitResultEntity,
} from "../../domain/entities/contact.entity";
import { ContactMapper } from "../mappers/contact.mapper";
import { RpcContactPageResponseDto, RpcSubmitContactResponseDto } from "../dto/contact.dto";
import { createClient } from "@supabase/supabase-js";

export class SupabaseContactRepository implements IContactRepository {
  private getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async getContactPage(language: string = "en"): Promise<ContactPageEntity> {
    const supabase = this.getSupabase();
    const langCode = language === "ckb" ? "ku" : language;

    try {
      const { data, error } = await supabase.rpc("get_public_contact_page", {
        p_language_code: langCode,
      });

      if (error || !data) {
        console.error("[SupabaseContactRepository] Error calling get_public_contact_page:", error?.message);
        return { branches: [], language };
      }

      return ContactMapper.toContactPageEntity(data as RpcContactPageResponseDto);
    } catch (err) {
      console.error("[SupabaseContactRepository] Exception in getContactPage:", err);
      return { branches: [], language };
    }
  }

  async submitMessage(input: ContactMessageInputEntity): Promise<ContactSubmitResultEntity> {
    const supabase = this.getSupabase();

    try {
      const { data, error } = await supabase.rpc("submit_contact_message", {
        p_full_name: input.fullName.trim(),
        p_email: input.email && input.email.trim() ? input.email.trim() : null,
        p_phone: input.phone && input.phone.trim() ? input.phone.trim() : null,
        p_subject: input.subject && input.subject.trim() ? input.subject.trim() : null,
        p_message: input.message.trim(),
      });

      if (error) {
        console.error("[SupabaseContactRepository] Error submitting message:", error.message);
        return {
          success: false,
          message: error.message || "Failed to submit message",
        };
      }

      const res = data as RpcSubmitContactResponseDto;
      return {
        success: res?.success ?? true,
        message: res?.message ?? "Message submitted successfully",
      };
    } catch (err) {
      console.error("[SupabaseContactRepository] Exception in submitMessage:", err);
      return {
        success: false,
        message: err instanceof Error ? err.message : "Failed to submit message",
      };
    }
  }
}
