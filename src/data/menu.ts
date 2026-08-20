import { IMG } from "./images";

export type Tag =
  | "vegetarian"
  | "vegan"
  | "gluten-friendly"
  | "bestseller"
  | "chefs-pick";

export type Category =
  | "coffee"
  | "breakfast"
  | "brunch"
  | "lunch"
  | "dessert"
  | "drinks";

export type Mood =
  | "coffee"
  | "sweet"
  | "brunch"
  | "light"
  | "dessert";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc: string;
  category: Category;
  tags: Tag[];
  image: string;
  ingredients: string;
  allergens: string;
  moods: Mood[];
  signature?: boolean;
}

export const TAG_LABEL: Record<Tag, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-friendly": "Gluten-friendly",
  bestseller: "Bestseller",
  "chefs-pick": "Chef's Pick",
};

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee" },
  { id: "breakfast", label: "Breakfast" },
  { id: "brunch", label: "Brunch" },
  { id: "lunch", label: "Lunch" },
  { id: "dessert", label: "Dessert" },
  { id: "drinks", label: "Drinks" },
];

export const FILTERS: { id: Tag | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-friendly", label: "Gluten-friendly" },
  { id: "bestseller", label: "Bestsellers" },
  { id: "chefs-pick", label: "Chef's Picks" },
];

export const MENU: MenuItem[] = [
  /* ---------------- COFFEE ---------------- */
  {
    id: "espresso",
    name: "Espresso",
    price: 180,
    desc: "A short, bright shot from our seasonal house blend.",
    category: "coffee",
    tags: ["vegan", "gluten-friendly"],
    image: IMG.cortado,
    ingredients: "Seasonal house espresso blend.",
    allergens: "None.",
    moods: ["coffee"],
  },
  {
    id: "americano",
    name: "Americano",
    price: 200,
    desc: "Espresso lengthened with hot water — clean and unhurried.",
    category: "coffee",
    tags: ["vegan", "gluten-friendly"],
    image: IMG.rusticLatte,
    ingredients: "Double espresso, filtered water.",
    allergens: "None.",
    moods: ["coffee"],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 250,
    desc: "Equal parts espresso, steamed milk and soft foam.",
    category: "coffee",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.cappuccino,
    ingredients: "Double espresso, steamed whole milk.",
    allergens: "Contains dairy.",
    moods: ["coffee"],
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: 280,
    desc: "Ristretto shots and velvet microfoam. Our barista's default.",
    category: "coffee",
    tags: ["vegetarian", "gluten-friendly", "chefs-pick"],
    image: IMG.baristaHold,
    ingredients: "Double ristretto, textured whole milk.",
    allergens: "Contains dairy.",
    moods: ["coffee"],
  },
  {
    id: "latte",
    name: "Latte",
    price: 280,
    desc: "Gentle, milky and warm — the long-conversation coffee.",
    category: "coffee",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.latteArt,
    ingredients: "Double espresso, steamed milk.",
    allergens: "Contains dairy.",
    moods: ["coffee"],
  },
  {
    id: "mocha",
    name: "Mocha",
    price: 300,
    desc: "Espresso, 70% dark chocolate and steamed milk.",
    category: "coffee",
    tags: ["vegetarian"],
    image: IMG.greenCup,
    ingredients: "Espresso, dark chocolate ganache, milk.",
    allergens: "Contains dairy, soy.",
    moods: ["coffee", "sweet"],
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    price: 300,
    desc: "Steeped for eighteen hours. Low acidity, quietly strong.",
    category: "coffee",
    tags: ["vegan", "gluten-friendly", "bestseller"],
    image: IMG.latteGlass,
    ingredients: "Coarse-ground single origin, cold filtered water.",
    allergens: "None.",
    moods: ["coffee", "light"],
  },
  {
    id: "pistachio-cloud-latte",
    name: "Pistachio Cloud Latte",
    price: 350,
    desc: "Double espresso, silky milk, house pistachio cream.",
    category: "coffee",
    tags: ["vegetarian", "bestseller", "chefs-pick"],
    image: IMG.heartLatte,
    ingredients:
      "Double espresso, steamed milk, house-made pistachio cream, sea salt.",
    allergens: "Contains dairy and tree nuts (pistachio).",
    moods: ["coffee", "sweet"],
    signature: true,
  },

  /* ---------------- BREAKFAST ---------------- */
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    price: 420,
    desc: "Sourdough, smashed avocado, chilli, lemon and herbs.",
    category: "breakfast",
    tags: ["vegetarian", "bestseller"],
    image: IMG.avoToast,
    ingredients: "Sourdough, avocado, lemon, chilli flakes, micro herbs.",
    allergens: "Contains gluten. Vegan on request.",
    moods: ["brunch", "light"],
  },
  {
    id: "luna-pancakes",
    name: "Luna Pancakes",
    price: 450,
    desc: "Buttermilk pancakes, seasonal berries, maple butter.",
    category: "breakfast",
    tags: ["vegetarian", "bestseller"],
    image: IMG.pancakes,
    ingredients: "Buttermilk batter, seasonal berries, maple butter.",
    allergens: "Contains gluten, dairy, egg.",
    moods: ["brunch", "sweet"],
  },
  {
    id: "eggs-benedict",
    name: "Eggs Benedict",
    price: 520,
    desc: "Poached eggs, brioche, hollandaise, chives.",
    category: "breakfast",
    tags: ["chefs-pick"],
    image: IMG.eggsBenedict,
    ingredients: "Poached eggs, toasted brioche, hollandaise, chives.",
    allergens: "Contains gluten, egg, dairy.",
    moods: ["brunch"],
  },
  {
    id: "granola-bowl",
    name: "Granola Bowl",
    price: 390,
    desc: "House granola, yoghurt or coconut, fruit and honey.",
    category: "breakfast",
    tags: ["vegetarian"],
    image: IMG.berryPastry,
    ingredients: "Toasted oat granola, yoghurt, seasonal fruit, honey.",
    allergens: "Contains nuts, dairy. Vegan option available.",
    moods: ["light", "sweet"],
  },
  {
    id: "french-toast",
    name: "French Toast",
    price: 430,
    desc: "Thick brioche, vanilla custard, cinnamon sugar.",
    category: "breakfast",
    tags: ["vegetarian"],
    image: IMG.breakfastSpread,
    ingredients: "Brioche, vanilla custard, cinnamon sugar, butter.",
    allergens: "Contains gluten, dairy, egg.",
    moods: ["brunch", "sweet"],
  },

  /* ---------------- BRUNCH ---------------- */
  {
    id: "truffle-mushroom-toast",
    name: "Truffle Mushroom Toast",
    price: 520,
    desc: "Sourdough, wild mushrooms, truffle cream.",
    category: "brunch",
    tags: ["vegetarian", "chefs-pick"],
    image: IMG.mushroomPlate,
    ingredients: "Sourdough, wild mushrooms, truffle cream, thyme.",
    allergens: "Contains gluten, dairy.",
    moods: ["brunch"],
  },
  {
    id: "citrus-burrata-salad",
    name: "Citrus Burrata Salad",
    price: 580,
    desc: "Burrata, seasonal citrus, herbs.",
    category: "brunch",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.burrataSalad,
    ingredients: "Burrata, orange, grapefruit, basil, olive oil.",
    allergens: "Contains dairy.",
    moods: ["light"],
  },
  {
    id: "luna-breakfast-plate",
    name: "Luna Breakfast Plate",
    price: 550,
    desc: "Eggs your way, sourdough, greens, roast tomato.",
    category: "brunch",
    tags: ["vegetarian"],
    image: IMG.avoBenedict,
    ingredients: "Eggs, sourdough, sautéed greens, roast tomato, feta.",
    allergens: "Contains gluten, egg, dairy.",
    moods: ["brunch"],
  },
  {
    id: "seasonal-grain-bowl",
    name: "Seasonal Grain Bowl",
    price: 490,
    desc: "Ancient grains, roast vegetables, tahini dressing.",
    category: "brunch",
    tags: ["vegan", "gluten-friendly"],
    image: IMG.caprese,
    ingredients: "Quinoa, millet, roast vegetables, tahini, seeds.",
    allergens: "Contains sesame.",
    moods: ["light"],
  },

  /* ---------------- LUNCH ---------------- */
  {
    id: "creamy-mushroom-pasta",
    name: "Creamy Mushroom Pasta",
    price: 560,
    desc: "Tagliatelle, mushroom cream, parmesan, black pepper.",
    category: "lunch",
    tags: ["vegetarian", "bestseller"],
    image: IMG.pasta,
    ingredients: "Fresh tagliatelle, mushrooms, cream, parmesan.",
    allergens: "Contains gluten, dairy, egg.",
    moods: ["brunch"],
  },
  {
    id: "roasted-chicken-sandwich",
    name: "Roasted Chicken Sandwich",
    price: 520,
    desc: "Herb-roasted chicken, aioli, greens, toasted sourdough.",
    category: "lunch",
    tags: [],
    image: IMG.poachedToast,
    ingredients: "Roast chicken, aioli, rocket, sourdough.",
    allergens: "Contains gluten, egg.",
    moods: ["brunch"],
  },
  {
    id: "luna-grain-bowl",
    name: "Luna Grain Bowl",
    price: 490,
    desc: "Grains, avocado, pickled vegetables, green herb dressing.",
    category: "lunch",
    tags: ["vegan", "gluten-friendly", "chefs-pick"],
    image: IMG.capreseSalad,
    ingredients: "Grains, avocado, pickles, herb dressing, seeds.",
    allergens: "Contains sesame.",
    moods: ["light"],
  },
  {
    id: "burrata-salad",
    name: "Burrata Salad",
    price: 580,
    desc: "Burrata, heirloom tomato, basil, aged balsamic.",
    category: "lunch",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.burrataTomato,
    ingredients: "Burrata, heirloom tomato, basil, balsamic.",
    allergens: "Contains dairy.",
    moods: ["light"],
  },

  /* ---------------- DESSERT ---------------- */
  {
    id: "pistachio-croissant",
    name: "Pistachio Croissant",
    price: 280,
    desc: "Buttery croissant, pistachio cream.",
    category: "dessert",
    tags: ["vegetarian", "bestseller"],
    image: IMG.pistachioCroissant,
    ingredients: "Laminated croissant, pistachio frangipane, crushed nuts.",
    allergens: "Contains gluten, dairy, egg, tree nuts.",
    moods: ["sweet", "dessert"],
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Roll",
    price: 260,
    desc: "Soft laminated dough, cinnamon butter, cream cheese glaze.",
    category: "dessert",
    tags: ["vegetarian"],
    image: IMG.mangoPastry,
    ingredients: "Laminated dough, cinnamon butter, cream cheese glaze.",
    allergens: "Contains gluten, dairy, egg.",
    moods: ["sweet", "dessert"],
  },
  {
    id: "dark-chocolate-torte",
    name: "Dark Chocolate Torte",
    price: 390,
    desc: "70% dark chocolate, vanilla cream.",
    category: "dessert",
    tags: ["vegetarian", "gluten-friendly", "chefs-pick"],
    image: IMG.chocCroissantPlate,
    ingredients: "70% dark chocolate, eggs, butter, vanilla cream.",
    allergens: "Contains dairy, egg, soy.",
    moods: ["sweet", "dessert"],
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    price: 380,
    desc: "Espresso-soaked savoiardi, mascarpone, cocoa.",
    category: "dessert",
    tags: ["vegetarian"],
    image: IMG.pastryCase,
    ingredients: "Savoiardi, espresso, mascarpone, cocoa.",
    allergens: "Contains gluten, dairy, egg.",
    moods: ["sweet", "dessert", "coffee"],
  },
  {
    id: "vanilla-bean-cheesecake",
    name: "Vanilla Bean Cheesecake",
    price: 420,
    desc: "Baked slowly, finished with vanilla bean cream.",
    category: "dessert",
    tags: ["vegetarian"],
    image: IMG.croissantBlue,
    ingredients: "Cream cheese, vanilla bean, biscuit base.",
    allergens: "Contains gluten, dairy, egg.",
    moods: ["sweet", "dessert"],
  },

  /* ---------------- DRINKS ---------------- */
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    price: 320,
    desc: "Ceremonial-grade matcha whisked with steamed milk.",
    category: "drinks",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.baristaPour,
    ingredients: "Ceremonial matcha, steamed milk.",
    allergens: "Contains dairy. Oat option available.",
    moods: ["light", "coffee"],
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha",
    price: 340,
    desc: "Cold, grassy and bright over slow-melt ice.",
    category: "drinks",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.baristaCup,
    ingredients: "Ceremonial matcha, chilled milk, ice.",
    allergens: "Contains dairy. Oat option available.",
    moods: ["light"],
  },
  {
    id: "peach-iced-tea",
    name: "Peach Iced Tea",
    price: 280,
    desc: "Cold-steeped black tea, white peach, lemon.",
    category: "drinks",
    tags: ["vegan", "gluten-friendly"],
    image: IMG.sunlightCup,
    ingredients: "Black tea, white peach purée, lemon.",
    allergens: "None.",
    moods: ["light"],
  },
  {
    id: "berry-smoothie",
    name: "Berry Smoothie",
    price: 350,
    desc: "Mixed berries, banana, yoghurt or coconut.",
    category: "drinks",
    tags: ["vegetarian", "gluten-friendly"],
    image: IMG.pastryRack,
    ingredients: "Mixed berries, banana, yoghurt, honey.",
    allergens: "Contains dairy. Vegan option available.",
    moods: ["light", "sweet"],
  },
  {
    id: "luna-lemonade",
    name: "Luna Lemonade",
    price: 260,
    desc: "Fresh lemon, mint and a whisper of rosemary.",
    category: "drinks",
    tags: ["vegan", "gluten-friendly"],
    image: IMG.latteGlass,
    ingredients: "Lemon, cane sugar, mint, rosemary, soda.",
    allergens: "None.",
    moods: ["light"],
  },
];

export const byId = (id: string) => MENU.find((m) => m.id === id);

export const SIGNATURE_PREVIEW = [
  "pistachio-cloud-latte",
  "luna-pancakes",
  "truffle-mushroom-toast",
  "citrus-burrata-salad",
  "pistachio-croissant",
  "dark-chocolate-torte",
];

export const MOODS: { id: string; label: string; note: string; items: string[] }[] = [
  {
    id: "coffee",
    label: "I need coffee",
    note: "Start here. Warm cup, quiet table.",
    items: ["flat-white", "pistachio-cloud-latte", "cold-brew"],
  },
  {
    id: "sweet",
    label: "Something sweet",
    note: "Pastry counter favourites, baked this morning.",
    items: ["pistachio-croissant", "cinnamon-roll", "dark-chocolate-torte"],
  },
  {
    id: "brunch",
    label: "Brunch please",
    note: "Unhurried plates for the long middle of the day.",
    items: ["luna-pancakes", "avocado-toast", "eggs-benedict"],
  },
  {
    id: "light",
    label: "Something light",
    note: "Fresh, green and easy on the afternoon.",
    items: ["seasonal-grain-bowl", "citrus-burrata-salad", "peach-iced-tea"],
  },
  {
    id: "dessert",
    label: "Dessert please",
    note: "For the end of the evening, or the middle of it.",
    items: ["tiramisu", "vanilla-bean-cheesecake", "dark-chocolate-torte"],
  },
  {
    id: "surprise",
    label: "Surprise me",
    note: "Our barista and chef would order this.",
    items: ["pistachio-cloud-latte", "truffle-mushroom-toast", "tiramisu"],
  },
];
