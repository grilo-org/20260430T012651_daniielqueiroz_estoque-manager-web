import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProductReport } from "../api/productsApi";
import { ProductReport } from "../types/product";

export const useProductReport = (
  id: string,
  startDate: string,
  endDate: string,
) => {
  return useQuery<ProductReport>({
    queryKey: ["productReport", id, startDate, endDate],
    queryFn: () => getProductReport(id, startDate, endDate),
    placeholderData: keepPreviousData,
  });
};
