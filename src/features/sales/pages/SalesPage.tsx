import { useSales } from "../hooks/useSales";
import { DataTable } from "../components/dataTable/Sales/DataTable";
import { createSalesColumns } from "../components/dataTable/Sales/salesTableColumns";
import { CreateSaleDialog } from "../components/CreateSaleDialog";
import { SalesExportDialog } from "../components/SalesExportDialog";
import { TablePagination } from "@/shared/components/TablePagination";
import { PageLoader } from "@/shared/components/PageLoader";
import { PageError } from "@/shared/components/PageError";
import { useState } from "react";
import { SaleSortBy } from "../types/sales";
import { SortOrder } from "@/shared/types/sort";

export const SalesPage = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [sortBy, setSortBy] = useState<SaleSortBy | undefined>();
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>();

  const handleSort = (col: SaleSortBy) => {
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

  const { data, isLoading, isError } = useSales({ page, pageSize, sortBy, sortOrder });
  const columns = createSalesColumns({ sortBy, sortOrder, onSort: handleSort });

  if (isLoading) return <PageLoader />;
  if (!data || isError) return <PageError message="Erro ao obter vendas." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold text-2xl">Vendas</p>
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-muted-foreground">
              Crie uma nova venda, gerencie vendas ou veja informações
              detalhadas de cada venda
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <SalesExportDialog />
          <CreateSaleDialog />
        </div>
      </div>

      <div className="flex flex-col h-[calc(100vh-150px)] space-y-2">
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
