import { forwardRef } from "react";
import { Sale } from "@/features/sales/types/sales";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { formatIsoDateTimeToBR } from "@/shared/utils/dateFormater";

interface SaleReceiptPrintViewProps {
  data: Sale;
}

export const SaleReceiptPrintView = forwardRef<
  HTMLDivElement,
  SaleReceiptPrintViewProps
>(({ data }, ref) => {
  return (
    <div className="h-0 overflow-hidden">
      <div
        ref={ref}
        className="bg-white text-black p-8 font-sans max-w-2xl mx-auto"
      >
        <h1 className="text-2xl font-bold mb-1">Recibo de Venda</h1>
        <p className="text-sm text-gray-500 mb-6">
          Data: {formatIsoDateTimeToBR(data.createdAt)}
        </p>

        <div className="mb-4 space-y-1">
          <p className="text-sm">
            <span className="font-semibold">Cliente:</span> {data.customerName}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Status:</span>{" "}
            {data.status === "CONFIRMED" ? "Confirmada" : "Cancelada"}
          </p>
        </div>

        <hr className="border-gray-300 mb-4" />

        <table className="w-full text-sm border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Produto
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Qtd
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Valor Unitário
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-3 py-2">
                  {item.product.name}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrencyBRL(item.unitPrice)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrencyBRL(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="border-gray-300 mb-4" />

        <p className="text-right font-bold text-lg">
          Total: {formatCurrencyBRL(data.totalAmount)}
        </p>
      </div>
    </div>
  );
});

SaleReceiptPrintView.displayName = "SaleReceiptPrintView";
