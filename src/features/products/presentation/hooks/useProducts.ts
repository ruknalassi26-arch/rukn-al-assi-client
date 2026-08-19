import { useProductsList } from "../queries/products.queries";
import { useProductsStore } from "../stores/useProductsStore";

export function useProducts() {
  const { selectedCategory, searchQuery, setSelectedCategory, setSearchQuery } =
    useProductsStore();

  const { data: products, isLoading, error } = useProductsList(
    selectedCategory || undefined
  );

  const filteredProducts = products?.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.nameEn.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.descriptionEn.toLowerCase().includes(q)
    );
  });

  return {
    products: filteredProducts || [],
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };
}
