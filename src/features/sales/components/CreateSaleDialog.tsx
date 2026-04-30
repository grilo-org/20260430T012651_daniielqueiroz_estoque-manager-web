import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { CreateSaleSchema, createSaleSchema } from "../schemas/sale";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useInfiniteProducts } from "@/features/products/hooks/useInfiniteProducts";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useCreateSale } from "../hooks/useCreateSale";
import { useEffect, useMemo, useState } from "react";

export const CreateSaleDialog = () => {
  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({ sortBy: "name", sortOrder: "asc" });

  // Automaticamente carrega todas as páginas restantes em background
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = useMemo(
    () => productsData?.pages.flatMap((page) => page.data) ?? [],
    [productsData],
  );

  const [open, setOpen] = useState<boolean>(false);

  const { control, reset, handleSubmit, formState } = useForm<CreateSaleSchema>(
    {
      resolver: zodResolver(createSaleSchema),
      mode: "onChange",
      defaultValues: {
        customerName: "",
        items: [{ productId: "", quantity: 1 }],
      },
    },
  );

  // Lista de itens da venda
  const { fields, append, remove, replace } = useFieldArray({
    control: control,
    name: "items",
  });

  // Observa as mudanças na lista de itens da venda
  const items = useWatch({
    control: control,
    name: "items",
  });

  // Cria uma novo item "placeholder" na lista de itens
  const handleAddLine = () => {
    append({ productId: "", quantity: 1 });
  };

  // Limpa a lista de itens
  const clearItems = () => {
    replace({ productId: "", quantity: 1 });
  };

  const { mutate, isPending } = useCreateSale();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) reset();
  };

  function onSubmit(data: CreateSaleSchema) {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          size={"lg"}
          onClick={() => {
            setTimeout(() => (document.body.style.pointerEvents = ""), 0);
          }}
        >
          <Plus className="size-4.5" /> Nova venda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Nova venda</DialogTitle>
          <DialogDescription>
            Selecione o item e a quantidade de que deseja adicionar a essa venda
          </DialogDescription>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Nome do cliente */}
              <Controller
                name="customerName"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nome do cliente</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Ex: João Silva"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Seleção de produto + quantidade */}
              <Field>
                <div className="flex justify-between items-center">
                  <FieldLabel>Itens da venda</FieldLabel>
                  <div className="flex gap-2">
                    {items.length > 1 && (
                      <Button
                        type={"button"}
                        variant={"outline"}
                        size={"sm"}
                        onClick={clearItems}
                      >
                        Limpar
                      </Button>
                    )}
                    <Button
                      type={"button"}
                      variant={"outline"}
                      size={"sm"}
                      onClick={handleAddLine}
                    >
                      <Plus className="size-4" /> Item
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 overflow-auto max-h-[40vh]">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="space-y-2"
                    >
                      <div className="flex gap-2 items-center">
                        {/* Select dos produtos disponíveis no sistema */}
                        <Controller
                          name={`items.${index}.productId`}
                          control={control}
                          render={({ field: f, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="flex"
                            >
                              <Select
                                name={f.name}
                                value={f.value}
                                onValueChange={f.onChange}
                                onOpenChange={(open) => {
                                  if (!open) f.onBlur();
                                }}
                              >
                                <SelectTrigger
                                  aria-invalid={fieldState.invalid}
                                >
                                  <SelectValue placeholder="Selecionar produto..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {products.map((product) => (
                                    <SelectItem
                                      key={product.id}
                                      value={product.id}
                                      disabled={product.quantity <= 0}
                                    >
                                      {product.name}
                                      <p className="text-muted-foreground">
                                        ({formatCurrencyBRL(product.price)})
                                      </p>
                                    </SelectItem>
                                  ))}
                                  {isFetchingNextPage && (
                                    <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
                                      <Loader2 className="size-3 animate-spin" />
                                      Carregando produtos...
                                    </div>
                                  )}
                                </SelectContent>
                              </Select>
                            </Field>
                          )}
                        />

                        {/* Seleção de quantidade */}
                        <Controller
                          name={`items.${index}.quantity`}
                          control={control}
                          render={({ field: f, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="w-28"
                            >
                              <Input
                                id={f.name}
                                type="number"
                                min={1}
                                aria-invalid={fieldState.invalid}
                                value={f.value}
                                onChange={(e) =>
                                  f.onChange(Number(e.target.value))
                                }
                                onBlur={f.onBlur}
                              />
                            </Field>
                          )}
                        />

                        {/* Remover linha */}
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size={"icon"}
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="text-destructive" />
                          </Button>
                        )}
                      </div>

                      {/* Erros e descrição contendo estoque do produto */}
                      <div className="space-y-0.5 px-0.5">
                        {formState.errors.items?.[index]?.productId && (
                          <FieldError
                            errors={[formState.errors.items[index].productId]}
                          />
                        )}
                        {formState.errors.items?.[index]?.quantity && (
                          <FieldError
                            errors={[formState.errors.items[index].quantity]}
                          />
                        )}
                        {items[index]?.productId && (
                          <FieldDescription className="text-xs">
                            Estoque:{" "}
                            {
                              products?.find(
                                (p) => p.id === items[index].productId,
                              )?.quantity
                            }{" "}
                            unidades
                          </FieldDescription>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Total estimado */}
                {fields.length > 0 &&
                  (() => {
                    const total = items.reduce((acc, item) => {
                      const product = products?.find(
                        (p) => p.id === item.productId,
                      );
                      return acc + (product?.price ?? 0) * (item.quantity ?? 0);
                    }, 0);
                    return (
                      <div className="flex justify-between rounded-md bg-muted px-4 py-3 text-sm">
                        <span className="text-muted-foreground">
                          Total estimado
                        </span>
                        <span className="font-bold">
                          {formatCurrencyBRL(total)}
                        </span>
                      </div>
                    );
                  })()}
                {/* Erro do array items */}
                {formState.errors.items?.root && (
                  <FieldError errors={[formState.errors.items.root]} />
                )}
              </Field>

              <Button
                type="submit"
                className="w-full"
                disabled={!formState.isValid || isPending}
              >
                {isPending ? "Criando..." : "Criar venda"}
              </Button>
            </FieldGroup>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
