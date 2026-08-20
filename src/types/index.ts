// ============= DummyJSON API типы =============

export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: DummyJsonReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface DummyJsonReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface DummyJsonCategory {
  slug: string;
  name: string;
  url: string;
}

// ============= Доменные типы приложения =============

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  categoryId: string;
  categoryName: string;
  seller: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  creationDate: string;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export interface FiltersState {
  search: string;
  category: string | null;
  priceMin: number | null;
  priceMax: number | null;
  sort: SortOption;
  page: number;
}

export interface CheckoutFormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  postalCode: string;
  deliveryMethod: "courier" | "pickup" | "post";
  paymentMethod: "card" | "cash";
  comment?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CheckoutFormValues;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: "new" | "processing" | "done";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  registeredAt: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
  isUserReview?: boolean;
}

export interface UserReview extends Review {
  productId: string;
}

export interface DisplayReview extends Review {
  source: "user" | "api";
  productId?: string;
}