import { SalesTableRowActions } from "@/features/sales/components/dataTable/Sales/SalesTableRowActions";
import { Sale, SaleSortBy } from "@/features/sales/types/sales";
import { SortableHeader } from "@/shared/components/dataTable/SortableHeader";
import { Badge } from "@/shared/components/ui/badge";
import { SortOrder } from "@/shared/types/sort";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { formatIsoDateTimeToBR } from "@/shared/utils/dateFormater";
import { ColumnDef } from "@tanstack/react-table";

export const createSalesColumns = ({
  sortable = true,
  sortBy,
  sortOrder,
  onSort = () => {},
}: {
  sortable?: boolean;
  sortBy?: SaleSortBy;
  sortOrder?: SortOrder;
  onSort?: (col: SaleSortBy) => void;
} = {}): ColumnDef<Sale>[] => [
  {
    accessorKey: "customerName",
    header: sortable
      ? () => (
          <SortableHeader
            label="Cliente"
            isSorted={sortBy === "customerName" ? (sortOrder ?? false) : false}
            onSort={() => onSort("customerName")}
          />
        )
      : "Cliente",
  },
  {
    accessorKey: "items",
    header: sortable
      ? () => (
          <SortableHeader
            label="Itens"
            isSorted={sortBy === "items" ? (sortOrder ?? false) : false}
            onSort={() => onSort("items")}
          />
        )
      : "Itens",
    cell: ({ row }) => {
      return (
        <p>
          {row.original.items.length}
          {row.original.items.length > 1 ? " itens" : " item"}
        </p>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: sortable
      ? () => (
          <SortableHeader
            label="Valor"
            isSorted={sortBy === "totalAmount" ? (sortOrder ?? false) : false}
            onSort={() => onSort("totalAmount")}
          />
        )
      : "Valor",
    cell: ({ row }) => {
      return <p>{formatCurrencyBRL(row.original.totalAmount)}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: sortable
      ? () => (
          <SortableHeader
            label="Data da venda"
            isSorted={sortBy === "createdAt" ? (sortOrder ?? false) : false}
            onSort={() => onSort("createdAt")}
          />
        )
      : "Data da venda",
    cell: ({ row }) => {
      return <p>{formatIsoDateTimeToBR(row.original.createdAt)}</p>;
    },
  },
  {
    accessorKey: "status",
    header: sortable
      ? () => (
          <SortableHeader
            label="Status da venda"
            isSorted={sortBy === "status" ? (sortOrder ?? false) : false}
            onSort={() => onSort("status")}
          />
        )
      : "Status da venda",
    cell: ({ row }) => {
      return row.original.status === "CANCELLED" ? (
        <Badge variant={"destructive"}>Cancelada</Badge>
      ) : (
        <Badge variant={"success"}>Confirmada</Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Ações",
    cell: ({ row }) => {
      return <SalesTableRowActions row={row} />;
    },
  },
];
