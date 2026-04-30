import { api } from "@/services/api";
import { DashboardMetrics } from "../types/dashboard";
import { buildReportParams } from "@/shared/utils/dateFormater";

const API_ENDPOINT = "/dashboard";

export const getDashboardData = async (
  startDate: string,
  endDate: string,
): Promise<DashboardMetrics> => {
  const params = buildReportParams(startDate, endDate);

  const { data } = await api.get(`${API_ENDPOINT}`, { params });
  return data;
};
