import { PRODUCTS_API_ENDPOINT } from "@/features/products/api/productsApi";
import { SaleItem } from "@/features/sales/types/sales";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface SaleDetailsTableRowActionsProps {
  row: Row<SaleItem>;
}

export const SaleDetailsTableRowActions = ({
  row,
}: SaleDetailsTableRowActionsProps) => {
  const isProductDeleted = row.original.product.deletedAt !== null;

  return (
    <div className="items-center flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <Button
              variant="ghost"
              size="icon"
              disabled={isProductDeleted}
              asChild={!isProductDeleted}
            >
              {!isProductDeleted ? (
                <Link to={`${PRODUCTS_API_ENDPOINT}/${row.original.productId}`}>
                  <Eye className="size-5.5" />
                </Link>
              ) : (
                <Eye className="size-5.5" />
              )}
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isProductDeleted
              ? "Produto não existe mais"
              : "Ver detalhes do produto"}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
