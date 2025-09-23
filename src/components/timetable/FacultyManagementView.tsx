import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  GraduationCap, 
  Clock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const facultyData = [
  {
    id: "FAC001",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@university.edu",
    phone: "+91 98765 43210",
    department: "Education",
    designation: "Professor",
    specialization: "Educational Psychology",
    experience: 15,
    qualification: "Ph.D. in Education",
    courses: ["BED101", "BED301"],
    totalHours: 12,
    status: "Active",
    joinDate: "2008-07-15"
  },
  {
    id: "FAC002", 
    name: "Prof. Rajesh Kumar",
    email: "rajesh.kumar@university.edu",
    phone: "+91 98765 43211",
    department: "Psychology",
    designation: "Associate Professor",
    specialization: "Child Development",
    experience: 12,
    qualification: "Ph.D. in Psychology",
    courses: ["BED102"],
    totalHours: 8,
    status: "Active",
    joinDate: "2011-08-20"
  },
  {
    id: "FAC003",
    name: "Dr. Anita Singh",
    email: "anita.singh@university.edu", 
    phone: "+91 98765 43212",
    department: "Mathematics",
    designation: "Assistant Professor",
    specialization: "Mathematics Education",
    experience: 8,
    qualification: "Ph.D. in Mathematics",
    courses: ["BED201"],
    totalHours: 10,
    status: "Active",
    joinDate: "2015-06-10"
  },
  {
    id: "FAC004",
    name: "Dr. Vikram Patel",
    email: "vikram.patel@university.edu",
    phone: "+91 98765 43213", 
    department: "Science",
    designation: "Associate Professor",
    specialization: "Science Education",
    experience: 10,
    qualification: "Ph.D. in Chemistry",
    courses: ["BED202"],
    totalHours: 9,
    status: "Active",
    joinDate: "2013-09-05"
  },
  {
    id: "FAC005",
    name: "Dr. Meera Joshi",
    email: "meera.joshi@university.edu",
    phone: "+91 98765 43214",
    department: "Education",
    designation: "Professor",
    specialization: "Assessment & Evaluation",
    experience: 18,
    qualification: "Ph.D. in Education",
    courses: ["BED301"],
    totalHours: 6,
    status: "Active",
    joinDate: "2005-03-12"
  },
  {
    id: "FAC006",
    name: "Prof. Amit Verma",
    email: "amit.verma@university.edu",
    phone: "+91 98765 43215",
    department: "Technology",
    designation: "Assistant Professor", 
    specialization: "Educational Technology",
    experience: 6,
    qualification: "M.Tech in Computer Science",
    courses: ["BED302"],
    totalHours: 8,
    status: "Active",
    joinDate: "2017-11-01"
  },
  {
    id: "FAC007",
    name: "Dr. Sunita Rao",
    email: "sunita.rao@university.edu",
    phone: "+91 98765 43216",
    department: "Management",
    designation: "Associate Professor",
    specialization: "Educational Management",
    experience: 14,
    qualification: "Ph.D. in Management",
    courses: ["BED401"],
    totalHours: 7,
    status: "Active",
    joinDate: "2009-01-18"
  },
  {
    id: "FAC008", 
    name: "Dr. Ravi Gupta",
    email: "ravi.gupta@university.edu",
    phone: "+91 98765 43217",
    department: "Education",
    designation: "Professor",
    specialization: "Inclusive Education",
    experience: 16,
    qualification: "Ph.D. in Special Education",
    courses: ["BED402"],
    totalHours: 9,
    status: "Active",
    joinDate: "2007-04-25"
  }
];

export const FacultyManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getDesignationColor = (designation: string) => {
    switch (designation) {
      case "Professor": return "bg-primary/10 text-primary border-primary/20";
      case "Associate Professor": return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      case "Assistant Professor": return "bg-accent/10 text-accent-foreground border-accent/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20";
      case "On Leave": return "bg-warning/10 text-warning border-warning/20";
      case "Inactive": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const departments = [...new Set(facultyData.map(f => f.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Management</h1>
          <p className="text-muted-foreground mt-1">Manage faculty members and their assignments</p>
        </div>
        <Button className="shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Faculty</p>
                <p className="text-2xl font-bold text-primary">{facultyData.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Professors</p>
                <p className="text-2xl font-bold text-primary">
                  {facultyData.filter(f => f.designation === "Professor").length}
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Experience</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.round(facultyData.reduce((sum, f) => sum + f.experience, 0) / facultyData.length)} yrs
                </p>
              </div>
              <Clock className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold text-primary">
                  {facultyData.reduce((sum, f) => sum + f.totalHours, 0)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search faculty name, email, or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", ...departments].map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-muted-foreground">{faculty.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{faculty.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{faculty.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>
                    <Badge className={getDesignationColor(faculty.designation)}>
                      {faculty.designation}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{faculty.specialization}</p>
                      <p className="text-xs text-muted-foreground">{faculty.qualification}</p>
                    </div>
                  </TableCell>
                  <TableCell>{faculty.experience} years</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {faculty.courses.map(course => (
                        <Badge key={course} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{faculty.totalHours}h</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(faculty.status)}>
                      {faculty.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};