"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { CoreValueEntity } from "../../domain/entities/core-value.entity";
import { ShieldCheck, Award, Zap, Users, Star, CheckCircle, Sparkles } from "lucide-react";

interface CoreValuesSectionProps {
  coreValues: CoreValueEntity[];
}

export function CoreValuesSection({ coreValues }: CoreValuesSectionProps) {
  const t = useTranslations("About");

  if (!coreValues || coreValues.length === 0) return null;

  const getValueIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "shieldcheck":
      case "shield-check":
        return <ShieldCheck className="size-6 text-primary" />;
      case "award":
        return <Award className="size-6 text-amber-500" />;
      case "zap":
        return <Zap className="size-6 text-amber-500" />;
      case "users":
        return <Users className="size-6 text-emerald-500" />;
      case "star":
        return <Star className="size-6 text-indigo-500" />;
      case "sparkles":
        return <Sparkles className="size-6 text-primary" />;
      default:
        return <CheckCircle className="size-6 text-primary" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow={t("valuesEyebrow")}
          title={t("valuesHeading")}
          description={t("valuesSubheading")}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((val) => (
            <div
              key={val.id}
              className="p-8 rounded-3xl bg-card border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="size-12 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getValueIcon(val.icon)}
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {val.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {val.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40">
                <span className="text-[11px] uppercase font-mono font-bold text-muted-foreground tracking-wider">
                  {t("valuesBadge")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
