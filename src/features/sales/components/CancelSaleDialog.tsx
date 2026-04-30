import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { SaleStatus } from "../types/sales";
import { Ban } from "lucide-react";
import { useCancelSale } from "../hooks/useCancelSale";

interface CancelSaleDialogProps {
  saleId: string;
  status: SaleStatus;
}

export const CancelSaleDialog = ({ saleId, status }: CancelSaleDialogProps) => {
  const { mutate, isPending } = useCancelSale();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          disabled={status === "CANCELLED"}
        >
          <Ban className="size-4.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja cancelar essa venda?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esse procedimento não pode ser desfeito. Ao cancelar a venda os
            itens voltarão ao estoque e ela não será contabilizada nos
            relatórios.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Sair</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => mutate(saleId)}
            disabled={isPending}
          >
            Cancelar Venda
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
