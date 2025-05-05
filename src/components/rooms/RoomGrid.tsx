
import { useState } from "react";
import { rooms } from "@/lib/data";
import { Room, RoomStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  BedDouble, 
  ChevronDown, 
  Wifi, 
  Coffee, 
  Tv, 
  Utensils,
  Bath,
  Wine,
  CheckSquare,
  ClipboardList,
  Wrench,
  UserRound,
  MoreHorizontal, // Changed from DotsHorizontal
  ChefHat // Changed from KitchenPot
} from "lucide-react";

export function RoomGrid() {
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [floorFilter, setFloorFilter] = useState<number | "All">("All");

  const filteredRooms = rooms.filter((room) => {
    const matchesStatus = statusFilter === "All" || room.status === statusFilter;
    const matchesType = typeFilter === "All" || room.type === typeFilter;
    const matchesFloor = floorFilter === "All" || room.floor === floorFilter;
    
    return matchesStatus && matchesType && matchesFloor;
  });

  const uniqueFloors = [...new Set(rooms.map(room => room.floor))].sort();
  const uniqueTypes = [...new Set(rooms.map(room => room.type))].sort();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Rooms</CardTitle>
            <CardDescription>Manage room assignments and status</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Status: {statusFilter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Vacant")}>
                  Vacant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Occupied")}>
                  Occupied
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Clean")}>
                  Clean
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Dirty")}>
                  Dirty
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Maintenance")}>
                  Maintenance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Type: {typeFilter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTypeFilter("All")}>
                  All
                </DropdownMenuItem>
                {uniqueTypes.map((type) => (
                  <DropdownMenuItem 
                    key={type} 
                    onClick={() => setTypeFilter(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Floor: {floorFilter === "All" ? "All" : floorFilter}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFloorFilter("All")}>
                  All
                </DropdownMenuItem>
                {uniqueFloors.map((floor) => (
                  <DropdownMenuItem 
                    key={floor} 
                    onClick={() => setFloorFilter(floor)}
                  >
                    {floor}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
          {filteredRooms.length === 0 && (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No rooms match the selected filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RoomCard({ room }: { room: Room }) {
  const getStatusColor = (status: RoomStatus) => {
    const colorMap: Record<RoomStatus, { bg: string; text: string; border: string }> = {
      Vacant: {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      Occupied: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      Clean: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      },
      Dirty: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200",
      },
      Maintenance: {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      },
    };

    return colorMap[status];
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wi-fi":
        return <Wifi className="h-3.5 w-3.5" />;
      case "tv":
        return <Tv className="h-3.5 w-3.5" />;
      case "coffee maker":
        return <Coffee className="h-3.5 w-3.5" />;
      case "kitchenette":
      case "full kitchen":
        return <ChefHat className="h-3.5 w-3.5" />; // Changed from KitchenPot
      case "mini bar":
      case "bar":
        return <Wine className="h-3.5 w-3.5" />;
      case "jacuzzi":
      case "sauna":
        return <Bath className="h-3.5 w-3.5" />;
      default:
        return <Utensils className="h-3.5 w-3.5" />;
    }
  };

  const statusColors = getStatusColor(room.status);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-semibold">Room {room.number}</CardTitle>
          <CardDescription>
            Floor {room.floor} • {room.type}
          </CardDescription>
        </div>
        <RoomActions room={room} />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between items-center mb-3">
          <Badge
            variant="outline"
            className={cn(
              statusColors.bg,
              statusColors.text,
              statusColors.border
            )}
          >
            {room.status}
          </Badge>
          <span className="font-semibold text-sm">${room.price}/night</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Sleeps {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-1">
            {room.amenities.slice(0, 5).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="flex gap-1 items-center">
                {getAmenityIcon(amenity)}
                <span className="text-xs">{amenity}</span>
              </Badge>
            ))}
            {room.amenities.length > 5 && (
              <Badge variant="secondary">+{room.amenities.length - 5} more</Badge>
            )}
          </div>
          
          {room.lastCleaned && (
            <div className="text-xs text-muted-foreground mt-2">
              Last cleaned: {new Date(room.lastCleaned).toLocaleString([], {
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function RoomActions({ room }: { room: Room }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" /> {/* Changed from DotsHorizontal */}
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {room.status === "Vacant" && (
          <DropdownMenuItem>
            <UserRound className="mr-2 h-4 w-4" />
            Assign guest
          </DropdownMenuItem>
        )}
        {room.status === "Occupied" && (
          <DropdownMenuItem>
            <CheckSquare className="mr-2 h-4 w-4" />
            Check-out
          </DropdownMenuItem>
        )}
        {(room.status === "Dirty" || room.status === "Vacant") && (
          <DropdownMenuItem>
            <CheckSquare className="mr-2 h-4 w-4" />
            Mark as clean
          </DropdownMenuItem>
        )}
        {room.status !== "Maintenance" && (
          <DropdownMenuItem>
            <Wrench className="mr-2 h-4 w-4" />
            Set to maintenance
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ClipboardList className="mr-2 h-4 w-4" />
          Add note
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// The import for DotsHorizontal is removed since we now use MoreHorizontal
