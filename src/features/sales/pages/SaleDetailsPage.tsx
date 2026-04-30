import { PageError } from "@/shared/components/PageError";
import { PageLoader } from "@/shared/components/PageLoader";
import { Link, useParams } from "react-router-dom";
import { useSale } from "../hooks/useSale";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/shared/components/ui/card";
import { formatCurrencyBRL } from "@/shared/utils/currencyFormat";
import { formatIsoDateTimeToBR } from "@/shared/utils/dateFormater";
import { ArrowLeft, DollarSign, FileDown, Package, Calendar, User } from "lucide-react";
import { SALES_API_ENDPOINT } from "../api/salesApi";
import { Badge } from "@/shared/components/ui/badge";
import { DataTable } from "../components/dataTable/SaleDetails/DataTable";
import { columns } from "../components/dataTable/SaleDetails/columns";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { SaleReceiptPrintView } from "../components/SaleReceiptPrintView";

export const SaleDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useSale(id!);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `recibo-${data?.customerName ?? "venda"}-${data?.createdAt?.split("T")[0] ?? ""}`,
    pageStyle: `@page { margin: 20mm; }`,
  });

  if (isLoading) return <PageLoader />;
  if (isError || !data)
    return <PageError message="Erro ao carregar essa venda." />;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-fit"
          asChild
        >
          <Link to={SALES_API_ENDPOINT}>
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        </Button>
        <Button variant={"outline"} size={"sm"} onClick={handlePrint}>
          <FileDown className="size-4" />
          Imprimir Recibo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Detalhes da venda
          </CardTitle>
          <CardAction>
            {data.status === "CONFIRMED" ? (
              <Badge variant={"success"}> Confirmada</Badge>
            ) : (
              <Badge variant={"destructive"}>Cancelada</Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center divide-x divide-border">
            <div className="flex items-center gap-3 pr-8">
              <div className="bg-muted p-2 rounded-sm">
                <User className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nome do cliente</p>
                <p className="font-bold">{data.customerName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-8">
              <div className="bg-muted p-2 rounded-sm">
                <DollarSign className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Valor da venda</p>
                <p className="font-bold">
                  {formatCurrencyBRL(data.totalAmount || 0)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-8">
              <div className="bg-muted p-2 rounded-sm">
                <Package className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Itens comprados</p>
                <p className="font-bold">{data.items.length} unidades</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-8">
              <div className="bg-muted p-2 rounded-sm">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data da venda</p>
                <p className="font-bold">
                  {formatIsoDateTimeToBR(data.createdAt || "")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col flex-1 min-h-0 space-y-2 my-8">
        <p className="text-xl font-bold">Produtos dessa venda</p>
        <DataTable
          columns={columns}
          data={data.items}
        />
      </div>

      <SaleReceiptPrintView ref={printRef} data={data} />
    </div>
  );
};
