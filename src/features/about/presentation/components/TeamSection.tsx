"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { TeamMemberEntity } from "../../domain/entities/team-member.entity";
import { UserCheck, Shield } from "lucide-react";

interface TeamSectionProps {
  team: TeamMemberEntity[];
}

export function TeamSection({ team }: TeamSectionProps) {
  const t = useTranslations("About");

  if (!team || team.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-background border-b border-border">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow={t("teamEyebrow")}
          title={t("teamHeading")}
          description={t("teamSubheading")}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member) => (
            <div
              key={member.id}
              className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-square w-full bg-slate-900 overflow-hidden">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="size-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                    <UserCheck className="size-12 opacity-30" />
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                {/* Role Badge Overlay */}
                <div className="absolute bottom-2.5 start-2.5 end-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[11px] font-semibold backdrop-blur-md border border-white/15 max-w-full truncate">
                    <Shield className="size-3 text-amber-400 shrink-0" />
                    <span className="truncate">{member.position || t("teamPositionFallback")}</span>
                  </div>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-4 space-y-1 flex-1 flex flex-col">
                <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">
                  {member.name}
                </h4>
                {member.bio && (
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
