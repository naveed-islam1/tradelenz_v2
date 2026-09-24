"use client";

import Link from "next/link";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Tooltip, Legend);

type ProgressView = "session" | "timeframe" | "trade-type";

type ProgressCardProps = {
  activeView: ProgressView;
};

const viewDetails = {
  session: {
    title: "Session Progress",
    description: "Review your trading performance by market session.",
    activeLabel: "Session",
    labels: ["Asian", "London", "New York"],
    performance: "London session is your strongest sample period.",
    selectedLabel: "London Session",
    selectedDetail: "Your sample session performance",
    trendLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    trendData: [36, 48, 42, 61, 58],
  },
  timeframe: {
    title: "Timeframe Progress",
    description: "Compare the sample results recorded across timeframes.",
    activeLabel: "Timeframe",
    labels: ["Scalp", "Intraday", "Swing"],
    performance: "Intraday trades lead this sample performance view.",
    selectedLabel: "Intraday",
    selectedDetail: "Your sample timeframe performance",
    trendLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    trendData: [29, 35, 51, 47, 64],
  },
  "trade-type": {
    title: "Trade Type Progress",
    description: "Compare the sample results for buy and sell positions.",
    activeLabel: "Trade Type",
    labels: ["Buy", "Sell"],
    performance: "Buy positions lead this sample performance view.",
    selectedLabel: "Buy",
    selectedDetail: "Your sample trade type performance",
    trendLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    trendData: [45, 39, 54, 59, 67],
  },
} as const;

const tabItems: { label: string; href: string; view: ProgressView }[] = [
  { label: "Session", href: "/progress-cards", view: "session" },
  { label: "Timeframe", href: "/progress-cards/timeframe", view: "timeframe" },
  { label: "Trade Type", href: "/progress-cards/trade-type", view: "trade-type" },
];

const groupRows = {
  session: [
    { label: "Asian", count: "8", wins: "3", losses: "4", winRate: "42.9%", tone: "text-[#f59e0b]" },
    { label: "London", count: "14", wins: "8", losses: "5", winRate: "61.5%", tone: "text-[#22c55e]" },
    { label: "New York", count: "10", wins: "5", losses: "4", winRate: "55.6%", tone: "text-[#38bdf8]" },
  ],
  timeframe: [
    { label: "Scalp", count: "9", wins: "4", losses: "4", winRate: "50.0%", tone: "text-[#f59e0b]" },
    { label: "Intraday", count: "15", wins: "9", losses: "5", winRate: "64.3%", tone: "text-[#22c55e]" },
    { label: "Swing", count: "8", wins: "3", losses: "4", winRate: "42.9%", tone: "text-[#38bdf8]" },
  ],
  "trade-type": [
    { label: "Buy", count: "18", wins: "10", losses: "7", winRate: "58.8%", tone: "text-[#22c55e]" },
    { label: "Sell", count: "14", wins: "6", losses: "6", winRate: "50.0%", tone: "text-[#f59e0b]" },
  ],
} as const;

const ProgressCards = ({ activeView }: ProgressCardProps) => {
  const detail = viewDetails[activeView];
  const rows = groupRows[activeView];
  const selected = rows[activeView === "session" ? 1 : 0];

  const comparisonData = {
    labels: [...detail.labels],
    datasets: [
      {
        label: "Win rate",
        data: rows.map((row) => Number.parseFloat(row.winRate)),
        backgroundColor: ["#f59e0b", "#22c55e", "#38bdf8"].slice(0, rows.length),
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 58,
      },
    ],
  };

  const trendData = {
    labels: [...detail.trendLabels],
    datasets: [
      {
        label: "Win rate",
        data: [...detail.trendData],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        fill: true,
        tension: 0.38,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 4,
        pointBackgroundColor: "#0d1627",
        pointBorderColor: "#22c55e",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <section className="min-h-screen bg-[#0d1627] px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">{detail.title}</h1>
              <span className="rounded-full border border-[#3d4c64] bg-[#202d44] px-2.5 py-1 text-[11px] font-medium text-[#94a3b8]">
                Sample data
              </span>
            </div>
            <p className="mt-1 text-sm leading-5 text-[#94a3b8]">{detail.description}</p>
          </div>
          <span className="inline-flex h-9 items-center justify-center rounded-lg border border-[#333f52] bg-[#202d44] px-4 text-xs font-medium text-[#e2ecf6]">
            All time
          </span>
        </header>

        <nav className="mt-7 flex w-fit items-center gap-1 rounded-xl border border-[#333f52] bg-[#172033] p-1" aria-label="Progress views">
          {tabItems.map((tab) => {
            const isActive = tab.view === activeView;
            return (
              <Link
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-gradient-to-r from-[#057854] to-[#21c45c] text-white shadow-[0_6px_16px_rgba(5,120,84,0.2)]" : "text-[#94a3b8] hover:bg-[#202d44] hover:text-[#e2ecf6]"
                }`}
                href={tab.href}
                key={tab.view}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Trades" value="32" detail="Sample total" />
          <MetricCard label="Wins" value="16" detail="Sample closed trades" tone="text-[#22c55e]" />
          <MetricCard label="Losses" value="13" detail="Sample closed trades" tone="text-[#f04545]" />
          <MetricCard label="Win Rate" value="55.2%" detail="Wins ÷ wins + losses" tone="text-[#22c55e]" />
          <MetricCard label="Performance Level" value="Developing" detail="Sample status" tone="text-[#f59e0b]" compact />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold leading-7">{detail.activeLabel} comparison</h2>
                <p className="mt-1 text-xs font-medium leading-4 text-[#94a3b8]">Win rate across each recorded category</p>
              </div>
              <span className="text-xs font-medium text-[#94a3b8]">Hover bars for detail</span>
            </div>
            <div className="mt-5 h-[266px]">
              <Bar aria-label={`${detail.activeLabel} win rate comparison`} data={comparisonData} options={comparisonOptions} />
            </div>
          </section>

          <section className="rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#94a3b8]">Best sample result</p>
            <h2 className="mt-2 text-xl font-semibold leading-7">{detail.selectedLabel}</h2>
            <p className="mt-1 text-sm leading-5 text-[#94a3b8]">{detail.selectedDetail}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <SmallMetric label="Trades" value={selected.count} />
              <SmallMetric label="Win rate" value={selected.winRate} tone="text-[#22c55e]" />
              <SmallMetric label="Wins" value={selected.wins} tone="text-[#22c55e]" />
              <SmallMetric label="Losses" value={selected.losses} tone="text-[#f04545]" />
            </div>

            <p className="mt-5 rounded-lg border border-[#33405a] bg-[#202d44] px-3 py-3 text-sm leading-5 text-[#b8c5d8]">{detail.performance}</p>
          </section>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[0.84fr_1.16fr]">
          <section className="overflow-hidden rounded-xl border border-[#333f52] bg-[#172033] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
            <div className="border-b border-[#333f52] px-5 py-4">
              <h2 className="text-xl font-semibold leading-7">Progress cards</h2>
              <p className="mt-1 text-xs font-medium leading-4 text-[#94a3b8]">Results by {detail.activeLabel.toLowerCase()}</p>
            </div>
            <div className="divide-y divide-[#333f52]">
              {rows.map((row) => (
                <article className="grid grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] items-center gap-2 px-5 py-4 text-sm" key={row.label}>
                  <span className="font-medium text-[#e2ecf6]">{row.label}</span>
                  <Stat label="Trades" value={row.count} />
                  <Stat label="Wins" value={row.wins} valueClass="text-[#22c55e]" />
                  <Stat label="Losses" value={row.losses} valueClass="text-[#f04545]" />
                  <Stat label="Rate" value={row.winRate} valueClass={row.tone} />
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold leading-7">Performance trend</h2>
                <p className="mt-1 text-xs font-medium leading-4 text-[#94a3b8]">Sample win rate trend for the current view</p>
              </div>
              <span className="text-xs font-medium text-[#94a3b8]">Hover points for detail</span>
            </div>
            <div className="mt-5 h-[244px]">
              <Line aria-label={`${detail.activeLabel} performance trend`} data={trendData} options={trendOptions} />
            </div>
          </section>
        </div>

        <p className="mt-4 text-xs leading-4 text-[#94a3b8]">Win rate counts wins divided by wins plus losses. Break-even trades are excluded from this denominator.</p>
      </div>
    </section>
  );
};

const chartFont = { family: "var(--font-fira-sans), Fira Sans, sans-serif" };

const sharedTooltip = {
  backgroundColor: "#172033",
  borderColor: "#4b5c76",
  borderWidth: 1,
  titleColor: "#e2ecf6",
  bodyColor: "#b8c5d8",
  padding: 10,
  displayColors: false,
  titleFont: { ...chartFont, weight: 600 },
  bodyFont: chartFont,
};

const comparisonOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 220 },
  plugins: {
    legend: { display: false },
    tooltip: {
      ...sharedTooltip,
      callbacks: { label: (context) => `Win rate: ${context.raw}%` },
    },
  },
  scales: {
    x: { grid: { display: false }, border: { display: false }, ticks: { color: "#94a3b8", font: { ...chartFont, size: 12, weight: 500 } } },
    y: {
      min: 0,
      max: 100,
      border: { display: false },
      ticks: { color: "#94a3b8", font: { ...chartFont, size: 11 }, callback: (value) => `${value}%` },
      grid: { color: "rgba(99, 115, 143, 0.18)", drawTicks: false },
    },
  },
};

const trendOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 220 },
  plugins: {
    legend: { display: false },
    tooltip: {
      ...sharedTooltip,
      callbacks: { label: (context) => `Win rate: ${context.raw}%` },
    },
  },
  scales: {
    x: { grid: { display: false }, border: { display: false }, ticks: { color: "#94a3b8", font: { ...chartFont, size: 12, weight: 500 } } },
    y: {
      min: 0,
      max: 100,
      border: { display: false },
      ticks: { color: "#94a3b8", font: { ...chartFont, size: 11 }, callback: (value) => `${value}%` },
      grid: { color: "rgba(99, 115, 143, 0.18)", drawTicks: false },
    },
  },
};

const MetricCard = ({ label, value, detail, tone = "text-[#e2ecf6]", compact = false }: { label: string; value: string; detail: string; tone?: string; compact?: boolean }) => (
  <article className="min-h-[118px] rounded-xl border border-[#333f52] bg-[#172033] p-[18px] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
    <p className="text-xs font-medium leading-4 text-[#94a3b8]">{label}</p>
    <p className={`mt-2 font-bold tracking-[-0.3px] ${compact ? "text-xl leading-7" : "text-[28px] leading-[34px]"} ${tone}`}>{value}</p>
    <p className="mt-2 text-xs font-medium leading-4 text-[#94a3b8]">{detail}</p>
  </article>
);

const SmallMetric = ({ label, value, tone = "text-[#e2ecf6]" }: { label: string; value: string; tone?: string }) => (
  <div className="rounded-lg border border-[#33405a] bg-[#202d44] p-3">
    <p className="text-[11px] font-medium text-[#94a3b8]">{label}</p>
    <p className={`mt-1 text-lg font-semibold ${tone}`}>{value}</p>
  </div>
);

const Stat = ({ label, value, valueClass = "text-[#e2ecf6]" }: { label: string; value: string; valueClass?: string }) => (
  <span className="min-w-0 text-center">
    <span className="block text-[10px] font-medium text-[#94a3b8]">{label}</span>
    <span className={`mt-1 block text-xs font-semibold ${valueClass}`}>{value}</span>
  </span>
);

export default ProgressCards;
