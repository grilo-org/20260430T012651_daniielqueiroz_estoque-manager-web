import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsApi";
import { Product, ProductSortBy } from "../types/product";
import { SortOrder } from "@/shared/types/sort";
import { Paginated } from "@/shared/types/paginatation";

export const useProducts = ({
  page = 1,
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
}) => {
  return useQuery<Paginated<Product>>({
    queryKey: ["products", { page, pageSize, sortBy, sortOrder, search }],
    queryFn: () => getProducts({ page, pageSize, sortBy, sortOrder, search }),
    placeholderData: keepPreviousData,
  });
};
