import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import {
  LogOut,
  Calendar,
  BookOpen,
  Mail,
  Phone,
  Hash,
  GraduationCap
} from 'lucide-react'

interface StudentDashboardProps {
  onBack: () => void
  onNavigate: (page: string) => void
}

export function StudentDashboard({ onBack, onNavigate }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')

  const studentData = {
    name: 'Rahul Kumar',
    rollNumber: 'STU2024001',
    course: 'BCA',
    semester: '5th Semester',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3MTc3NTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    email: 'rahul.kumar@college.edu',
    phone: '+91 98765 43210'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left Sidebar - Student Profile */}
      <div className="w-80 bg-white shadow-lg border-r flex flex-col">
        <div className="p-6 border-b bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
              <ImageWithFallback
                src={studentData.photo}
                alt="Student Photo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-gray-900 mb-1">{studentData.name}</h2>
            <p className="text-gray-600 text-sm mb-1">{studentData.course}</p>
            <p className="text-gray-500 text-xs">{studentData.semester}</p>
          </div>
        </div>

        <div className="p-6 space-y-4 flex-1">
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-2">
              <Hash className="w-4 h-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Roll Number</p>
                <p className="text-sm text-gray-900">{studentData.rollNumber}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-2">
              <Mail className="w-4 h-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-xs text-gray-900">{studentData.email}</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-2">
              <Phone className="w-4 h-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">{studentData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div>
              <h1 className="text-gray-900">Student Portal</h1>
              <p className="text-sm text-gray-600">Welcome back!</p>
            </div>

            <div className="flex items-center gap-3">
              <AvatarDropdown
                userData={{
                  name: studentData.name,
                  role: 'Student',
                  photo: studentData.photo,
                  email: studentData.email,
                  phone: studentData.phone,
                  department: studentData.course
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tab Menu */}
          <div className="flex items-center gap-1 px-4 border-t">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant={activeTab === 'syllabus' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveTab('syllabus')
                onNavigate('syllabus')
              }}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Syllabus
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-gray-900 mb-2">Welcome to Student Portal</h2>
                <p className="text-gray-600 mb-4">
                  Access your academic information and resources
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8.45</div>
                    <div className="text-xs text-gray-600">CGPA</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-xs text-gray-600">Attendance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timetable Cards */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Time-table
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Academic Timetable Card */}
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                  onClick={() => onNavigate('academic-timetable')}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      Academic Time-table
                    </h4>
                    <p className="text-sm text-gray-600">
                      View your daily class schedule and timings
                    </p>
                  </CardContent>
                </Card>

                {/* Exam Timetable Card */}
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                  onClick={() => onNavigate('exam-timetable')}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-gray-900 font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                      Exam Time-table
                    </h4>
                    <p className="text-sm text-gray-600">
                      Check your examination schedule and venues
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
