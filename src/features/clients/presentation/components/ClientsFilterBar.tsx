"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";

interface ClientsFilterBarProps {
  total: number;
}

export function ClientsFilterBar({ total }: ClientsFilterBarProps) {
  const t = useTranslations("Clients");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const updateSearchParam = (newSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSearch.trim()) {
      params.set("search", newSearch.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== (searchParams.get("search") || "")) {
        updateSearchParam(searchValue);
      }
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue("");
    updateSearchParam("");
  };

  return (
    <div className="w-full bg-card border-b border-border py-6 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="ps-10 pe-10 h-11 rounded-xl bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary text-sm shadow-2xs"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Results Counter & Clear Action */}
          <div className="flex items-center gap-3 self-end sm:self-auto text-xs sm:text-sm font-semibold text-muted-foreground">
            <span>{t("totalResults", { count: total })}</span>
            {searchValue && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 px-2.5 text-xs text-primary hover:text-primary/80 font-bold"
              >
                {t("clearSearch")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
