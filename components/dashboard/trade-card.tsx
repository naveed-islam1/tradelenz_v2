import Link from "next/link";

import {
  formatResult,
  formatTradeDate,
} from "@/components/dashboard/formatters";
import { getTradeOutcome } from "@/lib/trade-outcome";
import type { TradeRecord } from "@/lib/trade-types";

const resultColors = {
  win: "text-[#22c55e]",
  loss: "text-[#f04545]",
  breakEven: "text-[#f59e0b]",
};
const directionPills = {
  BUY: "bg-[#22c55e] text-[#0d1627]",
  SELL: "bg-[#f04545] text-white",
};

type DashboardTradeCardProps = {
  onDelete: (trade: TradeRecord) => void;
  trade: TradeRecord;
};

const DashboardTradeCard = ({
  onDelete,
  trade,
}: DashboardTradeCardProps) => {
  const direction = trade.type?.toUpperCase() === "SELL" ? "SELL" : "BUY";
  const outcome = getTradeOutcome(trade.result);
  const openDate = formatTradeDate(trade.date_open);

  return (
    <article className="rounded-xl border border-[#333f52] bg-[#172033] p-4.5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1.25 text-xs font-medium leading-4 ${directionPills[direction]}`}
        >
          {direction}
        </span>
        <button
          className="text-xs font-medium text-[#94a3b8] transition hover:text-[#f04545]"
          onClick={() => onDelete(trade)}
          type="button"
        >
          Delete
        </button>
      </div>
      <h3 className="mt-3 text-xl font-semibold leading-7">
        {trade.pair || "Instrument unavailable"}
      </h3>
      <p className="mt-1 text-sm leading-5 text-[#94a3b8]">
        {openDate ? `Open · ${openDate}` : "Open date unavailable"}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p
          className={`text-[28px] font-bold leading-8.5 tracking-[-0.3px] ${resultColors[outcome]}`}
        >
          {formatResult(trade.result)}
        </p>
        <Link
          className="text-xs font-medium text-status-info hover:text-[#7dd3fc]"
          href={`/trade/${trade.id}`}
        >
          Open details
        </Link>
      </div>
    </article>
  );
};

export default DashboardTradeCard;
