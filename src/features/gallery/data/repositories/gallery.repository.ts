import { IGalleryRepository } from "../../domain/repositories/i-gallery.repository";
import { GalleryItemEntity } from "../../domain/entities/gallery.entity";
import { GalleryMapper } from "../mappers/gallery.mapper";
import { createClient } from "@core/lib/supabase/client";

export class GalleryRepository implements IGalleryRepository {
  private supabase = createClient();

  async getGalleryItems(): Promise<GalleryItemEntity[]> {
    const { data: images } = await this.supabase
      .from("project_images")
      .select("id, project_id, image_url, sort_order")
      .order("sort_order", { ascending: true });

    if (!images || images.length === 0) return [];

    return images.map((img) =>
      GalleryMapper.toEntity({
        id: img.id,
        title_en: "",
        title_ar: "",
        category: "PROJECTS",
        image_url: img.image_url,
      })
    );
  }
}
