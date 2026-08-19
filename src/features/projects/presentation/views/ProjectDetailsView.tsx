"use client";

import { useProjectDetails } from "../queries/projects.queries";
import { PageBanner } from "@shared/components/layouts/PageBanner";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";
import { Button } from "@shared/components/ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";

export function ProjectDetailsView({ id }: { id: string }) {
  const { data: project, isLoading } = useProjectDetails(id);
  const locale = useLocale();
  const isAr = locale === "ar";

  if (isLoading) {
    return <LoadingScreen />;
  }

  const title = project
    ? isAr
      ? project.titleAr
      : project.titleEn
    : isAr
      ? "تفاصيل المشروع"
      : "Project Details";

  return (
    <main>
      <PageBanner
        title={title}
        subtitle={
          project
            ? isAr
              ? `العميل: ${project.clientNameAr || "-"}`
              : `Client: ${project.clientNameEn || "-"}`
            : "Project Details"
        }
        breadcrumbItems={[
          { label: isAr ? "المشاريع" : "Projects", href: "/projects" },
          { label: title },
        ]}
      />
      <Section>
        <Container className="space-y-6">
          <div className="p-8 border rounded-2xl bg-card space-y-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project
                ? isAr
                  ? project.descriptionAr
                  : project.descriptionEn
                : "Project details."}
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/contact">{isAr ? "تواصل معنا لمشروع مماثل" : "Contact Us for Similar Project"}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
