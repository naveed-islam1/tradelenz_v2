"use client";

import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { getTradeOutcome } from "@/lib/trade-outcome";
import { useGetTradeByIdQuery } from "@/lib/trades-api";

const DetailTile = ({ label, value }: { label: string; value: string }) => (
  <div className="flex h-[68px] min-w-0 flex-col gap-[5px] rounded-lg bg-[#1e293d] p-3">
    <p className="text-xs font-medium leading-4 text-[#94a3b8]">{label}</p>
    <p className="truncate text-sm leading-5 text-[#e2ecf6]">{value || "—"}</p>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)] ${className}`}>{children}</section>
);

const toNumber = (value: number | string | null) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatNumber = (value: number | string | null) => {
  const parsed = toNumber(value);
  return parsed === null ? "—" : parsed.toLocaleString("en-US", { maximumFractionDigits: 5 });
};

const formatResult = (value: number | string | null) => {
  const parsed = toNumber(value);
  if (parsed === null) return "—";
  if (parsed === 0) return "$0.00";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "always" }).format(parsed);
};

const formatDate = (value: string | null) => (value ? dayjs(value).format("MMM D, YYYY · h:mm A") : "—");

const TradeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: trade, error, isError, isLoading } = useGetTradeByIdQuery(id, { skip: !id });

  if (isLoading) {
    return <section className="min-h-screen bg-[#0f172a] px-5 py-8 text-[#e2ecf6] sm:px-8 lg:px-10 lg:py-10"><div className="mx-auto h-100 max-w-[1120px] animate-pulse rounded-xl border border-[#333f52] bg-[#172033]" /></section>;
  }

  if (isError || !trade) {
    return <section className="min-h-screen bg-[#0f172a] px-5 py-8 text-[#e2ecf6] sm:px-8 lg:px-10 lg:py-10"><div className="mx-auto max-w-[1120px] rounded-xl border border-[#333f52] bg-[#172033] p-6"><h1 className="text-xl font-semibold leading-7">Trade not found</h1><p className="mt-2 text-sm leading-5 text-[#94a3b8]">{(error as { message?: string } | undefined)?.message || "This trade is no longer available in the journal."}</p></div></section>;
  }

  const entry = toNumber(trade.entry);
  const stopLoss = toNumber(trade.stop_loss);
  const takeProfit = toNumber(trade.take_profit);
  const riskReward = entry !== null && stopLoss !== null && takeProfit !== null && entry !== stopLoss
    ? `${(Math.abs(takeProfit - entry) / Math.abs(entry - stopLoss)).toFixed(2)}:1`
    : "—";
  const priceDetails = [
    { label: "Entry", value: formatNumber(trade.entry) },
    { label: "Exit", value: formatNumber(trade.exit) },
    { label: "Quantity", value: formatNumber(trade.lot_size) },
  ];
  const contextDetails = [
    { label: "Strategy", value: trade.strategy || "—" },
    { label: "Session", value: trade.session || "—" },
    { label: "Timeframe", value: trade.timeframe || "—" },
    { label: "Trade Type", value: trade.tradetype || "—" },
  ];
  const outcome = getTradeOutcome(trade.result);
  const resultTone = outcome === "win" ? "text-[#22c55e]" : outcome === "loss" ? "text-[#f04545]" : "text-[#f59e0b]";
  const direction = trade.type?.toUpperCase() === "SELL" ? "SELL" : "BUY";
  const directionTone = direction === "BUY" ? "bg-[#22c55e] text-[#0d1627]" : "bg-[#f04545] text-white";

  return (
    <section className="min-h-screen bg-[#0f172a] px-5 py-8 text-[#e2ecf6] sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6">
        <header className="flex min-h-14 flex-wrap items-center justify-between gap-4">
          <div><h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">Trade Detail</h1><p className="mt-[5px] text-sm leading-5 text-[#94a3b8]">Review the complete record for this closed trade.</p></div>
          <span className="inline-flex h-7 items-center rounded-full bg-[#1e293d] px-4 text-xs font-medium leading-4 text-[#e2ecf6]">Closed</span>
        </header>

        <Card className="grid gap-6 xl:grid-cols-[minmax(0,640px)_416px]">
          <div className="min-w-0">
            <div className="flex min-h-[100px] items-start gap-2"><span className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-medium leading-4 ${directionTone}`}>{direction}</span><h2 className="text-xl font-semibold leading-7">{trade.pair || "Instrument unavailable"}</h2></div>
            <p className="text-sm leading-5 text-[#94a3b8]">Opened {formatDate(trade.date_open)} · Closed {formatDate(trade.date_close)}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">{priceDetails.map((detail) => <DetailTile key={detail.label} {...detail} />)}</div>
          </div>
          <div className="flex h-[164px] flex-col gap-2 rounded-[10px] border border-[#333f52] bg-[#1e293d] p-4"><p className="text-xs font-medium leading-4 text-[#94a3b8]">Profit / Loss</p><p className={`text-[28px] font-bold leading-[34px] tracking-[-0.3px] ${resultTone}`}>{formatResult(trade.result)}</p><p className="text-sm leading-5 text-[#94a3b8]">Realized result</p></div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card><h2 className="text-xl font-semibold leading-7">Trade context</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{contextDetails.map((detail) => <DetailTile key={detail.label} {...detail} />)}</div></Card>
          <Card><h2 className="text-xl font-semibold leading-7">Risk / Reward</h2><div className="mt-4 flex h-[52px] items-center justify-between gap-4"><p className="text-sm leading-5 text-[#94a3b8]">Price-distance ratio</p><p className="whitespace-nowrap text-[28px] font-bold leading-[34px] tracking-[-0.3px] text-[#38bdf7]">{riskReward}</p></div><p className="mt-4 text-sm leading-5 text-[#94a3b8]">Calculated from the recorded entry, stop loss, and take profit prices.</p></Card>
        </div>

        <Card><h2 className="text-xl font-semibold leading-7">Confirmations</h2><p className="mt-4 text-sm leading-5 text-[#94a3b8]">Trade checks recorded before entry.</p><div className="mt-4 flex min-h-7 flex-wrap items-start gap-2">{trade.confirmations?.length ? trade.confirmations.map((confirmation) => <span className="inline-flex h-7 items-center rounded-full bg-[#1e293d] px-3 text-xs font-medium leading-4 text-[#e2ecf6]" key={confirmation}>{confirmation}</span>) : <p className="text-sm text-[#94a3b8]">No confirmations recorded.</p>}</div></Card>
        <Card><h2 className="text-xl font-semibold leading-7">Notes</h2><div className="mt-4 min-h-[104px] rounded-lg border border-[#333f52] bg-[#1e293d] p-4"><p className="text-sm leading-5 text-[#e2ecf6]">{trade.notes || "No notes recorded."}</p></div></Card>
      </div>
    </section>
  );
};

export default TradeDetails;
