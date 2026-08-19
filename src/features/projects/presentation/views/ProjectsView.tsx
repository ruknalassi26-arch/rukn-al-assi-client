"use client";

import Link from "next/link";
import { useProjects } from "../hooks/useProjects";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { Button } from "@shared/components/ui/button";
import { useLocale } from "next-intl";

export function ProjectsView() {
  const { projects, isLoading } = useProjects();
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <PageBanner
        title={isAr ? "معرض المشاريع والإنجازات" : "Our Projects & Achievements"}
        subtitle={
          isAr
            ? "استعرض المشاريع الإنشائية والهندسية التي تم تنفيذها بنجاح بأعلى معايير الجودة."
            : "Discover our track record of successfully executed civil, infrastructure, and industrial projects."
        }
        breadcrumbItems={[{ label: isAr ? "المشاريع" : "Projects" }]}
      />
      <Section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 border rounded-2xl bg-card shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 bg-muted rounded-full">
                    {project.category}
                  </span>
                  {project.completionYear && (
                    <span className="text-xs text-muted-foreground font-medium">
                      {project.completionYear}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xl text-foreground">
                  {isAr ? project.titleAr : project.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {isAr ? project.descriptionAr : project.descriptionEn}
                </p>
              </div>
              <div className="pt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/projects/${project.slug}`}>
                    {isAr ? "عرض دراسة الحالة" : "View Case Study"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </main>
  );
}
