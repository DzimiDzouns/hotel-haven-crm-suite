
import { useState } from "react";
import { guests } from "@/lib/data";
import { Guest, GuestStatus } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, MoreHorizontal, Search, Plus, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function GuestTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<GuestStatus | "All">("All");

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "All" || guest.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Guests</CardTitle>
            <CardDescription>
              Manage and view your guest database
            </CardDescription>
          </div>
          <Button size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-2" />
            New Guest
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search guests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status: {statusFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Regular")}>
                Regular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("VIP")}>
                VIP
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Corporate")}>
                Corporate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Blacklisted")}>
                Blacklisted
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Stay</TableHead>
                <TableHead>Total Stays</TableHead>
                <TableHead>Loyalty</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {guest.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{guest.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {guest.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <GuestStatusBadge status={guest.status} />
                  </TableCell>
                  <TableCell>
                    {guest.lastStay || "N/A"}
                  </TableCell>
                  <TableCell>{guest.totalStays}</TableCell>
                  <TableCell>{guest.loyaltyPoints} pts</TableCell>
                  <TableCell>{guest.dateCreated}</TableCell>
                  <TableCell>
                    <GuestActions guest={guest} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredGuests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No guests found.
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

function GuestStatusBadge({ status }: { status: GuestStatus }) {
  const variantMap: Record<GuestStatus, { className: string }> = {
    Regular: {
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    VIP: {
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
    Corporate: {
      className: "bg-green-100 text-green-800 border-green-200",
    },
    Blacklisted: {
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };

  const variant = variantMap[status];

  return (
    <Badge variant="outline" className={cn(variant.className)}>
      {status}
    </Badge>
  );
}

function GuestActions({ guest }: { guest: Guest }) {
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
          <UserRound className="mr-2 h-4 w-4" />
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Calendar className="mr-2 h-4 w-4" />
          New reservation
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CheckSquare className="mr-2 h-4 w-4" />
          Check-in
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PenSquare className="mr-2 h-4 w-4" />
          Edit guest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Calendar, CheckSquare, PenSquare } from "lucide-react";
