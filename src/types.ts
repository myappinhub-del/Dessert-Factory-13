export interface PlaceDetails {
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
  address: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  phone: string;
  plusCode: string;
  hoursToday: string;
  isOpenNow: boolean;
  closingTime: string;
  priceRange: string;
  swiggyUrl: string;
  serviceOptions: {
    dineIn: boolean;
    takeaway: boolean;
    delivery: boolean;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'cool-cakes' | 'milk-cakes' | 'special-items' | string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  isBestseller?: boolean;
  isVegetarian: boolean;
  tags: string[];
  swiggyUrl?: string;
}

export interface Review {
  id: string;
  author: string;
  badge?: string;
  stats: string; // e.g., "Local Guide · 45 reviews · 173 photos"
  rating: number;
  timeAgo: string;
  content: string;
  likes: number;
  tags?: string[];
  photos?: string[];
  responseFromOwner?: {
    date: string;
    text: string;
  };
}

export interface PhotoItem {
  id: string;
  category: 'all' | 'menu' | 'food' | 'vibe' | 'owner' | '360';
  title: string;
  url: string;
  author?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface CompetitorPlace {
  name: string;
  rating: number;
  reviewCount: number;
  category: string;
}
