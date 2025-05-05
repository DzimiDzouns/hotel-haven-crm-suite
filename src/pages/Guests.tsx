
import { Header } from "@/components/layout/Header";
import { GuestTable } from "@/components/guests/GuestTable";

const GuestsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Guest Management" />
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <GuestTable />
      </div>
    </div>
  );
};

export default GuestsPage;
