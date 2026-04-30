import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelSale } from "../api/salesApi";
import { toast } from "sonner";

export const useCancelSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (saleId: string) => cancelSale(saleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["salesReport"] });
      toast.success("Venda cancelada com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao cancelar essa venda!");
    },
  });
};
