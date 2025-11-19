"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuViewModel } from "@/viewmodels/useMenuViewModel";
import { MenuCategory, MenuCategoryLabels } from "@/models/MenuItem";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MenuSection() {
  const { allItems, isLoading, categories, getItemsByCategory } = useMenuViewModel();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "all">("all");
  
  const getCategoryLabel = (category: MenuCategory | "all") => {
    if (category === "all") {
      return language === "en" ? "All Items" : "全部";
    }
    return language === "en" 
      ? MenuCategoryLabels.en[category] 
      : MenuCategoryLabels.zh[category];
  };

  const displayItems = selectedCategory === "all" 
    ? allItems 
    : getItemsByCategory(selectedCategory as MenuCategory);

  const categoryTabs = ["all", ...categories];

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {language === "en" ? "Our" : "我們的"} <span className="text-secondary">{language === "en" ? "Menu" : "菜單"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "en" 
              ? "A curated selection of premium dishes prepared with passion and precision"
              : "精選優質菜餚，以熱情和精準烹製"}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categoryTabs.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category as MenuCategory | "all")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {getCategoryLabel(category as MenuCategory | "all")}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
          </div>
        )}

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-card border-border overflow-hidden h-full hover:border-secondary/50 transition-colors group">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    {item.featured && (
                      <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                        {language === "en" ? "Featured" : "推薦"}
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-card-foreground group-hover:text-secondary transition-colors">
                        {language === "en" ? item.name : item.nameZh}
                      </h3>
                      <motion.span
                        className="text-xl font-bold text-secondary"
                        whileHover={{ scale: 1.1 }}
                      >
                        ${item.price}
                      </motion.span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{language === "en" ? item.description : item.descriptionZh}</p>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && displayItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              {language === "en" ? "No items found in this category" : "此類別中沒有找到項目"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
