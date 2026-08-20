"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { ProjectCategoryEntity } from "../../domain/entities/project.entity";

interface ProjectsFilterBarProps {
  total: number;
  categories: ProjectCategoryEntity[];
}

export function ProjectsFilterBar({ total, categories }: ProjectsFilterBarProps) {
  const t = useTranslations("Projects");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Debounced search sync
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (searchValue.trim()) {
        current.set("search", searchValue.trim());
      } else {
        current.delete("search");
      }
      current.delete("page");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, pathname, router, searchParams]);

  const handleCategorySelect = (catId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (catId === "all") {
      current.delete("category");
    } else {
      current.set("category", catId);
    }
    current.delete("page");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleClearFilters = () => {
    setSearchValue("");
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("search");
    current.delete("category");
    current.delete("page");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const hasActiveFilters = initialSearch || (initialCategory && initialCategory !== "all");

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
      {/* Top Search & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
              onClick={() => setSearchValue("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Counter and Clear */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-end">
          <span className="font-mono font-semibold">
            {total} {t("countLabel")}
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-8 text-xs font-semibold text-primary hover:text-primary"
            >
              {t("clearFilters")}
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-border/60 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground me-2 shrink-0">
            <Filter className="size-3.5" />
            <span>Category:</span>
          </div>

          <button
            type="button"
            onClick={() => handleCategorySelect("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              initialCategory === "all" || !initialCategory
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            {t("allCategories")}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                initialCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
