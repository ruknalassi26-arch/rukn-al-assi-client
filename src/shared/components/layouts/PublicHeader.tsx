"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { LanguageSwitcher } from "@shared/components/layouts/LanguageSwitcher";
import { Button } from "@shared/components/ui/button";
import { LanguageEntity } from "@features/home/domain/entities/home.entity";
import { Menu, X, Phone, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@core/utils/cn";

interface PublicHeaderProps {
  languages?: LanguageEntity[];
  brandSettings?: {
    siteName?: string;
    logoUrl?: string;
    contactPhone?: string;
    contactEmail?: string;
  };
}

export function PublicHeader({ languages = [], brandSettings }: PublicHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("Navigation");

  const isRtl = locale === "ar" || locale === "ckb";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const siteName = brandSettings?.siteName || process.env.NEXT_PUBLIC_APP_NAME || "Rukn Al Assi";
  const logoUrl = brandSettings?.logoUrl || "";
  const contactPhone = brandSettings?.contactPhone || "";
  const contactEmail = brandSettings?.contactEmail || "";

  const navLinks = [
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-slate-950 text-slate-300 text-xs py-2 border-b border-white/10">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-medium text-slate-400">
              {locale === "ar"
                ? "الرائدون في الخدمات الهندسية والهيدروليكية"
                : locale === "ckb"
                ? "پێشەنگ لە خزمەتگوزارییە ئەندازیاری و هایدرۆلیکییەکان"
                : "Leaders in Industrial & Hydraulic Engineering"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium"
                >
                  <Phone className="size-3.5 text-amber-400" />
                  <span dir="ltr">{contactPhone}</span>
                </a>
              )}

              {contactPhone && contactEmail && (
                <span className="text-white/20">|</span>
              )}

              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium"
                >
                  <Mail className="size-3.5 text-amber-400" />
                  <span>{contactEmail}</span>
                </a>
              )}
            </div>

            <div className="flex items-center border-s border-white/15 ps-4">
              <LanguageSwitcher variant="topbar" languages={languages} />
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-border shadow-md"
            : "bg-white border-border/80 shadow-xs"
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          {/* Brand Logo & Title */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-card p-1.5 shadow-xs group-hover:border-primary/60 group-hover:shadow-md transition-all flex items-center justify-center">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  fill
                  className="object-contain"
                  sizes="48px"
                  priority
                />
              ) : (
                <span className="text-primary font-black text-xl">
                  {siteName.charAt(0) || "R"}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                {siteName}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">
                {locale === "ar"
                  ? "للمقاولات والتوريدات الهندسية"
                  : locale === "ckb"
                  ? "بەڵێندەرایەتی و دابینکاری ئەندازیاری"
                  : "Contracting & Industrial Solutions"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isHome = link.href === `/${locale}`;
              const isActive = isHome
                ? pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/"
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-semibold rounded-lg transition-all relative",
                    isActive
                      ? "text-primary bg-primary/10 font-bold"
                      : "text-foreground/80 hover:text-primary hover:bg-muted/60"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & RFQ CTA */}
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <LanguageSwitcher variant="navbar" languages={languages} />
            </div>

            <Button
              asChild
              size="default"
              className="hidden sm:inline-flex shadow-md font-bold px-5 h-11 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] group"
            >
              <Link href={`/${locale}/rfq`} className="flex items-center gap-2">
                <span>{tNav("rfq")}</span>
                <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              className="xl:hidden inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="size-6 text-foreground" />
              ) : (
                <Menu className="size-6 text-foreground" />
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-b border-border bg-background/98 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isHome = link.href === `/${locale}`;
              const isActive = isHome
                ? pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/"
                : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowIcon className="size-4 opacity-50" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border space-y-3">
            <Button asChild className="w-full justify-center text-sm py-5 font-bold shadow-md" size="lg">
              <Link href={`/${locale}/rfq`} onClick={() => setIsMobileMenuOpen(false)}>
                {tNav("rfq")}
              </Link>
            </Button>

            {(contactPhone || contactEmail) && (
              <div className="pt-2 text-xs text-muted-foreground space-y-2">
                {contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 text-primary shrink-0" />
                    <span dir="ltr">{contactPhone}</span>
                  </div>
                )}
                {contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-primary shrink-0" />
                    <span>{contactEmail}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
