import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, BookOpen, Calendar, GraduationCap } from 'lucide-react'

interface DepartmentsPageProps {
  onBack: () => void
  onDepartmentClick?: (department: any) => void
}

export function DepartmentsPage({ onBack, onDepartmentClick }: DepartmentsPageProps) {
  const departments = [
    {
      id: 'bca',
      name: 'Bachelor in Computer Applications',
      shortName: 'BCA',
      students: 180,
      faculty: 12,
      courses: 8,
      hod: 'Dr. Rajesh Kumar',
      gradient: 'from-blue-400 to-cyan-500',
      icon: '💻',
      description: 'Computer Science and Application Development'
    },
    {
      id: 'bcom',
      name: 'Bachelor of Commerce',
      shortName: 'BCOM',
      students: 220,
      faculty: 15,
      courses: 10,
      hod: 'Dr. Priya Sharma',
      gradient: 'from-green-400 to-emerald-500',
      icon: '💼',
      description: 'Commerce, Economics and Business Studies'
    },
    {
      id: 'bcom-af',
      name: 'Bachelor of Commerce (Accounting & Finance)',
      shortName: 'BCOM A&F',
      students: 140,
      faculty: 8,
      courses: 7,
      hod: 'Dr. Amit Verma',
      gradient: 'from-orange-400 to-red-500',
      icon: '📈',
      description: 'Specialized Accounting and Financial Management'
    },
    {
      id: 'bba',
      name: 'Bachelor of Business Administration',
      shortName: 'BBA',
      students: 160,
      faculty: 10,
      courses: 9,
      hod: 'Dr. Neha Gupta',
      gradient: 'from-purple-400 to-pink-500',
      icon: '📊',
      description: 'Business Management and Administration'
    },
    {
      id: 'kannada',
      name: 'Department of Kannada Language & Literature',
      shortName: 'Kannada',
      students: 85,
      faculty: 6,
      courses: 5,
      hod: 'Dr. Padmavathi Rao',
      gradient: 'from-yellow-400 to-orange-500',
      icon: '🕉️',
      description: 'Kannada Language, Literature and Cultural Studies'
    },
    {
      id: 'hindi',
      name: 'Department of Hindi Language & Literature',
      shortName: 'Hindi',
      students: 95,
      faculty: 7,
      courses: 6,
      hod: 'Dr. Ramesh Chandra Sharma',
      gradient: 'from-red-400 to-pink-500',
      icon: '📚',
      description: 'Hindi Language, Literature and Linguistics'
    },
    {
      id: 'sanskrit',
      name: 'Department of Sanskrit Studies',
      shortName: 'Sanskrit',
      students: 65,
      faculty: 5,
      courses: 4,
      hod: 'Dr. Vidya Shankar Mishra',
      gradient: 'from-indigo-400 to-purple-500',
      icon: '🕉️',
      description: 'Sanskrit Language, Vedic Studies and Ancient Literature'
    },
    {
      id: 'english-literature',
      name: 'Department of English Literature',
      shortName: 'English Literature',
      students: 120,
      faculty: 9,
      courses: 7,
      hod: 'Dr. Margaret Thompson',
      gradient: 'from-teal-400 to-blue-500',
      icon: '📖',
      description: 'English Language, Literature and Communication Studies'
    },
    {
      id: 'mathematics',
      name: 'Department of Mathematics',
      shortName: 'Mathematics',
      students: 150,
      faculty: 11,
      courses: 8,
      hod: 'Dr. Suresh Kumar Singh',
      gradient: 'from-cyan-400 to-green-500',
      icon: '🧮',
      description: 'Pure and Applied Mathematics, Statistics and Data Analysis'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-gray-900">Departments</h1>
            <p className="text-sm text-gray-600">Manage all academic departments</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-800">Academic Departments</h2>
          <p className="text-gray-600 text-sm">
            Select a department to view details and manage operations
          </p>
        </div>

        {/* Department Cards */}
        <div className="space-y-4">
          {departments.map((dept) => (
            <Card
              key={dept.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.01] overflow-hidden group"
              onClick={() => onDepartmentClick && onDepartmentClick(dept)}
            >
              <div className={`h-2 bg-gradient-to-r ${dept.gradient}`}></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{dept.icon}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{dept.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>HOD: {dept.hod}</span>
                        </div>
                      </div>
                      <Badge className={`bg-gradient-to-r ${dept.gradient} text-white border-0`}>
                        {dept.shortName}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{dept.students}</div>
                          <div className="text-xs text-gray-600">Students</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{dept.faculty}</div>
                          <div className="text-xs text-gray-600">Faculty</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{dept.courses}</div>
                          <div className="text-xs text-gray-600">Courses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
              <div className="text-xs text-gray-600">Total Departments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {departments.reduce((sum, d) => sum + d.students, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {departments.reduce((sum, d) => sum + d.faculty, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Faculty</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {departments.reduce((sum, d) => sum + d.courses, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Courses</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
