import { useQuery } from "@tanstack/react-query";
import { getProductsExport } from "../api/productsApi";
import { Product } from "../types/product";

export const useProductsExport = () => {
  return useQuery<Product[]>({
    queryKey: ["productsExport"],
    queryFn: getProductsExport,
    enabled: false,
    structuralSharing: false,
  });
};
