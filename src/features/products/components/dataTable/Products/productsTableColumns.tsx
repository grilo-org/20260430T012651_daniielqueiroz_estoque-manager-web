import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { ColumnDef } from "@tanstack/react-table";
import { Product, ProductSortBy } from "../../../types/product";
import { formatIsoDateTimeToBR } from "@/shared/utils/dateFormater";
import { ProductRowActions } from "./ProductsRowActions";
import { SortableHeader } from "@/shared/components/dataTable/SortableHeader";
import { SortOrder } from "@/shared/types/sort";

export const createProductsColumns = (
  sortBy: ProductSortBy | undefined,
  sortOrder: SortOrder | undefined,
  onSort: (col: ProductSortBy) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: () => (
      <SortableHeader
        label="Nome"
        isSorted={sortBy === "name" ? (sortOrder ?? false) : false}
        onSort={() => onSort("name")}
      />
    ),
  },
  {
    accessorKey: "category",
    header: () => (
      <SortableHeader
        label="Categoria"
        isSorted={sortBy === "category" ? (sortOrder ?? false) : false}
        onSort={() => onSort("category")}
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "price",
    header: () => (
      <SortableHeader
        label="Preço"
        isSorted={sortBy === "price" ? (sortOrder ?? false) : false}
        onSort={() => onSort("price")}
      />
    ),
    cell: ({ row }) => {
      return <p>{formatCurrencyBRL(row.original.price)}</p>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "quantity",
    header: () => (
      <SortableHeader
        label="Estoque"
        isSorted={sortBy === "quantity" ? (sortOrder ?? false) : false}
        onSort={() => onSort("quantity")}
      />
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <SortableHeader
        label="Cadastrado em"
        isSorted={sortBy === "createdAt" ? (sortOrder ?? false) : false}
        onSort={() => onSort("createdAt")}
      />
    ),
    cell: ({ row }) => {
      return <p>{formatIsoDateTimeToBR(row.original.createdAt)}</p>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <SortableHeader
        label="Modificado em"
        isSorted={sortBy === "updatedAt" ? (sortOrder ?? false) : false}
        onSort={() => onSort("updatedAt")}
      />
    ),
    cell: ({ row }) => {
      return <p>{formatIsoDateTimeToBR(row.original.updatedAt)}</p>;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return <ProductRowActions row={row} />;
    },
    enableColumnFilter: false,
  },
];
