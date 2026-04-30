import { api } from "@/services/api";
import { Product, ProductSortBy } from "../types/product";
import { SortOrder } from "@/shared/types/sort";
import { CreateProductSchema, UpdateProductSchema } from "../schemas/product";
import { buildReportParams } from "@/shared/utils/dateFormater";
import { Paginated } from "@/shared/types/paginatation";

export const PRODUCTS_API_ENDPOINT = "/products";

export const createProduct = async (
  data: CreateProductSchema,
): Promise<Product> => {
  const response = await api.post(`${PRODUCTS_API_ENDPOINT}/`, data);
  return response.data;
};

export const getProducts = async ({
  page,
  pageSize,
  sortBy,
  sortOrder,
  search,
}: {
  page?: number;
  pageSize: number;
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  search?: string;
}): Promise<Paginated<Product>> => {
  const { data } = await api.get(`${PRODUCTS_API_ENDPOINT}`, {
    params: {
      page,
      pageSize,
      sortBy,
      sortOrder,
      search,
    },
  });
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await api.get(`${PRODUCTS_API_ENDPOINT}/${id}`);
  return data;
};

export const getProductReport = async (
  id: string,
  startDate: string,
  endDate: string,
) => {
  const params = buildReportParams(startDate, endDate);

  const { data } = await api.get(`${PRODUCTS_API_ENDPOINT}/${id}/report`, {
    params,
  });
  return data;
};

export const getProductsExport = async (): Promise<Product[]> => {
  const { data } = await api.get(`${PRODUCTS_API_ENDPOINT}/export`);
  return data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProductSchema,
): Promise<Product> => {
  const response = await api.put(`${PRODUCTS_API_ENDPOINT}/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`${PRODUCTS_API_ENDPOINT}/${id}`);
  return data;
};
