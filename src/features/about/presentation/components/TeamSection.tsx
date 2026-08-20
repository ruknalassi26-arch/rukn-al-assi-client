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
    <section className="py-20 lg:py-28 bg-background border-b border-border">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow={t("teamEyebrow")}
          title={t("teamHeading")}
          description={t("teamSubheading")}
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Photo Portrait */}
              <div className="relative aspect-4/5 w-full bg-muted overflow-hidden">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="size-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                    <UserCheck className="size-16 opacity-40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-4 start-4 end-4 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-md border border-white/10">
                    <Shield className="size-3 text-amber-400" />
                    <span>{member.position || t("teamPositionFallback")}</span>
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 sm:p-8 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  {member.bio && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
