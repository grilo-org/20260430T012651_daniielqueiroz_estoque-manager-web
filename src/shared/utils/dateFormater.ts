import { ChartPeriod } from "../types/date";

/**
 * Recebe uma data e converte para padrão ISO apenas com a Data, sem as horas
 * @param date Objeto data
 * @returns Data no formato "YYYY-MM-DD"
 */
export const formatShortDateISO = (date: Date): string => {
  // toLocaleDateString("en-CA") produz "YYYY-MM-DD" usando a data local,
  // evitando o bug de fuso horário do toISOString() que converte para UTC.
  return date.toLocaleDateString("en-CA");
};

export const formatIsoDateToBR = (isoDate: string) => {
  return new Date(isoDate + "T00:00:00").toLocaleDateString("pt-BR");
};

/**
 * Recebe uma data com hora em string no formato Iso e converte para data local BR
 * @param isoDateTime Data e hora no formato iso em string
 * @returns Data convertida para formato pt-BR "DD-MM-YYY"
 */
export const formatIsoDateTimeToBR = (isoDateTime: string): string => {
  const date = new Date(isoDateTime);
  return date.toLocaleDateString("pt-BR");
};

export function getDateRange(period: ChartPeriod) {
  const startDate = new Date();
  const endDate = new Date();

  switch (period) {
    case "7d":
      startDate.setDate(startDate.getDate() - 6);
      break;
    case "30d":
      startDate.setDate(startDate.getDate() - 30);
      break;
    case "90d":
      startDate.setDate(startDate.getDate() - 90);
      break;
    case "180d":
      startDate.setDate(startDate.getDate() - 180);
      break;
    case "custom":
    // "custom" nunca deveria chegar aqui: o useDateRangeParams faz o
    // circuit-breaker antes de chamar getDateRange para períodos customizados.
    // Cai no default (hoje) como fallback defensivo.
    case "today":
    default:
      break;
  }

  // Retorna só "YYYY-MM-DD"
  return {
    startDate: startDate.toLocaleDateString("en-CA"),
    endDate: endDate.toLocaleDateString("en-CA"),
  };
}

export function buildReportParams(startDate: string, endDate: string) {
  // startDate e endDate vêm do date picker como "2026-03-25" e "2026-03-27"

  // Meia-noite LOCAL do dia inicial
  const start = new Date(`${startDate}T00:00:00`);

  // Meia-noite LOCAL do dia seguinte ao final (exclusivo)
  const end = new Date(`${endDate}T00:00:00`);
  end.setDate(end.getDate() + 1);

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}
