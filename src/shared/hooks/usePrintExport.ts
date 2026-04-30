import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

export function usePrintExport({
  data,
  refetch,
  documentTitle,
}: {
  data: unknown;
  refetch?: () => Promise<{ error: unknown }>;
  documentTitle: string;
}) {
  const shouldPrintRef = useRef(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle,
    pageStyle: `@page { margin: 20mm; }`,
  });

  useEffect(() => {
    if (data && shouldPrintRef.current) {
      shouldPrintRef.current = false;
      handlePrint();
    }
  }, [data, handlePrint]);

  const handleExport = async () => {
    if (!refetch) {
      handlePrint();
      return;
    }
    shouldPrintRef.current = true;
    const result = await refetch();
    if (result.error) {
      shouldPrintRef.current = false;
      toast.error("Erro ao gerar relatório. Tente novamente.");
    }
  };

  return { printRef, handleExport };
}
