"use client";

import { useState } from "react";
import { MenuItem, MenuCategory, MenuCategoryLabels } from "@/models/MenuItem";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Star, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuPageContentProps {
  items: MenuItem[];
}

export function MenuPageContent({ items }: MenuPageContentProps) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "all">("all");

  const categories = Array.from(new Set(items.map(item => item.category)));
  const displayItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getCategoryLabel = (category: MenuCategory | "all") => {
    if (category === "all") {
      return language === "en" ? "All Items" : "全部";
    }
    return language === "en" 
      ? MenuCategoryLabels.en[category] 
      : MenuCategoryLabels.zh[category];
  };

  const featuredItems = items.filter(item => item.featured);

  return (
    <div className="bg-gradient-to-b from-background via-background to-muted pt-24 pb-20 min-h-screen">
      {/* Compact Header with Category Pills */}
      <div className="container mx-auto px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <ChefHat className="w-12 h-12 text-secondary" />
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {language === "en" ? "Menu" : "菜單"}
              </h1>
              <p className="text-muted-foreground">
                {language === "en" ? "Crafted with passion" : "以熱情烹製"}
              </p>
            </div>
          </div>
          
          {/* Inline Category Filter */}
          <div className="flex flex-wrap gap-2">
            {["all", ...categories].map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category as MenuCategory | "all")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30"
                    : "bg-card text-foreground border border-border hover:border-secondary/50"
                }`}
              >
                {getCategoryLabel(category as MenuCategory | "all")}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Items - Horizontal Scroll */}
      {featuredItems.length > 0 && selectedCategory === "all" && (
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-4"
          >
            <Star className="w-5 h-5 text-secondary fill-secondary" />
            <h2 className="text-2xl font-bold">
              {language === "en" ? "Chef's Picks" : "主廚推薦"}
            </h2>
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="min-w-[300px] snap-start"
              >
                <Card className="bg-gradient-to-br from-secondary/10 to-card border-secondary/30 overflow-hidden group hover:shadow-xl hover:shadow-secondary/20 transition-all">
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={language === "en" ? item.name : item.nameZh}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-card-foreground line-clamp-1">
                          {language === "en" ? item.name : item.nameZh}
                        </h3>
                        <span className="font-bold text-secondary whitespace-nowrap">${item.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {language === "en" ? item.description : item.descriptionZh}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-card border-border overflow-hidden h-full hover:border-secondary/50 transition-all group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={language === "en" ? item.name : item.nameZh}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.spicyLevel && item.spicyLevel > 0 && (
                      <div className="absolute top-4 left-4 flex gap-1">
                        {Array.from({ length: item.spicyLevel }).map((_, i) => (
                          <Flame key={i} className="w-4 h-4 text-orange-500" />
                        ))}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-card-foreground group-hover:text-secondary transition-colors line-clamp-2">
                        {language === "en" ? item.name : item.nameZh}
                      </h3>
                      <span className="text-lg font-bold text-secondary whitespace-nowrap ml-2">
                        ${item.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                      {language === "en" ? item.description : item.descriptionZh}
                    </p>
                    <Badge variant="outline" className="border-secondary/50 text-secondary">
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
