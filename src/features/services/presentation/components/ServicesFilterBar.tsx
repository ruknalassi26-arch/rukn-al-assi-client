"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";

interface ServicesFilterBarProps {
  total: number;
}

export function ServicesFilterBar({ total }: ServicesFilterBarProps) {
  const t = useTranslations("Services");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Debounced search sync with URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (searchValue.trim()) {
        current.set("search", searchValue.trim());
      } else {
        current.delete("search");
      }
      current.delete("page"); // Reset to page 1 on new search

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, pathname, router, searchParams]);

  const handleClear = () => {
    setSearchValue("");
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("search");
    current.delete("page");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="ps-10 pe-10 h-11 rounded-xl bg-background border-border text-sm"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Results Count & Clear Button */}
      <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-end">
        <span className="font-mono font-semibold">
          {total} {t("countLabel")}
        </span>
        {initialSearch && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 text-xs font-semibold text-primary hover:text-primary"
          >
            {t("clearSearch")}
          </Button>
        )}
      </div>
    </div>
  );
}
