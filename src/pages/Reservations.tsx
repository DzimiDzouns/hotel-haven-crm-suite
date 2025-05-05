
import { Header } from "@/components/layout/Header";
import { ReservationTable } from "@/components/reservations/ReservationTable";

const ReservationsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Reservations" />
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <ReservationTable />
      </div>
    </div>
  );
};

export default ReservationsPage;
