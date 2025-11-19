import { BlogPost } from "@/models/BlogPost";

const mockBlogData: BlogPost[] = [
  {
    id: "1",
    slug: "the-art-of-dry-aging-why-it-matters",
    title: "The Art of Dry-Aging: Why It Matters",
    titleZh: "乾式熟成的藝術：為何如此重要",
    excerpt: "Discover how our 28-day dry-aging process creates the most tender, flavorful steaks you'll ever taste.",
    excerptZh: "了解我們28天的乾式熟成過程如何創造出您品嚐過最嫩滑、最美味的牛扒。",
    content: "Dry-aging is a time-honored technique that transforms good beef into extraordinary steaks. During our 28-day aging process, the beef undergoes enzymatic breakdown that tenderizes the meat while concentrating its natural flavors. The process also allows moisture to evaporate, which intensifies the beef's flavor profile. Our temperature and humidity-controlled aging room ensures optimal conditions for developing the complex, nutty notes that distinguish dry-aged beef from its fresh counterparts.",
    contentZh: "乾式熟成是一項歷史悠久的技術，能將優質牛肉轉化為非凡的牛扒。在我們28天的熟成過程中，牛肉經歷酶解作用，使肉質變得更嫩滑，同時濃縮其天然風味。此過程還能讓水分蒸發，從而增強牛肉的風味特徵。我們的溫濕度控制熟成室確保了最佳條件，以發展出乾式熟成牛肉獨特的複雜堅果風味。",
    author: "Chef Marcus Stone",
    authorZh: "主廚馬庫斯·史東",
    date: "2024-11-15",
    image: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&q=80",
    tags: ["Technique", "Steaks", "Quality"],
    tagsZh: ["技術", "牛扒", "品質"],
  },
  {
    id: "2",
    slug: "wine-pairing-guide-perfect-matches-for-your-steak",
    title: "Wine Pairing Guide: Perfect Matches for Your Steak",
    titleZh: "葡萄酒配搭指南：牛扒的完美搭配",
    excerpt: "Learn which wines complement different cuts and cooking styles from our sommelier.",
    excerptZh: "從我們的品酒師處了解哪些葡萄酒能完美搭配不同部位和烹調方式的牛扒。",
    content: "Pairing wine with steak is an art that enhances both the food and drink. Bold, full-bodied red wines like Cabernet Sauvignon pair beautifully with rich, fatty cuts like ribeye. For leaner cuts like filet mignon, consider a softer Pinot Noir or Merlot. The tannins in red wine help cut through the richness of the beef, cleansing your palate between bites. Our sommelier has curated an extensive wine list featuring selections from renowned vineyards worldwide to complement every item on our menu.",
    contentZh: "葡萄酒與牛扒的配搭是一門藝術，能提升食物和飲品的體驗。濃郁醇厚的紅酒如赤霞珠，能與肉眼扒等豐富油脂的部位完美搭配。對於菲力牛扒等較瘦的部位，可考慮柔和的黑皮諾或梅洛。紅酒中的單寧能切割牛肉的豐腴感，在每一口之間清潔您的味蕾。我們的品酒師精心策劃了一份豐富的酒單，精選來自世界知名酒莊的佳釀，以搭配我們菜單上的每一道菜式。",
    author: "Sarah Chen",
    authorZh: "莎拉·陳",
    date: "2024-11-10",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    tags: ["Wine", "Pairing", "Guide"],
    tagsZh: ["葡萄酒", "配搭", "指南"],
  },
  {
    id: "3",
    slug: "behind-the-scenes-a-day-in-our-kitchen",
    title: "Behind the Scenes: A Day in Our Kitchen",
    titleZh: "幕後花絮：我們廚房的一天",
    excerpt: "Take an exclusive look at how our culinary team prepares for service each day.",
    excerptZh: "獨家了解我們的烹飪團隊如何為每天的服務做準備。",
    content: "Our day begins at 8 AM when our head chef arrives to inspect deliveries and plan the day's specials. By 10 AM, the entire culinary team is hard at work preparing stocks, sauces, and mise en place. Each station is meticulously organized, ensuring smooth service during our busy dinner rush. Our commitment to excellence means every ingredient is treated with respect, every dish is plated with precision, and every guest receives an unforgettable dining experience. Join us as we take you through a typical day at OX Steak Lounge.",
    contentZh: "我們的一天從早上8點開始，主廚到達後檢查食材送貨並規劃當天的特色菜。到了上午10點，整個烹飪團隊已在努力準備高湯、醬汁和備料。每個工作站都井井有條，確保在繁忙的晚餐時段能順暢運作。我們對卓越的承諾意味著每種食材都受到尊重，每道菜都精心擺盤，每位客人都能獲得難忘的用餐體驗。讓我們帶您了解OX牛扒廊的典型一天。",
    author: "Chef Marcus Stone",
    authorZh: "主廚馬庫斯·史東",
    date: "2024-11-05",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    tags: ["Kitchen", "Team", "Behind the Scenes"],
    tagsZh: ["廚房", "團隊", "幕後花絮"],
  },
];

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockBlogData;
  },

  getRecentPosts: async (limit: number = 3): Promise<BlogPost[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockBlogData.slice(0, limit);
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockBlogData.find((post) => post.slug === slug);
  },
};
