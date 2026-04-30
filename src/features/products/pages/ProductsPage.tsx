import { useProducts } from "../hooks/useProducts";
import { createProductsColumns } from "../components/dataTable/Products/productsTableColumns";
import { DataTable } from "../components/dataTable/Products/DataTable";
import { CreateProductDialog } from "../components/CreateProductDialog";
import { ProductsExportButton } from "../components/ProductsExportButton";
import { PageError } from "@/shared/components/PageError";
import { PageLoader } from "@/shared/components/PageLoader";
import { useState } from "react";
import { TablePagination } from "@/shared/components/TablePagination";
import { ProductSortBy } from "../types/product";
import { SortOrder } from "@/shared/types/sort";
import { Search } from "lucide-react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/shared/components/ui/input-group";

export const ProductsPage = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [sortBy, setSortBy] = useState<ProductSortBy | undefined>();
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>();
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 400);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (col: ProductSortBy) => {
    if (sortBy !== col) {
      setSortBy(col);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortBy(undefined);
      setSortOrder(undefined);
    }
    setPage(1);
  };

  const { data, isLoading, isError } = useProducts({
    page,
    pageSize,
    sortBy,
    sortOrder,
    search: debouncedSearch || undefined,
  });

  const columns = createProductsColumns(sortBy, sortOrder, handleSort);

  if (isLoading) return <PageLoader />;
  if (isError || !data)
    return <PageError message="Erro ao carregar dados dos produtos." />;

  return (
    <div className="space-y-6 rounded-md ">
      <div className=" flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold text-2xl">Produtos</p>
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-muted-foreground">
              Gerencie, crie, edite ou remova seus produtos
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <ProductsExportButton />
          <CreateProductDialog />
        </div>
      </div>

      <div className="flex flex-col h-[calc(100vh-150px)] space-y-2">
        <InputGroup className="w-1/4">
          <InputGroupAddon>
            <InputGroupText>
              <Search />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar por nome ou categoria..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </InputGroup>
        <DataTable
          columns={columns}
          data={data.data}
        />
        <TablePagination
          page={page}
          pageSize={pageSize}
          totalPages={data.totalPages}
          total={data.total}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};
