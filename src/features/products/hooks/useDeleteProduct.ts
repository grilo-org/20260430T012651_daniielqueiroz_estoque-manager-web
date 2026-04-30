import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/productsApi";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto deletado com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao apagar esse produto!");
    },
  });
};
