import {
  HomePageEntity,
  HeroSlideEntity,
  LanguageEntity,
  CompanyStatEntity,
  AboutPreviewEntity,
  ServicePreviewEntity,
  ProjectPreviewEntity,
  ClientPreviewEntity,
  CertificationPreviewEntity,
  HomeCtaEntity,
} from "../../domain/entities/home.entity";
import {
  HomePageRawDto,
  ServiceTranslationRow,
  ProjectTranslationRow,
  ClientTranslationRow,
  CertificationTranslationRow,
} from "../dto/home.dto";

interface RawSlide {
  id?: string;
  is_active?: boolean;
  title_en?: string;
  title_ar?: string;
  title_ku?: string;
  subtitle_en?: string;
  subtitle_ar?: string;
  subtitle_ku?: string;
  body_en?: string;
  body_ar?: string;
  body_ku?: string;
  primary_button_text_en?: string;
  primary_button_text_ar?: string;
  primary_button_text_ku?: string;
  primary_button_url?: string;
  secondary_button_text_en?: string;
  secondary_button_text_ar?: string;
  secondary_button_text_ku?: string;
  secondary_button_url?: string;
  background_image?: string;
  video_url?: string;
  video_poster_url?: string;
  overlay_opacity?: number;
}

export class HomeMapper {
  private static getDbLangCodes(locale: string): string[] {
    if (locale === "ckb") {
      return ["ku", "ar", "en"];
    }
    if (locale === "ar") {
      return ["ar", "en"];
    }
    return ["en", "ar"];
  }

  private static getSettingValue(
    settings: { key: string; value: string }[],
    key: string,
    defaultValue = ""
  ): string {
    const found = settings.find((s) => s.key === key);
    return found && found.value ? found.value : defaultValue;
  }

  private static getLocalizedField<T extends Record<string, unknown>>(
    obj: T | undefined | null,
    baseField: string,
    locale: string
  ): string {
    if (!obj) return "";
    const langKey = locale === "ckb" ? "ku" : locale;
    const directKey = `${baseField}_${langKey}`;
    if (obj[directKey]) return String(obj[directKey]);

    const arKey = `${baseField}_ar`;
    if (obj[arKey]) return String(obj[arKey]);

    const enKey = `${baseField}_en`;
    if (obj[enKey]) return String(obj[enKey]);

    return "";
  }

  static toEntity(dto: HomePageRawDto, locale: string): HomePageEntity {
    const dbLangCodes = this.getDbLangCodes(locale);
    const langKey = locale === "ckb" ? "ku" : locale;

    // 0. Dynamic Languages directly from Backend
    const languages: LanguageEntity[] = (dto.languages || []).map((l) => ({
      code: l.code === "ku" ? "ckb" : l.code,
      name: l.name,
      nativeName: l.native_name,
      isRtl: l.is_rtl,
      isDefault: l.is_default,
      sortOrder: l.sort_order,
    }));

    // 1. Dynamic Settings Map
    const siteName =
      this.getSettingValue(dto.settings, `company_name_${langKey}`) ||
      this.getSettingValue(dto.settings, "company_name_en") ||
      process.env.NEXT_PUBLIC_APP_NAME ||
      "";

    const tagline =
      this.getSettingValue(dto.settings, `tagline_${langKey}`) ||
      this.getSettingValue(dto.settings, "tagline_en") ||
      "";

    const logoUrl =
      this.getSettingValue(dto.settings, "logo_url") ||
      this.getSettingValue(dto.settings, "logo_dark_url") ||
      "";

    const contactPhone = this.getSettingValue(dto.settings, "contact_phone") || "";
    const contactEmail = this.getSettingValue(dto.settings, "contact_email") || "";
    const whatsappNumber = this.getSettingValue(dto.settings, "whatsapp_number") || "";

    const address =
      this.getSettingValue(dto.settings, `address_${langKey}`) ||
      this.getSettingValue(dto.settings, "address_en") ||
      this.getSettingValue(dto.settings, "address_ar") ||
      "";

    // 2. Dynamic Hero Section
    const heroSectionRow = dto.sections.find((s) => s.section_key === "hero");
    const heroSettings = (heroSectionRow?.settings || {}) as {
      slides?: RawSlide[];
      background_image?: string;
      video_url?: string | null;
      video_poster_url?: string | null;
      title_en?: string;
      title_ar?: string;
      title_ku?: string;
      subtitle_en?: string;
      subtitle_ar?: string;
      subtitle_ku?: string;
      body_en?: string;
      body_ar?: string;
      body_ku?: string;
      primary_button_text_en?: string;
      primary_button_text_ar?: string;
      primary_button_text_ku?: string;
      primary_button_url?: string;
      secondary_button_text_en?: string;
      secondary_button_text_ar?: string;
      secondary_button_text_ku?: string;
      secondary_button_url?: string;
      overlay_opacity?: number;
    };

    const slides = Array.isArray(heroSettings.slides) ? heroSettings.slides : [];
    const activeSlide: RawSlide =
      slides.find((s) => s.is_active !== false) || slides[0] || (heroSettings as RawSlide) || {};

    const heroTitle =
      this.getLocalizedField(activeSlide as Record<string, unknown>, "title", locale) ||
      this.getLocalizedField(heroSettings as Record<string, unknown>, "title", locale) ||
      siteName;

    const heroSubtitle =
      this.getLocalizedField(activeSlide as Record<string, unknown>, "subtitle", locale) ||
      this.getLocalizedField(heroSettings as Record<string, unknown>, "subtitle", locale) ||
      tagline;

    const heroBody =
      this.getLocalizedField(activeSlide as Record<string, unknown>, "body", locale) ||
      this.getLocalizedField(heroSettings as Record<string, unknown>, "body", locale) ||
      "";

    const heroPrimaryText =
      this.getLocalizedField(
        activeSlide as Record<string, unknown>,
        "primary_button_text",
        locale
      ) ||
      this.getLocalizedField(
        heroSettings as Record<string, unknown>,
        "primary_button_text",
        locale
      ) ||
      "";

    const heroPrimaryUrl =
      activeSlide.primary_button_url || heroSettings.primary_button_url || "/services";

    const heroSecondaryText =
      this.getLocalizedField(
        activeSlide as Record<string, unknown>,
        "secondary_button_text",
        locale
      ) ||
      this.getLocalizedField(
        heroSettings as Record<string, unknown>,
        "secondary_button_text",
        locale
      ) ||
      "";

    const heroSecondaryUrl =
      activeSlide.secondary_button_url || heroSettings.secondary_button_url || "/projects";

    const heroBgImage =
      activeSlide.background_image ||
      activeSlide.video_poster_url ||
      heroSettings.background_image ||
      heroSettings.video_poster_url ||
      null;

    const heroVideoUrl = activeSlide.video_url || heroSettings.video_url || null;

    const hero: HeroSlideEntity = {
      id: activeSlide.id || heroSectionRow?.id || "hero",
      eyebrow: siteName,
      title: heroTitle,
      subtitle: heroSubtitle,
      body: heroBody,
      videoUrl: heroVideoUrl,
      backgroundImage: heroBgImage,
      overlayOpacity:
        typeof activeSlide.overlay_opacity === "number"
          ? activeSlide.overlay_opacity
          : typeof heroSettings.overlay_opacity === "number"
          ? heroSettings.overlay_opacity
          : 40,
      primaryButtonText: heroPrimaryText,
      primaryButtonUrl: heroPrimaryUrl,
      secondaryButtonText: heroSecondaryText,
      secondaryButtonUrl: heroSecondaryUrl,
    };

    // 3. Dynamic Stats Section
    const foundedYearStr = this.getSettingValue(dto.settings, "founded_year", "");
    const foundedYear = foundedYearStr ? parseInt(foundedYearStr, 10) : null;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience =
      foundedYear && !isNaN(foundedYear) ? Math.max(1, currentYear - foundedYear) : null;

    const stats: CompanyStatEntity[] = [];
    if (yearsOfExperience) {
      stats.push({
        id: "stat-years",
        value: `+${yearsOfExperience}`,
        label:
          locale === "ar"
            ? "سنوات من الخبرة والتميز"
            : locale === "ckb"
            ? "ساڵ لە ئەزموون و پێشەنگی"
            : "Years of Experience",
        iconName: "Clock",
      });
    }

    // 4. Dynamic About Preview Section
    const aboutSectionRow = dto.sections.find((s) => s.section_key === "about");
    const aboutSettings = (aboutSectionRow?.settings || {}) as {
      highlights?: Record<string, string[]>;
      image_url?: string;
    };
    const highlightsObj = aboutSettings.highlights || {};
    const localizedHighlights: string[] =
      highlightsObj[langKey] || highlightsObj.en || highlightsObj.ar || [];

    const profileTr = dto.companyProfileTranslations.find((tr) =>
      dbLangCodes.includes(tr.language_code)
    );

    const about: AboutPreviewEntity = {
      eyebrow: siteName,
      title:
        this.getLocalizedField(
          aboutSectionRow as unknown as Record<string, unknown>,
          "title",
          locale
        ) ||
        (locale === "ar" ? "نبذة عنا" : locale === "ckb" ? "دەربارەی ئێمە" : "About Us"),
      description:
        this.getSettingValue(dto.settings, `description_${langKey}`) ||
        this.getSettingValue(dto.settings, "description_en") ||
        this.getSettingValue(dto.settings, "description_ar") ||
        "",
      history: profileTr?.history,
      mission:
        profileTr?.mission ||
        this.getSettingValue(dto.settings, `mission_${langKey}`) ||
        this.getSettingValue(dto.settings, "mission_en") ||
        this.getSettingValue(dto.settings, "mission_ar"),
      vision:
        profileTr?.vision ||
        this.getSettingValue(dto.settings, `vision_${langKey}`) ||
        this.getSettingValue(dto.settings, "vision_en") ||
        this.getSettingValue(dto.settings, "vision_ar"),
      highlights: localizedHighlights,
      imageUrl:
        aboutSettings.image_url ||
        this.getSettingValue(dto.settings, "about_image_url") ||
        null,
      ctaText:
        locale === "ar"
          ? "المزيد عن الشركة"
          : locale === "ckb"
          ? "زیاتر بزانە"
          : "Learn More",
      ctaUrl: "/about",
    };

    // 5. Dynamic Featured Services
    const services: ServicePreviewEntity[] = dto.services.map((srv) => {
      const tr: ServiceTranslationRow =
        dto.serviceTranslations.find(
          (t) => t.service_id === srv.id && dbLangCodes.includes(t.language_code)
        ) ||
        dto.serviceTranslations.find((t) => t.service_id === srv.id) || {
          service_id: srv.id,
          language_code: locale,
          slug: srv.id,
          name: "",
          description: "",
        };

      return {
        id: srv.id,
        slug: tr.slug || srv.id,
        name: tr.name,
        description: tr.description,
        applications: tr.applications,
        icon: srv.icon || "Wrench",
        imageUrl: srv.hero_image_url || null,
      };
    });

    // 6. Dynamic Featured Projects
    const featuredProjects: ProjectPreviewEntity[] = dto.projects.map((prj) => {
      const tr: ProjectTranslationRow =
        dto.projectTranslations.find(
          (t) => t.project_id === prj.id && dbLangCodes.includes(t.language_code)
        ) ||
        dto.projectTranslations.find((t) => t.project_id === prj.id) || {
          project_id: prj.id,
          language_code: locale,
          slug: prj.id,
          title: "",
          description: "",
        };

      const prjImg = dto.projectImages.find((img) => img.project_id === prj.id);

      return {
        id: prj.id,
        slug: tr.slug || prj.id,
        title: tr.title,
        description: tr.description,
        clientName: prj.client_name,
        location: prj.location,
        completionDate: prj.completion_date,
        imageUrl: prjImg?.image_url || null,
      };
    });

    // 7. Dynamic Clients
    const clients: ClientPreviewEntity[] = dto.clients.map((cl) => {
      const tr: ClientTranslationRow =
        dto.clientTranslations.find(
          (t) => t.client_id === cl.id && dbLangCodes.includes(t.language_code)
        ) ||
        dto.clientTranslations.find((t) => t.client_id === cl.id) || {
          client_id: cl.id,
          language_code: locale,
          name: "",
        };

      return {
        id: cl.id,
        name: tr.name,
        logoUrl: cl.logo_url,
        websiteUrl: cl.website_url,
      };
    });

    // 8. Dynamic Certifications
    const certifications: CertificationPreviewEntity[] = dto.certifications.map((cert) => {
      const tr: CertificationTranslationRow =
        dto.certificationTranslations.find(
          (t) => t.certification_id === cert.id && dbLangCodes.includes(t.language_code)
        ) ||
        dto.certificationTranslations.find((t) => t.certification_id === cert.id) || {
          certification_id: cert.id,
          language_code: locale,
          title: "",
          description: null,
        };

      return {
        id: cert.id,
        title: tr.title,
        description: tr.description,
        issuedBy: cert.issued_by,
        issuedDate: cert.issued_date,
        imageUrl: cert.image_url,
      };
    });

    // 9. Dynamic CTA Section
    const ctaSectionRow = dto.sections.find((s) => s.section_key === "contact_cta");
    const ctaSettings = (ctaSectionRow?.settings || {}) as Record<string, unknown>;

    const cta: HomeCtaEntity = {
      eyebrow:
        this.getLocalizedField(ctaSettings, "eyebrow", locale) ||
        (locale === "ar"
          ? "تواصل معنا"
          : locale === "ckb"
          ? "پەیوەندیمان پێوە بکەن"
          : "Get In Touch"),
      title:
        this.getLocalizedField(ctaSettings, "title", locale) ||
        (locale === "ar"
          ? "دعنا نناقش مشروعك القادم"
          : locale === "ckb"
          ? "با پێکەوە پرۆژەی داهاتووت دەستپێبکەین"
          : "Let's Build Your Next Project"),
      description:
        this.getLocalizedField(ctaSettings, "description", locale) ||
        this.getSettingValue(dto.settings, `tagline_${langKey}`) ||
        this.getSettingValue(dto.settings, "tagline_en") ||
        "",
      primaryButtonText:
        this.getLocalizedField(ctaSettings, "primary_button_text", locale) ||
        (locale === "ar" ? "طلب عرض سعر" : locale === "ckb" ? "داواکردنی نرخ" : "Request a Quote"),
      primaryButtonUrl: (ctaSettings.primary_button_url as string) || "/rfq",
      secondaryButtonText:
        this.getLocalizedField(ctaSettings, "secondary_button_text", locale) ||
        (locale === "ar" ? "اتصل بنا" : locale === "ckb" ? "پەیوەندی" : "Contact Us"),
      secondaryButtonUrl: (ctaSettings.secondary_button_url as string) || "/contact",
    };

    return {
      hero,
      languages,
      stats,
      about,
      services,
      featuredProjects,
      clients,
      certifications,
      cta,
      brandSettings: {
        siteName,
        companyName: siteName,
        tagline,
        logoUrl,
        contactPhone,
        contactEmail,
        whatsappNumber,
        address,
      },
    };
  }
}
