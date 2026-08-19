"use client";

import { useSeo } from "../hooks/useSeo";

export function SeoView() {
  const { seoData } = useSeo();

  return (
    <div className="hidden">
      <span>{seoData?.titleEn}</span>
    </div>
  );
}
