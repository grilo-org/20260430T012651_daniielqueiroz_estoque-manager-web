import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { ProductDeleteDialog } from "../../DeleteProductDialog";
import { Button } from "@/shared/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS_API_ENDPOINT } from "../../../api/productsApi";
import { Row } from "@tanstack/react-table";
import { Product } from "../../../types/product";
import { EditProductDialog } from "../../EditProductDialog";

interface ProductRowActionsProps {
  row: Row<Product>;
}

export const ProductRowActions = ({ row }: ProductRowActionsProps) => {
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant={"ghost"}
            size={"icon"}
          >
            <Link to={`${PRODUCTS_API_ENDPOINT}/${row.original.id}`}>
              <Eye className="size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Visualizar detalhes do produto</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <EditProductDialog product={row.original} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar produto</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <ProductDeleteDialog productId={row.original.id} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Excluir produto</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
