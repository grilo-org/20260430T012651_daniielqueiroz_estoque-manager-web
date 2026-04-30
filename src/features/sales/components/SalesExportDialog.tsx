import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { ChartPeriodSelector } from "@/shared/components/ChartPeriodSelector";
import { useDateRangeParams } from "@/shared/hooks/useDateRangeParams";
import { usePrintExport } from "@/shared/hooks/usePrintExport";
import {
  ChartPeriod,
  DateRange,
  DEFAULT_CHART_PERIOD,
} from "@/shared/types/date";
import { useSalesExport } from "../hooks/useSalesExport";
import { SalesExportPrintView } from "./SalesExportPrintView";

export function SalesExportDialog() {
  const [activePeriod, setActivePeriod] =
    useState<ChartPeriod>(DEFAULT_CHART_PERIOD);
  const [customRange, setCustomRange] = useState<DateRange | undefined>(
    undefined,
  );

  const { startDate, endDate } = useDateRangeParams(activePeriod, customRange);

  const { data, isFetching, refetch } = useSalesExport(startDate, endDate);

  const { printRef, handleExport } = usePrintExport({
    data,
    refetch,
    documentTitle: `relatorio-vendas-${startDate}_${endDate}`,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-sm text-sm"
            size="lg"
          >
            <FileDown className="size-4.5" />
            Gerar PDF
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Exportar relatório de vendas</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              Selecione o período para gerar o relatório:
            </p>
            <ChartPeriodSelector
              activePeriod={activePeriod}
              onPeriodChange={setActivePeriod}
              customRange={customRange}
              onCustomRangeChange={setCustomRange}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleExport}
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <FileDown className="size-4" />
                  Exportar PDF
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <SalesExportPrintView
        ref={printRef}
        data={data ?? []}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
}
