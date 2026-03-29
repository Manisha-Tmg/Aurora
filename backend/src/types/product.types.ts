export interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: boolean;
  images: string;
}

export interface ProductCreationAttributes {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: boolean;
  images: string;
}
