"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type FilterState = {
  date: string;
  pair: string;
  tradeType: string;
};

type Trade = {
  id: string;
  pair: string;
  direction: "BUY" | "SELL";
  openedAt: string;
  result: string;
  tone: "positive" | "negative" | "warning";
};

const initialTrades: Trade[] = [
  {
    id: "eurusd",
    pair: "EURUSD",
    direction: "BUY",
    openedAt: "Open · Sep 23, 2026",
    result: "+$124.50",
    tone: "positive",
  },
  {
    id: "xauusd",
    pair: "XAUUSD",
    direction: "SELL",
    openedAt: "Open · Sep 23, 2026",
    result: "−$42.00",
    tone: "negative",
  },
  {
    id: "gbpusd",
    pair: "GBPUSD",
    direction: "BUY",
    openedAt: "Open · Sep 23, 2026",
    result: "$0.00",
    tone: "warning",
  },
];

const metrics = [
  { label: "Total Trades", value: "48", icon: "/dashboard-icons/activity.svg", tone: "default" },
  { label: "P&L", value: "+$1,240", icon: "/dashboard-icons/circle-dollar.svg", tone: "positive" },
  { label: "Win Rate", value: "62.5%", icon: "/dashboard-icons/percent.svg", tone: "default" },
  { label: "Break-even", value: "4", icon: "/dashboard-icons/equal.svg", tone: "warning" },
  { label: "Average Return", value: "+$25.83", icon: "/dashboard-icons/trending-up.svg", tone: "positive" },
  { label: "Accuracy", value: "58%", icon: "/dashboard-icons/target.svg", tone: "info" },
] as const;

const resultColors = {
  positive: "text-[#22c55e]",
  negative: "text-[#f04545]",
  warning: "text-[#f59e0b]",
};

const resultPills = {
  BUY: "bg-[#22c55e] text-[#0d1627]",
  SELL: "bg-[#f04545] text-[#0d1627]",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterState>({
    date: "This week",
    pair: "All pairs",
    tradeType: "All types",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [trades, setTrades] = useState(initialTrades);

  const sectionTitle = useMemo(
    () => (appliedFilters.date === "This week" ? "This week’s trades" : `${appliedFilters.date} trades`),
    [appliedFilters.date],
  );

  const clearFilters = () => {
    const resetFilters = { date: "This week", pair: "All pairs", tradeType: "All types" };
    setFilters(resetFilters);
    setAppliedFilters(resetFilters);
  };

  return (
    <section className="min-h-screen bg-[#0d1627] px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-12" id="dashboard">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7">
          <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">Dashboard</h1>
          <p className="mt-1 text-sm leading-5 text-[#94a3b8]">
            View your trading performance and detailed trade history
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {metrics.map((metric) => {
            const valueClass =
              metric.tone === "positive"
                ? "text-[#22c55e]"
                : metric.tone === "warning"
                  ? "text-[#f59e0b]"
                  : metric.tone === "info"
                    ? "text-[#38bdf8]"
                    : "text-[#e2ecf6]";
            const iconSurface =
              metric.tone === "positive"
                ? "bg-[#1c3b30]"
                : metric.tone === "warning"
                  ? "bg-[#3d3014]"
                  : "bg-[#24334f]";

            return (
              <article
                className="rounded-xl border border-[#333f52] bg-[#172033] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
                key={metric.label}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium leading-4 text-[#94a3b8]">{metric.label}</p>
                  <span className={`grid size-7 place-items-center rounded-lg ${iconSurface}`}>
                    <Image alt="" height={20} src={metric.icon} width={20} />
                  </span>
                </div>
                <p className={`mt-2 text-[28px] font-bold leading-[34px] tracking-[-0.3px] ${valueClass}`}>
                  {metric.value}
                </p>
              </article>
            );
          })}
        </div>

        <section className="mt-7" aria-labelledby="trade-filters-heading">
          <h2 className="text-xl font-semibold leading-7" id="trade-filters-heading">
            {sectionTitle}
          </h2>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <FilterSelect
              label="Date"
              onChange={(value) => setFilters((current) => ({ ...current, date: value }))}
              options={["This week", "This month", "All time"]}
              value={filters.date}
            />
            <FilterSelect
              label="Pair"
              onChange={(value) => setFilters((current) => ({ ...current, pair: value }))}
              options={["All pairs", "EURUSD", "XAUUSD", "GBPUSD"]}
              value={filters.pair}
            />
            <FilterSelect
              label="Trade type"
              onChange={(value) => setFilters((current) => ({ ...current, tradeType: value }))}
              options={["All types", "BUY", "SELL"]}
              value={filters.tradeType}
            />
            <button
              className="h-10 rounded-lg bg-gradient-to-r from-[#057854] to-[#21c45c] px-[18px] text-sm font-medium text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] transition hover:brightness-110"
              onClick={() => setAppliedFilters(filters)}
              type="button"
            >
              Apply
            </button>
            <button
              className="h-10 rounded-lg border border-[#333f52] bg-gradient-to-r from-[#1a2a43] to-[#2d4f7d] px-[14px] text-sm font-medium text-white transition hover:brightness-110"
              onClick={clearFilters}
              type="button"
            >
              Clear filters
            </button>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="recent-trades-heading">
          <h2 className="text-xl font-semibold leading-7" id="recent-trades-heading">
            Recent trades
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {trades.map((trade) => (
              <article
                className="rounded-xl border border-[#333f52] bg-[#172033] p-[18px] shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
                key={trade.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-[5px] text-xs font-medium leading-4 ${resultPills[trade.direction]}`}>
                    {trade.direction}
                  </span>
                  <button
                    className="text-xs font-medium text-[#94a3b8] transition hover:text-[#f04545]"
                    onClick={() => setTrades((current) => current.filter((item) => item.id !== trade.id))}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-7">{trade.pair}</h3>
                <p className="mt-1 text-sm leading-5 text-[#94a3b8]">{trade.openedAt}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className={`text-[28px] font-bold leading-[34px] tracking-[-0.3px] ${resultColors[trade.tone]}`}>
                    {trade.result}
                  </p>
                  <a className="text-xs font-medium text-[#38bdf8] hover:text-[#7dd3fc]" href={`#${trade.id}`}>
                    Open details
                  </a>
                </div>
              </article>
            ))}
          </div>
          {trades.length === 0 && (
            <p className="mt-4 rounded-xl border border-dashed border-[#333f52] p-6 text-sm text-[#94a3b8]">
              No recent trades match the current view.
            </p>
          )}
        </section>
      </div>
    </section>
  );
};

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const FilterSelect = ({ label, value, options, onChange }: FilterSelectProps) => (
  <label className="flex h-14 w-[210px] flex-col gap-1 rounded-lg border border-[#333f52] bg-[#202d44] px-3 py-2">
    <span className="text-xs font-medium leading-4 text-[#94a3b8]">{label}</span>
    <select
      className="-mx-1 w-[calc(100%+0.5rem)] appearance-none bg-transparent px-1 text-sm leading-5 text-[#e2ecf6] outline-none"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option className="bg-[#172033]" key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

export default Dashboard;
