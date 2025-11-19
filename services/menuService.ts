import { MenuItem, MenuCategory } from "@/models/MenuItem";

const mockMenuData: MenuItem[] = [
  {
    id: "1",
    name: "Prime Ribeye",
    nameZh: "頂級肉眼扒",
    description: "16oz prime ribeye aged 28 days, grilled to perfection with herb butter",
    descriptionZh: "16盎司頂級肉眼扒，經28天熟成，配香草牛油，烤至完美",
    price: 52,
    category: MenuCategory.STEAKS,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    featured: true,
  },
  {
    id: "2",
    name: "Wagyu Filet Mignon",
    nameZh: "和牛菲力牛扒",
    description: "8oz Japanese A5 Wagyu, the pinnacle of beef excellence",
    descriptionZh: "8盎司日本A5和牛，牛肉中的極致之選",
    price: 89,
    category: MenuCategory.STEAKS,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80",
    featured: true,
  },
  {
    id: "3",
    name: "Tomahawk Steak",
    nameZh: "戰斧牛扒",
    description: "32oz bone-in ribeye, perfect for sharing, served with chimichurri",
    descriptionZh: "32盎司帶骨肉眼扒，適合分享，配青醬",
    price: 78,
    category: MenuCategory.STEAKS,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
    featured: true,
  },
  {
    id: "4",
    name: "NY Strip",
    nameZh: "紐約客牛扒",
    description: "14oz New York strip with black pepper crust and red wine reduction",
    descriptionZh: "14盎司紐約客牛扒，配黑椒外皮及紅酒汁",
    price: 48,
    category: MenuCategory.STEAKS,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  },
  {
    id: "5",
    name: "Beef Carpaccio",
    nameZh: "生牛肉薄片",
    description: "Thinly sliced raw beef with arugula, parmesan, and truffle oil",
    descriptionZh: "薄切生牛肉配芝麻菜、帕馬森芝士及松露油",
    price: 18,
    category: MenuCategory.APPETIZERS,
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=800&q=80",
  },
  {
    id: "6",
    name: "Grilled Octopus",
    nameZh: "炭烤八爪魚",
    description: "Spanish octopus with paprika, olive oil, and lemon",
    descriptionZh: "西班牙八爪魚配紅椒粉、橄欖油及檸檬",
    price: 22,
    category: MenuCategory.APPETIZERS,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&q=80",
  },
  {
    id: "7",
    name: "Truffle Mac & Cheese",
    nameZh: "松露芝士通心粉",
    description: "Creamy macaroni with black truffle and aged cheddar",
    descriptionZh: "忌廉通心粉配黑松露及陳年車打芝士",
    price: 16,
    category: MenuCategory.SIDES,
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800&q=80",
  },
  {
    id: "8",
    name: "Roasted Asparagus",
    nameZh: "烤蘆筍",
    description: "Fresh asparagus with hollandaise sauce and crispy prosciutto",
    descriptionZh: "新鮮蘆筍配荷蘭醬及香脆風乾火腿",
    price: 12,
    category: MenuCategory.SIDES,
    image: "https://images.unsplash.com/photo-1565299715199-866c917206bb?w=800&q=80",
  },
  {
    id: "9",
    name: "Chocolate Lava Cake",
    nameZh: "熔岩朱古力蛋糕",
    description: "Warm chocolate cake with molten center, vanilla ice cream",
    descriptionZh: "溫熱朱古力蛋糕配熔漿內餡及雲呢拿雪糕",
    price: 14,
    category: MenuCategory.DESSERTS,
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
  },
  {
    id: "10",
    name: "Crème Brûlée",
    nameZh: "法式焦糖燉蛋",
    description: "Classic French custard with caramelized sugar crust",
    descriptionZh: "經典法式燉蛋配焦糖脆皮",
    price: 12,
    category: MenuCategory.DESSERTS,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
  },
];

export const menuService = {
  getAllItems: async (): Promise<MenuItem[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMenuData;
  },

  getItemsByCategory: async (category: MenuCategory): Promise<MenuItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockMenuData.filter((item) => item.category === category);
  },

  getFeaturedItems: async (): Promise<MenuItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockMenuData.filter((item) => item.featured);
  },
};
