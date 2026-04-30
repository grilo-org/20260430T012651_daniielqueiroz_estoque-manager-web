import { forwardRef } from "react";
import { SaleExport, SaleStatus } from "../types/sales";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import {
  formatIsoDateTimeToBR,
  formatIsoDateToBR,
} from "@/shared/utils/dateFormater";

interface SalesExportPrintViewProps {
  data: SaleExport[];
  startDate: string;
  endDate: string;
}

const STATUS_LABEL: Record<SaleStatus, string> = {
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
};

export const SalesExportPrintView = forwardRef<
  HTMLDivElement,
  SalesExportPrintViewProps
>(({ data, startDate, endDate }, ref) => {
  const totalRevenue = data
    .filter((s) => s.status === "CONFIRMED")
    .reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div className="w-0 h-0 overflow-hidden">
      <div
        ref={ref}
        className="bg-white text-black p-8 font-sans"
      >
        <h1 className="text-2xl font-bold mb-1">Relatório de Vendas</h1>
        <p className="text-sm text-gray-600 mb-6">
          Período: {formatIsoDateToBR(startDate)} — {formatIsoDateToBR(endDate)}
        </p>

        <div className="flex gap-8 mb-6">
          <div className="border border-gray-300 rounded p-3 flex-1 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Total de Vendas
            </p>
            <p className="text-xl font-bold">{data.length}</p>
          </div>
          <div className="border border-gray-300 rounded p-3 flex-1 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Faturamento Total
            </p>
            <p className="text-xl font-bold">
              {formatCurrencyBRL(totalRevenue)}
            </p>
          </div>
        </div>

        <hr className="border-gray-300 mb-6" />

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Data
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Cliente
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Itens
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Status
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 px-3 py-4 text-center text-gray-500"
                >
                  Sem dados para o período selecionado
                </td>
              </tr>
            ) : (
              data.map((sale) => (
                <tr key={sale.id}>
                  <td className="border border-gray-300 px-3 py-2">
                    {formatIsoDateTimeToBR(sale.createdAt)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {sale.customerName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {sale.itemCount}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {STATUS_LABEL[sale.status]}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {formatCurrencyBRL(sale.totalAmount)}
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

SalesExportPrintView.displayName = "SalesExportPrintView";
