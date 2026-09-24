import Sidebar from "@/components/sidebar";
import TradeDetails from "@/components/trade-detail";

const TradeDetailPage = () => {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar initialActiveItem="All Time Trades" />
      <main className="min-w-0 flex-1">
        <TradeDetails />
      </main>
    </div>
  );
};

export default TradeDetailPage;
