
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reservations } from "@/lib/data";
import { Reservation, ReservationStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Search, 
  Plus, 
  Calendar,
  CheckSquare,
  ClipboardList,
  XCircle,
  Eye,
  PenSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ReservationTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reservation.roomNumber && reservation.roomNumber.includes(searchQuery)) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reservations</CardTitle>
            <CardDescription>
              Manage bookings and reservations
            </CardDescription>
          </div>
          <Button size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-2" />
            New Reservation
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reservations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reservation</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>{reservation.guestName}</TableCell>
                  <TableCell>{reservation.roomNumber || "Unassigned"}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Check-in: {reservation.checkIn}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Check-out: {reservation.checkOut}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ReservationStatusBadge status={reservation.status} />
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={reservation.paymentStatus} />
                  </TableCell>
                  <TableCell>${reservation.totalAmount}</TableCell>
                  <TableCell>
                    <ReservationActions reservation={reservation} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No reservations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function ReservationStatusBadge({ status }: { status: ReservationStatus }) {
  const variantMap: Record<ReservationStatus, { className: string }> = {
    Confirmed: {
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    "Checked-in": {
      className: "bg-green-100 text-green-800 border-green-200",
    },
    "Checked-out": {
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    Cancelled: {
      className: "bg-red-100 text-red-800 border-red-200",
    },
    "No-show": {
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
  };

  const variant = variantMap[status];

  return (
    <Badge variant="outline" className={cn(variant.className)}>
      {status}
    </Badge>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const variantMap: Record<string, { className: string }> = {
    Paid: {
      className: "bg-green-100 text-green-800 border-green-200",
    },
    Pending: {
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    Partial: {
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    Refunded: {
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
  };

  const variant = variantMap[status];

  return (
    <Badge variant="outline" className={cn(variant.className)}>
      {status}
    </Badge>
  );
}

function ReservationActions({ reservation }: { reservation: Reservation }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PenSquare className="mr-2 h-4 w-4" />
          Edit reservation
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {reservation.status === "Confirmed" && (
          <DropdownMenuItem>
            <CheckSquare className="mr-2 h-4 w-4" />
            Check-in
          </DropdownMenuItem>
        )}
        {reservation.status === "Checked-in" && (
          <DropdownMenuItem>
            <CheckSquare className="mr-2 h-4 w-4" />
            Check-out
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <ClipboardList className="mr-2 h-4 w-4" />
          Add note
        </DropdownMenuItem>
        {["Confirmed"].includes(reservation.status) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel reservation
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
