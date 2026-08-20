import { IMG } from "./images";

export const SITE = {
  name: "Luna Café",
  tagline: "Coffee, conversations & slow moments.",
  address1: "123 Example Street",
  address2: "New Delhi, India",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  email: "hello@lunacafe.example",
  whatsappNumber: "919000000000",
  instagram: "@lunacafe",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=123+Example+Street+New+Delhi",
};

export const wa = (message: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const HOURS = [
  { day: "Monday", time: "8:00 AM — 10:00 PM" },
  { day: "Tuesday", time: "8:00 AM — 10:00 PM" },
  { day: "Wednesday", time: "8:00 AM — 10:00 PM" },
  { day: "Thursday", time: "8:00 AM — 10:00 PM" },
  { day: "Friday", time: "8:00 AM — 11:00 PM" },
  { day: "Saturday", time: "8:00 AM — 11:00 PM" },
  { day: "Sunday", time: "9:00 AM — 10:00 PM" },
];

export type GalleryCategory = "food" | "coffee" | "space" | "people" | "events";

export interface GalleryImage {
  src: string;
  alt: string;
  cat: GalleryCategory;
  tall?: boolean;
}

export const GALLERY: GalleryImage[] = [
  { src: IMG.latteArt, alt: "Latte art poured into a warm ceramic cup", cat: "coffee", tall: true },
  { src: IMG.pastryDisplay, alt: "Morning pastries lined up on the counter", cat: "food" },
  { src: IMG.interiorWarm, alt: "Soft lamplight over the corner banquette", cat: "space", tall: true },
  { src: IMG.avoToast, alt: "Avocado toast with poached eggs", cat: "food" },
  { src: IMG.baristaPour, alt: "Barista finishing a pour at the bar", cat: "people", tall: true },
  { src: IMG.interiorPlants, alt: "Window seat framed by greenery", cat: "space" },
  { src: IMG.chocCroissant, alt: "Croissants cooling on a tray", cat: "food", tall: true },
  { src: IMG.friendsCoffee, alt: "Two friends over coffee in the afternoon", cat: "people" },
  { src: IMG.burrataPlated, alt: "Citrus burrata salad, plated", cat: "food", tall: true },
  { src: IMG.eveningTerrace, alt: "Evening lights along the café terrace", cat: "events" },
  { src: IMG.interiorModern, alt: "The bar and back counter at opening hour", cat: "space" },
  { src: IMG.cosyEvening, alt: "A long table shared on a slow evening", cat: "events", tall: true },
  { src: IMG.sunlightCup, alt: "A cappuccino in the morning sun", cat: "coffee" },
  { src: IMG.gathering, alt: "A small celebration at the back table", cat: "events" },
  { src: IMG.womanSitting, alt: "Working quietly by the window", cat: "people", tall: true },
  { src: IMG.cortado, alt: "A cortado held in both hands", cat: "coffee" },
  { src: IMG.quietCorner, alt: "A quiet corner of the room", cat: "space" },
  { src: IMG.pasta, alt: "Tagliatelle with burrata and pesto", cat: "food" },
];

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  body: string[];
}

export const JOURNAL: Article[] = [
  {
    slug: "the-art-of-a-slow-morning",
    title: "The Art of a Slow Morning",
    category: "Ritual",
    date: "12 May 2026",
    readTime: "4 min read",
    excerpt:
      "Why the first thirty minutes of the day deserve more than a paper cup on the move.",
    image: IMG.sunlightCup,
    body: [
      "There is a particular quality to the light at eight in the morning, before the street outside fully wakes. It falls across the long table by the window in a way that makes people speak a little more softly. We designed that table for exactly this hour.",
      "A slow morning is not about having more time. Most of our regulars arrive with an appointment somewhere and a phone that will not stop. A slow morning is about how you hold the first twenty minutes — sitting down rather than standing, drinking from ceramic rather than paper, ordering the thing you actually want.",
      "Our advice, offered gently: come before nine. Order a flat white and a croissant. Sit facing the window. Let the coffee cool enough to taste properly. Whatever the day is planning, it will still be there in twenty minutes.",
      "We keep the music low until ten. It is deliberate. Mornings at Luna belong to conversation, to notebooks, to the sound of the grinder and the milk steaming — a kind of quiet that is not silence.",
    ],
  },
  {
    slug: "the-story-behind-our-pistachio-latte",
    title: "The Story Behind Our Pistachio Latte",
    category: "Coffee",
    date: "28 April 2026",
    readTime: "5 min read",
    excerpt:
      "Eleven attempts, one stubborn barista, and the drink that became our signature.",
    image: IMG.heartLatte,
    body: [
      "It began as a mistake. Our head barista, Ishaan, was testing a nut cream for a dessert special and left a jar of it beside the espresso machine. Someone spooned a little into a latte. That afternoon, three staff members ordered the same thing.",
      "Getting it right took considerably longer. Commercial pistachio syrups were too sweet and tasted faintly of almond essence. So we started making the cream ourselves — Sicilian pistachios, blitzed with a little milk, a pinch of sea salt and no more sugar than necessary.",
      "The salt is the part people notice without knowing why. It keeps the drink from tipping into dessert territory, and it lets the espresso stay in the foreground where it belongs.",
      "Eleven versions later, the Pistachio Cloud Latte went on the board as a weekend special. It has not come off since. It is now the first thing roughly one in four guests order, and the only item we have never been able to take off the menu.",
    ],
  },
  {
    slug: "guide-to-the-perfect-weekend-brunch",
    title: "A Guide to the Perfect Weekend Brunch",
    category: "Food",
    date: "9 April 2026",
    readTime: "6 min read",
    excerpt:
      "How to order, when to arrive, and what to share when there are four of you.",
    image: IMG.pancakes,
    body: [
      "Brunch is a format, not a meal. It works best when nobody has anywhere to be and the table is slightly too full of plates.",
      "Arrive between eleven and half past. The kitchen has found its rhythm by then and the room has warmed up without becoming loud. If you are more than four, tell us in advance — we will pull the back table together for you.",
      "Order one sweet, one savoury and one thing nobody at the table has tried. Our own combination: Luna Pancakes, Truffle Mushroom Toast and a Citrus Burrata Salad in the middle for everyone to pick at.",
      "Coffee first, always. Then a second round halfway through, when the plates have been cleared but the conversation is clearly not finished. That second cup is, in our opinion, the entire point of brunch.",
    ],
  },
  {
    slug: "meet-our-head-barista",
    title: "Meet Our Head Barista",
    category: "People",
    date: "22 March 2026",
    readTime: "4 min read",
    excerpt:
      "Ishaan on water chemistry, hospitality, and why he still tastes every batch.",
    image: IMG.baristaHold,
    body: [
      "Ishaan has been behind our bar since the week we opened. Before Luna he spent six years in Bengaluru, most of it obsessing over espresso extraction and, by his own admission, being difficult about water.",
      "\"Water is eighty percent of what's in the cup,\" he says. \"People spend a fortune on beans and pull them through whatever comes out of the tap.\" We filter and remineralise ours to a fixed profile. He checks it weekly.",
      "Every morning he dials in the grinder against a scale and a timer, and tastes the result. If the shot is not right, the bar does not open. It has delayed us by six minutes exactly twice in three years.",
      "But ask him what makes a good barista and he will not mention any of this. \"Remembering someone's order,\" he says. \"That's the whole job. The coffee is just the reason they came in.\"",
    ],
  },
  {
    slug: "inside-the-luna-kitchen",
    title: "Inside the Luna Kitchen",
    category: "Kitchen",
    date: "3 March 2026",
    readTime: "5 min read",
    excerpt:
      "A seasonal menu, a small team, and the discipline of doing fewer things properly.",
    image: IMG.mushroomPlate,
    body: [
      "Our kitchen is smaller than most guests imagine. Four people, one pass, and a menu deliberately kept short enough that everything on it is made properly.",
      "We change the menu four times a year and adjust quietly in between, depending on what the produce markets are doing. When the citrus is good, the burrata salad gets brighter. When it is not, we take it off.",
      "Bread and pastry begin at four in the morning. The laminated dough is folded over two days, which is the only way to get the layers we want. There is no shortcut and we have stopped looking for one.",
      "Chef Meera's rule for the pass is a single sentence, taped above the tickets: would you be pleased if this arrived at your table? If the answer is anything other than yes, it goes back.",
    ],
  },
];

export const FAQS = [
  {
    q: "Do I need a reservation?",
    a: "Walk-ins are always welcome and we keep a portion of the room unreserved. That said, weekend brunch between 11 AM and 2 PM fills quickly, so we'd recommend booking ahead for groups of four or more.",
  },
  {
    q: "Do you offer vegetarian options?",
    a: "Yes — the majority of our menu is vegetarian, including the truffle mushroom toast, citrus burrata salad, grain bowls and the full pastry counter. Vegetarian dishes are marked throughout the digital menu.",
  },
  {
    q: "Do you offer vegan options?",
    a: "We do. Our seasonal grain bowl and Luna grain bowl are vegan as served, several dishes can be adapted, and oat and almond milk are available for every coffee at a small supplement.",
  },
  {
    q: "Do you accommodate allergies?",
    a: "Please tell us when you arrive or note it in your reservation. Allergen information is listed on every item in our digital menu, and our kitchen team will talk you through the options. We handle nuts, gluten and dairy in the same kitchen, so we cannot guarantee a fully allergen-free environment.",
  },
  {
    q: "Do you offer takeaway?",
    a: "Yes. The full coffee menu, pastry counter and most kitchen dishes are available to take away. Order ahead through the site and we'll have it ready at the counter.",
  },
  {
    q: "Do you offer delivery?",
    a: "We deliver within a five-kilometre radius of the café. Delivery is a flat ₹60 and usually takes 30–45 minutes, depending on the hour.",
  },
  {
    q: "Can I host a private event?",
    a: "Absolutely. Luna is available for birthdays, private dinners, corporate gatherings, brunch events and book clubs — either a section of the room or the full space for up to 60 guests. Send us an enquiry and we'll design the menu with you.",
  },
  {
    q: "Do you have Wi-Fi?",
    a: "Yes, free and reasonably fast. We keep the back room laptop-friendly on weekdays; on weekends we ask that laptops stay away from the main room so the space stays social.",
  },
  {
    q: "Is parking available?",
    a: "There is metered street parking along the block and a public parking structure two minutes' walk away. The nearest metro station is a six-minute walk.",
  },
  {
    q: "How can I contact Luna?",
    a: "Call us, email hello@lunacafe.example, message us on WhatsApp, or use the contact form on this site. WhatsApp is usually the fastest way to reach us during service hours.",
  },
];

export const EVENT_TYPES = [
  {
    name: "Birthdays",
    capacity: "Up to 30 guests",
    menu: "Sharing plates & cake service",
    ambience: "Warm lighting, candles, a playlist you choose",
    desc: "The back room, a long table, and a cake we'll bring out at whatever moment you tell us to.",
    image: IMG.gathering,
  },
  {
    name: "Private Dinners",
    capacity: "10 — 24 guests",
    menu: "Three or four course seasonal set menu",
    ambience: "Full evening buyout of the rear room",
    desc: "A quieter, slower evening built around one menu and one table.",
    image: IMG.parisEvening,
  },
  {
    name: "Corporate Gatherings",
    capacity: "Up to 45 guests",
    menu: "Coffee cart, canapés or working brunch",
    ambience: "Screen, sound and fast Wi-Fi available",
    desc: "Offsites, team breakfasts and launches, without the conference-room fluorescence.",
    image: IMG.interiorModern,
  },
  {
    name: "Brunch Events",
    capacity: "Up to 40 guests",
    menu: "Family-style brunch & bottomless coffee",
    ambience: "Late morning light, full room",
    desc: "Baby showers, engagements, Sunday reunions — the room at its best hour.",
    image: IMG.breakfastSpread,
  },
  {
    name: "Book Clubs",
    capacity: "8 — 16 guests",
    menu: "Pastry board, filter coffee & tea service",
    ambience: "The corner nook, reserved for the evening",
    desc: "We host three reading groups a month. Bring the book, we'll handle the rest.",
    image: IMG.interiorWarm,
  },
  {
    name: "Creative Events",
    capacity: "Up to 35 guests",
    menu: "Grazing table & signature drinks",
    ambience: "Cleared floor, hanging space for work",
    desc: "Launches, exhibitions, tastings and workshops in a room that photographs beautifully.",
    image: IMG.interiorPeople,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Beautiful space, thoughtful food and one of the best coffees I've had in the city. I came for an hour and stayed for three.",
    name: "Ananya",
    detail: "Regular since 2024",
  },
  {
    quote:
      "A perfect place for a slow Sunday brunch. The pancakes are worth the wait, and nobody rushes you out of your chair.",
    name: "Rhea",
    detail: "Weekend brunch",
  },
  {
    quote:
      "The ambience is beautiful without feeling pretentious. It's become the place I bring people when I want them to like the city.",
    name: "Arjun",
    detail: "Hosted a birthday at Luna",
  },
];
