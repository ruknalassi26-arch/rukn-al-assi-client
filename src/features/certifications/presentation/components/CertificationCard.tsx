"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CertificationEntity } from "../../domain/entities/certification.entity";
import { Award, Calendar, Maximize2, X } from "lucide-react";
import { Button } from "@shared/components/ui/button";

interface CertificationCardProps {
  certification: CertificationEntity;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const t = useTranslations("Certifications");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
        <div>
          {/* Certificate Document Frame */}
          <div
            onClick={() => setModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setModalOpen(true);
            }}
            className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden border-b border-border cursor-pointer"
          >
            {certification.imageUrl ? (
              <Image
                src={certification.imageUrl}
                alt={certification.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="size-full flex items-center justify-center text-slate-600">
                <Award className="size-16 opacity-40" />
              </div>
            )}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
              <div className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Maximize2 className="size-4" />
              </div>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="p-6 sm:p-7 space-y-4">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
              {certification.title}
            </h3>

            {/* Issuer & Date Badges */}
            <div className="space-y-2 text-xs text-muted-foreground font-medium border-t border-border/50 pt-3">
              {certification.issuedBy && (
                <div className="flex items-center gap-2">
                  <Award className="size-3.5 text-primary shrink-0" />
                  <span className="truncate">{certification.issuedBy}</span>
                </div>
              )}
              {certification.issuedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-amber-500 shrink-0" />
                  <span>{certification.issuedDate}</span>
                </div>
              )}
            </div>

            {certification.description && (
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {certification.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 sm:p-7 pt-0">
          <Button
            onClick={() => setModalOpen(true)}
            variant="outline"
            size="sm"
            className="w-full h-10 rounded-xl border-border font-bold text-xs gap-1.5 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <Maximize2 className="size-3.5" />
            <span>{t("viewDocument")}</span>
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between z-20 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Award className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white truncate max-w-md">
                  {certification.title}
                </h4>
                {certification.issuedBy && (
                  <span className="text-xs text-slate-400">{certification.issuedBy}</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label={t("close")}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <div className="relative w-full h-full max-h-[80vh] max-w-5xl mx-auto flex items-center justify-center">
              <Image
                src={certification.imageUrl}
                alt={certification.title}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
