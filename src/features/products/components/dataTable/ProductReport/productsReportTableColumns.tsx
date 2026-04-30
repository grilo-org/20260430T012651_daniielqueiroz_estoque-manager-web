import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { ColumnDef } from "@tanstack/react-table";
import { formatIsoDateToBR } from "@/shared/utils/dateFormater";
import { DailySale } from "@/features/sales/types/sales";

export const columns: ColumnDef<DailySale>[] = [
  {
    accessorKey: "date",
    header: "Data da venda",
    cell: ({ row }) => {
      return <p>{formatIsoDateToBR(row.original.date)}</p>;
    },
  },
  {
    accessorKey: "dailySales",
    header: "Participação em vendas",
  },
  {
    accessorKey: "productsSold",
    header: "Unidades vendidas",
  },
  {
    accessorKey: "avgPrice",
    header: "Preço médio vendido",
    cell: ({ row }) => {
      return <p>{formatCurrencyBRL(row.original.avgPrice)}</p>;
    },
  },

  {
    accessorKey: "revenue",
    header: "Faturamento",
    cell: ({ row }) => {
      return <p>{formatCurrencyBRL(row.original.revenue)}</p>;
    },
  },
];
