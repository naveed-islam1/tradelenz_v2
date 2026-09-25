import Image from "next/image";
import { useMemo } from "react";

import {
  displayNumber,
  formatResult,
} from "@/components/dashboard/formatters";
import { getTradeAccuracyMetrics } from "@/lib/trade-accuracy";
import { getTradeOutcome } from "@/lib/trade-outcome";
import type { TradeRecord } from "@/lib/trade-types";

type MetricTone = "default" | "positive" | "warning" | "info";

type DashboardMetric = {
  label: string;
  icon: string;
  tone: MetricTone;
  value: string;
};

const metricDefinitions: Omit<DashboardMetric, "value">[] = [
  {
    label: "Total Trades",
    icon: "/dashboard-icons/activity.svg",
    tone: "default",
  },
  {
    label: "P&L",
    icon: "/dashboard-icons/circle-dollar.svg",
    tone: "positive",
  },
  { label: "Win Rate", icon: "/dashboard-icons/percent.svg", tone: "default" },
  {
    label: "Break-even",
    icon: "/dashboard-icons/equal.svg",
    tone: "warning",
  },
  {
    label: "Average Return",
    icon: "/dashboard-icons/trending-up.svg",
    tone: "positive",
  },
  {
    label: "Accuracy",
    icon: "/dashboard-icons/target.svg",
    tone: "info",
  },
];

const toneStyles: Record<
  MetricTone,
  { iconSurface: string; valueColor: string }
> = {
  default: {
    iconSurface: "bg-[#24334f]",
    valueColor: "text-[#e2ecf6]",
  },
  positive: {
    iconSurface: "bg-[#1c3b30]",
    valueColor: "text-[#22c55e]",
  },
  warning: {
    iconSurface: "bg-[#3d3014]",
    valueColor: "text-[#f59e0b]",
  },
  info: {
    iconSurface: "bg-[#24334f]",
    valueColor: "text-[#38bdf8]",
  },
};

type DashboardMetricsProps = {
  isLoading: boolean;
  trades: TradeRecord[];
};

const DashboardMetrics = ({ isLoading, trades }: DashboardMetricsProps) => {
  const metrics = useMemo<DashboardMetric[]>(() => {
    const outcomes = trades.map((trade) => getTradeOutcome(trade.result));
    const wins = outcomes.filter((outcome) => outcome === "win").length;
    const losses = outcomes.filter((outcome) => outcome === "loss").length;
    const breakEven = outcomes.filter(
      (outcome) => outcome === "breakEven",
    ).length;
    const totalPnl = trades.reduce(
      (sum, trade) => sum + displayNumber(trade.result),
      0,
    );
    const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
    const accuracy = getTradeAccuracyMetrics(trades).accuracy;

    return [
      { ...metricDefinitions[0], value: String(trades.length) },
      { ...metricDefinitions[1], value: formatResult(totalPnl) },
      { ...metricDefinitions[2], value: `${winRate.toFixed(1)}%` },
      { ...metricDefinitions[3], value: String(breakEven) },
      {
        ...metricDefinitions[4],
        value:
          trades.length > 0 ? formatResult(totalPnl / trades.length) : "$0.00",
      },
      {
        ...metricDefinitions[5],
        value: accuracy === null ? "—" : `${accuracy.toFixed(1)}%`,
      },
    ];
  }, [trades]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
      {metrics.map((metric) => (
        <MetricCard isLoading={isLoading} key={metric.label} metric={metric} />
      ))}
    </div>
  );
};

type MetricCardProps = {
  isLoading: boolean;
  metric: DashboardMetric;
};

const MetricCard = ({ isLoading, metric }: MetricCardProps) => {
  const tone = toneStyles[metric.tone];

  return (
    <article className="rounded-xl border border-[#333f52] bg-[#172033] p-4 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium leading-4 text-[#94a3b8]">
          {metric.label}
        </p>
        <span
          className={`grid size-7 place-items-center rounded-lg ${tone.iconSurface}`}
        >
          <Image alt="" height={20} src={metric.icon} width={20} />
        </span>
      </div>
      <p
        className={`mt-2 text-[28px] font-bold leading-8.5 tracking-[-0.3px] ${tone.valueColor}`}
      >
        {isLoading ? "—" : metric.value}
      </p>
    </article>
  );
};

export default DashboardMetrics;
