import { forwardRef } from "react";
import { Product } from "../types/product";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { formatIsoDateTimeToBR } from "@/shared/utils/dateFormater";

interface ProductsExportPrintViewProps {
  data: Product[];
}

export const ProductsExportPrintView = forwardRef<
  HTMLDivElement,
  ProductsExportPrintViewProps
>(({ data }, ref) => {
  return (
    <div className="w-0 h-0 overflow-hidden">
      <div
        ref={ref}
        className="bg-white text-black p-8 font-sans"
      >
        <h1 className="text-2xl font-bold mb-1">Relatório de Produtos</h1>
        <p className="text-sm text-gray-600 mb-6">
          Todos os produtos cadastrados no sistema
        </p>

        <div className="flex gap-8 mb-6">
          <div className="border border-gray-300 rounded p-3 flex-1 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Total de Produtos
            </p>
            <p className="text-xl font-bold">{data.length}</p>
          </div>
        </div>

        <hr className="border-gray-300 mb-6" />

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Nome
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Categoria
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Preço
              </th>
              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">
                Qtd. em Estoque
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                Cadastrado em
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
                  Nenhum produto encontrado
                </td>
              </tr>
            ) : (
              data.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-3 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {formatCurrencyBRL(product.price)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-right">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {formatIsoDateTimeToBR(product.createdAt)}
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

ProductsExportPrintView.displayName = "ProductsExportPrintView";
