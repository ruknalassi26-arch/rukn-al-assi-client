"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X, Briefcase, Filter } from "lucide-react";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";

interface CareersFilterBarProps {
  departments: string[];
  employmentTypes: string[];
  total: number;
}

export function CareersFilterBar({
  departments,
  employmentTypes,
  total,
}: CareersFilterBarProps) {
  const t = useTranslations("Careers");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const selectedDepartment = searchParams.get("department") || "";
  const selectedEmpType = searchParams.get("employmentType") || "";

  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const updateFilters = (
    newSearch?: string,
    newDept?: string,
    newEmpType?: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch !== undefined) {
      if (newSearch.trim()) {
        params.set("search", newSearch.trim());
      } else {
        params.delete("search");
      }
    }

    if (newDept !== undefined) {
      if (newDept.trim()) {
        params.set("department", newDept.trim());
      } else {
        params.delete("department");
      }
    }

    if (newEmpType !== undefined) {
      if (newEmpType.trim()) {
        params.set("employmentType", newEmpType.trim());
      } else {
        params.delete("employmentType");
      }
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== (searchParams.get("search") || "")) {
        updateFilters(searchValue, undefined, undefined);
      }
    }, 400);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleClearAll = () => {
    setSearchValue("");
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(
    initialSearch || selectedDepartment || selectedEmpType
  );

  return (
    <div className="w-full bg-card border-b border-border py-6 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Search Row & Count */}
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
                  updateFilters("", undefined, undefined);
                }}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs sm:text-sm font-semibold text-muted-foreground">
            <span>{t("totalJobs", { count: total })}</span>
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

        {/* Filter Pills Row */}
        {(departments.length > 0 || employmentTypes.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            {/* Department Pills */}
            <button
              type="button"
              onClick={() => updateFilters(undefined, "", undefined)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                !selectedDepartment
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t("allDepartments")}
            </button>

            {departments.map((dept) => {
              const isSelected = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() =>
                    updateFilters(
                      undefined,
                      isSelected ? "" : dept,
                      undefined
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Briefcase className="size-3.5 opacity-70" />
                  <span>{dept}</span>
                </button>
              );
            })}

            {/* Employment Type Pills */}
            {employmentTypes.map((type) => {
              const isSelected = selectedEmpType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    updateFilters(
                      undefined,
                      undefined,
                      isSelected ? "" : type
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Filter className="size-3 opacity-70" />
                  <span className="capitalize">{type.replace("_", " ")}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
