"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartFont = {
  family: "var(--font-fira-sans), Fira Sans, sans-serif",
};

const doughnutData = {
  labels: ["Wins", "Losses", "Break-even"],
  datasets: [
    {
      data: [10, 18, 2],
      backgroundColor: ["#22c55e", "#f04545", "#f59e0b"],
      borderWidth: 0,
      hoverOffset: 0,
    },
  ],
};

const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%",
  animation: { duration: 280 },
  transitions: { active: { animation: { duration: 0 } } },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#172033",
      borderColor: "#4b5c76",
      borderWidth: 1,
      titleColor: "#e2ecf6",
      bodyColor: "#b8c5d8",
      padding: 10,
      displayColors: false,
      titleFont: { ...chartFont, weight: 600 },
      bodyFont: chartFont,
      callbacks: {
        label: (context) => `${context.label}: ${context.raw} trades`,
      },
    },
  },
};

const profitLossData = {
  labels: ["Wins", "Losses"],
  datasets: [
    {
      data: [40.28, -21.17],
      backgroundColor: ["#22c55e", "#f04545"],
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 120,
    },
  ],
};

const profitLossOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 280 },
  layout: { padding: { top: 8 } },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#172033",
      borderColor: "#4b5c76",
      borderWidth: 1,
      titleColor: "#e2ecf6",
      bodyColor: "#b8c5d8",
      padding: 10,
      displayColors: false,
      titleFont: { ...chartFont, weight: 600 },
      bodyFont: chartFont,
      callbacks: {
        label: (context) => {
          const label = context.label === "Wins" ? "Average Win" : "Average Loss";
          return `${label}: $${Math.abs(Number(context.raw)).toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: "#94a3b8", font: { ...chartFont, size: 12, weight: 500 } },
    },
    y: {
      min: -50,
      max: 50,
      ticks: { display: false },
      border: { display: false },
      grid: { color: "rgba(99, 115, 143, 0.18)", drawTicks: false },
    },
  },
};

const AnalyticsCharts = () => (
  <div className="mt-[22px] grid gap-4 lg:grid-cols-[460px_1fr]">
    <section className="rounded-xl border border-[#333f52] bg-[#172033] p-[18px] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
      <h2 className="text-xl font-semibold leading-7">Win / Loss Breakdown</h2>
      <p className="mt-1 text-xs font-medium leading-4 text-[#94a3b8]">Distribution of all recorded trades</p>

      <div className="relative mx-auto mt-4 h-[180px] w-[180px]">
        <Doughnut aria-label="Win, loss, and break-even trade distribution" data={doughnutData} options={doughnutOptions} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold leading-7 text-[#e2ecf6]">30</span>
          <span className="text-xs font-medium leading-4 text-[#94a3b8]">trades</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs font-medium leading-4 text-[#94a3b8]">
        <LegendItem color="bg-[#22c55e]" label="Wins 10" />
        <LegendItem color="bg-[#f04545]" label="Losses 18" />
        <LegendItem color="bg-[#f59e0b]" label="Break-even 2" />
      </div>
    </section>

    <section className="rounded-xl border border-[#333f52] bg-[#172033] p-[18px] shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
      <h2 className="text-xl font-semibold leading-7">Profit &amp; Loss Summary</h2>
      <p className="mt-1 text-xs font-medium leading-4 text-[#94a3b8]">Average result for winning and losing trades</p>

      <div className="mt-4 h-[204px]">
        <Bar aria-label="Average winning and losing trade profit and loss" data={profitLossData} options={profitLossOptions} />
      </div>

      <div className="flex items-center justify-between border-t border-[#333f52] pt-3">
        <span className="text-sm text-[#94a3b8]">Net Profit / Loss</span>
        <span className="text-xl font-semibold leading-7 text-[#22c55e]">+$25.55</span>
      </div>
    </section>
  </div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <span className="flex items-center gap-1.5">
    <span aria-hidden="true" className={`size-2 rounded-full ${color}`} />
    {label}
  </span>
);

export default AnalyticsCharts;
