import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { LeaveRequestForm } from "@/components/common/LeaveRequestForm"
import { LogOut, Home, Users, Calendar, User, Mail, Phone, MapPin, GraduationCap, Briefcase, Clock, Eye, Edit, CheckCircle, XCircle } from 'lucide-react'

interface HODMainDashboardProps {
  onBack: () => void
}

export function HODMainDashboard({ onBack }: HODMainDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')
  const [showLeaveRequest, setShowLeaveRequest] = useState(false)
  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isEditingTimetable, setIsEditingTimetable] = useState(false)
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const hodData = {
    name: 'Dr. Rajesh Kumar',
    designation: 'Head of Department - BCA',
    department: 'BCA',
    dob: '15th March, 1975',
    email: 'rajesh.kumar@college.edu',
    phone: '+91 98765 43210',
    office: 'BCA Block, Room 301',
    education: [
      'Ph.D. in Computer Science - IIT Delhi (2005)',
      'M.Tech in Software Engineering - IIT Bombay (2001)',
      'B.Tech in Computer Science - Delhi University (1998)'
    ],
    experience: '20+ Years',
    specialization: 'Software Engineering, AI & ML'
  }

  const departmentStats = {
    totalStudents: 180,
    facultyMembers: 4,
    activeCourses: 8,
    pendingLeaveRequests: 3
  }

  const todaySchedule = [
    { time: '9:00 AM', title: 'Data Structures Lecture', location: 'BCA-101', students: '45 students' },
    { time: '11:00 AM', title: 'Faculty Meeting', location: 'Conference Hall', students: '' },
    { time: '2:00 PM', title: 'Student Counseling', location: 'Office', students: '' },
    { time: '4:00 PM', title: 'Research Review', location: 'Lab-2', students: '' }
  ]

  const facultyList = [
    {
      id: 1,
      initials: 'PS',
      avatarColor: 'bg-purple-200 text-purple-700',
      name: 'Prof. Priya Sharma',
      qualification: 'M.Tech CSE',
      experience: '8 Years',
      subject: 'Programming in C',
      todayClasses: [
        { class: 'BCA-1', time: '9:30-10:30' },
        { class: 'BCA-2', time: '11:00-12:00' },
        { class: 'BCA-3', time: '1:00-2:00' }
      ],
      dailyHours: '3h',
      withinLimit: true,
      attendance: '95%',
      leaveRequests: { pending: 1, hasRequests: true }
    },
    {
      id: 2,
      initials: 'AV',
      avatarColor: 'bg-pink-200 text-pink-700',
      name: 'Dr. Amit Verma',
      qualification: 'Ph.D. Computer Science',
      experience: '12 Years',
      subject: 'Data Structures',
      todayClasses: [
        { class: 'BCA-1', time: '10:30-11:30' },
        { class: 'BCA-2', time: '12:00-1:00' },
        { class: 'BCA-3', time: '2:00-2:30' }
      ],
      dailyHours: '2.5h',
      withinLimit: true,
      attendance: '98%',
      leaveRequests: { pending: 0, hasRequests: false }
    },
    {
      id: 3,
      initials: 'NG',
      avatarColor: 'bg-green-200 text-green-700',
      name: 'Prof. Neha Gupta',
      qualification: 'M.Tech IT',
      experience: '6 Years',
      subject: 'Database Management',
      todayClasses: [
        { class: 'BCA-2', time: '8:00-9:00' },
        { class: 'BCA-3', time: '9:30-10:30' },
        { class: 'BCA-1', time: '12:30-1:30' },
        { class: 'BCA-2', time: '2:00-2:30' }
      ],
      dailyHours: '4h',
      withinLimit: true,
      attendance: '92%',
      leaveRequests: { pending: 2, hasRequests: true }
    },
    {
      id: 4,
      initials: 'RS',
      avatarColor: 'bg-yellow-200 text-yellow-700',
      name: 'Prof. Rohit Singh',
      qualification: 'M.Sc Computer Science',
      experience: '5 Years',
      subject: 'Web Development',
      todayClasses: [
        { class: 'BCA-1', time: '8:30-9:30' },
        { class: 'BCA-2', time: '11:00-12:00' },
        { class: 'BCA-2', time: '1:30-2:30' }
      ],
      dailyHours: '3h',
      withinLimit: true,
      attendance: '90%',
      leaveRequests: { pending: 0, hasRequests: false }
    }
  ]

  const timetableData = [
    {
      time: '7:30-8:30',
      slots: [null, null, null, null, null, null]
    },
    {
      time: '8:30-9:30',
      slots: [
        { prof: 'Prof. Rohit', subject: 'Web Dev', class: 'BCA-1', color: 'bg-blue-100 border-blue-200' },
        { prof: 'Prof. Neha', subject: 'DBMS', class: 'BCA-2', color: 'bg-green-100 border-green-200' },
        null, null, null, null
      ]
    },
    {
      time: '9:30-10:30',
      slots: [
        { prof: 'Prof. Priya', subject: 'Programming', class: 'BCA-1', color: 'bg-yellow-100 border-yellow-200' },
        null,
        { prof: 'Prof. Neha', subject: 'DBMS', class: 'BCA-3', color: 'bg-green-100 border-green-200' },
        null, null, null
      ]
    },
    {
      time: '10:30-11:30',
      slots: [
        { prof: 'Dr. Amit', subject: 'Data Structures', class: 'BCA-1', color: 'bg-yellow-100 border-yellow-200' },
        null, null, null, null, null
      ]
    },
    {
      time: '11:00-12:00',
      slots: [
        { prof: 'Prof. Rohit', subject: 'Web Dev', class: 'BCA-3', color: 'bg-blue-100 border-blue-200' },
        { prof: 'Prof. Priya', subject: 'Programming', class: 'BCA-2', color: 'bg-yellow-100 border-yellow-200' },
        null, null, null, null
      ]
    }
  ]

  const handleLeaveRequest = () => {
    setShowLeaveRequest(true)
  }

  const handleConfirmLeave = () => {
    setShowLeaveRequest(false)
    setShowLeaveForm(true)
  }

  const handleSubmitLeave = (request: any) => {
    const updated = [...leaveRequests, request]
    setLeaveRequests(updated)
    localStorage.setItem('hodLeaveRequests', JSON.stringify(updated))
    setShowLeaveForm(false)
    alert('Leave request sent successfully')
  }

  const renderHomeContent = () => {
    const day = currentDate.getDate()
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Dr. Kumar!</h2>
            <p className="text-gray-600">Leading the BCA department with excellence and innovation.</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-green-600">{day}</div>
            <div className="text-sm text-gray-600">{dayName}</div>
            <div className="text-sm text-gray-600">{monthYear}</div>
          </div>
        </div>

      {/* Quote of the Day */}
      <Card className="border-l-4 border-green-500 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-green-600 text-2xl">"</div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Quote of the Day</p>
              <p className="text-sm italic text-green-700">Innovation in education starts with a department that embraces change.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats and Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Stats */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Department Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Students:</span>
                <span className="text-xl font-bold text-gray-900">{departmentStats.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Faculty Members:</span>
                <span className="text-xl font-bold text-gray-900">{departmentStats.facultyMembers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Courses:</span>
                <span className="text-xl font-bold text-gray-900">{departmentStats.activeCourses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Leave Requests:</span>
                <span className="text-xl font-bold text-red-600">{departmentStats.pendingLeaveRequests}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {todaySchedule.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-blue-600 font-semibold text-sm w-20 flex-shrink-0">{item.time}</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.location}</p>
                    {item.students && <p className="text-xs text-gray-500">{item.students}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    )
  }

  const renderFacultyContent = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Faculty Management
        </h2>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Faculty</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Today's Classes</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Daily Hours</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Attendance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Leave Requests</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${faculty.avatarColor}`}>
                          {faculty.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{faculty.name}</div>
                          <div className="text-xs text-gray-600">{faculty.qualification}</div>
                          <div className="text-xs text-gray-500">{faculty.experience}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{faculty.subject}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        {faculty.todayClasses.map((cls, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded inline-block">
                            {cls.class} ({cls.time})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{faculty.dailyHours}</span>
                        {faculty.withinLimit && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                            Within Limit
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{faculty.attendance}</span>
                    </td>
                    <td className="py-4 px-4">
                      {faculty.leaveRequests.hasRequests ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{faculty.leaveRequests.pending} pending</span>
                          <CheckCircle className="w-4 h-4 text-green-600 cursor-pointer" />
                          <XCircle className="w-4 h-4 text-red-600 cursor-pointer" />
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">None</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Eye className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                        <Edit className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTimetableContent = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Department Timetable Management
          </h2>
          <p className="text-sm text-gray-600">Working Hours: 7:30 AM - 2:30 PM | Maximum 4 hours per faculty per day</p>
        </div>
        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => setIsEditingTimetable(!isEditingTimetable)}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditingTimetable ? 'Save Timetable' : 'Edit Timetable'}
        </Button>
      </div>

      <Card className="bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50 border-r">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Monday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Tuesday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Wednesday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Thursday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Friday</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-gray-50">Saturday</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-4 px-4 font-medium text-gray-700 bg-gray-50 border-r">{row.time}</td>
                    {row.slots.map((slot, slotIdx) => (
                      <td key={slotIdx} className="py-4 px-4 align-top">
                        {slot ? (
                          <div className={`${slot.color} p-3 rounded-lg border ${isEditingTimetable ? 'cursor-pointer hover:shadow-md' : ''}`}>
                            <p className="font-semibold text-sm text-gray-900">{slot.prof}</p>
                            <p className="text-xs text-gray-700 mt-0.5">{slot.subject}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{slot.class}</p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 py-6">
                            {isEditingTimetable ? (
                              <Button variant="outline" size="sm" className="text-xs">+ Add</Button>
                            ) : (
                              '-'
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent()
      case 'faculty':
        return renderFacultyContent()
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
            <h1 className="text-base font-semibold text-slate-900">HOD Dashboard</h1>
            <p className="text-xs text-slate-500">BCA Department Management</p>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: hodData.name,
                role: hodData.designation,
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
                email: hodData.email,
                phone: hodData.phone,
                department: hodData.department,
                dob: hodData.dob,
                office: hodData.office,
                education: hodData.education.join(', '),
                experience: hodData.experience,
                specialization: hodData.specialization
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
            variant={activeTab === 'faculty' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('faculty')}
            className={`flex items-center gap-2 ${activeTab === 'faculty' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}
          >
            <Users className="w-4 h-4" />
            Faculty
          </Button>
          <Button
            variant={activeTab === 'timetable' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 ${activeTab === 'timetable' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}
          >
            <Calendar className="w-4 h-4" />
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

      {/* Leave Request Confirmation Modal */}
      {showLeaveRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Leave</h3>
              <p className="text-gray-600 mb-6">Do you want to request leave?</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLeaveRequest(false)}
                  className="flex-1"
                >
                  No
                </Button>
                <Button
                  onClick={handleConfirmLeave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Yes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leave Request Form Modal */}
      {showLeaveForm && (
        <LeaveRequestForm
          onClose={() => setShowLeaveForm(false)}
          onSubmit={handleSubmitLeave}
          facultyName={hodData.name}
          facultyId={hodData.email}
          department={hodData.department}
        />
      )}
    </div>
  )
}