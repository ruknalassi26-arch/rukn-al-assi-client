import { ProjectCategoryEntity, ProjectImageEntity, ProjectClientEntity } from "./project.entity";

export interface RelatedProjectItemEntity {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  category: string | null;
  location: string | null;
}

export interface ProjectDetailInfoEntity {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  challenge: string | null;
  solution: string | null;
  clientName: string | null;
  location: string | null;
  completionDate: string | null;
  isFeatured: boolean;
}

export interface ProjectDetailResponse {
  project: ProjectDetailInfoEntity;
  category: ProjectCategoryEntity | null;
  images: ProjectImageEntity[];
  relatedProjects: RelatedProjectItemEntity[];
  clients: ProjectClientEntity[];
}
