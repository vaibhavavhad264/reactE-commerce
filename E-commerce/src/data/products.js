const P = (id, name, category, price, rating, file, description, featured = false) =>
  ({ id, name, category, price, rating, image: `/images/products/${file}`, description, featured });

export const products = [
  P(1, "Wireless Headphones", "Electronics", 2499, 4.5, "headphones.jpg", "Over-ear Bluetooth headphones with active noise cancellation and 30-hour battery life.", true),
  P(2, "Smart Watch", "Electronics", 3999, 4.3, "smartwatch.jpg", "Fitness tracking, heart-rate monitor, sleep tracking and 7-day battery.", true),
  P(3, "Portable Speaker", "Electronics", 1799, 4.4, "speaker.jpg", "Waterproof speaker with deep bass and 12 hours of playtime."),
  P(4, "Ultrabook Laptop", "Electronics", 54999, 4.7, "laptop.jpg", "14-inch lightweight laptop, 16GB RAM, 512GB SSD, all-day battery.", true),
  P(5, "Running Sneakers", "Footwear", 2999, 4.2, "sneakers.jpg", "Breathable mesh sneakers with cushioned sole for everyday comfort.", true),
  P(6, "Winter Jacket", "Fashion", 3499, 4.1, "jacket.jpg", "Warm padded jacket with water-resistant outer shell."),
  P(7, "Classic Sunglasses", "Accessories", 799, 4.0, "sunglasses.jpg", "UV400 protection polarized sunglasses with a timeless design."),
  P(8, "Travel Backpack", "Bags", 1599, 4.6, "backpack.jpg", "30L backpack with laptop compartment, USB port and anti-theft pocket.", true),
  P(9, "LED Desk Lamp", "Home Decor", 999, 4.3, "lamp.jpg", "Adjustable desk lamp with 3 colour modes and touch dimming."),
  P(10, "Ceramic Coffee Mug", "Kitchen", 349, 4.5, "mug.jpg", "Handmade 350ml ceramic mug, microwave and dishwasher safe."),
  P(11, "Indoor Plant Pot", "Home Decor", 549, 4.4, "plant.jpg", "Decorative planter with a live indoor plant, easy to maintain.", true),
  P(12, "Leather Wallet", "Accessories", 699, 4.2, "wallet.jpg", "Slim genuine leather wallet with RFID protection."),
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];

export const catIcons = [
  ["Electronics", "📱"], ["Fashion", "🧥"], ["Footwear", "👟"], ["Accessories", "🕶️"],
  ["Bags", "🎒"], ["Home Decor", "🪴"], ["Kitchen", "☕"],
];

// Simulated async API call (with error handling support)
export const fetchProduct = (id) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const p = products.find((x) => x.id === Number(id));
      p ? resolve(p) : reject(new Error("Product not found"));
    }, 500)
  );

export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");