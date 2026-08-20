"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ClientsPaginationProps {
  page: number;
  totalPages: number;
}

export function ClientsPagination({ page, totalPages }: ClientsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";

  if (totalPages <= 1) return null;

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="w-full bg-background border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(page - 1)}
          disabled={page <= 1}
          className="h-10 px-4 rounded-xl border-border font-semibold text-xs gap-1"
        >
          <PrevIcon className="size-4" />
          <span>{locale === "ar" ? "السابق" : locale === "ckb" ? "پێشوو" : "Previous"}</span>
        </Button>

        {/* Page Indicators */}
        <div className="flex items-center gap-1.5 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isActive = p === page;
            return (
              <Button
                key={p}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigateToPage(p)}
                className={`size-10 rounded-xl font-bold text-xs ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateToPage(page + 1)}
          disabled={page >= totalPages}
          className="h-10 px-4 rounded-xl border-border font-semibold text-xs gap-1"
        >
          <span>{locale === "ar" ? "التالي" : locale === "ckb" ? "دواتر" : "Next"}</span>
          <NextIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
