"use client";

import { BlogPost } from "@/models/BlogPost";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogDetailContentProps {
  post: BlogPost;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-background pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src={post.image}
          alt={language === "en" ? post.title : post.titleZh}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-secondary mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to Home" : "返回主頁"}
              </Button>
            </Link>
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {(language === "en" ? post.tags : post.tagsZh).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-secondary text-secondary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {language === "en" ? post.title : post.titleZh}
              </h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{language === "en" ? post.author : post.authorZh}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {language === "en" ? post.excerpt : post.excerptZh}
            </p>
            
            <div className="text-foreground">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {language === "en" ? post.content : post.contentZh}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-border">
            <Link href="/">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to All Posts" : "返回所有文章"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
