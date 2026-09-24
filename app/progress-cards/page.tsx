import ProgressCards from "@/components/progress-cards";
import Sidebar from "@/components/sidebar";

const SessionProgressPage = () => (
  <div className="flex min-h-screen bg-[#0d1627]">
    <Sidebar initialActiveItem="Progress Cards" />
    <main className="min-w-0 flex-1">
      <ProgressCards activeView="session" />
    </main>
  </div>
);

export default SessionProgressPage;
