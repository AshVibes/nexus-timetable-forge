import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  BookOpen, 
  Clock, 
  Users,
  Filter
} from "lucide-react";

const coursesData = [
  {
    id: "BED101",
    name: "Foundations of Education",
    credits: 4,
    type: "Core",
    semester: 1,
    faculty: "Dr. Priya Sharma",
    students: 45,
    status: "Active",
    department: "Education"
  },
  {
    id: "BED102", 
    name: "Child Development & Learning",
    credits: 3,
    type: "Core",
    semester: 1,
    faculty: "Prof. Rajesh Kumar",
    students: 42,
    status: "Active",
    department: "Psychology"
  },
  {
    id: "BED201",
    name: "Pedagogy of Mathematics",
    credits: 4,
    type: "Elective",
    semester: 2,
    faculty: "Dr. Anita Singh",
    students: 38,
    status: "Active", 
    department: "Mathematics"
  },
  {
    id: "BED202",
    name: "Pedagogy of Science",
    credits: 4,
    type: "Elective",
    semester: 2,
    faculty: "Dr. Vikram Patel",
    students: 35,
    status: "Active",
    department: "Science"
  },
  {
    id: "BED301",
    name: "Assessment & Evaluation",
    credits: 3,
    type: "Core",
    semester: 3,
    faculty: "Dr. Meera Joshi",
    students: 40,
    status: "Active",
    department: "Education"
  },
  {
    id: "BED302",
    name: "Educational Technology",
    credits: 2,
    type: "Core", 
    semester: 3,
    faculty: "Prof. Amit Verma",
    students: 44,
    status: "Active",
    department: "Technology"
  },
  {
    id: "BED401",
    name: "School Management",
    credits: 3,
    type: "Elective",
    semester: 4,
    faculty: "Dr. Sunita Rao",
    students: 36,
    status: "Active",
    department: "Management"
  },
  {
    id: "BED402",
    name: "Inclusive Education",
    credits: 3,
    type: "Core",
    semester: 4,
    faculty: "Dr. Ravi Gupta",
    students: 41,
    status: "Active",
    department: "Education"
  }
];

export const CoursesManagementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || course.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Core": return "bg-primary/10 text-primary border-primary/20";
      case "Elective": return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/10 text-success border-success/20";
      case "Inactive": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-1">Manage academic courses and curriculum</p>
        </div>
        <Button className="shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold text-primary">{coursesData.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Core Courses</p>
                <p className="text-2xl font-bold text-primary">
                  {coursesData.filter(c => c.type === "Core").length}
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
                <p className="text-sm text-muted-foreground">Electives</p>
                <p className="text-2xl font-bold text-primary">
                  {coursesData.filter(c => c.type === "Elective").length}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold text-primary">
                  {coursesData.reduce((sum, course) => sum + course.credits, 0)}
                </p>
              </div>
              <Filter className="w-8 h-8 text-primary/60" />
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
                placeholder="Search courses, faculty, or course code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["All", "Core", "Elective"].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Courses List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{course.name}</p>
                      <p className="text-sm text-muted-foreground">{course.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(course.type)}>
                      {course.type}
                    </Badge>
                  </TableCell>
                  <TableCell>Sem {course.semester}</TableCell>
                  <TableCell>{course.faculty}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
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