export const getTradeOutcome = (result: number | string | null | undefined) => {
  const profit = Number(result);
  if (profit > 10) return "win";
  if (profit < -10) return "loss";
  return "breakEven";
};
