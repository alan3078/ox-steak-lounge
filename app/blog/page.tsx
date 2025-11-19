import { blogService } from "@/services/blogService";
import { BlogListContent } from "@/components/BlogListContent";

export default async function BlogPage() {
  const posts = await blogService.getAllPosts();

  return <BlogListContent posts={posts} />;
}
