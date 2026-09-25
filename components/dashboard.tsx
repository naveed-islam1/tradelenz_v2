"use client";

import { useState } from "react";

import DashboardFiltersPanel from "@/components/dashboard/filters";
import {
  formatResult,
  formatTradeDate,
} from "@/components/dashboard/formatters";
import DashboardHeader from "@/components/dashboard/header";
import DashboardMetrics from "@/components/dashboard/metrics";
import DashboardRecentTrades from "@/components/dashboard/recent-trades";
import DeleteTradeModal, {
  type DeleteTradePreview,
} from "@/components/delete-trade-modal";
import {
  type DashboardFilters,
  useDeleteTradeMutation,
  useGetDashboardTradesQuery,
} from "@/lib/trades-api";
import type { TradeRecord } from "@/lib/trade-types";

const defaultFilters: DashboardFilters = {
  date: "This week",
  pair: "All pairs",
  tradeType: "All types",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<DashboardFilters>(defaultFilters);
  const [tradePendingDelete, setTradePendingDelete] =
    useState<TradeRecord | null>(null);
  const {
    data: trades = [],
    isError,
    isLoading,
    error,
  } = useGetDashboardTradesQuery(appliedFilters);
  const [deleteTrade, { error: deleteError, isLoading: isDeleting }] =
    useDeleteTradeMutation();

  const clearFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const confirmDelete = async () => {
    if (!tradePendingDelete) return;
    try {
      await deleteTrade(tradePendingDelete.id).unwrap();
      setTradePendingDelete(null);
    } catch {}
  };

  const deletePreview: DeleteTradePreview | null = tradePendingDelete
    ? {
        instrument: tradePendingDelete.pair || "Instrument unavailable",
        direction: tradePendingDelete.type?.toUpperCase() || "Trade",
        date:
          formatTradeDate(tradePendingDelete.date_open) ?? "Date unavailable",
        result: formatResult(tradePendingDelete.result),
      }
    : null;

    console.log("appliedFilters" , appliedFilters)
  return (
    <section
      className="min-h-screen bg-bg-page px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-12"
      id="dashboard"
    >
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />
        <DashboardMetrics isLoading={isLoading} trades={trades} />
        <DashboardFiltersPanel
          appliedDate={appliedFilters.date}
          filters={filters}
          onApply={() => setAppliedFilters(filters)}
          onChange={setFilters}
          onClear={clearFilters}
        />
        <DashboardRecentTrades
          dateFilter={appliedFilters.date}
          deleteError={deleteError}
          isError={isError}
          isLoading={isLoading}
          loadError={error}
          onDelete={setTradePendingDelete}
          trades={trades}
        />
      </div>
      <DeleteTradeModal
        isDeleting={isDeleting}
        onConfirm={confirmDelete}
        onOpenChange={(open) => !open && setTradePendingDelete(null)}
        open={Boolean(tradePendingDelete)}
        trade={deletePreview}
      />
    </section>
  );
};

export default Dashboard;
