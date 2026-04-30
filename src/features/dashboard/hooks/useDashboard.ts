import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboardApi";

export const useDashboard = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["dashboard"],

    queryFn: () => getDashboardData(startDate, endDate),
  });
};
