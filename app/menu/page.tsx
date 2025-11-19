import { menuService } from "@/services/menuService";
import { MenuPageContent } from "@/components/MenuPageContent";

export default async function MenuPage() {
  const items = await menuService.getAllItems();

  return <MenuPageContent items={items} />;
}
