/** Pexels image helper — keeps one cohesive, warm photographic direction. */
export const img = (id: number, w = 900, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/* Interiors & atmosphere */
export const IMG = {
  heroInterior: img(14866314, 1100, 1450),
  interiorWarm: img(35970496, 1000, 1300),
  interiorPlants: img(8765830, 1000, 1300),
  interiorModern: img(30294335, 1400, 900),
  interiorBangkok: img(37891291, 1000, 1300),
  interiorPeople: img(17355608, 1000, 1300),
  sunlightCup: img(18699459, 1000, 1300),
  womanSitting: img(7401892, 1000, 1300),
  quietCorner: img(18961525, 1000, 1300),

  /* Coffee */
  latteArt: img(37034126, 1000, 1300),
  latteGlass: img(34452163, 1200, 800),
  baristaPour: img(13735913, 1000, 1300),
  baristaHold: img(31523243, 1200, 800),
  cappuccino: img(29621584, 1000, 1300),
  cortado: img(30556589, 1000, 1300),
  rusticLatte: img(37646570, 1000, 1300),
  greenCup: img(36009652, 1000, 1300),
  heartLatte: img(28532304, 900, 1400),
  baristaCup: img(16466507, 1000, 1300),

  /* Food */
  avoToast: img(38101007, 1000, 1300),
  eggsBenedict: img(30910429, 1000, 1300),
  avoBenedict: img(38101009, 1000, 1300),
  baconBenedict: img(36976089, 1000, 1300),
  poachedToast: img(29177401, 1000, 1300),
  salmonBenedict: img(17478680, 1000, 1300),
  pancakes: img(15043917, 1000, 1300),
  breakfastSpread: img(35006610, 1000, 1300),

  /* Pastry & dessert */
  pastryDisplay: img(19498989, 1400, 900),
  pastryRack: img(31228825, 1200, 800),
  pistachioCroissant: img(30919066, 1200, 800),
  chocCroissant: img(19498993, 1000, 1300),
  pastryCase: img(27304300, 1000, 1300),
  chocCroissantPlate: img(36327366, 1000, 1300),
  mangoPastry: img(31228827, 1200, 800),
  croissantBlue: img(32713517, 1200, 800),
  berryPastry: img(27304336, 1000, 1300),

  /* Plates */
  burrataSalad: img(30598209, 1000, 1300),
  caprese: img(17291593, 1000, 1300),
  burrataPlated: img(24706519, 1000, 1300),
  tomatoBurrata: img(29380174, 1000, 1300),
  mushroomPlate: img(3820326, 1200, 800),
  pasta: img(37539840, 1000, 1300),
  capreseSalad: img(22711485, 1000, 1300),
  burrataTomato: img(22711487, 1000, 1300),

  /* People & evening */
  eveningTerrace: img(14447128, 1000, 1300),
  friendsCoffee: img(7780653, 1200, 800),
  twoWomen: img(9843805, 1000, 1300),
  gathering: img(12832967, 1200, 800),
  conversation: img(3926211, 1200, 800),
  cosyEvening: img(35001452, 1200, 800),
  parisEvening: img(32938412, 1000, 1300),
};
