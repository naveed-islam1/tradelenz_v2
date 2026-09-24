"use client";

import { useParams } from "next/navigation";

import { getTradeById } from "@/lib/trade-data";

const DetailTile = ({ label, value }: { label: string; value: string }) => (
  <div className="flex h-[68px] min-w-0 flex-col gap-[5px] rounded-lg bg-[#1e293d] p-3">
    <p className="text-xs font-medium leading-4 text-[#94a3b8]">{label}</p>
    <p className="truncate text-sm leading-5 text-[#e2ecf6]">{value}</p>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)] ${className}`}>
    {children}
  </section>
);

const TradeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const trade = getTradeById(id);

  if (!trade) {
    return (
      <section className="min-h-screen bg-[#0f172a] px-5 py-8 text-[#e2ecf6] sm:px-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1120px] rounded-xl border border-[#333f52] bg-[#172033] p-6">
          <h1 className="text-xl font-semibold leading-7">Trade not found</h1>
          <p className="mt-2 text-sm leading-5 text-[#94a3b8]">This trade is no longer available in the journal.</p>
        </div>
      </section>
    );
  }

  const priceDetails = [
    { label: "Entry", value: trade.entry },
    { label: "Exit", value: trade.exit },
    { label: "Quantity", value: trade.quantity },
  ];
  const contextDetails = [
    { label: "Strategy", value: trade.strategy },
    { label: "Session", value: trade.session },
    { label: "Timeframe", value: trade.timeframe },
    { label: "Trade Type", value: trade.tradeType },
  ];
  const resultTone = trade.tone === "positive" ? "text-[#22c55e]" : trade.tone === "negative" ? "text-[#f04545]" : "text-[#f59e0b]";
  const directionTone = trade.direction === "Buy" ? "bg-[#22c55e]" : "bg-[#f04545]";

  return (
    <section className="min-h-screen bg-[#0f172a] px-5 py-8 text-[#e2ecf6] sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-6">
        <header className="flex min-h-14 flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">Trade Detail</h1>
            <p className="mt-[5px] text-sm leading-5 text-[#94a3b8]">Review the complete record for this closed trade.</p>
          </div>
          <span className="inline-flex h-7 items-center rounded-full bg-[#1e293d] px-4 text-xs font-medium leading-4 text-[#e2ecf6]">Closed</span>
        </header>

        <Card className="grid gap-6 xl:grid-cols-[minmax(0,640px)_416px]">
          <div className="min-w-0">
            <div className="flex min-h-[100px] items-start gap-2">
              <span className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-medium leading-4 text-[#e2ecf6] ${directionTone}`}>{trade.direction.toUpperCase()}</span>
              <h2 className="text-xl font-semibold leading-7">{trade.instrument}</h2>
            </div>
            <p className="text-sm leading-5 text-[#94a3b8]">Opened {trade.date} · Closed {trade.date}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {priceDetails.map((detail) => <DetailTile key={detail.label} {...detail} />)}
            </div>
          </div>

          <div className="flex h-[164px] flex-col gap-2 rounded-[10px] border border-[#333f52] bg-[#1e293d] p-4">
            <p className="text-xs font-medium leading-4 text-[#94a3b8]">Profit / Loss</p>
            <p className={`text-[28px] font-bold leading-[34px] tracking-[-0.3px] ${resultTone}`}>{trade.result}</p>
            <p className="text-sm leading-5 text-[#94a3b8]">Realized result</p>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold leading-7">Trade context</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {contextDetails.map((detail) => <DetailTile key={detail.label} {...detail} />)}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold leading-7">Risk / Reward</h2>
            <div className="mt-4 flex h-[52px] items-center justify-between gap-4">
              <p className="text-sm leading-5 text-[#94a3b8]">Recorded ratio</p>
              <p className="whitespace-nowrap text-[28px] font-bold leading-[34px] tracking-[-0.3px] text-[#38bdf7]">{trade.riskReward}</p>
            </div>
            <p className="mt-4 text-sm leading-5 text-[#94a3b8]">Risk / reward is shown as recorded for this trade.</p>
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-semibold leading-7">Confirmations</h2>
          <p className="mt-4 text-sm leading-5 text-[#94a3b8]">Trade checks recorded before entry.</p>
          <div className="mt-4 flex min-h-7 flex-wrap items-start gap-2">
            {trade.confirmations.map((confirmation) => (
              <span className="inline-flex h-7 items-center rounded-full bg-[#1e293d] px-3 text-xs font-medium leading-4 text-[#e2ecf6]" key={confirmation}>{confirmation}</span>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold leading-7">Notes</h2>
          <div className="mt-4 min-h-[104px] rounded-lg border border-[#333f52] bg-[#1e293d] p-4">
            <p className="text-sm leading-5 text-[#e2ecf6]">{trade.notes}</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TradeDetails;
