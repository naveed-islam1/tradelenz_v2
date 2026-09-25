import { getTradeOutcome } from "@/lib/trade-outcome";

export interface TradeResultInput {
  result: unknown;
}

export interface TradeAccuracyMetrics {
  accuracy: number | null;
  averageRiskReward: number | null;
  averageWin: number | null;
  averageLoss: number | null;
  winCount: number;
  lossCount: number;
}

const toFiniteNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;

  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
};

export const getTradeAccuracyMetrics = (
  trades: TradeResultInput[],
): TradeAccuracyMetrics => {
  const results = trades
    .map((trade) => toFiniteNumber(trade.result))
    .filter((result): result is number => result !== null);

  const wins = results.filter((result) => getTradeOutcome(result) === "win");
  const losses = results.filter((result) => getTradeOutcome(result) === "loss");
  const averageWin =
    wins.length > 0
      ? wins.reduce((sum, result) => sum + result, 0) / wins.length
      : null;
  const averageLoss =
    losses.length > 0
      ? Math.abs(losses.reduce((sum, result) => sum + result, 0) / losses.length)
      : null;
  const averageRiskReward =
    averageWin !== null && averageLoss !== null && averageLoss > 0
      ? averageWin / averageLoss
      : null;

  return {
    accuracy:
      averageRiskReward === null ? null : (averageRiskReward / 2) * 100,
    averageRiskReward,
    averageWin,
    averageLoss,
    winCount: wins.length,
    lossCount: losses.length,
  };
};
