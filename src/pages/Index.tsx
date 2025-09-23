import { useState } from "react";
import { TimetableNav } from "@/components/timetable/TimetableNav";
import { DashboardView } from "@/components/timetable/DashboardView";
import { GenerateScheduleView } from "@/components/timetable/GenerateScheduleView";
import { CoursesManagementView } from "@/components/timetable/CoursesManagementView";
import { FacultyManagementView } from "@/components/timetable/FacultyManagementView";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardView />;
      case "generate":
        return <GenerateScheduleView />;
      case "courses":
        return <CoursesManagementView />;
      case "faculty":
        return <FacultyManagementView />;
      case "timeslots":
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Time Slot Configuration - Coming Soon</p>
          </div>
        );
      case "analytics":
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Analytics Dashboard - Coming Soon</p>
          </div>
        );
      case "export":
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>Export Management - Coming Soon</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>System Settings - Coming Soon</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TimetableNav 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="flex-1 p-8 overflow-auto">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;