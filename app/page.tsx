import { HeroBanner } from "@/components/HeroBanner";
import { MenuSection } from "@/components/MenuSection";
import { BlogSection } from "@/components/BlogSection";

export default function Home() {
  return (
    <div className="bg-black">
      <HeroBanner />
      <MenuSection />
      <BlogSection />
    </div>
  );
}
