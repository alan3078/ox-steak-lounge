export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  excerpt: string;
  excerptZh: string;
  content: string;
  contentZh: string;
  author: string;
  authorZh: string;
  date: string;
  image: string;
  tags: string[];
  tagsZh: string[];
}
