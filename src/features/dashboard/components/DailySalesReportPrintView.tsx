import { forwardRef } from "react";
import { SalesReport } from "@/features/sales/types/sales";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { formatIsoDateToBR } from "@/shared/utils/dateFormater";

interface DailySalesReportPrintViewProps {
  data: SalesReport;
  startDate: string;
  endDate: string;
}

export const DailySalesReportPrintView = forwardRef<
  HTMLDivElement,
  DailySalesReportPrintViewProps
>(({ data, startDate, endDate }, ref) => {
  return (
    <div className="w-0 h-0 overflow-hidden">
      <div
        ref={ref}
        className="bg-white text-black p-8 font-sans"
      >
        <h1 className="text-2xl font-bold mb-1">Relatório de Vendas Diárias</h1>
        <p className="text-sm text-gray-600 mb-6">
          Período: {formatIsoDateToBR(startDate)} — {formatIsoDateToBR(endDate)}
        </p>

        <div className="flex gap-8 mb-6">
          <div className="border border-gray-300 rounded p-3 flex-1 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Total de Vendas
            </p>
            <p className="text-xl font-bold">{data.totalSales}</p>
          </div>
          <div className="border border-gray-300 rounded p-3 flex-1 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Faturamento Total
            </p>
            <p className="text-xl font-bold">
              {formatCurrencyBRL(data.totalRevenue)}
            </p>
          </div>
          <div className="border border-gray-300 rounded p-3 flex-1 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Produtos Vendidos
            </p>
            <p className="text-xl font-bold">{data.totalProductsSold}</p>
          </div>
        </div>

        <hr className="border-gray-300 mb-6" />

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Data
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Vendas
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Produtos Vendidos
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Preço Médio
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Receita
              </th>
            </tr>
          </thead>
          <tbody>
            {data.dailySales.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 px-3 py-4 text-center text-gray-500"
                >
                  Sem dados para o período selecionado
                </td>
              </tr>
            ) : (
              data.dailySales.map((row) => (
                <tr key={row.date}>
                  <td className="border border-gray-300 px-3 py-2">
                    {formatIsoDateToBR(row.date)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {row.dailySales}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {row.productsSold}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {formatCurrencyBRL(row.avgPrice)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {formatCurrencyBRL(row.revenue)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DailySalesReportPrintView.displayName = "DailySalesReportPrintView";
