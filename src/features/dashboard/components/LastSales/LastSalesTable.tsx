import { Button } from "@/shared/components/ui/button";
import { useSales } from "@/features/sales/hooks/useSales";
import { ChevronRight } from "lucide-react";
import { createSalesColumns } from "@/features/sales/components/dataTable/Sales/salesTableColumns";
import { DataTable } from "./DataTable";
import { Link } from "react-router-dom";
import { SALES_API_ENDPOINT } from "@/features/sales/api/salesApi";
import { PageError } from "@/shared/components/PageError";
import { PageLoader } from "@/shared/components/PageLoader";

export const LastSalesTable = () => {
  const { data, isLoading, isError } = useSales({ pageSize: 5 });

  if (isLoading) return <PageLoader />;
  if (isError || !data)
    return <PageError message="Erro ao obter dados das vendas." />;

  return (
    <div className="container mx-auto">
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold">Últimas vendas</p>
        <Button
          variant={"link"}
          asChild
        >
          <Link to={SALES_API_ENDPOINT}>
            Ver todas
            <ChevronRight />
          </Link>
        </Button>
      </div>
      <DataTable
        columns={createSalesColumns({ sortable: false })}
        data={data.data}
      />
    </div>
  );
};
