"use client";

import { useAbout } from "../hooks/useAbout";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { useLocale } from "next-intl";

export function AboutView() {
  const { aboutData, isLoading } = useAbout();
  const locale = useLocale();

  if (isLoading || !aboutData) {
    return <LoadingScreen />;
  }

  const isAr = locale === "ar";

  return (
    <main>
      <PageBanner
        title={isAr ? "عن شركة ركن العاصي" : "About Rukn Al Assi"}
        subtitle={
          isAr
            ? "تعرف على رؤيتنا، رسالتنا، والتزامنا بأعلى معايير التميز الهندسي والمقاولات."
            : "Learn about our vision, mission, and dedication to construction & industrial engineering excellence."
        }
        breadcrumbItems={[{ label: isAr ? "عن الشركة" : "About Us" }]}
      />
      <Section>
        <Container className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border rounded-2xl bg-card shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                {isAr ? "رؤيتنا" : "Our Vision"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr ? aboutData.visionAr : aboutData.visionEn}
              </p>
            </div>
            <div className="p-8 border rounded-2xl bg-card shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-primary">
                {isAr ? "رسالتنا" : "Our Mission"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isAr ? aboutData.missionAr : aboutData.missionEn}
              </p>
            </div>
          </div>

          <div className="p-8 border rounded-2xl bg-muted/40 space-y-6">
            <h2 className="text-2xl font-bold text-center">
              {isAr ? "قيمنا الجوهرية" : "Our Core Values"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {(isAr ? aboutData.valuesAr : aboutData.valuesEn).map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-background border rounded-xl font-semibold text-foreground shadow-xs"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
