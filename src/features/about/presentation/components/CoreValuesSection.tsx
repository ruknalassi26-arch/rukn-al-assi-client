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
        return <ShieldCheck className="size-5 text-primary" />;
      case "award":
        return <Award className="size-5 text-amber-500" />;
      case "zap":
        return <Zap className="size-5 text-amber-500" />;
      case "users":
        return <Users className="size-5 text-emerald-500" />;
      case "star":
        return <Star className="size-5 text-indigo-500" />;
      case "sparkles":
        return <Sparkles className="size-5 text-primary" />;
      default:
        return <CheckCircle className="size-5 text-primary" />;
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-background border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={t("valuesEyebrow")}
          title={t("valuesHeading")}
          description={t("valuesSubheading")}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {coreValues.map((val) => (
            <div
              key={val.id}
              className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-all duration-300 space-y-3 flex flex-col"
            >
              <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
                {getValueIcon(val.icon)}
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
