import Analytics from "@/components/analytics";
import Sidebar from "@/components/sidebar";

const AnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-[#0d1627]">
      <Sidebar initialActiveItem="Analytics" />
      <main className="min-w-0 flex-1">
        <Analytics />
      </main>
    </div>
  );
};

export default AnalyticsPage;
