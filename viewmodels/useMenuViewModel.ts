import { useQuery } from "@tanstack/react-query";
import { MenuItem, MenuCategory } from "@/models/MenuItem";
import { menuService } from "@/services/menuService";

export const useMenuViewModel = () => {
  const {
    data: allItems,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useQuery<MenuItem[]>({
    queryKey: ["menu", "all"],
    queryFn: menuService.getAllItems,
  });

  const {
    data: featuredItems,
    isLoading: isLoadingFeatured,
  } = useQuery<MenuItem[]>({
    queryKey: ["menu", "featured"],
    queryFn: menuService.getFeaturedItems,
  });

  const getItemsByCategory = (category: MenuCategory) => {
    return allItems?.filter((item) => item.category === category) || [];
  };

  const categories = Object.values(MenuCategory);

  return {
    allItems: allItems || [],
    featuredItems: featuredItems || [],
    isLoading: isLoadingAll || isLoadingFeatured,
    error: errorAll,
    getItemsByCategory,
    categories,
  };
};
