import { setRequestLocale } from "next-intl/server";
import { ProjectDetailsView } from "@features/projects/presentation/views/ProjectDetailsView";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ProjectDetailsView id={id} />;
}
