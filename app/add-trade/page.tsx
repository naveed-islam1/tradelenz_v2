import AddTrade from "@/components/add-trade";
import Sidebar from "@/components/sidebar";

const AddTradePage = () => {
  return (
    <div className="flex min-h-screen bg-[#0d1627]">
      <Sidebar initialActiveItem="Add Trade" />
      <main className="min-w-0 flex-1">
        <AddTrade />
      </main>
    </div>
  );
};

export default AddTradePage;
