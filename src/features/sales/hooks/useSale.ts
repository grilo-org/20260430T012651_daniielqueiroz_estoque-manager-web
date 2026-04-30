import { useQuery } from "@tanstack/react-query";
import { getSale } from "../api/salesApi";
import { Sale } from "../types/sales";

export const useSale = (id: string) => {
  return useQuery<Sale>({
    queryKey: ["sale", id],
    queryFn: () => getSale(id),
  });
};
