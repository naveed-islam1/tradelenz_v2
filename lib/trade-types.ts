export type Strategy = {
  id: string;
  name: string;
};

export type TradeCreateInput = {
  date_open: string;
  date_close: string | null;
  pair: string;
  type: "buy" | "sell";
  entry: number;
  exit: number;
  stop_loss: number;
  take_profit: number;
  lot_size: number;
  result: number | null;
  strategy: string | null;
  strategy_id: string | null;
  timeframe: string;
  session: string | null;
  tradetype: string | null;
  emotion: string | null;
  notes: string | null;
  confirmations: string[];
};

export type CsvTradeImportInput = {
  pair: string;
  type: string;
  lot_size: number;
  entry: number;
  exit: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  date_open: string;
  date_close: string | null;
  result: number | null;
};

export type TradeRecord = TradeCreateInput & {
  id: string;
  date_open: string;
  pair: string;
  type: "buy" | "sell";
  entry: number;
  exit: number;
  stop_loss: number;
  take_profit: number;
  lot_size: number;
  timeframe: string;
  confirmations: string[];
};
