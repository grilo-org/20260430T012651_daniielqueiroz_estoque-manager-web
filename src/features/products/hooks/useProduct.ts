import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/productsApi";
import { Product } from "../types/product";

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
};
