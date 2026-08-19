"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { LanguageEntity } from "@features/home/domain/entities/home.entity";

interface PublicFooterProps {
  brandSettings?: {
    siteName?: string;
    logoUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
    whatsappNumber?: string;
    address?: string;
    tagline?: string;
  };
  languages?: LanguageEntity[];
}

export function PublicFooter({ brandSettings, languages }: PublicFooterProps) {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const siteName = brandSettings?.siteName || process.env.NEXT_PUBLIC_APP_NAME || "Rukn Al Assi";
  const logoUrl = brandSettings?.logoUrl || "";
  const contactPhone = brandSettings?.contactPhone || "";
  const contactEmail = brandSettings?.contactEmail || "";
  const address = brandSettings?.address || "";

  const quickLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/projects`, label: tNav("projects") },
    { href: `/${locale}/products`, label: tNav("products") },
    { href: `/${locale}/clients`, label: tNav("clients") },
    { href: `/${locale}/certificates`, label: tNav("certificates") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 text-sm border-t border-white/10">
      {/* Top Banner Accent */}
      <div className="h-1 w-full bg-linear-to-r from-primary via-amber-500 to-primary" />

      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <Link href={`/${locale}`} className="flex items-center gap-3.5 group inline-flex">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5 p-1.5 shadow-md flex items-center justify-center">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={siteName}
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                ) : (
                  <span className="text-primary font-black text-xl">
                    {siteName.charAt(0) || "R"}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors">
                  {siteName}
                </span>
                {brandSettings?.tagline && (
                  <span className="text-xs text-slate-400 font-medium">
                    {brandSettings.tagline}
                  </span>
                )}
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              {t("description")}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck className="size-4 text-amber-400" />
                <span>
                  {locale === "ar"
                    ? "معتمد وموثق هندسياً"
                    : locale === "ckb"
                    ? "باوەڕپێکراوی ئەندازیاری"
                    : "Certified Quality Standards"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="font-bold text-base text-white tracking-tight uppercase text-xs tracking-wider text-slate-400">
              {tCommon("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors font-medium"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Coordinates Column (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="font-bold text-base text-white tracking-tight uppercase text-xs tracking-wider text-slate-400">
              {t("contactInfo")}
            </h4>
            <div className="space-y-3.5 text-sm">
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin className="size-4.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-snug">{address}</span>
                </div>
              )}

              {contactPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="size-4.5 text-amber-400 shrink-0" />
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    className="text-slate-300 hover:text-white transition-colors font-medium"
                    dir="ltr"
                  >
                    {contactPhone}
                  </a>
                </div>
              )}

              {contactEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="size-4.5 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    {contactEmail}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Clock className="size-4.5 text-amber-400 shrink-0" />
                <span className="text-slate-400">
                  {locale === "ar"
                    ? "الإثنين - السبت: 8:00 ص - 5:00 م"
                    : locale === "ckb"
                    ? "دووشەممە - شەممە: ٨:٠٠ ب - ٥:٠٠ د"
                    : "Mon - Sat: 8:00 AM - 5:00 PM"}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/${locale}/rfq`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                <span>{tNav("rfq")}</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Legal */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {siteName}. {tCommon("allRightsReserved")}
          </p>

          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-white transition-colors">
              {tCommon("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {tCommon("termsOfService")}
            </Link>
            <span>•</span>
            <LanguageSwitcher variant="topbar" languages={languages} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
