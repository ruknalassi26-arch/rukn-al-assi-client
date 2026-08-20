"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check, ChevronDown, ChevronUp } from "lucide-react";
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
            code: "ar",
            name: "Arabic",
            nativeName: "العربية",
            isRtl: true,
            isDefault: false,
            sortOrder: 1,
          },
          {
            code: "en",
            name: "English",
            nativeName: "English",
            isRtl: false,
            isDefault: true,
            sortOrder: 2,
          },
          {
            code: "ckb",
            name: "Kurdish",
            nativeName: "کوردی",
            isRtl: true,
            isDefault: false,
            sortOrder: 3,
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

  const isDark = variant === "topbar" || variant === "footer";
  const isDropUp = variant === "footer";

  return (
    <div className={cn("relative inline-block text-start", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer",
          isDark
            ? "text-slate-300 hover:text-white hover:bg-white/10 border border-white/15 bg-white/5"
            : "text-foreground/90 hover:text-primary hover:bg-muted/80 border border-border bg-card"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Change Language"
      >
        <Globe className={cn("size-3.5 shrink-0", isDark ? "text-amber-400" : "text-primary")} />
        <span>{currentLang.nativeName}</span>
        {isDropUp ? (
          <ChevronUp
            className={cn(
              "size-3 opacity-60 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        ) : (
          <ChevronDown
            className={cn(
              "size-3 opacity-60 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            "absolute end-0 w-44 rounded-xl p-1.5 shadow-2xl ring-1 focus:outline-none z-50 animate-in fade-in zoom-in-95 duration-150 border",
            isDropUp
              ? "bottom-full mb-2 origin-bottom-right"
              : "top-full mt-2 origin-top-right",
            isDark
              ? "bg-slate-900/98 backdrop-blur-2xl ring-white/15 border-white/15 text-slate-200"
              : "bg-card/98 backdrop-blur-2xl ring-border border-border text-card-foreground shadow-lg"
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
                    "w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-start cursor-pointer",
                    isSelected
                      ? isDark
                        ? "bg-primary text-white font-bold shadow-sm"
                        : "bg-primary/10 text-primary font-bold"
                      : isDark
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
                          ? isDark
                            ? "bg-white/20 text-white"
                            : "bg-primary/20 text-primary"
                          : isDark
                          ? "text-slate-400 bg-white/5"
                          : "text-muted-foreground bg-muted"
                      )}
                    >
                      {lang.code}
                    </span>
                  </div>
                  {isSelected && <Check className="size-3.5 shrink-0 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
