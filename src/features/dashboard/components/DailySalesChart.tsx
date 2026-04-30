import { DailySale } from "@/features/sales/types/sales";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartConfig,
} from "@/shared/components/ui/chart";
import { Separator } from "@/shared/components/ui/separator";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { formatIsoDateToBR } from "@/shared/utils/dateFormater";
import { Package, DollarSignIcon, FileDown, ShoppingCart } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { InfoCard } from "@/shared/components/InfoCard";
import { useState } from "react";
import { ChartPeriod, DateRange, DEFAULT_CHART_PERIOD } from "@/shared/types/date";
import { useSalesReport } from "@/features/sales/hooks/useSalesReport";
import { ChartPeriodSelector } from "@/shared/components/ChartPeriodSelector";
import { useDateRangeParams } from "@/shared/hooks/useDateRangeParams";
import { PageError } from "@/shared/components/PageError";
import { PageLoader } from "@/shared/components/PageLoader";
import { usePrintExport } from "@/shared/hooks/usePrintExport";
import { DailySalesReportPrintView } from "./DailySalesReportPrintView";

const chartConfig = {
  sales: {
    label: "Vendas",
  },
} satisfies ChartConfig;

function DailySalesTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: DailySale }>;
}) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-md border border-gray-300 bg-white p-3 shadow-md text-sm text-gray-900">
      <p className="font-bold">{formatIsoDateToBR(data.date)}</p>
      <p className="font-medium">
        Vendas do dia:{" "}
        <span className="font-bold text-blue-700">{data.dailySales}</span>
      </p>
      <Separator className="my-2" />
      <p className="font-medium">Outras informações:</p>
      <p>
        Produtos vendidos:{" "}
        <span className="font-semibold">{data.productsSold}</span>
      </p>
      <p>
        Preço médio:{" "}
        <span className="font-semibold">
          {formatCurrencyBRL(data.avgPrice)}
        </span>
      </p>
      <p>
        Receita:{" "}
        <span className="font-bold text-green-700">
          {formatCurrencyBRL(data.revenue)}
        </span>
      </p>
    </div>
  );
}

export function DailySalesChart() {
  const [activePeriod, setActivePeriod] = useState<ChartPeriod>(DEFAULT_CHART_PERIOD);
  const [customRange, setCustomRange] = useState<DateRange | undefined>(undefined);

  const { startDate, endDate } = useDateRangeParams(activePeriod, customRange);

  const { data, isLoading, isError } = useSalesReport(startDate, endDate);

  const { printRef, handleExport } = usePrintExport({
    data,
    documentTitle: `relatorio-vendas-${startDate}_${endDate}`,
  });

  if (isLoading) return <PageLoader />;
  if (isError || !data)
    return <PageError message="Erro ao obter dados do relatório de vendas." />;

  const dailySales = data?.dailySales ?? [];

  return (
    <>
      <Card className="my-8">
        <CardHeader className="flex flex-col items-center border-b px-6  sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-2 sm:py-0!">
            <CardTitle className="text-xl font-bold">
              Relatório de Vendas
            </CardTitle>
            <CardDescription className="flex gap-2 flex-wrap">
              <ChartPeriodSelector
                activePeriod={activePeriod}
                onPeriodChange={setActivePeriod}
                customRange={customRange}
                onCustomRangeChange={setCustomRange}
              />
            </CardDescription>
          </div>
          <Button
            variant={"outline"}
            className="rounded-sm text-sm p-4"
            onClick={handleExport}
          >
            <FileDown className="size-4.5" />
            Exportar PDF
          </Button>
        </CardHeader>
        <CardContent className="w-full space-y-8">
          <div className="flex w-full  gap-6">
            <InfoCard
              icon={<ShoppingCart />}
              title={"Total de Vendas"}
              value={String(data?.totalSales ?? 0)}
            />
            <InfoCard
              icon={<DollarSignIcon />}
              title={"Faturamento Total"}
              value={formatCurrencyBRL(data?.totalRevenue ?? 0)}
            />
            <InfoCard
              icon={<Package />}
              title={"Produtos Vendidos"}
              value={String(data?.totalProductsSold ?? 0)}
            />
          </div>
          <ChartContainer
            config={chartConfig}
            className="h-72 w-full"
          >
            {dailySales.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl">Sem dados para o período</p>
              </div>
            ) : (
              <BarChart data={dailySales}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                  tickFormatter={(value) => formatIsoDateToBR(value)}
                />
                <YAxis
                  dataKey="dailySales"
                  tickLine={false}
                  tickMargin={8}
                  axisLine={false}
                  width={32}
                />

                <ChartTooltip content={<DailySalesTooltip />} />

                <Bar
                  dataKey="dailySales"
                  radius={4}
                />
              </BarChart>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
      <DailySalesReportPrintView
        ref={printRef}
        data={data}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
