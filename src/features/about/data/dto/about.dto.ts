export interface PublicAboutPageRpcDto {
  heroImage?: string;
  storyImage?: string;
  company?: {
    id: number;
    history: string;
    mission: string;
    vision: string;
  };
  stats?: Array<{
    id: string;
    icon: string;
    value: string;
    label: string;
  }>;
  coreValues?: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
  timeline?: Array<{
    id: string;
    year: number;
    title: string;
    description: string;
  }>;
  team?: Array<{
    id: string;
    photoUrl: string | null;
    name: string;
    position: string;
    bio: string | null;
  }>;
}
