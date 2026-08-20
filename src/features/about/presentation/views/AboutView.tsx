"use client";

import React from "react";
import { AboutPageEntity } from "../../domain/entities/about-page.entity";
import { AboutHeroSection } from "../components/AboutHeroSection";
import { CompanyStorySection } from "../components/CompanyStorySection";
import { MissionVisionSection } from "../components/MissionVisionSection";
import { AboutStatsSection } from "../components/AboutStatsSection";
import { CoreValuesSection } from "../components/CoreValuesSection";
import { TimelineSection } from "../components/TimelineSection";
import { TeamSection } from "../components/TeamSection";
import { AboutCtaSection } from "../components/AboutCtaSection";

interface AboutViewProps {
  aboutData: AboutPageEntity;
}

export function AboutView({ aboutData }: AboutViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. About Hero with Dynamic Image */}
      <AboutHeroSection heroImageUrl={aboutData.heroImage} />

      {/* 2. Company Story & History with Dynamic Image */}
      <CompanyStorySection
        history={aboutData.company?.history}
        imageUrl={aboutData.storyImage || aboutData.heroImage}
      />

      {/* 3. Mission & Vision */}
      <MissionVisionSection
        mission={aboutData.company?.mission}
        vision={aboutData.company?.vision}
      />

      {/* 4. Statistics Trust Strip */}
      <AboutStatsSection stats={aboutData.stats} />

      {/* 5. Core Values */}
      <CoreValuesSection coreValues={aboutData.coreValues} />

      {/* 6. Timeline Milestones */}
      <TimelineSection timeline={aboutData.timeline} />

      {/* 7. Leadership / Team */}
      <TeamSection team={aboutData.team} />

      {/* 8. Closing Call to Action */}
      <AboutCtaSection />
    </div>
  );
}
