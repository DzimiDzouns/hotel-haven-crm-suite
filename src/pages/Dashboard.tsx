
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { OccupancyChart } from "@/components/dashboard/OccupancyChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStats, getRoomStatusData, getRevenueData } from "@/lib/data";
import { 
  BedDouble, 
  UserCheck, 
  UserMinus, 
  CalendarClock, 
  Users, 
  Percent, 
  DollarSign, 
  Hotel,
  UserPlus,
  CalendarPlus,
  LogOut
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Dashboard = () => {
  const stats = getStats();
  const roomStatusData = getRoomStatusData();
  const revenueData = getRevenueData();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard" />
      <div className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Today's Overview</h2>
          <div className="flex space-x-2">
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
            <Button variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              New Guest
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Check-ins Today" 
            value={stats.checkInsToday} 
            icon={<UserCheck className="h-4 w-4" />}
            description="Guests arriving today" 
          />
          <StatsCard 
            title="Check-outs Today" 
            value={stats.checkOutsToday} 
            icon={<UserMinus className="h-4 w-4" />}
            description="Guests departing today" 
          />
          <StatsCard 
            title="Occupancy Rate" 
            value={`${stats.occupancyRate}%`} 
            icon={<Percent className="h-4 w-4" />}
            description={`${stats.occupiedRooms}/${stats.totalRooms} rooms occupied`} 
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard 
            title="Available Rooms" 
            value={stats.availableRooms} 
            icon={<BedDouble className="h-4 w-4" />}
            description="Ready for check-in" 
          />
        </div>
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Room Status</CardTitle>
              <CardDescription>Current distribution of room statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {roomStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>Daily revenue for the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)" 
                      }} 
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <OccupancyChart />
          <RecentActivity />
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" />
                Check-in Guest
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Check-out Guest
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CalendarClock className="mr-2 h-4 w-4" />
                Extend Stay
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Guests
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming VIP Guests</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Michael Rodriguez</p>
                    <p className="text-xs text-muted-foreground">May 22-28 • Presidential Suite</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-muted-foreground">May 25-30 • Deluxe Suite</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Bookings</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Maria Lopez</p>
                    <p className="text-xs text-muted-foreground">Booked 2h ago • May 20-22</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">David Kim</p>
                    <p className="text-xs text-muted-foreground">Booked 5h ago • May 8-10</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">James Wilson</p>
                    <p className="text-xs text-muted-foreground">Booked 1d ago • May 15-20</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
