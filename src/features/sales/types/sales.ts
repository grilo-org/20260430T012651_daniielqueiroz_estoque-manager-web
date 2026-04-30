import { Product } from "@/features/products/types/product";

export type SaleStatus = "CONFIRMED" | "CANCELLED";

export type SaleSortBy =
  | "customerName"
  | "items"
  | "totalAmount"
  | "createdAt"
  | "status";

export interface Sale {
  id: string;
  customerName: string;
  totalAmount: number;
  status: SaleStatus;
  createdAt: string;
  updatedAt: string;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  product: Product;
}

export interface SaleExport {
  id: string;
  customerName: string;
  totalAmount: number;
  status: SaleStatus;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
}

export interface SalesReport {
  totalSales: number;
  totalProductsSold: number;
  totalRevenue: number;
  dailySales: DailySale[];
}

export interface DailySale {
  date: string;
  dailySales: number;
  productsSold: number;
  avgPrice: number;
  revenue: number;
}
