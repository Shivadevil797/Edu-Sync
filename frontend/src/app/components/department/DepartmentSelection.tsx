import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users, BookOpen, Calendar } from 'lucide-react'

interface DepartmentSelectionProps {
  onBack: () => void
  onDepartmentSelect: (department: any) => void
}

export function DepartmentSelection({ onBack, onDepartmentSelect }: DepartmentSelectionProps) {
  const departments = [
    {
      id: 'bca',
      name: 'Bachelor of Computer Applications',
      shortName: 'BCA',
      students: 180,
      faculty: 12,
      courses: 8,
      gradient: 'from-blue-400 to-cyan-500',
      icon: '💻'
    },
    {
      id: 'bcom',
      name: 'Bachelor of Commerce',
      shortName: 'B.Com',
      students: 220,
      faculty: 15,
      courses: 10,
      gradient: 'from-green-400 to-emerald-500',
      icon: '💼'
    },
    {
      id: 'bba',
      name: 'Bachelor of Business Administration',
      shortName: 'BBA',
      students: 160,
      faculty: 10,
      courses: 9,
      gradient: 'from-purple-400 to-pink-500',
      icon: '📊'
    },
    {
      id: 'bcom-af',
      name: 'Bachelor of Commerce (Accounting & Finance)',
      shortName: 'B.Com A&F',
      students: 140,
      faculty: 8,
      courses: 7,
      gradient: 'from-orange-400 to-red-500',
      icon: '📈'
    },
    {
      id: 'bsc-it',
      name: 'Bachelor of Science in Information Technology',
      shortName: 'B.Sc IT',
      students: 120,
      faculty: 9,
      courses: 8,
      gradient: 'from-indigo-400 to-blue-500',
      icon: '🔧'
    },
    {
      id: 'mca',
      name: 'Master of Computer Applications',
      shortName: 'MCA',
      students: 80,
      faculty: 6,
      courses: 6,
      gradient: 'from-teal-400 to-green-500',
      icon: '🎓'
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
            <h1 className="text-gray-900">Select Department</h1>
            <p className="text-sm text-gray-600">Choose your department to continue</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Welcome Message */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-gray-800">Welcome, HOD!</h2>
          <p className="text-gray-600 text-sm">
            Please select your department to access the dashboard
          </p>
        </div>

        {/* Department Cards */}
        <div className="space-y-4">
          {departments.map((dept) => (
            <Card 
              key={dept.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden"
              onClick={() => onDepartmentSelect(dept)}
            >
              <div className={`h-2 bg-gradient-to-r ${dept.gradient}`}></div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{dept.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{dept.name}</h3>
                      <div className="text-sm text-gray-600 mb-3">{dept.shortName}</div>
                      
                      <div className="flex gap-6">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{dept.students} Students</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <BookOpen className="w-3 h-3" />
                          <span>{dept.faculty} Faculty</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{dept.courses} Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.gradient} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-bold text-sm">{dept.shortName.split(' ')[0]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
              <div className="text-xs text-gray-600">Departments</div>
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
        </div>
      </div>
    </div>
  )
}