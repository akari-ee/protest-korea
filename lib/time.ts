import { format, differenceInCalendarDays } from "date-fns";
import { ko } from "date-fns/locale";

const formatKoreanDateTime = (datetime: string | null) => {
  if (!datetime) return null;
  return format(new Date(datetime), "yyyy.MM.dd(eee) HH:mm", { locale: ko });
};

const formatDdayLabel = (startTime: string) => {
  const dday = differenceInCalendarDays(new Date(startTime), new Date());

  if (dday > 0) return `D-${dday}`;
  if (dday === 0) return "D-Day";
  return `D-${Math.abs(dday)}`;
};

export { formatKoreanDateTime, formatDdayLabel };
