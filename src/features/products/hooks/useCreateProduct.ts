import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsApi";
import { CreateProductSchema } from "../schemas/product";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductSchema) => createProduct(product),
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
