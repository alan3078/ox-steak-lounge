import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@/models/BlogPost";
import { blogService } from "@/services/blogService";

export const useBlogViewModel = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<BlogPost[]>({
    queryKey: ["blog", "recent"],
    queryFn: () => blogService.getRecentPosts(3),
  });

  return {
    posts: posts || [],
    isLoading,
    error,
  };
};
