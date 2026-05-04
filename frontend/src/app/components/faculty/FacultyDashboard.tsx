import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { LeaveRequestForm } from "@/components/common/LeaveRequestForm"
import { LeaveRequestList } from "@/components/common/LeaveRequestList"
import { FacultyTimetablePage } from "@/components/faculty/FacultyTimetablePage"
import {
  LogOut,
  Home,
  BookOpen,
  Award,
  FileText,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Zap
} from 'lucide-react'

interface FacultyDashboardProps {
  onBack: () => void
}

export function FacultyDashboard({ onBack }: FacultyDashboardProps) {
  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState<'home' | 'leave' | 'timetable'>('home')

  useEffect(() => {
    const stored = localStorage.getItem('leaveRequests')
    if (stored) {
      setLeaveRequests(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmitLeave = (request: any) => {
    const updated = [...leaveRequests, request]
    setLeaveRequests(updated)
    localStorage.setItem('leaveRequests', JSON.stringify(updated))
  }

  const facultyData = {
    name: 'Prof. Amit Verma',
    designation: 'Assistant Professor',
    department: 'BCA',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc1NzE3NzUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    email: 'amit.verma@college.edu',
    phone: '+91 98765 43210',
    qualification: 'M.Tech in Computer Science',
    employeeId: 'FAC2024001'
  }

  const subjects = [
    {
      name: 'Data Structures',
      code: 'BCA301',
      class: '3rd Semester - Section A',
      students: 45
    },
    {
      name: 'Database Management Systems',
      code: 'BCA302',
      class: '3rd Semester - Section B',
      students: 42
    },
    {
      name: 'Operating Systems',
      code: 'BCA401',
      class: '5th Semester - Section A',
      students: 38
    }
  ]

  const todaysSchedule = [
    {
      time: '9:00 - 10:00',
      subject: 'Data Structures',
      class: '3rd Sem - Section A',
      room: 'Room-102'
    },
    {
      time: '11:30 - 12:30',
      subject: 'Database Management',
      class: '3rd Sem - Section B',
      room: 'Room-205'
    },
    {
      time: '14:00 - 15:00',
      subject: 'Operating Systems',
      class: '5th Sem - Section A',
      room: 'Room-108'
    }
  ]

  const quotes = [
    "The influence of a good teacher can never be erased.",
    "Teaching is the one profession that creates all other professions.",
    "A teacher affects eternity; he can never tell where his influence stops.",
    "Education is not the filling of a pail, but the lighting of a fire."
  ]

  const getTodayQuote = () => {
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 86400000)
    return quotes[dayOfYear % quotes.length]
  }

  const getMonthName = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'short' })
  }

  const getDay = () => {
    return currentDate.getDate()
  }

  const getYear = () => {
    return currentDate.getFullYear()
  }

  const renderHomeContent = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Section with Date */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-gray-900 text-2xl font-semibold">Welcome back, {facultyData.name}!</h2>
            <p className="text-sm text-gray-600 mt-1">Today is a great day for teaching and learning.</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-blue-600">{getDay()}</div>
            <div className="text-sm text-gray-600 mt-1">{getMonthName()} {getYear()}</div>
          </div>
        </div>

        {/* Quote of the Day */}
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 border-0 text-white">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Quote of the Day</h3>
                <p className="text-sm text-blue-50 italic">"{getTodayQuote()}"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4</div>
              <div className="text-sm text-gray-600">Hours Today</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">3</div>
              <div className="text-sm text-gray-600">Classes Today</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">78%</div>
              <div className="text-sm text-gray-600">Monthly Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-gray-700" />
              <h3 className="text-gray-900 font-semibold">Today's Schedule</h3>
            </div>
            <div className="space-y-3">
              {todaysSchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{schedule.time}</div>
                    <div className="text-sm text-gray-600">
                      {schedule.subject} • {schedule.class}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{schedule.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subjects Handled */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Subjects Handled</h3>
            <div className="grid gap-4">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>Code: <span className="font-medium">{subject.code}</span></span>
                      <span>Class: <span className="font-medium">{subject.class}</span></span>
                      <span>Students: <span className="font-medium text-blue-600">{subject.students}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderLeaveContent = () => {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 text-2xl font-semibold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Leave Requests
          </h2>
          <Button
            onClick={() => setShowLeaveForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Request Leave
          </Button>
        </div>

        <LeaveRequestList
          requests={leaveRequests}
          facultyId={facultyData.email}
        />
      </div>
    )
  }

  const renderTimetableContent = () => {
    return (
      <div>
        <FacultyTimetablePage
          onBack={() => setActiveTab('home')}
          department={facultyData.department}
        />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent()
      case 'leave':
        return renderLeaveContent()
      case 'timetable':
        return renderTimetableContent()
      default:
        return renderHomeContent()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-base font-semibold text-slate-900">Faculty Dashboard</h1>
            <p className="text-xs text-slate-500">{facultyData.department} Department - Teaching Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: facultyData.name,
                role: facultyData.designation,
                photo: facultyData.photo,
                email: facultyData.email,
                phone: facultyData.phone,
                qualification: facultyData.qualification,
                department: facultyData.department
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-500 hover:text-rose-500 hover:bg-red-50 text-xs"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 border-t overflow-x-auto hide-scrollbar">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 ${activeTab === 'home' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button
            variant={activeTab === 'leave' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('leave')}
            className={`flex items-center gap-2 ${activeTab === 'leave' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}
          >
            <FileText className="w-4 h-4" />
            Leave Requests
          </Button>
          <Button
            variant={activeTab === 'timetable' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 ${activeTab === 'timetable' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}
          >
            <CalendarIcon className="w-4 h-4" />
            Timetable
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {showLeaveForm && (
        <LeaveRequestForm
          onClose={() => setShowLeaveForm(false)}
          onSubmit={handleSubmitLeave}
          facultyName={facultyData.name}
          facultyId={facultyData.email}
          department={facultyData.department}
        />
      )}
    </div>
  )
}