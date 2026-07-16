export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
