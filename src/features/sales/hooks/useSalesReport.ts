import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSalesReport } from "../api/salesApi";
import { SalesReport } from "../types/sales";

export const useSalesReport = (startDate: string, endDate: string) => {
  return useQuery<SalesReport>({
    queryKey: ["salesReport", startDate, endDate],
    queryFn: () => getSalesReport(startDate, endDate),
    placeholderData: keepPreviousData,
  });
};
