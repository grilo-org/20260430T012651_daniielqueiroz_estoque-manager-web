import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/shared/components/ui/alert-dialog";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

export const ProductDeleteDialog = ({ productId }: { productId: string }) => {
  const { mutate, isPending } = useDeleteProduct();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
        >
          <Trash2 className="size-4.5 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem que deseja apagar esse produto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Todas as vendas envolvendo esse
            produto ainda serão mantidas, porém esse produto não será mais
            listado como opção.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant={"destructive"}
            onClick={() => {
              mutate(productId);
            }}
            disabled={isPending}
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
