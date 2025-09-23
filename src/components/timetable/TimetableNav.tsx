import { Calendar, Settings, Users, BookOpen, Clock, BarChart3, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  id: string;
  count?: number;
}

const navItems: NavItem[] = [
  { icon: Calendar, label: "Dashboard", id: "dashboard" },
  { icon: Plus, label: "Generate Schedule", id: "generate" },
  { icon: BookOpen, label: "Courses", id: "courses", count: 42 },
  { icon: Users, label: "Faculty", id: "faculty", count: 28 },
  { icon: Clock, label: "Time Slots", id: "timeslots" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Download, label: "Export", id: "export" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface TimetableNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const TimetableNav = ({ activeSection, onSectionChange }: TimetableNavProps) => {
  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col shadow-soft">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Smart Timetable
        </h1>
        <p className="text-sm text-muted-foreground mt-1">NEP 2020 Compliant</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10 px-3",
                isActive && "bg-primary text-primary-foreground shadow-soft"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <span className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {item.count}
                </span>
              )}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-card p-3 rounded-lg">
          <p className="text-sm font-medium">Quick Stats</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div>
              <p className="text-muted-foreground">Conflicts</p>
              <p className="font-semibold text-success">0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Utilization</p>
              <p className="font-semibold text-primary">87%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};