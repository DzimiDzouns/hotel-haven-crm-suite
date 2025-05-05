
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { activities } from "@/lib/data";
import { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Calendar, CheckSquare, Clock, BedDouble, FileText, PenSquare, Wrench } from "lucide-react";

export function RecentActivity() {
  // Get only the most recent 5 activities
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Check-in":
        return <CheckSquare className="h-5 w-5 text-green-500" />;
      case "Check-out":
        return <CheckSquare className="h-5 w-5 text-orange-500" />;
      case "Reservation":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "Cancellation":
        return <Clock className="h-5 w-5 text-red-500" />;
      case "Request":
        return <PenSquare className="h-5 w-5 text-purple-500" />;
      case "Note":
        return <FileText className="h-5 w-5 text-yellow-500" />;
      case "Maintenance":
        return <Wrench className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: string) => {
    const variants: Record<string, string> = {
      "Check-in": "bg-green-100 text-green-800 border-green-200",
      "Check-out": "bg-orange-100 text-orange-800 border-orange-200",
      "Reservation": "bg-blue-100 text-blue-800 border-blue-200",
      "Cancellation": "bg-red-100 text-red-800 border-red-200",
      "Request": "bg-purple-100 text-purple-800 border-purple-200",
      "Note": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Maintenance": "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <Badge variant="outline" className={cn("ml-2", variants[type] || "")}>
        {type}
      </Badge>
    );
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex items-start space-x-4 rounded-lg p-3 transition-all hover:bg-accent/20">
      <div className="flex-shrink-0 mt-0.5">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-sm font-medium leading-none">
            {activity.description}
          </p>
          {getActivityBadge(activity.type)}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <div className="flex-1">
            {activity.guestName && (
              <span className="font-medium">{activity.guestName}</span>
            )}
            {activity.roomNumber && (
              <span className="font-medium ml-1">
                {activity.guestName ? " • " : ""}Room {activity.roomNumber}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {formatTime(activity.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}
