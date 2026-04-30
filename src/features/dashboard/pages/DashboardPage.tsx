import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { useDashboard } from "../hooks/useDashboard";
import { LastSalesTable } from "../components/LastSales/LastSalesTable";
import { DailySalesChart } from "../components/DailySalesChart";
import { PageError } from "@/shared/components/PageError";
import { PageLoader } from "@/shared/components/PageLoader";
import { InfoCard } from "@/shared/components/InfoCard";
import { getDateRange } from "@/shared/utils/dateFormater";

export const DashboardPage = () => {
  const today = getDateRange("today");
  const {
    data: metrics,
    isLoading,
    isError,
  } = useDashboard(today.startDate, today.endDate);

  if (isLoading) return <PageLoader />;
  if (isError || !metrics)
    return <PageError message="Erro ao carregar dados do Dashboard." />;

  return (
    <div className="space-y-8">
      <div className="flex mx-auto justify-around h-fit space-x-8 ">
        <>
          <InfoCard
            title={"Vendas de hoje"}
            value={metrics.totalSales.toString()}
          />
          <InfoCard
            title={"Faturamento de hoje"}
            value={formatCurrencyBRL(metrics.revenue)}
          />
          <InfoCard
            title={"Ticket médio de hoje"}
            value={formatCurrencyBRL(metrics.averageTicket)}
          />
          <InfoCard
            title={"Produtos Cadastrados"}
            value={metrics.totalProducts.toString()}
          />
        </>
      </div>

      <LastSalesTable />

      <DailySalesChart />
    </div>
  );
};
