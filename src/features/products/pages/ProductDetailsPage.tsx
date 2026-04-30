import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, Package, Tag } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { formatIsoDateTimeToBR } from "@/shared/utils/dateFormater";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { PageLoader } from "@/shared/components/PageLoader";
import { PageError } from "@/shared/components/PageError";
import { DailyProductsSalesChart } from "../components/DailyProductsSalesChart";
import { PRODUCTS_API_ENDPOINT } from "../api/productsApi";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useProduct(id!);

  if (isLoading) return <PageLoader />;
  if (isError || !data)
    return <PageError message="Erro ao carregar esse produto." />;

  return (
    <div className="flex flex-col space-y-4">
      <Button
        variant={"ghost"}
        size={"sm"}
        className="w-fit"
        asChild
      >
        <Link to={PRODUCTS_API_ENDPOINT}>
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
          <CardAction>
            {data.quantity > 0 ? (
              <Badge variant={"success"}> Em estoque</Badge>
            ) : (
              <Badge variant={"destructive"}>Sem estoque</Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center divide-x divide-border">
            <div className="flex items-center gap-3 pr-8">
              <div className="bg-muted p-2 rounded-sm">
                <Tag className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Categoria</p>
                <p className="font-bold">{data.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-8">
              <div className="bg-muted p-2 rounded-sm">
                <DollarSign className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Preço</p>
                <p className="font-bold">
                  {formatCurrencyBRL(data.price || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-8">
              <div className="bg-muted p-2 rounded-sm">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Estoque</p>
                <p className="font-bold">{data.quantity} unidades</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-8">
              <div className="bg-muted p-2 rounded-sm">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cadastrado em</p>
                <p className="font-bold">
                  {formatIsoDateTimeToBR(data.createdAt || "")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <DailyProductsSalesChart />
    </div>
  );
};
