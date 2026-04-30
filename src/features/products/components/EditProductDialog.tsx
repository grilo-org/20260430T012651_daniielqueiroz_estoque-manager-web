import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Product } from "../types/product";
import { UpdateProductSchema, updateProductSchema } from "../schemas/product";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useState } from "react";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";

interface EditProductDialogProps {
  product: Product;
}

export const EditProductDialog = ({ product }: EditProductDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    },
  });

  const { mutate, isPending } = useUpdateProduct();

  function onSubmit(data: UpdateProductSchema) {
    mutate(
      { id: product.id, data },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
        >
          <Pencil className="size-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Editar produto
          </DialogTitle>
          <DialogDescription>
            Realize alterações no produto escolhido
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-product-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nome</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Categoria</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Descrição</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Preço</FieldLabel>
                  <Input
                    {...field}
                    value={formatCurrencyBRL((field.value as number) ?? 0)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      const number = Number(raw) / 100;
                      field.onChange(number);
                    }}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Quantidade em Estoque</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="update-product-form"
            disabled={isPending}
          >
            {isPending ? "Atualizando..." : "Atualizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
