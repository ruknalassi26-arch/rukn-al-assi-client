"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Target, Compass } from "lucide-react";

interface MissionVisionSectionProps {
  mission?: string;
  vision?: string;
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const t = useTranslations("About");

  if (!mission && !vision) return null;

  return (
    <section className="py-16 lg:py-20 bg-muted/20 border-b border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission Card */}
          {mission && (
            <div className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border border-t-4 border-t-primary shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Target className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  01
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {t("missionTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mission}
                </p>
              </div>
            </div>
          )}

          {/* Vision Card */}
          {vision && (
            <div className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border border-t-4 border-t-amber-500 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="size-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Compass className="size-5.5" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  02
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {t("visionTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {vision}
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
