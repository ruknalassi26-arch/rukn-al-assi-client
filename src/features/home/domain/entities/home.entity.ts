export interface HeroSlideEntity {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  videoUrl?: string | null;
  backgroundImage?: string | null;
  overlayOpacity: number;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText?: string | null;
  secondaryButtonUrl?: string | null;
}

export interface LanguageEntity {
  code: string;
  name: string;
  nativeName: string;
  isRtl: boolean;
  isDefault: boolean;
  sortOrder: number;
}

export interface CompanyStatEntity {
  id: string;
  value: string;
  label: string;
  iconName?: string;
}

export interface AboutPreviewEntity {
  title: string;
  eyebrow: string;
  description: string;
  history?: string;
  mission?: string;
  vision?: string;
  highlights: string[];
  imageUrl?: string | null;
  ctaText: string;
  ctaUrl: string;
}

export interface ServicePreviewEntity {
  id: string;
  slug: string;
  name: string;
  description: string;
  applications?: string;
  icon: string;
  imageUrl?: string | null;
}

export interface ProjectPreviewEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  clientName?: string | null;
  location?: string | null;
  completionDate?: string | null;
  imageUrl?: string | null;
}

export interface ClientPreviewEntity {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string | null;
}

export interface CertificationPreviewEntity {
  id: string;
  title: string;
  description?: string | null;
  issuedBy?: string | null;
  issuedDate?: string | null;
  imageUrl?: string | null;
}

export interface HomeCtaEntity {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
}

export interface HomePageEntity {
  hero: HeroSlideEntity;
  languages: LanguageEntity[];
  stats: CompanyStatEntity[];
  about: AboutPreviewEntity;
  services: ServicePreviewEntity[];
  featuredProjects: ProjectPreviewEntity[];
  clients: ClientPreviewEntity[];
  certifications: CertificationPreviewEntity[];
  cta: HomeCtaEntity;
  brandSettings: {
    siteName: string;
    companyName: string;
    tagline: string;
    logoUrl: string;
    contactPhone: string;
    contactEmail: string;
    whatsappNumber: string;
    address: string;
  };
}
