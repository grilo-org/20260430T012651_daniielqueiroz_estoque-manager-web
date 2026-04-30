import { SALES_API_ENDPOINT } from "@/features/sales/api/salesApi";
import { Sale } from "@/features/sales/types/sales";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { CancelSaleDialog } from "../../CancelSaleDialog";

interface SalesTableRowActionsProps {
  row: Row<Sale>;
}

export const SalesTableRowActions = ({ row }: SalesTableRowActionsProps) => {
  return (
    <div className="items-center flex">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            asChild
          >
            <Link to={`${SALES_API_ENDPOINT}/${row.original.id}`}>
              <Eye className="size-5.5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ver detalhes da venda</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <CancelSaleDialog
            saleId={row.original.id}
            status={row.original.status}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Cancelar venda</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
