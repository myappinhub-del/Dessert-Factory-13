import { PlaceDetails, MenuItem, Review, PhotoItem, CompetitorPlace } from '../types';
import { IMAGES } from '../assets/images';

export const SWIGGY_ORDER_URL = "https://www.swiggy.com/city/vijayawada/dessert-factory-13-governorpet-rest1228178?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder";

export const PLACE_DETAILS: PlaceDetails = {
  name: "Dessert Factory @13",
  rating: 4.6,
  reviewCount: 84,
  category: "Dessert shop",
  address: "MG Rd, beside Crocs, Beside Balaji Towers",
  landmark: "Beside Crocs, Beside Balaji Towers",
  area: "Labbipet",
  city: "Vijayawada",
  state: "Andhra Pradesh",
  pincode: "520010",
  fullAddress: "MG Rd, beside Crocs, Beside Balaji Towers, Labbipet, Vijayawada, Andhra Pradesh 520010",
  phone: "077994 38013",
  plusCode: "GJ3R+32 Vijayawada, Andhra Pradesh",
  hoursToday: "Open · Closes 11 pm",
  isOpenNow: true,
  closingTime: "11:00 PM",
  priceRange: "₹250 - ₹600 for two",
  swiggyUrl: SWIGGY_ORDER_URL,
  serviceOptions: {
    dineIn: true,
    takeaway: true,
    delivery: true,
  },
};

export const MENU_ITEMS: MenuItem[] = [
  // --- Cool cakes (10) ---
  {
    id: "item-pineapple-1kg-bestseller",
    name: "Pineapple one kg cool cake",
    category: "cool-cakes",
    price: 399,
    description: "Soft and creamy pineapple cake, perfect for celebrations and sharing.",
    rating: 4.1,
    reviewCount: 6,
    image: IMAGES.coolCake,
    isBestseller: true,
    isVegetarian: false,
    tags: ["Cool cake", "1 Kg", "Bestseller", "Non-veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-strawberry-1kg-bestseller",
    name: "Strawberry One Kg cool cake",
    category: "cool-cakes",
    price: 399,
    description: "A soft and creamy strawberry cake that's perfect for any celebration or sweet craving.",
    rating: 4.3,
    reviewCount: 8,
    image: IMAGES.coolCake,
    isBestseller: true,
    isVegetarian: false,
    tags: ["Cool cake", "1 Kg", "Bestseller", "Non-veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-strawberry-1kg-cool-cake",
    name: "Strawberry 1Kg Cool Cake",
    category: "cool-cakes",
    price: 399,
    description: "Luscious strawberry cool cake with creamy layers, made fresh.",
    rating: 4.2,
    reviewCount: 5,
    image: IMAGES.coolCake,
    isBestseller: false,
    isVegetarian: false,
    tags: ["Cool cake", "1 Kg", "Non-veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-pineapple-1kg-cool-cake",
    name: "Pineapple 1Kg Cool Cake",
    category: "cool-cakes",
    price: 399,
    description: "Freshly layered tropical pineapple cool cake with juicy fruit notes.",
    rating: 4.2,
    reviewCount: 7,
    image: IMAGES.coolCake,
    isBestseller: false,
    isVegetarian: false,
    tags: ["Cool cake", "1 Kg", "Non-veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-pineapple-half-kg-eggless",
    name: "Pineapple Half Kg Egg less",
    category: "cool-cakes",
    price: 549,
    description: "Pure vegetarian eggless pineapple cool cake with rich whipped cream and fruit infusion.",
    rating: 4.5,
    reviewCount: 14,
    image: IMAGES.coolCake,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Eggless", "Half Kg", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-butterscotch-half-kg-eggless",
    name: "Butterscotch Half Kg Egg less(cool cake)",
    category: "cool-cakes",
    price: 549,
    description: "Eggless butterscotch cool cake crowned with crunchy caramelized praline nuts and sweet butterscotch syrup.",
    rating: 4.6,
    reviewCount: 18,
    image: IMAGES.coolCake,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Butterscotch", "Eggless", "Half Kg", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-strawberry-half-kg-eggless",
    name: "Strawberry cool Cake Egg less Half kg",
    category: "cool-cakes",
    price: 549,
    description: "Soft eggless strawberry cool cake crafted with fresh berry compote and whipped cream frosting.",
    rating: 4.4,
    reviewCount: 12,
    image: IMAGES.coolCake,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Strawberry", "Eggless", "Half Kg", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-blackforest-half-kg-eggless",
    name: "Black Forest cool Cake Egg less Half kg",
    category: "cool-cakes",
    price: 599,
    description: "Classic eggless black forest cool cake loaded with rich dark chocolate shavings and sweet cherries.",
    rating: 4.8,
    reviewCount: 29,
    image: IMAGES.deathByChocolate,
    isBestseller: true,
    isVegetarian: true,
    tags: ["Black Forest", "Eggless", "Bestseller", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-whiteforest-half-kg-eggless",
    name: "WhiteForest cool Cake Egg less Half Kg",
    category: "cool-cakes",
    price: 599,
    description: "Silky white chocolate curls layered over soft vanilla sponge with maraschino cherries, 100% eggless.",
    rating: 4.6,
    reviewCount: 16,
    image: IMAGES.lotusBiscoff,
    isBestseller: false,
    isVegetarian: true,
    tags: ["White Forest", "Eggless", "Half Kg", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-chocochip-half-kg-eggless",
    name: "Choco chip cool Cake Egg less Half Kg",
    category: "cool-cakes",
    price: 599,
    description: "Decadent eggless dark chocolate sponge coated in smooth ganache and loaded with crunchy chocolate chips.",
    rating: 4.7,
    reviewCount: 21,
    image: IMAGES.deathByChocolate,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Choco Chip", "Eggless", "Half Kg", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },

  // --- Dessert Milk Cake (3) ---
  {
    id: "item-pistachio-milk-cake",
    name: "Pistachio milk cake",
    category: "milk-cakes",
    price: 377,
    description: "Tres leches style ultra-moist sponge soaked in aromatic pistachio infused saffron milk, topped with cream and crushed nuts.",
    rating: 4.8,
    reviewCount: 31,
    image: IMAGES.pistachioMilkCake,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Milk Cake", "Pistachio", "Tres Leches", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-kitkat-milk-cake",
    name: "Kitkat milk cake",
    category: "milk-cakes",
    price: 391,
    description: "Rich soaked milk cake crowned with crushed crispy KitKat wafer bars and chocolate ganache drizzle.",
    rating: 4.7,
    reviewCount: 26,
    image: IMAGES.pistachioMilkCake,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Milk Cake", "KitKat", "Crunchy", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-hazelnut-milk-cake",
    name: "Hazelnut Milk Cake",
    category: "milk-cakes",
    price: 334,
    description: "Velvety soaked milk cake infused with slow-roasted hazelnut praline and whipped cream.",
    rating: 4.6,
    reviewCount: 19,
    image: IMAGES.pistachioMilkCake,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Milk Cake", "Hazelnut", "Nutty", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },

  // --- Special Items (2) ---
  {
    id: "item-apricot-delight",
    name: "Apricot Delight",
    category: "special-items",
    price: 216,
    description: "A sweet treat packed with the natural goodness of apricots, perfect for a bite.",
    rating: 4.9,
    reviewCount: 56,
    image: IMAGES.apricotDelight,
    isBestseller: true,
    isVegetarian: true,
    tags: ["Special Item", "Bestseller", "Apricot Delight", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
  {
    id: "item-death-by-chocolate-large",
    name: "Death By Chocolate large",
    category: "special-items",
    price: 348,
    description: "Ultimate chocolate indulgence featuring rich chocolate sponge, hot fudge sauce, scoops of ice cream and nuts.",
    rating: 4.8,
    reviewCount: 44,
    image: IMAGES.deathByChocolate,
    isBestseller: false,
    isVegetarian: true,
    tags: ["Special Item", "DBC", "Chocoholic", "Veg"],
    swiggyUrl: SWIGGY_ORDER_URL,
  },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Shaik azila tabusam",
    badge: "Local Guide",
    stats: "Local Guide · 45 reviews · 173 photos",
    rating: 5,
    timeAgo: "8 months ago",
    content: "Dessert Factory @13 in Vijayawada is a place that clearly shines when it comes to desserts, but has mixed results overall. If you are someone with a sweet tooth, this place will definitely catch your attention. The desserts taste genuinely rich and heavenly, particularly their signature Apricot Delight and the new pistachio-filled options. Service is warm and courteous, ambience is clean and cozy on MG Road!",
    likes: 18,
    tags: ["apricot delight", "ambience", "unique experience"],
    photos: [
      IMAGES.apricotDelight,
      IMAGES.cafeAmbience
    ],
    responseFromOwner: {
      date: "8 months ago",
      text: "Thank you so much Shaik for taking the time to share your feedback! We are thrilled you enjoyed our Apricot Delight and cafe ambiance on MG Road. Looking forward to welcoming you again soon!"
    }
  },
  {
    id: "rev-2",
    author: "prasanth P",
    badge: "Local Guide",
    stats: "Local Guide · 689 reviews · 12,358 photos",
    rating: 5,
    timeAgo: "Edited 9 months ago",
    content: "Hey hi buddies, This is Prasanth Gupta (Instagram I'd:- @Solo_travelleer ). Visited Dessert Factory @13 beside Crocs at Labbipet. Tried their viral Dubai pistachio kunafa chocolate bar and the cheesecake slice. Taste is authentic and the crunch inside the chocolate is unbeatable! Staff is very hygienic and polite. Best dessert spot for family and friends in Vijayawada.",
    likes: 31,
    tags: ["Dubai chocolate", "cheese cake", "unique experience"],
    photos: [
      IMAGES.dubaiPistachio,
      IMAGES.lotusBiscoff
    ],
    responseFromOwner: {
      date: "9 months ago",
      text: "Hey Prasanth! Thank you for the shoutout and wonderful video review! We are so glad our viral Dubai Kunafa bar hit the right spot for you. See you on your next foodie trip!"
    }
  },
  {
    id: "rev-3",
    author: "SU RE SH",
    badge: "Local Guide",
    stats: "Local Guide · 121 reviews · 7 photos",
    rating: 5,
    timeAgo: "3 months ago",
    content: "I had such a fantastic experience at Dessert Factory @13! 🍰 The desserts were absolutely delicious and beautifully presented. 💖 The service was also top-notch, making it a truly enjoyable visit. I'll definitely be back for more sweet treats! 😋 Cost is Very reasonable and Taste is Superbbb... 😋",
    likes: 14,
    tags: ["apricot delight", "cheese cake", "ambience"]
  },
  {
    id: "rev-4",
    author: "Kavya Reddy",
    stats: "Local Guide · 32 reviews · 89 photos",
    rating: 5,
    timeAgo: "1 month ago",
    content: "Such a pleasant surprise on MG Road beside Balaji Towers! The savory options like burgers and pizzas are surprisingly good and fresh, not just the sweets. The Lotus Biscoff cheesecake had the perfect crust and velvety texture. Highly recommend!",
    likes: 9,
    tags: ["cheese cake", "ambience"]
  },
  {
    id: "rev-5",
    author: "Venkata Raman",
    stats: "18 reviews · 12 photos",
    rating: 4,
    timeAgo: "2 months ago",
    content: "Great desserts and welcoming atmosphere. The Apricot Delight brings back nostalgic flavors with a modern cafe twist. Easy parking nearby on MG road side. Reasonable prices.",
    likes: 6,
    tags: ["apricot delight"]
  }
];

export const PHOTOS_LIST: PhotoItem[] = [
  {
    id: "photo-1",
    category: "food",
    title: "Signature Dessert Collection",
    url: IMAGES.hero,
    author: "Dessert Factory @13"
  },
  {
    id: "photo-2",
    category: "food",
    title: "Viral Dubai Pistachio Kunafa Chocolate",
    url: IMAGES.dubaiPistachio,
    author: "Prasanth P"
  },
  {
    id: "photo-3",
    category: "food",
    title: "Traditional Apricot Delight Platter",
    url: IMAGES.apricotDelight,
    author: "Shaik azila tabusam"
  },
  {
    id: "photo-4",
    category: "food",
    title: "Lotus Biscoff Baked Cheesecake",
    url: IMAGES.lotusBiscoff,
    author: "Dessert Factory @13"
  },
  {
    id: "photo-5",
    category: "vibe",
    title: "Cafe Interior & Seating Ambience",
    url: IMAGES.cafeAmbience,
    author: "Owner"
  },
  {
    id: "photo-6",
    category: "menu",
    title: "Specialties & Dessert Menu",
    url: IMAGES.hero,
    author: "Dessert Factory @13"
  },
  {
    id: "photo-7",
    category: "owner",
    title: "Artisanal Kitchen & Fresh Daily Bakes",
    url: IMAGES.cafeAmbience,
    author: "Owner"
  },
  {
    id: "photo-8",
    category: "360",
    title: "360° View of MG Road Storefront",
    url: IMAGES.cafeAmbience,
    author: "Google Street View"
  }
];

export const COMPETITORS: CompetitorPlace[] = [
  {
    name: "The Dessert Bar",
    rating: 4.8,
    reviewCount: 37,
    category: "Bakery and Cake Shop"
  },
  {
    name: "RANGE DESSERT BAR",
    rating: 4.7,
    reviewCount: 83,
    category: "Dessert shop"
  },
  {
    name: "Dessertino Shakes & More",
    rating: 4.7,
    reviewCount: 1404,
    category: "Dessert shop"
  },
  {
    name: "Therapy Dessert Cart",
    rating: 4.6,
    reviewCount: 106,
    category: "Dessert shop"
  }
];

export const POPULAR_HOURS_DATA = [
  { time: "6 AM", percentage: 0, label: "Closed" },
  { time: "7 AM", percentage: 0, label: "Closed" },
  { time: "8 AM", percentage: 0, label: "Closed" },
  { time: "9 AM", percentage: 0, label: "Closed" },
  { time: "10 AM", percentage: 0, label: "Closed" },
  { time: "11 AM", percentage: 22, label: "Opens 11 AM" },
  { time: "12 PM", percentage: 48, label: "Moderate" },
  { time: "1 PM", percentage: 58, label: "Lunch dessert rush" },
  { time: "2 PM", percentage: 45, label: "Moderate" },
  { time: "3 PM", percentage: 40, label: "Usually not busy" },
  { time: "4 PM", percentage: 55, label: "Afternoon snacks" },
  { time: "5 PM", percentage: 70, label: "Busy" },
  { time: "6 PM", percentage: 82, label: "High traffic" },
  { time: "7 PM", percentage: 95, label: "Peak hour" },
  { time: "8 PM", percentage: 100, label: "Peak hour" },
  { time: "9 PM", percentage: 88, label: "Dinner desserts" },
  { time: "10 PM", percentage: 65, label: "Late evening treats" },
  { time: "11 PM", percentage: 20, label: "Closing" },
];
