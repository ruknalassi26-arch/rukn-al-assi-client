export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string;
          created_at: string;
          title_en: string;
          title_ar: string;
          slug: string;
          description_en: string;
          description_ar: string;
          image_url: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          title_en: string;
          title_ar: string;
          slug: string;
          client_name: string | null;
          category: string;
          image_url: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      rfq_submissions: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          phone: string;
          company_name: string | null;
          service_id: string | null;
          details: string;
          attachment_url: string | null;
          status: "pending" | "reviewed" | "quoted" | "closed";
        };
        Insert: Omit<Database["public"]["Tables"]["rfq_submissions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["rfq_submissions"]["Insert"]>;
      };
    };
  };
}
