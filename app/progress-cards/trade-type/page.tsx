import ProgressCards from "@/components/progress-cards";
import Sidebar from "@/components/sidebar";

const TradeTypeProgressPage = () => (
  <div className="flex min-h-screen bg-[#0d1627]">
    <Sidebar initialActiveItem="Progress Cards" />
    <main className="min-w-0 flex-1">
      <ProgressCards activeView="trade-type" />
    </main>
  </div>
);

export default TradeTypeProgressPage;
