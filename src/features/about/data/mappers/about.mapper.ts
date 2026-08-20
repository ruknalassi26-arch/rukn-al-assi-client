import { AboutPageEntity } from "../../domain/entities/about-page.entity";
import { PublicAboutPageRpcDto } from "../dto/about.dto";

export class AboutMapper {
  static toEntity(dto: PublicAboutPageRpcDto): AboutPageEntity {
    return {
      heroImage: dto.heroImage,
      storyImage: dto.storyImage,
      company: {
        id: dto.company?.id,
        history: dto.company?.history || "",
        mission: dto.company?.mission || "",
        vision: dto.company?.vision || "",
      },
      stats: (dto.stats || []).map((s) => ({
        id: s.id,
        icon: s.icon || "Award",
        value: s.value || "",
        label: s.label || "",
      })),
      coreValues: (dto.coreValues || []).map((cv) => ({
        id: cv.id,
        icon: cv.icon || "ShieldCheck",
        title: cv.title || "",
        description: cv.description || "",
      })),
      timeline: (dto.timeline || []).map((t) => ({
        id: t.id,
        year: t.year ?? new Date().getFullYear(),
        title: t.title || "",
        description: t.description || "",
      })),
      team: (dto.team || []).slice(0, 6).map((tm) => ({
        id: tm.id,
        photoUrl: tm.photoUrl || null,
        name: tm.name || "",
        position: tm.position || "",
        bio: tm.bio || null,
      })),
    };
  }
}
