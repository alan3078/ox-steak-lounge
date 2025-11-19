"use client";

import { motion } from "framer-motion";
import { useBlogViewModel } from "@/viewmodels/useBlogViewModel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function BlogSection() {
  const { posts, isLoading } = useBlogViewModel();
  const { language } = useLanguage();

  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {language === "en" ? "Latest from our" : "我們的"} <span className="text-secondary">{language === "en" ? "Blog" : "博客"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "en"
              ? "Discover stories, tips, and insights from our culinary journey"
              : "發現故事、秘訣及我們烹飪之旅的見解"}
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-secondary animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="bg-card border-border overflow-hidden h-full group hover:border-secondary/50 transition-all">
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
            >
              {language === "en" ? "View All Posts" : "查看所有文章"}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
