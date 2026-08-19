"use client";

import React from "react";
import { Container } from "@shared/components/layouts/Container";
import { CompanyStatEntity } from "../../domain/entities/home.entity";
import { Clock, Briefcase, Users, ShieldCheck } from "lucide-react";

interface CompanyStatsSectionProps {
  stats: CompanyStatEntity[];
}

export function CompanyStatsSection({ stats }: CompanyStatsSectionProps) {
  if (!stats || stats.length === 0) return null;

  const getIcon = (name?: string) => {
    switch (name) {
      case "Clock":
        return <Clock className="size-6 text-primary" />;
      case "Briefcase":
        return <Briefcase className="size-6 text-primary" />;
      case "Users":
        return <Users className="size-6 text-primary" />;
      default:
        return <ShieldCheck className="size-6 text-primary" />;
    }
  };

  return (
    <section className="relative z-20 border-b border-border bg-card shadow-2xs">
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x sm:divide-border rtl:sm:divide-x-reverse">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0 space-y-2 group"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                {getIcon(stat.iconName)}
              </div>
              <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight font-mono">
                {stat.value}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-muted-foreground tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
