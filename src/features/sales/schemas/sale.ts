import z from "zod";

export const createSaleSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos dois caracteres"),
  items: z
    .array(
      z.object({
        productId: z.uuid("ID do produto inválido"),
        quantity: z
          .number()
          .int()
          .positive("Quantidade deve ser maior que zero"),
      }),
    )
    .min(1, "Deve haver pelo menos um item na venda"),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
