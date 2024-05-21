import { format, parseISO } from "date-fns";

export function parseDate(timestamp: string, type?: string) {
  return timestamp && format(parseISO(timestamp), type ? type : "dd MMM yyyy");
}
