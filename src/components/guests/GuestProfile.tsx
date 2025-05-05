
import { useState } from "react";
import { Guest, Reservation } from "@/lib/types";
import { reservations } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, 
  Star, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  CalendarDays,
  MessageSquare,
  CircleDollarSign,
  BadgePercent,
  FileText,
  Users
} from "lucide-react";
import { GuestStatusBadge } from "./GuestTable";
import { cn } from "@/lib/utils";

interface GuestProfileProps {
  guest: Guest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuestProfile({ guest, open, onOpenChange }: GuestProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!guest) return null;
  
  // Get guest's reservations
  const guestReservations = reservations.filter(res => res.guestId === guest.id);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {guest.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{guest.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <GuestStatusBadge status={guest.status} />
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    <Star className="h-3 w-3 mr-1" />
                    {guest.loyaltyPoints} Points
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stays">Stay History</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{guest.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Stay Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Stays:</span>
                    <span className="font-medium">{guest.totalStays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Stay:</span>
                    <span className="font-medium">{guest.lastStay || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">First Stay:</span>
                    <span className="font-medium">{guest.dateCreated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Upcoming:</span>
                    <span className="font-medium">{guestReservations.filter(r => r.status === "Confirmed").length}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Loyalty</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{guest.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points:</span>
                    <span className="font-medium">{guest.loyaltyPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Since:</span>
                    <span className="font-medium">{guest.dateCreated}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Preferences Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Type:</span>
                    <span className="font-medium">{guest.preferences?.roomType || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor:</span>
                    <span className="font-medium">{guest.preferences?.floor || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extras:</span>
                    <span className="font-medium">{guest.preferences?.extras?.length || 0} items</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {guest.notes && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{guest.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="stays" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Stay History</CardTitle>
                <CardDescription>Past, current, and future stays</CardDescription>
              </CardHeader>
              <CardContent>
                {guestReservations.length > 0 ? (
                  <div className="space-y-6">
                    {guestReservations.map((reservation) => (
                      <div key={reservation.id} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                        <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <div className="font-medium text-lg flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {reservation.checkIn} — {reservation.checkOut}
                          </div>
                          <Badge className={cn(
                            reservation.status === "Confirmed" ? "bg-blue-100 text-blue-800 border-blue-200" :
                            reservation.status === "Checked-in" ? "bg-green-100 text-green-800 border-green-200" :
                            reservation.status === "Checked-out" ? "bg-gray-100 text-gray-800 border-gray-200" :
                            reservation.status === "Cancelled" ? "bg-red-100 text-red-800 border-red-200" :
                            "bg-amber-100 text-amber-800 border-amber-200"
                          )}>
                            {reservation.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Total Amount:</span>
                            <span className="ml-2 font-medium">${reservation.totalAmount}</span>
                          </div>
                          {reservation.roomNumber && (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-muted-foreground">Room:</span>
                              <span className="ml-2 font-medium">{reservation.roomNumber}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Guests:</span>
                            <span className="ml-2 font-medium">{reservation.adults} adults, {reservation.children} children</span>
                          </div>
                          <div className="flex items-center">
                            <BadgePercent className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Payment:</span>
                            <Badge variant="outline" className="ml-2 py-0 h-5">
                              {reservation.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                        {reservation.specialRequests && (
                          <div className="mt-2 text-sm">
                            <div className="flex items-start">
                              <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                              <div>
                                <span className="text-muted-foreground">Special Requests:</span>
                                <p className="mt-1">{reservation.specialRequests}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No stay history found for this guest.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room Preferences</CardTitle>
                <CardDescription>Guest's preferred room settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Room Type</h4>
                    <Badge variant="outline" className="text-base py-1.5 px-3">
                      {guest.preferences?.roomType || "Not specified"}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Floor Preference</h4>
                    <Badge variant="outline" className="text-base py-1.5 px-3">
                      {guest.preferences?.floor ? `Floor ${guest.preferences.floor}` : "Not specified"}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Special Amenities</h4>
                  {guest.preferences?.extras && guest.preferences.extras.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {guest.preferences.extras.map((extra, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">
                          {extra}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No special amenities specified</p>
                  )}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Other Preferences</h4>
                  <p className="text-muted-foreground">
                    {guest.notes || "No additional preferences noted"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="communications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Communication History</CardTitle>
                <CardDescription>Record of all interactions with the guest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  <MessageSquare className="h-10 w-10 mx-auto mb-4 opacity-40" />
                  <p>No communication records available.</p>
                  <p className="text-sm mt-1">All email, call, and in-person interactions will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Internal notes about this guest</CardDescription>
              </CardHeader>
              <CardContent>
                {guest.notes ? (
                  <div className="border rounded-md p-4">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Added on {guest.dateCreated}</p>
                        <p>{guest.notes}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <FileText className="h-10 w-10 mx-auto mb-4 opacity-40" />
                    <p>No notes have been added for this guest.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
