export const getExpiringSoonClassName = (calibDueDate: string) => {
  const today = new Date();
  let diffDays = 0;
  if (calibDueDate.length) {
    const [day, month, year] = calibDueDate.split("-");
    // JavaScript months are zero-based, so we subtract 1 from the month value
    const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
    const diff = (parsedDate?.getTime() || 0) - today.getTime();
    diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays <= 60) {
      return "bg-red-500";
    }
  }
  return "";
};