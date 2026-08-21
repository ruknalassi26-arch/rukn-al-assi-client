"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X, Layers } from "lucide-react";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { ProductCategoryEntity } from "../../domain/entities/product.entity";

interface ProductsFilterBarProps {
  categories: ProductCategoryEntity[];
  total: number;
}

export function ProductsFilterBar({ categories, total }: ProductsFilterBarProps) {
  const t = useTranslations("Products");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const updateFilters = (newSearch?: string, newCategory?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch !== undefined) {
      if (newSearch.trim()) {
        params.set("search", newSearch.trim());
      } else {
        params.delete("search");
      }
    }

    if (newCategory !== undefined) {
      if (newCategory.trim()) {
        params.set("category", newCategory.trim());
      } else {
        params.delete("category");
      }
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== (searchParams.get("search") || "")) {
        updateFilters(searchValue, undefined);
      }
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleCategoryClick = (catId: string) => {
    const nextCat = selectedCategory === catId ? "" : catId;
    updateFilters(undefined, nextCat);
  };

  const handleClearAll = () => {
    setSearchValue("");
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(initialSearch || selectedCategory);

  return (
    <div className="w-full bg-card border-b border-border py-6 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Search row & count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
                onClick={() => {
                  setSearchValue("");
                  updateFilters("", undefined);
                }}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs sm:text-sm font-semibold text-muted-foreground">
            <span>{t("totalCount", { count: total })}</span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 px-2.5 text-xs text-primary hover:text-primary/80 font-bold"
              >
                {t("clearFilters")}
              </Button>
            )}
          </div>
        </div>

        {/* Category Pills Row */}
        {categories && categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => updateFilters(undefined, "")}
              className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t("allCategories")}
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Layers className="size-3.5 opacity-70" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
