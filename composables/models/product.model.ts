export type OtherProductModel = {
  id: string;
  name: string;
  price: string;
  amount: number;
  description: string;
  flag: string;
  min: string;
  max: string;
}

export type ProductModel = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  country: string;
  categoryId: number;
  createdAt: string;
  isEdit: boolean;
}