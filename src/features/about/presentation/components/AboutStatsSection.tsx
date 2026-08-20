"use client";

import React from "react";
import { Container } from "@shared/components/layouts/Container";
import { AboutStatEntity } from "../../domain/entities/stat.entity";
import { Award, TrendingUp, Building, Globe, Calendar, ShieldCheck, CheckCircle } from "lucide-react";

interface AboutStatsSectionProps {
  stats: AboutStatEntity[];
}

export function AboutStatsSection({ stats }: AboutStatsSectionProps) {
  if (!stats || stats.length === 0) return null;

  const getStatIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "award":
        return <Award className="size-5 text-amber-400" />;
      case "trendingup":
      case "trending-up":
        return <TrendingUp className="size-5 text-primary" />;
      case "building":
        return <Building className="size-5 text-emerald-400" />;
      case "globe":
        return <Globe className="size-5 text-sky-400" />;
      case "calendar":
        return <Calendar className="size-5 text-indigo-400" />;
      case "shieldcheck":
      case "shield-check":
        return <ShieldCheck className="size-5 text-primary" />;
      default:
        return <CheckCircle className="size-5 text-amber-400" />;
    }
  };

  return (
    <section className="py-16 bg-slate-950 text-white border-b border-white/10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center space-y-2.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 font-medium line-clamp-2 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
