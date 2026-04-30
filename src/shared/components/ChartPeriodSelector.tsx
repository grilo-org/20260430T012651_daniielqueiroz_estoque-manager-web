import { useState } from "react";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";
import { ChartPeriod, DateRange, DEFAULT_CHART_PERIOD } from "@/shared/types/date";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

const PERIOD_OPTIONS: { label: string; value: ChartPeriod }[] = [
  { label: "Hoje", value: "today" },
  { label: "7 dias", value: "7d" },
  { label: "30 dias", value: "30d" },
  { label: "90 dias", value: "90d" },
  { label: "180 dias", value: "180d" },
];

interface ChartPeriodSelectorProps {
  activePeriod: ChartPeriod;
  onPeriodChange: (period: ChartPeriod) => void;
  customRange: DateRange | undefined;
  onCustomRangeChange: (range: DateRange | undefined) => void;
}

export function ChartPeriodSelector({
  activePeriod,
  onPeriodChange,
  customRange,
  onCustomRangeChange,
}: ChartPeriodSelectorProps) {
  const [open, setOpen] = useState(false);
  // Separate in-progress picker state from the applied customRange.
  // This allows the user to start a fresh selection every time the popover opens.
  const [pickerRange, setPickerRange] = useState<DateRange | undefined>(
    undefined,
  );

  function handleRangeSelect(range: DateRange | undefined) {
    setPickerRange(range);
    // react-day-picker v9 sets from === to on the first click.
    // Only auto-close when the user picks a genuine end date (different day).
    if (
      range?.from &&
      range?.to &&
      range.from.getTime() !== range.to.getTime()
    ) {
      onCustomRangeChange(range);
      onPeriodChange("custom");
      setOpen(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      // Always reset picker when opening so the user can start a fresh selection.
      setPickerRange(undefined);
    } else {
      // Closing: apply whatever the picker has if it's a complete selection.
      if (pickerRange?.from && pickerRange?.to) {
        onCustomRangeChange(pickerRange);
        onPeriodChange("custom");
      }
    }
    setOpen(nextOpen);
  }

  function handleClear() {
    onPeriodChange(DEFAULT_CHART_PERIOD);
    onCustomRangeChange(undefined);
  }

  function formatCustomLabel() {
    const fmt = (d: Date) =>
      d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    if (customRange?.from && customRange?.to)
      return `${fmt(customRange.from)} - ${fmt(customRange.to)}`;
    return "Personalizado";
  }

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {PERIOD_OPTIONS.map(({ label, value }) => (
        <Button
          key={value}
          variant={activePeriod === value ? "default" : "outline"}
          className="p-3 rounded-sm"
          size="xs"
          onClick={() => {
            onPeriodChange(value);
            onCustomRangeChange(undefined);
          }}
        >
          {label}
        </Button>
      ))}

      <Popover
        open={open}
        onOpenChange={handleOpenChange}
      >
        <PopoverTrigger asChild>
          <Button
            variant={activePeriod === "custom" ? "default" : "outline"}
            className="p-3 rounded-sm"
            size="xs"
          >
            <CalendarIcon className="size-3.5" />
            {formatCustomLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onFocusOutside={(e) => e.preventDefault()}
        >
          <Calendar
            mode="range"
            selected={pickerRange}
            onSelect={handleRangeSelect}
            locale={ptBR}
            disabled={{ after: new Date() }}
          />
        </PopoverContent>
      </Popover>

      {activePeriod === "custom" && (
        <Button
          variant="ghost"
          size="xs"
          className="p-1 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
        >
          <X className="size-3.5" />
          Limpar
        </Button>
      )}
    </div>
  );
}
