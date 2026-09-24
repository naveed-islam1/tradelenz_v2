export type TradeTone = "positive" | "negative" | "break-even";

export type Trade = {
  id: string;
  instrument: string;
  direction: "Buy" | "Sell";
  entry: string;
  exit: string;
  quantity: string;
  date: string;
  month: string;
  result: string;
  tone: TradeTone;
  strategy: string;
  session: string;
  timeframe: string;
  tradeType: string;
  confirmations: string[];
  notes: string;
  riskReward: string;
};

export const sampleTrades: Trade[] = [
  { id: "trade-01", instrument: "EURUSD", direction: "Buy", entry: "1.08642", exit: "1.08818", quantity: "0.20", date: "Sep 23, 2026", month: "September 2026", result: "+$124.50", tone: "positive", strategy: "Breakout", session: "London", timeframe: "H1", tradeType: "Intraday", confirmations: ["Session open", "Retest", "Risk defined"], notes: "Waited for the London open retest before entry. Exit followed the planned take-profit level and the trade remained within the original risk plan.", riskReward: "1 : 2.10" },
  { id: "trade-02", instrument: "XAUUSD", direction: "Sell", entry: "2,334.86", exit: "2,337.10", quantity: "0.10", date: "Sep 23, 2026", month: "September 2026", result: "−$42.00", tone: "negative", strategy: "Reversal", session: "New York", timeframe: "M15", tradeType: "Intraday", confirmations: ["Resistance marked", "Risk defined"], notes: "Entry was placed after the reversal confirmation. The protective stop was respected when price invalidated the setup.", riskReward: "1 : 1.40" },
  { id: "trade-03", instrument: "GBPUSD", direction: "Buy", entry: "1.29354", exit: "1.29354", quantity: "0.15", date: "Sep 22, 2026", month: "September 2026", result: "$0.00", tone: "break-even", strategy: "Breakout", session: "London", timeframe: "H1", tradeType: "Swing", confirmations: ["Trend aligned", "Risk defined"], notes: "Moved the stop to entry after the first target zone. Price returned to the entry level and closed flat.", riskReward: "1 : 1.80" },
  { id: "trade-04", instrument: "NAS100", direction: "Sell", entry: "19,488.2", exit: "19,432.6", quantity: "0.05", date: "Sep 21, 2026", month: "September 2026", result: "+$78.40", tone: "positive", strategy: "Momentum", session: "New York", timeframe: "M30", tradeType: "Intraday", confirmations: ["Momentum confirmed", "Session open"], notes: "The entry followed the confirmed momentum break during the New York session.", riskReward: "1 : 2.00" },
  { id: "trade-05", instrument: "USDJPY", direction: "Buy", entry: "146.184", exit: "146.032", quantity: "0.10", date: "Sep 19, 2026", month: "September 2026", result: "−$28.80", tone: "negative", strategy: "Pullback", session: "London", timeframe: "M15", tradeType: "Scalp", confirmations: ["Pullback confirmed"], notes: "The pullback did not hold the expected support area.", riskReward: "1 : 1.20" },
  { id: "trade-06", instrument: "EURUSD", direction: "Sell", entry: "1.08771", exit: "1.08698", quantity: "0.20", date: "Sep 18, 2026", month: "September 2026", result: "+$92.60", tone: "positive", strategy: "Breakout", session: "London", timeframe: "H1", tradeType: "Intraday", confirmations: ["Session open", "Breakout confirmed"], notes: "The sell setup followed a clean break beneath the London range.", riskReward: "1 : 2.30" },
  { id: "trade-07", instrument: "XAUUSD", direction: "Buy", entry: "2,318.42", exit: "2,316.10", quantity: "0.08", date: "Aug 29, 2026", month: "August 2026", result: "−$18.56", tone: "negative", strategy: "Reversal", session: "New York", timeframe: "M15", tradeType: "Intraday", confirmations: ["Support marked"], notes: "The reversal setup did not recover after the initial entry.", riskReward: "1 : 1.10" },
  { id: "trade-08", instrument: "GBPUSD", direction: "Sell", entry: "1.30416", exit: "1.30298", quantity: "0.12", date: "Aug 27, 2026", month: "August 2026", result: "+$56.80", tone: "positive", strategy: "Momentum", session: "London", timeframe: "M30", tradeType: "Swing", confirmations: ["Trend aligned", "Momentum confirmed"], notes: "The position followed continuation below the session resistance zone.", riskReward: "1 : 1.90" },
];

export const getTradeById = (id: string) => sampleTrades.find((trade) => trade.id === id);
