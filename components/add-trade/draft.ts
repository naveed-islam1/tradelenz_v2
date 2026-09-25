export type TradeDraft = {
  openDate: string;
  closeDate: string;
  instrument: string;
  direction: "Buy" | "Sell";
  entryPrice: string;
  exitPrice: string;
  stopLoss: string;
  takeProfit: string;
  lotSize: string;
  strategy: string;
  strategyId: string;
  timeframe: string;
  result: string;
  emotion: string;
  session: string;
  tradeType: string;
  notes: string;
  confirmations: string[];
};

export type TradeDraftChangeHandler = <Key extends keyof TradeDraft>(
  key: Key,
  value: TradeDraft[Key],
) => void;

export const initialTradeDraft: TradeDraft = {
  openDate: "",
  closeDate: "",
  instrument: "",
  direction: "Buy",
  entryPrice: "",
  exitPrice: "",
  stopLoss: "",
  takeProfit: "",
  lotSize: "",
  strategy: "",
  strategyId: "",
  timeframe: "",
  result: "",
  emotion: "",
  session: "",
  tradeType: "",
  notes: "",
  confirmations: [],
};
