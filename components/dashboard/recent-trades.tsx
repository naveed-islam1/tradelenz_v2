import DashboardTradeCard from "@/components/dashboard/trade-card";
import type { TradeRecord } from "@/lib/trade-types";
import type { DashboardFilters } from "@/lib/trades-api";

type DashboardError = {
  message?: string;
};

type DashboardRecentTradesProps = {
  dateFilter: DashboardFilters["date"];
  deleteError?: DashboardError;
  isError: boolean;
  isLoading: boolean;
  loadError?: DashboardError;
  onDelete: (trade: TradeRecord) => void;
  trades: TradeRecord[];
};

const DashboardRecentTrades = ({
  dateFilter,
  deleteError,
  isError,
  isLoading,
  loadError,
  onDelete,
  trades,
}: DashboardRecentTradesProps) => (
  <section className="mt-8" aria-labelledby="recent-trades-heading">
    <h2
      className="text-xl font-semibold leading-7"
      id="recent-trades-heading"
    >
      Recent trades
    </h2>
    {isLoading && <TradeListSkeleton />}
    {isError && (
      <p className="mt-4 rounded-xl border border-[#f04545]/50 bg-[#351f29] p-6 text-sm text-[#fecaca]">
        {loadError?.message || "Trades could not be loaded. Please try again."}
      </p>
    )}
    {!isLoading && !isError && (
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {trades.map((trade) => (
          <DashboardTradeCard key={trade.id} onDelete={onDelete} trade={trade} />
        ))}
      </div>
    )}
    {!isLoading && !isError && trades.length === 0 && (
      <p className="mt-4 rounded-xl border border-dashed border-[#333f52] p-6 text-sm text-[#94a3b8]">
        No trades found for {dateFilter.toLowerCase()}.
      </p>
    )}
    {deleteError && (
      <p className="mt-4 text-sm text-[#fecaca]">
        {deleteError.message ||
          "This trade could not be deleted. Please try again."}
      </p>
    )}
  </section>
);

const TradeListSkeleton = () => (
  <div className="mt-4 grid gap-4 lg:grid-cols-3">
    {Array.from({ length: 3 }, (_, index) => (
      <div
        className="h-40 animate-pulse rounded-xl border border-[#333f52] bg-[#172033]"
        key={index}
      />
    ))}
  </div>
);

export default DashboardRecentTrades;
