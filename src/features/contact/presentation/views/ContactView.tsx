"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { ContactPageEntity, BranchEntity } from "../../domain/entities/contact.entity";
import { ContactHeroSection } from "../components/ContactHeroSection";
import { ContactInfoSection } from "../components/ContactInfoSection";
import { BranchCard } from "../components/BranchCard";
import { ContactMap } from "../components/ContactMap";
import { ContactForm } from "../components/ContactForm";
import { ContactCtaSection } from "../components/ContactCtaSection";
import { Building2 } from "lucide-react";

interface ContactViewProps {
  data: ContactPageEntity;
}

export function ContactView({ data }: ContactViewProps) {
  const t = useTranslations("Contact");
  const branches = data?.branches || [];

  // Default to first branch with map coordinates if available
  const defaultBranch = branches.find((b) => b.mapLat !== null && b.mapLng !== null) || branches[0] || null;
  const [selectedBranch, setSelectedBranch] = useState<BranchEntity | null>(defaultBranch);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Contact Hero */}
      <ContactHeroSection />

      {/* 2. Main 2-Column Section (Desktop: Left Info + Branches + Map, Right Contact Form) */}
      <section className="py-16 lg:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info + Branches List + Map */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-8">
              {/* Direct Info */}
              <ContactInfoSection />

              {/* Branches / Locations */}
              {branches.length > 0 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                      <Building2 className="size-3.5" />
                      <span>{t("branchesTitle")}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-foreground">
                      {t("branchesTitle")}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t("branchesSubtitle")}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {branches.map((branch) => (
                      <BranchCard
                        key={branch.id}
                        branch={branch}
                        isSelected={selectedBranch?.id === branch.id}
                        onSelect={() => setSelectedBranch(branch)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Map */}
              {selectedBranch && (
                <ContactMap selectedBranch={selectedBranch} />
              )}
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6 xl:col-span-6 sticky top-24">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Request Quote CTA */}
      <ContactCtaSection />
    </div>
  );
}
