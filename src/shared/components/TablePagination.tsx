// shared/components/TablePagination.tsx
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TablePaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const getPageNumbers = (page: number, totalPages: number) => {
  const pages = new Set([1, totalPages, page, page - 1, page + 1]);
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
};

export const TablePagination = ({
  page,
  pageSize,
  totalPages,
  total,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  const handlePageSizeChange = (newPageSize: string) => {
    onPageSizeChange(Number(newPageSize));
    onPageChange(1);
  };

  return (
    <div className="grid w-full grid-cols-3 items-center">
      <span className="w-full text-[10px] text-muted-foreground 2xl:text-sm">
        Total: {total}
      </span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text="Anterior"
              onClick={() => onPageChange(page - 1)}
              aria-disabled={page === 1}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((p, index) => {
            const prev = pageNumbers[index - 1];
            const hasGap = prev && p - prev > 1;

            return (
              <React.Fragment key={p}>
                {hasGap && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => onPageChange(p)}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          })}

          <PaginationItem>
            <PaginationNext
              text="Próxima"
              onClick={() => onPageChange(page + 1)}
              aria-disabled={page === totalPages}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select
        defaultValue={pageSize.toString()}
        onValueChange={handlePageSizeChange}
      >
        <div className="flex w-full items-center gap-4">
          <span className="w-full text-end text-[10px] 2xl:col-span-5 2xl:text-sm">
            Linhas por página
          </span>
          <SelectTrigger className="h-8 w-16 gap-2 text-[10px] 2xl:h-10 2xl:w-20 2xl:text-sm">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </div>
      </Select>
    </div>
  );
};
