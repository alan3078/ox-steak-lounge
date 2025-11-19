"use client";

import { BlogPost } from "@/models/BlogPost";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogListContentProps {
  posts: BlogPost[];
}

export function BlogListContent({ posts }: BlogListContentProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-background pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {language === "en" ? "All" : "所有"} <span className="text-secondary">{language === "en" ? "Blog Posts" : "博客文章"}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Explore our complete collection of stories, tips, and insights"
              : "探索我們的故事、秘訣及見解的完整合集"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border overflow-hidden h-full group hover:border-secondary/50 transition-all">
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={language === "en" ? post.title : post.titleZh}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(language === "en" ? post.tags : post.tagsZh).slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-secondary/50 text-secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {language === "en" ? post.title : post.titleZh}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {language === "en" ? post.excerpt : post.excerptZh}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{language === "en" ? post.author : post.authorZh}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="ghost"
                        className="text-secondary hover:text-secondary/80 hover:bg-transparent p-0 h-auto"
                      >
                        {language === "en" ? "Read More" : "閱讀更多"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
