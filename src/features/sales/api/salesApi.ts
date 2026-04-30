import { api } from "@/services/api";
import { Sale, SaleExport, SalesReport, SaleSortBy } from "../types/sales";
import { Paginated } from "@/shared/types/paginatation";
import { CreateSaleSchema } from "../schemas/sale";
import { buildReportParams } from "@/shared/utils/dateFormater";
import { SortOrder } from "@/shared/types/sort";

export const SALES_API_ENDPOINT = "/sales";

export const createSale = async (sale: CreateSaleSchema): Promise<Sale> => {
  const { data } = await api.post(`${SALES_API_ENDPOINT}`, sale);
  return data;
};

export const getSales = async ({
  page,
  pageSize,
  sortBy,
  sortOrder,
}: {
  page?: number;
  pageSize: number;
  sortBy?: SaleSortBy;
  sortOrder?: SortOrder;
}): Promise<Paginated<Sale>> => {
  const { data } = await api.get(`${SALES_API_ENDPOINT}`, {
    params: {
      page,
      pageSize,
      sortBy,
      sortOrder,
    },
  });
  return data;
};

export const getSale = async (id: string): Promise<Sale> => {
  const { data } = await api.get(`${SALES_API_ENDPOINT}/${id}`);
  return data;
};

export const cancelSale = async (id: string): Promise<void> => {
  const { data } = await api.patch(`${SALES_API_ENDPOINT}/${id}/cancel`);
  return data;
};

export const getSalesExport = async (
  startDate: string,
  endDate: string,
): Promise<SaleExport[]> => {
  const params = buildReportParams(startDate, endDate);
  const { data } = await api.get(`${SALES_API_ENDPOINT}/export`, { params });
  return data;
};

/**
 * Recupera os dados de vendas diarias do sistema
 * @param startDate String Date no formato YYYY-MM-DD
 * @param endDate String Date no formato YYYY-MM-DD
 * @returns Objeto do tipo SalesReport contendo dados das vendas no periodo informado
 */
export const getSalesReport = async (
  startDate: string,
  endDate: string,
): Promise<SalesReport> => {
  const params = buildReportParams(startDate, endDate);

  const { data } = await api.get(`${SALES_API_ENDPOINT}/report`, {
    params,
  });
  return data;
};
