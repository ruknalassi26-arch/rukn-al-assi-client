"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@core/utils/cn";
import { LanguageEntity } from "@features/home/domain/entities/home.entity";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "topbar" | "navbar" | "footer";
  languages?: LanguageEntity[];
}

export function LanguageSwitcher({
  className,
  variant = "topbar",
  languages,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic languages from backend or current active locale
  const availableLanguages =
    languages && languages.length > 0
      ? languages
      : [
          {
            code: locale,
            name: locale.toUpperCase(),
            nativeName: locale === "ar" ? "العربية" : locale === "ckb" ? "کوردی" : "English",
            isRtl: locale === "ar" || locale === "ckb",
            isDefault: false,
            sortOrder: 1,
          },
        ];

  const currentLang =
    availableLanguages.find((l) => l.code === locale) ||
    availableLanguages[0] || {
      code: locale,
      name: locale,
      nativeName: locale,
    };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (nextLocale: string) => {
    setIsOpen(false);
    if (nextLocale === locale) return;

    const segments = pathname.split("/").filter(Boolean);
    const supportedCodes = availableLanguages.map((l) => l.code);
    const hasLocalePrefix = supportedCodes.includes(segments[0]);

    let newPath = "";
    if (hasLocalePrefix) {
      segments[0] = nextLocale;
      newPath = `/${segments.join("/")}`;
    } else {
      newPath = `/${nextLocale}${pathname === "/" ? "" : pathname}`;
    }

    router.push(newPath);
  };

  const isDarkVariant = variant === "topbar";

  return (
    <div className={cn("relative inline-block text-start", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isDarkVariant
            ? "text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
            : "text-foreground/90 hover:text-primary hover:bg-muted/80 border border-border"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Change Language"
      >
        <Globe className={cn("size-3.5 shrink-0", isDarkVariant ? "text-slate-400" : "text-primary")} />
        <span>{currentLang.nativeName}</span>
        <ChevronDown
          className={cn(
            "size-3 opacity-60 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            "absolute end-0 mt-2 w-44 origin-top-right rounded-xl p-1.5 shadow-2xl ring-1 focus:outline-none z-100 animate-in fade-in zoom-in-95 duration-150",
            isDarkVariant
              ? "bg-slate-900/98 backdrop-blur-xl ring-white/15 text-slate-200 divide-y divide-white/5"
              : "bg-card/98 backdrop-blur-xl ring-border text-card-foreground divide-y divide-border/40"
          )}
        >
          <div className="space-y-0.5">
            {availableLanguages.map((lang) => {
              const isSelected = lang.code === locale;

              return (
                <button
                  key={lang.code}
                  role="menuitem"
                  onClick={() => switchLanguage(lang.code)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-start",
                    isSelected
                      ? isDarkVariant
                        ? "bg-primary text-white font-bold shadow-xs"
                        : "bg-primary/10 text-primary font-bold"
                      : isDarkVariant
                      ? "hover:bg-white/10 hover:text-white text-slate-300"
                      : "hover:bg-muted text-foreground/80 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.nativeName}</span>
                    <span
                      className={cn(
                        "text-[10px] uppercase font-mono px-1 py-0.5 rounded",
                        isSelected
                          ? isDarkVariant
                            ? "bg-white/20 text-white"
                            : "bg-primary/20 text-primary"
                          : isDarkVariant
                          ? "text-slate-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {lang.code}
                    </span>
                  </div>
                  {isSelected && <Check className="size-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
