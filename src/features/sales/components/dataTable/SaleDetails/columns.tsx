import { SaleItem } from "@/features/sales/types/sales";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { ColumnDef } from "@tanstack/react-table";
import { SaleDetailsTableRowActions } from "./SaleDetailsTableRowActions";

export const columns: ColumnDef<SaleItem>[] = [
  {
    accessorKey: "product.name",
    header: "Nome",
  },
  {
    accessorKey: "product.description",
    header: "Descrição",
  },
  {
    accessorKey: "quantity",
    header: "Unidades",
  },
  {
    accessorKey: "unitPrice",
    header: "Valor unitário",
    cell: ({ row }) => {
      return <p>{formatCurrencyBRL(row.original.unitPrice)}</p>;
    },
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => {
      return (
        <p>
          {formatCurrencyBRL(row.original.unitPrice * row.original.quantity)}
        </p>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => {
      return <SaleDetailsTableRowActions row={row} />;
    },
  },
];
