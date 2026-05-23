import productCement from "../assets/product_cement.png";
import productSteel from "../assets/product_steel.png";
import productRoofing from "../assets/product_roofing.png";
import productPaint from "../assets/product_paint.png";

export const products = [
  {
    id: "cement",
    name: "Premium Cement (50kg)",
    category: "Cement",
    icon: "fa-industry",
    price: 18.99,
    oldPrice: 22.00,
    rating: 5,
    reviewsCount: 128,
    badge: "HOT",
    badgeClass: "badge-hot",
    image: productCement,
    description: "Tire-grade high strength cement for all load-bearing structures and structural concrete casting."
  },
  {
    id: "steel",
    name: "Construction Steel (12mm)",
    category: "Steel",
    icon: "fa-grip-lines",
    price: 45.00,
    oldPrice: 52.00,
    rating: 4,
    reviewsCount: 94,
    badge: "NEW",
    badgeClass: "badge-new",
    image: productSteel,
    description: "Highly tension-resistant steel rebar perfect for high-durability columns and beam frameworks."
  },
  {
    id: "roofing",
    name: "Galvanized Roofing Sheet",
    category: "Roofing",
    icon: "fa-home",
    price: 12.50,
    oldPrice: 16.00,
    rating: 5,
    reviewsCount: 211,
    badge: "SALE",
    badgeClass: "badge-sale",
    image: productRoofing,
    description: "Extra corrosion-resistant corrugated roofing sheets for extreme weather shield protection."
  },
  {
    id: "paint",
    name: "Premium Wall Paint (20L)",
    category: "Paint",
    icon: "fa-paint-roller",
    price: 34.00,
    oldPrice: 40.00,
    rating: 4,
    reviewsCount: 76,
    badge: null,
    badgeClass: "",
    image: productPaint,
    description: "High-finish washable emulsion paint suitable for both interior walls and outdoor weatherproofing."
  }
];
