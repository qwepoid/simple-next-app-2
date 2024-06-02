import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const getExpiringSoonClassName = (calibDueDate: string) => {
  const today = new Date();
  dayjs.extend(customParseFormat);

  if (calibDueDate.length) {
    const receivedDate = dayjs(calibDueDate, "DD-MM-YYYY");
    const diffDays = receivedDate.diff(dayjs(today), "day");

    if (diffDays <= 60) {
      return "bg-red-500";
    }
  }
  return "";
};
