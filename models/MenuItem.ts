export interface MenuItem {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  price: number;
  category: MenuCategory;
  image: string;
  featured?: boolean;
  spicyLevel?: number;
  allergens?: string[];
}

export enum MenuCategory {
  STEAKS = "Steaks",
  APPETIZERS = "Appetizers",
  SIDES = "Sides",
  DESSERTS = "Desserts",
  BEVERAGES = "Beverages",
}

export const MenuCategoryLabels = {
  en: {
    [MenuCategory.STEAKS]: "Steaks",
    [MenuCategory.APPETIZERS]: "Appetizers",
    [MenuCategory.SIDES]: "Sides",
    [MenuCategory.DESSERTS]: "Desserts",
    [MenuCategory.BEVERAGES]: "Beverages",
  },
  zh: {
    [MenuCategory.STEAKS]: "牛扒",
    [MenuCategory.APPETIZERS]: "前菜",
    [MenuCategory.SIDES]: "配菜",
    [MenuCategory.DESSERTS]: "甜品",
    [MenuCategory.BEVERAGES]: "飲品",
  },
};
