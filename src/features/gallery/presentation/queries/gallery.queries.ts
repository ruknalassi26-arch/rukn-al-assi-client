import { useQuery } from "@tanstack/react-query";
import { GalleryRepository } from "../../data/repositories/gallery.repository";
import { GetGalleryItemsUseCase } from "../../domain/usecases/get-gallery.usecase";

const repository = new GalleryRepository();
const getGalleryItemsUseCase = new GetGalleryItemsUseCase(repository);

export const galleryQueryKeys = {
  all: ["gallery"] as const,
  list: () => [...galleryQueryKeys.all, "list"] as const,
};

export function useGalleryList() {
  return useQuery({
    queryKey: galleryQueryKeys.list(),
    queryFn: () => getGalleryItemsUseCase.execute(),
  });
}
