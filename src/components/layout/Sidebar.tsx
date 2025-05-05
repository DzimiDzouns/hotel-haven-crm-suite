
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Bed, 
  ClipboardList, 
  MessageSquare, 
  BarChart4
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen relative transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex h-14 items-center px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="font-semibold text-sidebar-foreground text-lg">
            Hotel Haven
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-6 w-6 text-sidebar-foreground ml-auto hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "rotate-180"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <NavItem
              href="/"
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              collapsed={collapsed}
              active={location.pathname === "/"}
            />
            <NavItem
              href="/guests"
              icon={<Users className="h-5 w-5" />}
              label="Guests"
              collapsed={collapsed}
              active={location.pathname === "/guests"}
            />
            <NavItem
              href="/reservations"
              icon={<Calendar className="h-5 w-5" />}
              label="Reservations"
              collapsed={collapsed}
              active={location.pathname === "/reservations"}
            />
            <NavItem
              href="/rooms"
              icon={<Bed className="h-5 w-5" />}
              label="Rooms"
              collapsed={collapsed}
              active={location.pathname === "/rooms"}
            />
            <NavItem
              href="/notes"
              icon={<ClipboardList className="h-5 w-5" />}
              label="Notes"
              collapsed={collapsed}
              active={location.pathname === "/notes"}
            />
            <NavItem
              href="/requests"
              icon={<MessageSquare className="h-5 w-5" />}
              label="Requests"
              collapsed={collapsed}
              active={location.pathname === "/requests"}
            />
            <Separator className="my-2 bg-sidebar-border" />
            <NavItem
              href="/reports"
              icon={<BarChart4 className="h-5 w-5" />}
              label="Reports"
              collapsed={collapsed}
              active={location.pathname === "/reports"}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
}

function NavItem({ href, icon, label, collapsed, active }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
