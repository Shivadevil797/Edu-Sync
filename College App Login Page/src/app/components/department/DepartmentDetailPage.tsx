import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, User } from 'lucide-react'

interface DepartmentDetailPageProps {
  onBack: () => void
  department: any
}

export function DepartmentDetailPage({ onBack, department }: DepartmentDetailPageProps) {
  const facultyByDepartment: { [key: string]: any[] } = {
    'bca': [
      { id: 1, name: 'Dr. Rajesh Kumar', designation: 'Professor & HOD', email: 'rajesh@college.edu', phone: '+91 98765 43210', specialization: 'Data Structures & Algorithms' },
      { id: 2, name: 'Prof. Suresh Kumar', designation: 'Assistant Professor', email: 'suresh@college.edu', phone: '+91 98765 43214', specialization: 'Database Management' },
      { id: 3, name: 'Dr. Anita Desai', designation: 'Associate Professor', email: 'anita@college.edu', phone: '+91 98765 43220', specialization: 'Web Development' },
      { id: 4, name: 'Prof. Vikram Reddy', designation: 'Assistant Professor', email: 'vikram@college.edu', phone: '+91 98765 43221', specialization: 'Operating Systems' }
    ],
    'bcom': [
      { id: 5, name: 'Dr. Priya Sharma', designation: 'Associate Professor & HOD', email: 'priya@college.edu', phone: '+91 98765 43211', specialization: 'Financial Accounting' },
      { id: 6, name: 'Prof. Kavita Rao', designation: 'Associate Professor', email: 'kavita@college.edu', phone: '+91 98765 43215', specialization: 'Business Economics' },
      { id: 7, name: 'Dr. Ramesh Iyer', designation: 'Professor', email: 'ramesh@college.edu', phone: '+91 98765 43222', specialization: 'Corporate Law' }
    ],
    'bcom-af': [
      { id: 8, name: 'Dr. Amit Verma', designation: 'Assistant Professor & HOD', email: 'amit@college.edu', phone: '+91 98765 43212', specialization: 'Financial Management' },
      { id: 9, name: 'Prof. Nisha Patel', designation: 'Assistant Professor', email: 'nisha@college.edu', phone: '+91 98765 43223', specialization: 'Cost Accounting' }
    ],
    'bba': [
      { id: 10, name: 'Dr. Neha Gupta', designation: 'Professor & HOD', email: 'neha@college.edu', phone: '+91 98765 43213', specialization: 'Human Resource Management' },
      { id: 11, name: 'Prof. Arun Mehta', designation: 'Associate Professor', email: 'arun@college.edu', phone: '+91 98765 43224', specialization: 'Marketing Management' },
      { id: 12, name: 'Dr. Pooja Singh', designation: 'Assistant Professor', email: 'pooja@college.edu', phone: '+91 98765 43225', specialization: 'Operations Management' }
    ],
    'kannada': [
      { id: 13, name: 'Dr. Padmavathi Rao', designation: 'Professor & HOD', email: 'padmavathi@college.edu', phone: '+91 98765 43216', specialization: 'Kannada Literature' },
      { id: 14, name: 'Prof. Gowri Shankar', designation: 'Associate Professor', email: 'gowri@college.edu', phone: '+91 98765 43226', specialization: 'Kannada Grammar' }
    ],
    'hindi': [
      { id: 15, name: 'Dr. Ramesh Chandra Sharma', designation: 'Professor & HOD', email: 'ramesh.sharma@college.edu', phone: '+91 98765 43217', specialization: 'Hindi Literature' },
      { id: 16, name: 'Prof. Sunita Devi', designation: 'Assistant Professor', email: 'sunita@college.edu', phone: '+91 98765 43227', specialization: 'Hindi Poetry' }
    ],
    'sanskrit': [
      { id: 17, name: 'Dr. Vidya Shankar Mishra', designation: 'Professor & HOD', email: 'vidya@college.edu', phone: '+91 98765 43218', specialization: 'Vedic Studies' },
      { id: 18, name: 'Prof. Krishna Murthy', designation: 'Associate Professor', email: 'krishna@college.edu', phone: '+91 98765 43228', specialization: 'Sanskrit Grammar' }
    ],
    'english-literature': [
      { id: 19, name: 'Dr. Margaret Thompson', designation: 'Professor & HOD', email: 'margaret@college.edu', phone: '+91 98765 43219', specialization: 'English Literature' },
      { id: 20, name: 'Prof. David Brown', designation: 'Associate Professor', email: 'david@college.edu', phone: '+91 98765 43229', specialization: 'Communication Skills' }
    ],
    'mathematics': [
      { id: 21, name: 'Dr. Suresh Kumar Singh', designation: 'Professor & HOD', email: 'suresh.singh@college.edu', phone: '+91 98765 43230', specialization: 'Applied Mathematics' },
      { id: 22, name: 'Prof. Lakshmi Narayan', designation: 'Associate Professor', email: 'lakshmi@college.edu', phone: '+91 98765 43231', specialization: 'Statistics' }
    ]
  }

  const facultyList = facultyByDepartment[department.id] || []

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
            <h1 className="text-gray-900">{department.name}</h1>
            <p className="text-sm text-gray-600">{department.description}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Department Header */}
        <Card>
          <div className={`h-2 bg-gradient-to-r ${department.gradient}`}></div>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${department.gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{department.icon}</span>
              </div>
              <div className="flex-1">
                <Badge className={`bg-gradient-to-r ${department.gradient} text-white border-0 mb-2`}>
                  {department.shortName}
                </Badge>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">{department.students}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{department.faculty}</div>
                    <div className="text-xs text-gray-600">Faculty</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{department.courses}</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty List */}
        <div>
          <h2 className="text-gray-900 mb-4">Faculty Members</h2>
          <div className="grid gap-3">
            {facultyList.map((faculty) => (
              <Card key={faculty.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 mb-1">{faculty.name}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                        <div><span className="font-medium">Designation:</span> {faculty.designation}</div>
                        <div><span className="font-medium">Specialization:</span> {faculty.specialization}</div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{faculty.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{faculty.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}