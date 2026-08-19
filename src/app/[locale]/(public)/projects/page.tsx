import { setRequestLocale } from "next-intl/server";
import { ProjectsView } from "@features/projects/presentation/views/ProjectsView";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsView />;
}
