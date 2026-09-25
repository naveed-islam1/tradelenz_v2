import dayjs from "dayjs";

export const displayNumber = (value: unknown) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

export const formatResult = (value: unknown) => {
  const number = displayNumber(value);
  if (number === 0) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
  }).format(number);
};

export const formatTradeDate = (value: string | null) =>
  value ? dayjs(value).format("MMM D, YYYY") : null;
