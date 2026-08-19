export interface HomepageSectionRow {
  id: string;
  section_key: string;
  is_visible: boolean;
  sort_order: number;
  settings: Record<string, unknown>;
}

export interface SettingRow {
  key: string;
  value: string;
  category: string;
  value_type: string;
  description: string;
}

export interface LanguageRow {
  code: string;
  name: string;
  native_name: string;
  is_rtl: boolean;
  is_required: boolean;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceRow {
  id: string;
  icon: string;
  hero_image_url: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number;
  sort_order: number;
}

export interface ServiceTranslationRow {
  service_id: string;
  language_code: string;
  slug: string;
  name: string;
  description: string;
  applications?: string;
}

export interface ProjectRow {
  id: string;
  category_id: string | null;
  client_name: string | null;
  location: string | null;
  completion_date: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number;
  sort_order: number;
}

export interface ProjectTranslationRow {
  project_id: string;
  language_code: string;
  slug: string;
  title: string;
  description: string;
  challenge?: string;
  solution?: string;
}

export interface ProjectImageRow {
  id: string;
  project_id: string;
  image_url: string;
  sort_order: number;
}

export interface ClientRow {
  id: string;
  logo_url: string;
  website_url: string | null;
  sort_order: number;
  status: string;
}

export interface ClientTranslationRow {
  client_id: string;
  language_code: string;
  name: string;
}

export interface CertificationRow {
  id: string;
  image_url: string | null;
  issued_by: string | null;
  issued_date: string | null;
  sort_order: number;
  status: string;
}

export interface CertificationTranslationRow {
  certification_id: string;
  language_code: string;
  title: string;
  description: string | null;
}

export interface CompanyProfileTranslationRow {
  company_profile_id: number;
  language_code: string;
  history?: string;
  mission?: string;
  vision?: string;
}

export interface HomePageRawDto {
  sections: HomepageSectionRow[];
  settings: SettingRow[];
  languages: LanguageRow[];
  services: ServiceRow[];
  serviceTranslations: ServiceTranslationRow[];
  projects: ProjectRow[];
  projectTranslations: ProjectTranslationRow[];
  projectImages: ProjectImageRow[];
  clients: ClientRow[];
  clientTranslations: ClientTranslationRow[];
  certifications: CertificationRow[];
  certificationTranslations: CertificationTranslationRow[];
  companyProfileTranslations: CompanyProfileTranslationRow[];
}
