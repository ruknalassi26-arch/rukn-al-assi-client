import { GalleryItemEntity } from "../entities/gallery.entity";

export interface IGalleryRepository {
  getGalleryItems(): Promise<GalleryItemEntity[]>;
}
