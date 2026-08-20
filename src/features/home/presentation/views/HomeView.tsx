"use client";

import React from "react";
import { HomePageEntity } from "../../domain/entities/home.entity";
import { HeroSection } from "../components/HeroSection";
import { CompanyStatsSection } from "../components/CompanyStatsSection";
import { AboutSection } from "../components/AboutSection";
import { FeaturedServicesSection } from "../components/FeaturedServicesSection";
import { FeaturedProjectsSection } from "../components/FeaturedProjectsSection";
import { ClientsSection } from "../components/ClientsSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { HomeCtaSection } from "../components/HomeCtaSection";

interface HomeViewProps {
  homeData: HomePageEntity;
}

export function HomeView({ homeData }: HomeViewProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Full-Width Architectural Hero Video */}
      <HeroSection hero={homeData.hero} />

      {/* 2. Company Trust Metrics & Statistics */}
      <CompanyStatsSection stats={homeData.stats} />

      {/* 3. About Company Overview & Highlights */}
      <AboutSection about={homeData.about} />

      {/* 4. Featured Industrial & Engineering Services */}
      <FeaturedServicesSection services={homeData.services} />

      {/* 5. Featured Projects Showcase */}
      <FeaturedProjectsSection projects={homeData.featuredProjects} />

      {/* 6. Continuous Infinite Client Logo Marquee */}
      <ClientsSection clients={homeData.clients} />

      {/* 7. Certifications & Accreditations */}
      <CertificationsSection certifications={homeData.certifications} />

      {/* 8. Closing RFQ Call to Action */}
      <HomeCtaSection cta={homeData.cta} />
    </div>
  );
}
