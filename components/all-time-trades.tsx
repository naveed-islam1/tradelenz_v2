"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import DeleteTradeModal from "@/components/delete-trade-modal";
import { sampleTrades, type Trade } from "@/lib/trade-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const pageSize = 6;

const toneStyles = {
  positive: { result: "text-[#22c55e]", surface: "border-[#245b46] bg-[#163a30]" },
  negative: { result: "text-[#f04545]", surface: "border-[#61343c] bg-[#351f29]" },
  "break-even": { result: "text-[#f59e0b]", surface: "border-[#6a5223] bg-[#3d3014]" },
};

const AllTimeTrades = () => {
  const [trades, setTrades] = useState(sampleTrades);
  const [month, setMonth] = useState("All months");
  const [page, setPage] = useState(1);
  const [tradePendingDelete, setTradePendingDelete] = useState<Trade | null>(null);

  const filteredTrades = useMemo(
    () => (month === "All months" ? trades : trades.filter((trade) => trade.month === month)),
    [month, trades],
  );
  const totalPages = Math.max(1, Math.ceil(filteredTrades.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleTrades = filteredTrades.slice((safePage - 1) * pageSize, safePage * pageSize);

  const changeMonth = (value: string) => {
    setMonth(value);
    setPage(1);
  };

  const confirmDelete = () => {
    if (!tradePendingDelete) return;
    setTrades((current) => current.filter((trade) => trade.id !== tradePendingDelete.id));
    setTradePendingDelete(null);
  };

  return (
    <section className="min-h-screen bg-[#0d1627] px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">All Time Trades</h1>
              <span className="rounded-full border border-[#3d4c64] bg-[#202d44] px-2.5 py-1 text-[11px] font-medium text-[#94a3b8]">Sample data</span>
            </div>
            <p className="mt-1 text-sm leading-5 text-[#94a3b8]">Review every trade in your journal history.</p>
          </div>

          <Select onValueChange={(nextValue) => nextValue && changeMonth(nextValue)} value={month}>
            <SelectTrigger aria-label="Filter by month and year" className="h-11 min-w-[210px] border-[#333f52] bg-[#202d44] px-3 text-sm text-[#e2ecf6] hover:bg-[#263650] focus-visible:border-[#22c55e] focus-visible:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#3a4a64] bg-[#172033] text-[#e2ecf6]">
              <SelectItem className="text-[#e2ecf6] focus:bg-[#202d44] focus:text-[#e2ecf6]" value="All months">All months and years</SelectItem>
              <SelectItem className="text-[#e2ecf6] focus:bg-[#202d44] focus:text-[#e2ecf6]" value="September 2026">September 2026</SelectItem>
              <SelectItem className="text-[#e2ecf6] focus:bg-[#202d44] focus:text-[#e2ecf6]" value="August 2026">August 2026</SelectItem>
            </SelectContent>
          </Select>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Trades" value="48" detail="Sample journal entries" />
          <SummaryCard label="Net P&L" value="+$1,240" detail="Sample realized result" tone="text-[#22c55e]" />
          <SummaryCard label="Win Rate" value="62.5%" detail="Sample closed trades" tone="text-[#22c55e]" />
          <SummaryCard label="Break-even" value="4" detail="Sample journal entries" tone="text-[#f59e0b]" />
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold leading-7">Trade history</h2>
            <p className="mt-1 text-sm leading-5 text-[#94a3b8]">
              {month === "All months" ? "Showing all available sample trades" : `Filtered by ${month}`}
            </p>
          </div>
          {month !== "All months" && (
            <button
              className="h-10 rounded-lg border border-[#3c4d67] bg-[#202d44] px-4 text-xs font-medium text-[#e2ecf6] transition hover:bg-[#2b3b57]"
              onClick={() => changeMonth("All months")}
              type="button"
            >
              Clear filter
            </button>
          )}
        </div>

        {visibleTrades.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleTrades.map((trade) => (
              <TradeCard key={trade.id} onDelete={() => setTradePendingDelete(trade)} trade={trade} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-[#41506a] bg-[#172033] px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-[#e2ecf6]">No trades found</h3>
            <p className="mt-2 text-sm text-[#94a3b8]">No sample trades match the selected month and year.</p>
          </div>
        )}

        <DeleteTradeModal
          onConfirm={confirmDelete}
          onOpenChange={(open) => !open && setTradePendingDelete(null)}
          open={Boolean(tradePendingDelete)}
          trade={tradePendingDelete}
        />

        {filteredTrades.length > pageSize && (
          <nav className="mt-7 flex items-center justify-center gap-2" aria-label="Trade history pagination">
            <PaginationButton disabled={safePage === 1} label="Previous" onClick={() => setPage((current) => Math.max(1, current - 1))} />
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                aria-current={safePage === pageNumber ? "page" : undefined}
                className={`grid size-9 place-items-center rounded-lg text-xs font-medium transition ${
                  safePage === pageNumber ? "bg-gradient-to-r from-[#057854] to-[#21c45c] text-white" : "border border-[#333f52] bg-[#202d44] text-[#94a3b8] hover:text-[#e2ecf6]"
                }`}
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                type="button"
              >
                {pageNumber}
              </button>
            ))}
            <PaginationButton disabled={safePage === totalPages} label="Next" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} />
          </nav>
        )}
      </div>
    </section>
  );
};

const SummaryCard = ({ label, value, detail, tone = "text-[#e2ecf6]" }: { label: string; value: string; detail: string; tone?: string }) => (
  <article className="min-h-[118px] rounded-xl border border-[#333f52] bg-[#172033] p-[18px] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
    <p className="text-xs font-medium leading-4 text-[#94a3b8]">{label}</p>
    <p className={`mt-2 text-[28px] font-bold leading-[34px] tracking-[-0.3px] ${tone}`}>{value}</p>
    <p className="mt-2 text-xs font-medium leading-4 text-[#94a3b8]">{detail}</p>
  </article>
);

const TradeCard = ({ trade, onDelete }: { trade: Trade; onDelete: () => void }) => {
  const style = toneStyles[trade.tone];

  return (
    <article className="rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${trade.direction === "Buy" ? "bg-[#1c8f3a] text-white" : "bg-[#b01e26] text-white"}`}>{trade.direction}</span>
            <span className="text-xs font-medium text-[#94a3b8]">Closed</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold leading-7">{trade.instrument}</h3>
          <p className="mt-1 text-xs font-medium leading-4 text-[#94a3b8]">{trade.date}</p>
        </div>
        <button className="text-xs font-medium text-[#94a3b8] transition hover:text-[#f04545]" onClick={onDelete} type="button">Delete</button>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        <Detail label="Entry" value={trade.entry} />
        <Detail label="Exit" value={trade.exit} />
        <Detail label="Quantity" value={trade.quantity} />
        <Detail label="Date" value={trade.date} />
      </dl>

      <div className={`mt-4 rounded-lg border px-4 py-3 ${style.surface}`}>
        <p className="text-[11px] font-medium text-[#94a3b8]">Profit / Loss</p>
        <p className={`mt-1 text-2xl font-bold leading-7 ${style.result}`}>{trade.result}</p>
      </div>

      <Link className="mt-4 inline-flex text-xs font-medium text-[#38bdf8] transition hover:text-[#7dd3fc]" href={`/trade/${trade.id}`}>
        View details
      </Link>
    </article>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-[#202d44] px-3 py-2.5">
    <dt className="text-[10px] font-medium text-[#94a3b8]">{label}</dt>
    <dd className="mt-1 text-sm font-semibold text-[#e2ecf6]">{value}</dd>
  </div>
);

const PaginationButton = ({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) => (
  <button
    className="h-9 rounded-lg border border-[#333f52] bg-[#202d44] px-3 text-xs font-medium text-[#e2ecf6] transition disabled:cursor-not-allowed disabled:opacity-40"
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);

export default AllTimeTrades;
