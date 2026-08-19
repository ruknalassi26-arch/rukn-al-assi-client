import { useGalleryList } from "../queries/gallery.queries";
import { useGalleryStore } from "../stores/useGalleryStore";

export function useGallery() {
  const { data: items, isLoading, error } = useGalleryList();
  const { activeCategory, setActiveCategory } = useGalleryStore();

  const filteredItems = items?.filter((item) => {
    if (!activeCategory) return true;
    return item.category === activeCategory;
  });

  return {
    items: filteredItems || [],
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
  };
}
