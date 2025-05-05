
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  PlusCircle, 
  UserPlus, 
  LogOut, 
  Bell 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="hidden md:flex flex-1 items-center gap-4 mx-6">
          <form className="flex-1 flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-background"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <ActionButtons />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Calendar className="h-4 w-4 mr-2" />
            New Reservation
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus className="h-4 w-4 mr-2" />
            New Guest
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Note
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-hotel-600 text-[10px]">
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col space-y-1 p-2">
          <h3 className="font-medium text-sm">Notifications</h3>
          <div className="text-xs text-muted-foreground">
            Recent activity and updates
          </div>
        </div>
        <div className="border-t divider my-1"></div>
        <div className="max-h-80 overflow-y-auto">
          <NotificationItem 
            title="New Reservation" 
            description="David Kim booked a room for May 8-10"
            time="10m ago"
          />
          <NotificationItem 
            title="Check-in Reminder" 
            description="James Wilson arriving today at 3:00 PM"
            time="30m ago"
          />
          <NotificationItem 
            title="Maintenance Request" 
            description="Room 303 reported TV issues"
            time="1h ago"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ title, description, time }: { title: string, description: string, time: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 hover:bg-muted/50 rounded-md">
      <div className="flex justify-between items-start">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <span className="text-xs text-muted-foreground">{description}</span>
    </div>
  );
}

function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 w-8 rounded-full border border-input"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Settings, User, Calendar, MessageSquare } from "lucide-react";
