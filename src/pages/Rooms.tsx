
import { Header } from "@/components/layout/Header";
import { RoomGrid } from "@/components/rooms/RoomGrid";

const RoomsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Room Management" />
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <RoomGrid />
      </div>
    </div>
  );
};

export default RoomsPage;
