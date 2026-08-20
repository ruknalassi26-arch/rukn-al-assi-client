"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@shared/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectsPaginationProps {
  page: number;
  totalPages: number;
}

export function ProjectsPagination({ page, totalPages }: ProjectsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ckb";

  if (totalPages <= 1) return null;

  const navigateToPage = (newPage: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(newPage));
    router.push(`${pathname}?${current.toString()}`);
  };

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => navigateToPage(page - 1)}
        className="h-10 px-3 rounded-xl border-border bg-card"
      >
        <PrevIcon className="size-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="sm"
          onClick={() => navigateToPage(p)}
          className={`size-10 rounded-xl font-bold font-mono text-sm ${
            p === page
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card text-foreground"
          }`}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => navigateToPage(page + 1)}
        className="h-10 px-3 rounded-xl border-border bg-card"
      >
        <NextIcon className="size-4" />
      </Button>
    </div>
  );
}
