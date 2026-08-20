"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { Compass, Target, ArrowUpRight } from "lucide-react";

interface MissionVisionSectionProps {
  mission?: string;
  vision?: string;
}

export function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  const t = useTranslations("About");

  return (
    <section className="py-20 lg:py-24 bg-muted/30 border-b border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Mission Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <Target className="size-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  01
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {t("missionTitle")}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {mission || t("missionFallback")}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-bold text-primary">
              <span>{t("missionBadge")}</span>
              <ArrowUpRight className="size-4 opacity-70" />
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-card border border-border hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="size-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="size-7" />
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">
                  02
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-amber-600 transition-colors">
                  {t("visionTitle")}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {vision || t("visionFallback")}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-bold text-amber-600">
              <span>{t("visionBadge")}</span>
              <ArrowUpRight className="size-4 opacity-70" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
