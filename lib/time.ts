import { format, differenceInCalendarDays } from "date-fns";
import { ko } from "date-fns/locale";
import { TZDate } from "@date-fns/tz";

const formatKoreanDateTime = (datetime: string | null) => {
  if (!datetime) return null;
  const timeZone = "Asia/Seoul";
  const date = new TZDate(new Date(datetime), timeZone);
  return format(date, "yyyy.MM.dd(eee) HH:mm", { locale: ko });
};

const formatDdayLabel = (startTime: string) => {
  const dday = differenceInCalendarDays(new Date(startTime), new Date());

  if (dday > 0) return `D-${dday}`;
  if (dday === 0) return "D-Day";
  return `D-${Math.abs(dday)}`;
};

export { formatKoreanDateTime, formatDdayLabel };
