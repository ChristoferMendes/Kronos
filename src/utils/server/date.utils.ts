import dayjs from "dayjs";

export function getVideoDateFormat() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}