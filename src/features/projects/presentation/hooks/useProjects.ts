import { useProjectsList } from "../queries/projects.queries";
import { useProjectsStore } from "../stores/useProjectsStore";

export function useProjects() {
  const { selectedCategory, setSelectedCategory } = useProjectsStore();
  const { data: projects, isLoading, error } = useProjectsList(
    selectedCategory || undefined
  );

  return {
    projects: projects || [],
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
  };
}
