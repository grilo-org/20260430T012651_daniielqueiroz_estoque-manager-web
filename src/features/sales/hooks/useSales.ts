import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSales } from "../api/salesApi";
import { Sale, SaleSortBy } from "../types/sales";
import { Paginated } from "@/shared/types/paginatation";
import { SortOrder } from "@/shared/types/sort";

export const useSales = ({
  page = 1,
  pageSize,
  sortBy,
  sortOrder,
}: {
  page?: number;
  pageSize: number;
  sortBy?: SaleSortBy;
  sortOrder?: SortOrder;
}) => {
  return useQuery<Paginated<Sale>>({
    queryKey: ["sales", { page, pageSize, sortBy, sortOrder }],
    queryFn: () => getSales({ page, pageSize, sortBy, sortOrder }),
    placeholderData: keepPreviousData,
  });
};
