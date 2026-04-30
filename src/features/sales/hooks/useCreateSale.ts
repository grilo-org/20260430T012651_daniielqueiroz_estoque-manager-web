import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSale } from "../api/salesApi";
import { CreateSaleSchema } from "../schemas/sale";
import { toast } from "sonner";
import axios from "axios";

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sale: CreateSaleSchema) => createSale(sale),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Venda criada com sucesso!");
    },
    onError: (error) => {
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Erro ao criar venda.")
          : "Erro ao criar venda.";
      toast.error(message);
    },
  });
};
