import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { usePrintExport } from "@/shared/hooks/usePrintExport";
import { useProductsExport } from "../hooks/useProductsExport";
import { ProductsExportPrintView } from "./ProductsExportPrintView";

export function ProductsExportButton() {
  const { data, isFetching, refetch } = useProductsExport();

  const { printRef, handleExport } = usePrintExport({
    data,
    refetch,
    documentTitle: "relatorio-produtos",
  });

  return (
    <>
      <Button
        variant="outline"
        className="rounded-sm text-sm"
        size="lg"
        onClick={handleExport}
        disabled={isFetching}
      >
        {isFetching ? (
          <Loader2 className="size-4.5 animate-spin" />
        ) : (
          <FileDown className="size-4.5" />
        )}
        Gerar PDF
      </Button>
      <ProductsExportPrintView
        ref={printRef}
        data={data ?? []}
      />
    </>
  );
}
