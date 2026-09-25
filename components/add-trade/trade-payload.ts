import dayjs from "dayjs";

import type { TradeDraft } from "@/components/add-trade/draft";
import type { TradeCreateInput } from "@/lib/trade-types";

const normalizeDate = (value: string) => {
  if (!value) return null;
  const date = dayjs(value);
  return date.isValid() ? date.toISOString() : null;
};

const toOptionalNumber = (value: string) =>
  value.trim() ? Number(value) : null;

const toOptionalText = (value: string) =>
  value.trim() ? value.trim() : null;

export const getTradeValidationError = (draft: TradeDraft) => {
  if (!draft.instrument.trim() || !draft.openDate) {
    return "Add the required instrument and open date before saving.";
  }

  const requiredNumbers = [
    ["entry price", draft.entryPrice],
    ["exit price", draft.exitPrice],
    ["stop loss", draft.stopLoss],
    ["take profit", draft.takeProfit],
    ["lot size", draft.lotSize],
  ] as const;
  const missingNumber = requiredNumbers.find(([, value]) => !value.trim());

  if (missingNumber) {
    return `Add the required ${missingNumber[0]} before saving.`;
  }

  if (requiredNumbers.some(([, value]) => !Number.isFinite(Number(value)))) {
    return "Price and lot size values must be valid numbers.";
  }

  if (draft.result.trim() && !Number.isFinite(Number(draft.result))) {
    return "Result must be a valid number.";
  }

  if (!draft.timeframe) return "Select a timeframe before saving.";
  if (!normalizeDate(draft.openDate)) return "Enter a valid open date.";
  if (draft.closeDate && !normalizeDate(draft.closeDate)) {
    return "Enter a valid close date.";
  }

  return null;
};

export const buildTradeCreateInput = (
  draft: TradeDraft,
): TradeCreateInput => ({
  date_open: normalizeDate(draft.openDate) ?? "",
  date_close: normalizeDate(draft.closeDate),
  pair: draft.instrument.trim(),
  type: draft.direction === "Buy" ? "buy" : "sell",
  entry: Number(draft.entryPrice),
  exit: Number(draft.exitPrice),
  stop_loss: Number(draft.stopLoss),
  take_profit: Number(draft.takeProfit),
  lot_size: Number(draft.lotSize),
  result: toOptionalNumber(draft.result),
  strategy: toOptionalText(draft.strategy),
  strategy_id: toOptionalText(draft.strategyId),
  timeframe: draft.timeframe,
  session: toOptionalText(draft.session),
  tradetype: toOptionalText(draft.tradeType),
  emotion: toOptionalText(draft.emotion),
  notes: toOptionalText(draft.notes),
  confirmations: [...draft.confirmations],
});
