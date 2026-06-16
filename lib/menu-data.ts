const drinkImg = "/assets/menu-drink.jpg";
const mealImg = "/assets/menu-meal.jpg";
const pastryImg = "/assets/menu-pastry.jpg";

export type MenuCategory = "Drinks" | "Meals" | "Pastry";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: MenuCategory;
  img: string;
};

export const menuItems: MenuItem[] = [
  { id: "caramel-cloud-latte", name: "Caramel Cloud Latte", desc: "Double shot, oat milk, slow caramel.", price: 6.5, category: "Drinks", img: drinkImg },
  { id: "yirgacheffe-pour-over", name: "Yirgacheffe Pour-Over", desc: "Floral, jasmine, soft citrus finish.", price: 5.0, category: "Drinks", img: drinkImg },
  { id: "iced-honey-cortado", name: "Iced Honey Cortado", desc: "Espresso, raw honey, micro-foam.", price: 5.75, category: "Drinks", img: drinkImg },
  { id: "avocado-poached-egg", name: "Avocado & Poached Egg", desc: "Sourdough, microgreens, chili oil.", price: 14.0, category: "Meals", img: mealImg },
  { id: "burrata-plate", name: "Burrata Plate", desc: "Heirloom tomato, basil, sea salt.", price: 16.5, category: "Meals", img: mealImg },
  { id: "smoked-salmon-tartine", name: "Smoked Salmon Tartine", desc: "Crème fraîche, dill, lemon.", price: 15.0, category: "Meals", img: mealImg },
  { id: "dark-chocolate-tart", name: "Dark Chocolate Tart", desc: "Raspberry coulis, gold leaf.", price: 8.5, category: "Pastry", img: pastryImg },
  { id: "almond-croissant", name: "Almond Croissant", desc: "Twice baked, vanilla cream.", price: 5.5, category: "Pastry", img: pastryImg },
  { id: "cardamom-bun", name: "Cardamom Bun", desc: "Stone-hearth baked at dawn.", price: 4.75, category: "Pastry", img: pastryImg },
];

export const findItem = (id: string) => menuItems.find((i) => i.id === id);
export const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);