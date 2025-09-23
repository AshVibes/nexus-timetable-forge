import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, BookOpen, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Programs",
    value: "4",
    description: "B.Ed, M.Ed, FYUP, ITEP",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Active Faculty",
    value: "28",
    description: "Available this semester",
    icon: Users,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Scheduled Classes",
    value: "342",
    description: "Across all programs",
    icon: Calendar,
    color: "text-success",
    bg: "bg-success/10"
  },
  {
    title: "Utilization Rate",
    value: "87%",
    description: "Resource efficiency",
    icon: TrendingUp,
    color: "text-warning",
    bg: "bg-warning/10"
  }
];

const recentActivities = [
  {
    action: "Generated new timetable",
    program: "B.Ed Semester 3",
    time: "2 hours ago",
    status: "success"
  },
  {
    action: "Faculty availability updated",
    program: "Dr. Sharma - Mathematics",
    time: "4 hours ago",
    status: "info"
  },
  {
    action: "Room conflict detected",
    program: "Room 101 - Monday 10:00 AM",
    time: "1 day ago",
    status: "warning"
  }
];

const conflictAlerts = [
  {
    type: "Faculty Conflict",
    description: "Dr. Patel assigned to two classes simultaneously",
    severity: "high",
    time: "Monday 10:00-11:00 AM"
  },
  {
    type: "Room Unavailable",
    description: "Lab 201 maintenance scheduled",
    severity: "medium",
    time: "Wednesday 2:00-4:00 PM"
  }
];

export const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Timetable Dashboard</h2>
          <p className="text-muted-foreground">Overview of your academic scheduling system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Quick Generate
          </Button>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            New Schedule
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gradient-card shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system updates and changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-success' :
                  activity.status === 'warning' ? 'bg-warning' : 'bg-primary'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.program}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Conflict Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Conflict Alerts
            </CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {conflictAlerts.length > 0 ? (
              conflictAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-warning/20 bg-warning/5">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{alert.type}</p>
                      <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-success/5 border border-success/20">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm font-medium text-success">No Conflicts Detected</p>
                  <p className="text-xs text-muted-foreground">All schedules are conflict-free</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-primary text-primary-foreground shadow-medium">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Common tasks for timetable management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="h-auto p-4 flex flex-col items-start">
              <Calendar className="w-6 h-6 mb-2" />
              <span className="font-medium">Generate Timetable</span>
              <span className="text-xs opacity-80">Create optimized schedules</span>
            </Button>
            <Button variant="secondary" className="h-auto p-4 flex flex-col items-start">
              <Users className="w-6 h-6 mb-2" />
              <span className="font-medium">Manage Faculty</span>
              <span className="text-xs opacity-80">Update availability & workload</span>
            </Button>
            <Button variant="secondary" className="h-auto p-4 flex flex-col items-start">
              <BookOpen className="w-6 h-6 mb-2" />
              <span className="font-medium">Course Planning</span>
              <span className="text-xs opacity-80">NEP 2020 curriculum setup</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};