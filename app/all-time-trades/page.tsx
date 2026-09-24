import AllTimeTrades from "@/components/all-time-trades";
import Sidebar from "@/components/sidebar";

const AllTimeTradesPage = () => (
  <div className="flex min-h-screen bg-[#0d1627]">
    <Sidebar initialActiveItem="All Time Trades" />
    <main className="min-w-0 flex-1">
      <AllTimeTrades />
    </main>
  </div>
);

export default AllTimeTradesPage;
