import { useQuery } from "@tanstack/react-query";
import { getSalesExport } from "../api/salesApi";
import { SaleExport } from "../types/sales";

export const useSalesExport = (startDate: string, endDate: string) => {
  return useQuery<SaleExport[]>({
    queryKey: ["salesExport", startDate, endDate],
    queryFn: () => getSalesExport(startDate, endDate),
    enabled: false,
    structuralSharing: false,
  });
};
