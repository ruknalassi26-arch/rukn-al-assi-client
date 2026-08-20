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
  BrandSettingsEntity,
  BranchEntity,
} from "../../domain/entities/home.entity";
import { PublicHomepageRpcDto } from "../dto/home.dto";

export class HomeMapper {
  private static getLangKey(locale: string): "en" | "ar" | "ku" {
    if (locale === "ckb" || locale === "ku") return "ku";
    if (locale === "ar") return "ar";
    return "en";
  }

  private static getLocalizedSetting(
    settings: Record<string, string> | undefined,
    baseKey: string,
    langKey: "en" | "ar" | "ku",
    fallback = ""
  ): string {
    if (!settings) return fallback;
    return (
      settings[`${baseKey}_${langKey}`] ||
      settings[`${baseKey}_en`] ||
      settings[`${baseKey}_ar`] ||
      settings[baseKey] ||
      fallback
    );
  }

  private static getStringSetting(settings: Record<string, unknown> | undefined, key: string, fallback = ""): string {
    if (!settings || typeof settings[key] !== "string") return fallback;
    return (settings[key] as string) || fallback;
  }

  static toEntity(dto: PublicHomepageRpcDto, locale: string): HomePageEntity {
    const langKey = this.getLangKey(locale);
    const dbLangCodes = langKey === "ku" ? ["ku", "ckb"] : [langKey];
    const settings = dto.settings || {};

    // 1. Branches & Fallback Contacts
    const branches: BranchEntity[] = (dto.branches || [])
      .filter((b) => !b.status || b.status === "published")
      .map((b) => {
        const tr = (dto.branchTranslations || []).find(
          (t) => t.branch_id === b.id && dbLangCodes.includes(t.language_code)
        ) || (dto.branchTranslations || []).find((t) => t.branch_id === b.id);

        return {
          id: b.id,
          name: tr?.name || "",
          address: tr?.address || "",
          city: tr?.city || "",
          phone: b.phone,
          email: b.email,
          whatsapp: b.whatsapp_number,
        };
      });

    const primaryBranch = branches[0];

    // 2. Social Links from RPC
    const socialLinks: Array<{ platform: string; url: string }> = [];
    if (settings["facebook_url"]) socialLinks.push({ platform: "facebook", url: settings["facebook_url"] });
    if (settings["twitter_url"]) socialLinks.push({ platform: "twitter", url: settings["twitter_url"] });
    if (settings["linkedin_url"]) socialLinks.push({ platform: "linkedin", url: settings["linkedin_url"] });
    if (settings["instagram_url"]) socialLinks.push({ platform: "instagram", url: settings["instagram_url"] });
    if (settings["youtube_url"]) socialLinks.push({ platform: "youtube", url: settings["youtube_url"] });

    if (dto.socialLinks && dto.socialLinks.length > 0) {
      for (const sl of dto.socialLinks) {
        if (sl.url && !socialLinks.some((x) => x.platform === sl.platform)) {
          socialLinks.push({ platform: sl.platform, url: sl.url });
        }
      }
    }

    // 3. Brand Settings
    const siteName =
      this.getLocalizedSetting(settings, "site_name", langKey) ||
      this.getLocalizedSetting(settings, "legal_name", langKey) ||
      "Rukn Al Assi";

    const tagline = this.getLocalizedSetting(settings, "tagline", langKey) || "";
    const logoUrl = settings["logo_url"] || "";
    const logoDarkUrl = settings["logo_dark_url"] || "";
    const contactPhone = settings["contact_phone"] || primaryBranch?.phone || "+964 750 000 11111";
    const phoneSecondary = settings["phone_secondary"] || "";
    const contactEmail = settings["contact_email"] || primaryBranch?.email || "info@ruknalassi.com";
    const whatsappNumber = settings["whatsapp_number"] || primaryBranch?.whatsapp || "";
    const address = this.getLocalizedSetting(settings, "address", langKey) || primaryBranch?.address || (locale === "ar" ? "أربيل، العراق" : locale === "ckb" ? "هەولێر، عێراق" : "Erbil, Iraq");
    const workingHours = this.getLocalizedSetting(settings, "working_hours", langKey) || (locale === "ar" ? "الإثنين - السبت: 8:00 ص - 5:00 م" : locale === "ckb" ? "دووشەممە - شەممە: ٨:٠٠ ب - ٥:٠٠ د" : "Mon - Sat: 8:00 AM - 5:00 PM");

    const brandSettings: BrandSettingsEntity = {
      siteName,
      companyName: siteName,
      tagline,
      logoUrl,
      logoDarkUrl,
      contactPhone,
      phoneSecondary,
      contactEmail,
      whatsappNumber,
      address,
      workingHours,
      facebookUrl: settings["facebook_url"],
      twitterUrl: settings["twitter_url"],
      linkedinUrl: settings["linkedin_url"],
      instagramUrl: settings["instagram_url"],
      youtubeUrl: settings["youtube_url"],
      branches,
      socialLinks,
    };

    // 4. Languages
    const languages: LanguageEntity[] = (dto.languages || []).map((lang) => ({
      code: lang.code,
      name: lang.name,
      nativeName: lang.native_name,
      isRtl: Boolean(lang.is_rtl),
      isDefault: Boolean(lang.is_default),
      sortOrder: lang.sort_order ?? 0,
    }));

    // 5. Hero Section
    const heroSectionRow = (dto.homepageSections || []).find(
      (s) => (s.sectionKey === "hero" || s.section_key === "hero") && s.isVisible !== false && s.is_visible !== false
    );
    const heroSettings = (heroSectionRow?.settings || {}) as Record<string, unknown>;

    const heroTitle =
      this.getStringSetting(heroSettings, `title_${langKey}`) ||
      this.getStringSetting(heroSettings, "title_en") ||
      this.getStringSetting(heroSettings, "title_ar") ||
      (locale === "ar" ? "ركن العاصي للخدمات الهندسية" : locale === "ckb" ? "ڕوکن ئەلعاسی بۆ خزمەتگوزاری ئەندازیاری" : "Rukn Al Assi Industrial Solutions");

    const heroSubtitle =
      this.getStringSetting(heroSettings, `subtitle_${langKey}`) ||
      this.getStringSetting(heroSettings, "subtitle_en") ||
      this.getStringSetting(heroSettings, "subtitle_ar") ||
      "";

    const heroBody =
      this.getStringSetting(heroSettings, `body_${langKey}`) ||
      this.getStringSetting(heroSettings, "body_en") ||
      this.getStringSetting(heroSettings, "body_ar") ||
      "";

    const heroPrimaryText =
      this.getStringSetting(heroSettings, `primary_button_text_${langKey}`) ||
      this.getStringSetting(heroSettings, "primary_button_text_en") ||
      this.getStringSetting(heroSettings, "primary_button_text_ar") ||
      (locale === "ar" ? "استكشف خدماتنا" : locale === "ckb" ? "خزمەتگوزارییەکان ببینە" : "Explore Services");

    const heroSecondaryText =
      this.getStringSetting(heroSettings, `secondary_button_text_${langKey}`) ||
      this.getStringSetting(heroSettings, "secondary_button_text_en") ||
      this.getStringSetting(heroSettings, "secondary_button_text_ar") ||
      (locale === "ar" ? "طلب عرض سعر" : locale === "ckb" ? "داواکردنی نرخ" : "Request a Quote");

    const heroVideoUrl = this.getStringSetting(heroSettings, "video_url") || null;
    const heroPosterUrl = this.getStringSetting(heroSettings, "video_poster_url") || null;
    const heroMobileUrl = this.getStringSetting(heroSettings, "video_mobile_url") || heroVideoUrl;
    const heroBgImage = heroPosterUrl || this.getStringSetting(heroSettings, "background_image") || null;
    const heroOpacity = typeof heroSettings.overlay_opacity === "number" ? heroSettings.overlay_opacity : 60;
    const heroPrimaryUrl = this.getStringSetting(heroSettings, "primary_button_url", "/services");
    const heroSecondaryUrl = this.getStringSetting(heroSettings, "secondary_button_url", "/rfq");

    const hero: HeroSlideEntity = {
      id: heroSectionRow?.id || "hero-main",
      eyebrow: siteName,
      title: heroTitle,
      subtitle: heroSubtitle,
      body: heroBody,
      videoUrl: heroVideoUrl,
      videoPosterUrl: heroPosterUrl,
      videoMobileUrl: heroMobileUrl,
      backgroundImage: heroBgImage,
      overlayOpacity: heroOpacity,
      primaryButtonText: heroPrimaryText,
      primaryButtonUrl: heroPrimaryUrl,
      secondaryButtonText: heroSecondaryText,
      secondaryButtonUrl: heroSecondaryUrl,
    };

    // 6. Stats
    const stats: CompanyStatEntity[] = (dto.stats || [])
      .filter((s) => !s.status || s.status === "published")
      .map((s) => {
        const tr = (dto.statTranslations || []).find(
          (t) => t.stat_id === s.id && dbLangCodes.includes(t.language_code)
        ) || (dto.statTranslations || []).find((t) => t.stat_id === s.id);

        return {
          id: s.id,
          value: s.number_value || "",
          label: tr?.label || "",
          iconName: s.icon || "ShieldCheck",
        };
      });

    // 7. About Section
    const aboutSectionRow = (dto.homepageSections || []).find(
      (s) => (s.sectionKey === "about" || s.section_key === "about") && s.isVisible !== false && s.is_visible !== false
    );
    const aboutSettings = (aboutSectionRow?.settings || {}) as Record<string, unknown>;

    const profileTr = (dto.companyProfile?.translations || []).find((t) =>
      dbLangCodes.includes(t.language_code)
    ) || (dto.companyProfile?.translations || [])[0];

    const aboutTitle =
      this.getStringSetting(aboutSettings, `title_${langKey}`) ||
      this.getStringSetting(aboutSettings, "title_en") ||
      this.getStringSetting(aboutSettings, "title_ar") ||
      (locale === "ar" ? "حلول هندسية وصناعية متكاملة" : locale === "ckb" ? "چارەسەری ئەندازیاری و پیشەسازی" : "Engineering & Industrial Excellence");

    const aboutDesc =
      this.getStringSetting(aboutSettings, `description_${langKey}`) ||
      this.getStringSetting(aboutSettings, "description_en") ||
      this.getStringSetting(aboutSettings, "description_ar") ||
      this.getLocalizedSetting(settings, "description", langKey) ||
      profileTr?.history ||
      (locale === "ar" ? "نقدم أعلى مستويات الدقة الهندسية والتوريدات الصناعية المتطورة لدعم المشاريع الكبرى." : locale === "ckb" ? "بەرزترین ئاستی وردکاری ئەندازیاری و دابینکاری پیشەسازی پێشکەش دەکەین." : "Delivering high-precision engineering services, specialized hydraulics, and industrial contracting solutions.");

    const highlightsRaw =
      aboutSettings[`highlights_${langKey}`] ||
      aboutSettings["highlights_en"] ||
      aboutSettings["highlights_ar"];

    const aboutHighlights: string[] = Array.isArray(highlightsRaw)
      ? (highlightsRaw as string[])
      : [
          locale === "ar" ? "أعلى معايير الجودة والمطابقة الهندسية" : locale === "ckb" ? "بەرزترین ستانداردەکانی کوالێتی" : "Certified Industrial Quality & Precision",
          locale === "ar" ? "فريق هندسي متخصص بخبرة عريقة" : locale === "ckb" ? "تیمی ئەندازیاری پسپۆڕ و بەئەزموون" : "Experienced Technical Engineers & Specialists",
          locale === "ar" ? "تجهيزات هيدروليكية ومعدات متطورة" : locale === "ckb" ? "ئامێر و کەرەستەی پێشکەوتووی هایدرۆلیکی" : "Advanced Hydraulic Equipment & Systems",
        ];

    const aboutImageUrl = this.getStringSetting(aboutSettings, "image_url") || null;

    const about: AboutPreviewEntity = {
      eyebrow: locale === "ar" ? "عن الشركة" : locale === "ckb" ? "دەربارەی ئێمە" : "About Rukn Al Assi",
      title: aboutTitle,
      description: aboutDesc,
      history: profileTr?.history,
      mission: profileTr?.mission || this.getLocalizedSetting(settings, "mission", langKey),
      vision: profileTr?.vision || this.getLocalizedSetting(settings, "vision", langKey),
      highlights: aboutHighlights,
      imageUrl: aboutImageUrl,
      ctaText: locale === "ar" ? "المزيد عن الشركة" : locale === "ckb" ? "زیاتر بزانە" : "Learn More",
      ctaUrl: "/about",
    };

    // 8. Services (Max 6)
    const services: ServicePreviewEntity[] = (dto.services || [])
      .filter((srv) => !srv.status || srv.status === "published")
      .slice(0, 6)
      .map((srv) => {
        const tr = (dto.serviceTranslations || []).find(
          (t) => t.service_id === srv.id && dbLangCodes.includes(t.language_code)
        ) || (dto.serviceTranslations || []).find((t) => t.service_id === srv.id);

        return {
          id: srv.id,
          slug: tr?.slug || srv.id,
          name: tr?.name || "",
          description: tr?.description || "",
          applications: tr?.applications,
          icon: srv.icon || "Wrench",
          imageUrl: srv.hero_image_url || null,
        };
      });

    // 9. Featured Projects (Max 4)
    const featuredProjects: ProjectPreviewEntity[] = (dto.projects || [])
      .filter((prj) => !prj.status || prj.status === "published")
      .slice(0, 4)
      .map((prj) => {
        const tr = (dto.projectTranslations || []).find(
          (t) => t.project_id === prj.id && dbLangCodes.includes(t.language_code)
        ) || (dto.projectTranslations || []).find((t) => t.project_id === prj.id);

        const firstImg = prj.images && prj.images.length > 0 ? prj.images[0] : null;

        return {
          id: prj.id,
          slug: tr?.slug || prj.id,
          title: tr?.title || "",
          description: tr?.description || "",
          clientName: prj.clientName || prj.client_name,
          location: prj.location,
          completionDate: prj.completionDate || prj.completion_date,
          imageUrl: firstImg,
        };
      });

    // 10. Clients (Max 12)
    const clients: ClientPreviewEntity[] = (dto.clients || [])
      .filter((cl) => !cl.status || cl.status === "published")
      .slice(0, 12)
      .map((cl) => {
        const tr = (dto.clientTranslations || []).find(
          (t) => t.client_id === cl.id && dbLangCodes.includes(t.language_code)
        ) || (dto.clientTranslations || []).find((t) => t.client_id === cl.id);

        return {
          id: cl.id,
          name: tr?.name || "",
          logoUrl: cl.logo_url || "",
          websiteUrl: cl.website_url || null,
        };
      });

    // 11. Certifications (Max 6)
    const certifications: CertificationPreviewEntity[] = (dto.certifications || [])
      .filter((cert) => !cert.status || cert.status === "published")
      .slice(0, 6)
      .map((cert) => {
        const tr = (dto.certificationTranslations || []).find(
          (t) => t.certification_id === cert.id && dbLangCodes.includes(t.language_code)
        ) || (dto.certificationTranslations || []).find((t) => t.certification_id === cert.id);

        return {
          id: cert.id,
          title: tr?.title || "",
          description: tr?.description || null,
          issuedBy: cert.issued_by,
          issuedDate: cert.issued_date,
          imageUrl: cert.image_url,
        };
      });

    // 12. CTA Section
    const ctaSectionRow = (dto.homepageSections || []).find(
      (s) => (s.sectionKey === "contact_cta" || s.section_key === "contact_cta")
    );
    const ctaSettings = (ctaSectionRow?.settings || {}) as Record<string, unknown>;

    const ctaTitle =
      this.getStringSetting(ctaSettings, `title_${langKey}`) ||
      this.getStringSetting(ctaSettings, "title_en") ||
      this.getStringSetting(ctaSettings, "title_ar") ||
      (locale === "ar" ? "جاهزون للارتقاء بمشروعك القادم؟" : locale === "ckb" ? "ئامادەیت بۆ دەستپێکردنی پڕۆژەکەت؟" : "Ready to Elevate Your Next Engineering Project?");

    const ctaDesc =
      this.getStringSetting(ctaSettings, `description_${langKey}`) ||
      this.getStringSetting(ctaSettings, "description_en") ||
      this.getStringSetting(ctaSettings, "description_ar") ||
      (locale === "ar" ? "فريقنا الهندسي المتخصص مستعد لتقديم أفضل الحلول والمعدات بأعلى معايير الدقة والاعتمادية." : locale === "ckb" ? "تیمی ئەندازیاری ئێمە ئامادەیە بۆ پێشکەشکردنی باشترین چارەسەرەکان." : "Our specialized engineering team is ready to deliver high-precision industrial solutions tailored to your operational needs.");

    const ctaPrimaryText =
      this.getStringSetting(ctaSettings, `primary_button_text_${langKey}`) ||
      this.getStringSetting(ctaSettings, "primary_button_text_en") ||
      (locale === "ar" ? "طلب عرض سعر" : locale === "ckb" ? "داواکردنی نرخ" : "Request a Quote");

    const ctaPrimaryUrl = this.getStringSetting(ctaSettings, "primary_button_url", "/rfq");

    const ctaSecondaryText =
      this.getStringSetting(ctaSettings, `secondary_button_text_${langKey}`) ||
      this.getStringSetting(ctaSettings, "secondary_button_text_en") ||
      (locale === "ar" ? "اتصل بنا" : locale === "ckb" ? "پەیوەندی" : "Contact Our Team");

    const ctaSecondaryUrl = this.getStringSetting(ctaSettings, "secondary_button_url", "/contact");

    const cta: HomeCtaEntity = {
      eyebrow: locale === "ar" ? "تواصل معنا" : locale === "ckb" ? "پەیوەندیمان پێوە بکەن" : "Let's Collaborate",
      title: ctaTitle,
      description: ctaDesc,
      primaryButtonText: ctaPrimaryText,
      primaryButtonUrl: ctaPrimaryUrl,
      secondaryButtonText: ctaSecondaryText,
      secondaryButtonUrl: ctaSecondaryUrl,
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
      brandSettings,
    };
  }
}
