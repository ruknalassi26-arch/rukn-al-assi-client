import { useQuery } from "@tanstack/react-query";
import { ProjectRepository } from "../../data/repositories/project.repository";
import { GetProjectsUseCase } from "../../domain/usecases/get-projects.usecase";
import { GetProjectDetailsUseCase } from "../../domain/usecases/get-project-details.usecase";

const projectRepository = new ProjectRepository();
const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
const getProjectDetailsUseCase = new GetProjectDetailsUseCase(projectRepository);

export const projectsQueryKeys = {
  all: ["projects"] as const,
  lists: (category?: string) => [...projectsQueryKeys.all, "list", category] as const,
  detail: (id: string) => [...projectsQueryKeys.all, "detail", id] as const,
};

export function useProjectsList(category?: string) {
  return useQuery({
    queryKey: projectsQueryKeys.lists(category),
    queryFn: () => getProjectsUseCase.execute(category),
  });
}

export function useProjectDetails(idOrSlug: string) {
  return useQuery({
    queryKey: projectsQueryKeys.detail(idOrSlug),
    queryFn: () => getProjectDetailsUseCase.execute(idOrSlug),
    enabled: !!idOrSlug,
  });
}
