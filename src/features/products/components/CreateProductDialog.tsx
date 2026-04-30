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
import { Plus } from "lucide-react";
import { createProductSchema, CreateProductSchema } from "../schemas/product";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { useCreateProduct } from "../hooks/useCreateProduct";

export const CreateProductDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      quantity: 0,
      price: 0,
    },
  });

  const { mutate, isPending } = useCreateProduct();

  function onSubmit(data: CreateProductSchema) {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger>
        <Button
          className="rounded-sm text-sm "
          size={"lg"}
        >
          <Plus className="size-4.5" /> Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Criar produto</DialogTitle>
          <DialogDescription>Crie um novo produto</DialogDescription>
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
                    placeholder="Ex: Arroz"
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
                    placeholder="Ex: Alimento"
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
                    placeholder="Ex: Pacote 5kg"
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
            {isPending ? "Criando..." : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
