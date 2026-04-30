import { DailySale } from "@/features/sales/types/sales";

export type ProductSortBy =
  | "name"
  | "price"
  | "category"
  | "quantity"
  | "createdAt"
  | "updatedAt";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductReport {
  product: Product;
  report: {
    totalSales: number;
    totalProductsSold: number;
    totalRevenue: number;
    dailySales: DailySale[];
  };
}
