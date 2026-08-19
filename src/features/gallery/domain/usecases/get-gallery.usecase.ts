import { IGalleryRepository } from "../repositories/i-gallery.repository";
import { GalleryItemEntity } from "../entities/gallery.entity";

export class GetGalleryItemsUseCase {
  constructor(private readonly repository: IGalleryRepository) {}

  async execute(): Promise<GalleryItemEntity[]> {
    return this.repository.getGalleryItems();
  }
}
