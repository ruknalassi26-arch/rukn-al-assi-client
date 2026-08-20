export interface PublicHomepageRpcDto {
  homepageSections?: Array<{
    id: string;
    sectionKey?: string;
    section_key?: string;
    isVisible?: boolean;
    is_visible?: boolean;
    sortOrder?: number;
    sort_order?: number;
    settings: Record<string, unknown>;
  }>;
  stats?: Array<{
    id: string;
    icon?: string;
    number_value?: string;
    sort_order?: number;
    status?: string;
    deleted_at?: string | null;
  }>;
  statTranslations?: Array<{
    stat_id: string;
    language_code: string;
    label: string;
  }>;
  services?: Array<{
    id: string;
    icon?: string;
    hero_image_url?: string | null;
    status?: string;
    is_featured?: boolean;
    featured_order?: number;
    sort_order?: number;
    deleted_at?: string | null;
  }>;
  serviceTranslations?: Array<{
    service_id: string;
    language_code: string;
    slug?: string;
    name?: string;
    description?: string;
    applications?: string;
  }>;
  projects?: Array<{
    id: string;
    categoryId?: string | null;
    category_id?: string | null;
    clientName?: string | null;
    client_name?: string | null;
    location?: string | null;
    completionDate?: string | null;
    completion_date?: string | null;
    status?: string;
    isFeatured?: boolean;
    is_featured?: boolean;
    featuredOrder?: number;
    featured_order?: number;
    sortOrder?: number;
    sort_order?: number;
    deleted_at?: string | null;
    images?: string[];
  }>;
  projectTranslations?: Array<{
    project_id: string;
    language_code: string;
    slug?: string;
    title?: string;
    description?: string;
    challenge?: string;
    solution?: string;
  }>;
  clients?: Array<{
    id: string;
    logo_url?: string;
    website_url?: string | null;
    sort_order?: number;
    status?: string;
    deleted_at?: string | null;
  }>;
  clientTranslations?: Array<{
    client_id: string;
    language_code: string;
    name?: string;
  }>;
  certifications?: Array<{
    id: string;
    image_url?: string | null;
    issued_by?: string | null;
    issued_date?: string | null;
    sort_order?: number;
    status?: string;
    deleted_at?: string | null;
  }>;
  certificationTranslations?: Array<{
    certification_id: string;
    language_code: string;
    title?: string;
    description?: string | null;
  }>;
  branches?: Array<{
    id: string;
    map_lat?: number;
    map_lng?: number;
    phone?: string;
    email?: string;
    whatsapp_number?: string;
    sort_order?: number;
    status?: string;
    deleted_at?: string | null;
  }>;
  branchTranslations?: Array<{
    branch_id: string;
    language_code: string;
    name?: string;
    address?: string;
    city?: string;
  }>;
  languages?: Array<{
    code: string;
    name: string;
    native_name: string;
    is_rtl: boolean;
    is_required: boolean;
    is_default: boolean;
    is_active: boolean;
    sort_order: number;
  }>;
  socialLinks?: Array<{
    id: string;
    platform: string;
    url: string;
    status?: string;
    sort_order?: number;
  }>;
  seoMeta?: Array<Record<string, unknown>>;
  settings?: Record<string, string>;
  companyProfile?: {
    id?: number;
    translations?: Array<{
      company_profile_id?: number;
      language_code: string;
      history?: string;
      mission?: string;
      vision?: string;
    }>;
  };
}

export type HomePageRawDto = PublicHomepageRpcDto;
