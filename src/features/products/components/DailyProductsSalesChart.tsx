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
import {
  DollarSignIcon,
  FileDown,
  ClipboardList,
  PackageCheck,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { ChartPeriod, DateRange, DEFAULT_CHART_PERIOD } from "@/shared/types/date";
import { ChartPeriodSelector } from "@/shared/components/ChartPeriodSelector";
import { useDateRangeParams } from "@/shared/hooks/useDateRangeParams";
import { InfoCard } from "@/shared/components/InfoCard";
import { useProductReport } from "../hooks/useProductReport";
import { useParams } from "react-router-dom";
import { PageLoader } from "@/shared/components/PageLoader";
import { PageError } from "@/shared/components/PageError";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { columns } from "./dataTable/ProductReport/productsReportTableColumns";
import { DataTable } from "./dataTable/ProductReport/DataTable";

const chartConfig = {
  sales: {
    label: "Vendas",
  },
} satisfies ChartConfig;

function DailyProductsSalesTooltip({
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

      <p>
        Unidades vendidas:{" "}
        <span className="font-bold text-blue-700">{data.productsSold}</span>
      </p>
      <Separator className="my-2" />
      <p className="font-medium">Outras informações:</p>
      <p className="font-medium">
        Participação em Vendas:{" "}
        <span className="font-semibold">{data.dailySales}</span>
      </p>
      <p>
        Preço médio:{" "}
        <span className="font-semibold">
          {formatCurrencyBRL(data.avgPrice)}
        </span>
      </p>
      <p>
        Faturamento:{" "}
        <span className="font-bold text-green-700">
          {formatCurrencyBRL(data.revenue)}
        </span>
      </p>
    </div>
  );
}

export function DailyProductsSalesChart() {
  const { id } = useParams();
  const [activePeriod, setActivePeriod] = useState<ChartPeriod>(DEFAULT_CHART_PERIOD);
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");
  const [customRange, setCustomRange] = useState<DateRange | undefined>(undefined);

  const { startDate, endDate } = useDateRangeParams(activePeriod, customRange);

  const { data, isLoading, isError } = useProductReport(
    id!,
    startDate,
    endDate,
  );

  if (isLoading) return <PageLoader />;
  if (isError || !data)
    return <PageError message="Erro ao carregar dados do gráfico." />;

  const dailySales = data.report.dailySales ?? [];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-center border-b px-6  sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-2 sm:py-0!">
            <CardTitle className="text-xl font-bold">
              Relatório de Vendas do Produto
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
          {/* TODO */}
          <Button
            variant={"outline"}
            className="rounded-sm text-sm p-4"
          >
            <FileDown className="size-4.5" />
            Exportar PDF
          </Button>
        </CardHeader>
        <CardContent className="w-full space-y-8">
          <div className="flex w-full gap-6">
            <InfoCard
              icon={<PackageCheck />}
              title={"Total de Unidades Vendidas"}
              value={String(data.report.totalProductsSold ?? 0)}
            />
            <InfoCard
              icon={<ClipboardList />}
              title={"Total de Participações em Vendas"}
              value={String(data.report.totalSales ?? 0)}
            />
            <InfoCard
              icon={<DollarSignIcon />}
              title={"Faturamento Total"}
              value={formatCurrencyBRL(data.report.totalRevenue ?? 0)}
            />
          </div>
          <Tabs
            className="gap-4"
            value={activeTab}
            onValueChange={(tab) => setActiveTab(tab as "chart" | "table")}
          >
            <TabsList>
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
              <TabsTrigger value="table">Tabela</TabsTrigger>
            </TabsList>
            {dailySales.length === 0 ? (
              <div className="flex justify-center items-center h-50">
                <p className="text-xl">Sem dados para o período</p>
              </div>
            ) : (
              <>
                <TabsContent value="table">
                  <DataTable
                    columns={columns}
                    data={dailySales}
                  />
                </TabsContent>
                <TabsContent value="chart">
                  <ChartContainer
                    config={chartConfig}
                    className="h-70 w-full"
                  >
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
                        dataKey="productsSold"
                        tickLine={false}
                        axisLine={false}
                        width={32}
                      />

                      <ChartTooltip content={<DailyProductsSalesTooltip />} />

                      <Bar
                        dataKey="productsSold"
                        radius={4}
                      />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
