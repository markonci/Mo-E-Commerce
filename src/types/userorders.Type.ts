// user اللي عامل الأوردر
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// العنوان
interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

// الـ brand
interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// الـ category
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// الـ subcategory
interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// المنتج
interface Product {
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

// عنصر في الـ cart
interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

// الأوردر الأساسي
export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card"; // حسب الأنواع عندك
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface OrdersDetalisResponse {
  data: Order[];
}