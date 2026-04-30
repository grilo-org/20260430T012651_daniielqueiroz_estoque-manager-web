import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsApi";
import { ProductSortBy } from "../types/product";
import { SortOrder } from "@/shared/types/sort";

const PAGE_SIZE = 50;

export const useInfiniteProducts = ({
  sortBy,
  sortOrder,
}: {
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", { sortBy, sortOrder }],
    queryFn: ({ pageParam }) =>
      getProducts({ page: pageParam, pageSize: PAGE_SIZE, sortBy, sortOrder }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
};
