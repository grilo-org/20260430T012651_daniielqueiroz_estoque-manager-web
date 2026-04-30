import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/productsApi";
import { UpdateProductSchema } from "../schemas/product";
import { toast } from "sonner";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductSchema }) =>
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produto atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Algo deu errado, verifique os dados digitados!");
    },
  });
};
