import { useMemo } from "react";
import { ChartPeriod, DateRange } from "@/shared/types/date";
import { formatShortDateISO, getDateRange } from "@/shared/utils/dateFormater";

export function useDateRangeParams(
  activePeriod: ChartPeriod,
  customRange: DateRange | undefined,
) {
  return useMemo(() => {
    if (activePeriod === "custom" && customRange?.from && customRange?.to) {
      return {
        startDate: formatShortDateISO(customRange.from),
        endDate: formatShortDateISO(customRange.to),
      };
    }
    return getDateRange(activePeriod);
  }, [activePeriod, customRange]);
}
