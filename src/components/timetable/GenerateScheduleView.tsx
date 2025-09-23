import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Settings, CheckCircle, Clock, AlertTriangle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const programs = [
  { id: "bed", name: "B.Ed", semesters: 4, students: 120 },
  { id: "med", name: "M.Ed", semesters: 4, students: 60 },
  { id: "fyup", name: "FYUP", semesters: 8, students: 200 },
  { id: "itep", name: "ITEP", semesters: 2, students: 40 }
];

const constraints = [
  { id: "faculty_load", label: "Faculty Workload Limits", checked: true },
  { id: "room_capacity", label: "Room Capacity Constraints", checked: true },
  { id: "time_preferences", label: "Faculty Time Preferences", checked: true },
  { id: "practical_labs", label: "Lab Equipment Requirements", checked: true },
  { id: "teaching_practice", label: "Teaching Practice Slots", checked: true },
  { id: "field_work", label: "Field Work Scheduling", checked: false }
];

export const GenerateScheduleView = () => {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const [activeConstraints, setActiveConstraints] = useState<string[]>(
    constraints.filter(c => c.checked).map(c => c.id)
  );
  const { toast } = useToast();

  const handleProgramToggle = (programId: string) => {
    setSelectedPrograms(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId)
        : [...prev, programId]
    );
  };

  const handleConstraintToggle = (constraintId: string) => {
    setActiveConstraints(prev =>
      prev.includes(constraintId)
        ? prev.filter(id => id !== constraintId)
        : [...prev, constraintId]
    );
  };

  const handleGenerate = async () => {
    if (selectedPrograms.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one program to generate a timetable.",
        variant: "destructive"
      });
      return;
    }

    setGenerationStatus("generating");
    setProgress(0);

    // Simulate AI-powered generation process
    const steps = [
      "Analyzing course requirements...",
      "Checking faculty availability...",
      "Validating room allocations...",
      "Optimizing time slots...",
      "Resolving conflicts...",
      "Finalizing timetable..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * (100 / steps.length));
      
      toast({
        title: "Generation Progress",
        description: steps[i],
      });
    }

    setGenerationStatus("complete");
    toast({
      title: "Timetable Generated Successfully!",
      description: "Your optimized schedule is ready for review.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Generate Schedule</h2>
          <p className="text-muted-foreground">AI-powered timetable generation with conflict resolution</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          NEP 2020 Compliant
        </Badge>
      </div>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Program Selection</CardTitle>
                <CardDescription>Choose programs to include in the timetable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {programs.map((program) => (
                  <div key={program.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                    <Checkbox
                      id={program.id}
                      checked={selectedPrograms.includes(program.id)}
                      onCheckedChange={() => handleProgramToggle(program.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={program.id} className="font-medium cursor-pointer">
                        {program.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {program.semesters} semesters • {program.students} students
                      </p>
                    </div>
                    <Badge variant="outline">{program.students}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Schedule Parameters</CardTitle>
                <CardDescription>Configure generation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Target Semester</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Semester</SelectItem>
                      <SelectItem value="next">Next Semester</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input type="date" id="start-date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input type="date" id="end-date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="optimization">Optimization Priority</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faculty">Faculty Preferences</SelectItem>
                      <SelectItem value="resources">Resource Utilization</SelectItem>
                      <SelectItem value="balanced">Balanced Approach</SelectItem>
                      <SelectItem value="student">Student Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="constraints" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Scheduling Constraints
              </CardTitle>
              <CardDescription>Configure rules and limitations for timetable generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {constraints.map((constraint) => (
                  <div key={constraint.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <Checkbox
                      id={constraint.id}
                      checked={activeConstraints.includes(constraint.id)}
                      onCheckedChange={() => handleConstraintToggle(constraint.id)}
                    />
                    <Label htmlFor={constraint.id} className="cursor-pointer">
                      {constraint.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Generation Summary</CardTitle>
                <CardDescription>Review your configuration before generating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Selected Programs</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPrograms.length > 0 ? (
                      selectedPrograms.map(id => {
                        const program = programs.find(p => p.id === id);
                        return (
                          <Badge key={id} variant="secondary">
                            {program?.name}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-sm text-muted-foreground">No programs selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Active Constraints</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeConstraints.length} constraint{activeConstraints.length !== 1 ? 's' : ''} enabled
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Estimated Classes</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    ~{selectedPrograms.length * 85} classes to schedule
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5" />
                  AI Generation
                </CardTitle>
                <CardDescription>Start the intelligent timetable generation process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {generationStatus === "idle" && (
                  <Button 
                    onClick={handleGenerate}
                    className="w-full h-12"
                    disabled={selectedPrograms.length === 0}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Timetable
                  </Button>
                )}

                {generationStatus === "generating" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Generating timetable...</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                      This may take a few minutes depending on complexity
                    </p>
                  </div>
                )}

                {generationStatus === "complete" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Generation Complete!</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button size="sm">View Schedule</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};