import Dashboard from "@/components/dashboard";
import Sidebar from "@/components/sidebar";

const HomePage = () => {
  return (
    <div className="flex min-h-screen bg-[#0d1627]">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Dashboard />
      </main>
    </div>
  );
};

export default HomePage;
