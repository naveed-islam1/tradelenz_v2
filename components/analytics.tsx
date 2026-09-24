import AnalyticsCharts from "@/components/analytics-charts";

const primaryMetrics = [
  { label: "Win Rate", value: "35.7%", detail: "10 wins · 18 losses", tone: "text-[#22c55e]" },
  { label: "Break-even Trades", value: "2", detail: "Included in total trades", tone: "text-[#f59e0b]" },
  { label: "Total Trades", value: "30", detail: "All-time journal entries", tone: "text-[#e2ecf6]" },
  { label: "Accuracy", value: "95.1%", detail: "Based on current calculation", tone: "text-[#e2ecf6]" },
];

const secondaryMetrics = [
  { label: "Average Win", value: "$40.28", detail: "Per winning trade", tone: "text-[#22c55e]" },
  { label: "Average Loss", value: "$21.17", detail: "Per losing trade", tone: "text-[#f04545]" },
  { label: "Net P&L", value: "+$25.55", detail: "All-time realized result", tone: "text-[#22c55e]" },
];

const Analytics = () => {
  return (
    <section className="min-h-screen bg-[#0d1627] px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">Analytics</h1>
            <p className="mt-1 text-sm leading-5 text-[#94a3b8]">Analyze your trading performance and statistics</p>
          </div>
          <span className="inline-flex h-9 min-w-[120px] items-center justify-center rounded-lg border border-[#333f52] bg-[#202d44] px-4 text-xs font-medium">
            All time
          </span>
        </header>

        <div className="mt-[22px] grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {primaryMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_1.1fr]">
          {secondaryMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <AnalyticsCharts />
      </div>
    </section>
  );
};

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone: string;
};

const MetricCard = ({ label, value, detail, tone }: MetricCardProps) => (
  <article className="min-h-[118px] rounded-xl border border-[#333f52] bg-[#172033] p-[18px] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
    <p className="text-xs font-medium leading-4 text-[#94a3b8]">{label}</p>
    <p className={`mt-2 text-[28px] font-bold leading-[34px] tracking-[-0.3px] ${tone}`}>{value}</p>
    <p className="mt-2 text-xs font-medium leading-4 text-[#94a3b8]">{detail}</p>
  </article>
);

export default Analytics;
