import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import {
  Home,
  MessageCircle,
  Bell,
  LogOut,
  Users,
  Calendar,
  Building,
  BarChart3,
  UserCheck,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Search,
  Filter,
  Quote
} from 'lucide-react'

interface PrincipalDashboardProps {
  onBack: () => void
  onNavigate?: (page: string) => void
}

export function PrincipalDashboard({ onBack, onNavigate }: PrincipalDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')

  // Leadership quotes for principal
  const quotes = [
    "Leadership is not about being in charge. It is about taking care of those in your charge.",
    "The function of leadership is to produce more leaders, not more followers.",
    "Education is the most powerful weapon which you can use to change the world.",
    "A leader is one who knows the way, goes the way, and shows the way.",
    "The art of leadership is saying no, not saying yes. It is very easy to say yes.",
    "Great leaders are willing to sacrifice the numbers to save the people.",
    "Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence."
  ]

  const [quoteOfTheDay] = useState(() => {
    const today = new Date().getDate()
    return quotes[today % quotes.length]
  })

  const [notifications] = useState([
    { id: 1, title: 'New Faculty Application', time: '2 hours ago', urgent: true },
    { id: 2, title: 'Board Meeting Tomorrow', time: '1 day ago', urgent: false },
    { id: 3, title: 'Student Grievance Report', time: '2 days ago', urgent: true }
  ])

  const [messages] = useState([
    { id: 1, sender: 'Dr. Priya Sharma (HOD - BCA)', message: 'Budget approval needed for new lab equipment', time: '1 hour ago', unread: true },
    { id: 2, sender: 'Admin Officer', message: 'Annual inspection scheduled next week', time: '3 hours ago', unread: true },
    { id: 3, sender: 'Student Council', message: 'Request for cultural fest approval', time: '1 day ago', unread: false }
  ])

  const principalData = {
    name: 'Dr. Sunita Mehta',
    designation: 'Principal',
    photo: 'https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBwcmluY2lwYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTcxODA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    email: 'principal@college.edu',
    phone: '+91 98765 43210',
    education: 'Ph.D. in Educational Administration'
  }

  const dashboardOptions = [
    {
      id: 'departments',
      title: 'Departments',
      description: 'View and manage all academic departments',
      icon: Building,
      color: 'from-blue-500 to-blue-600',
      stats: '9 Departments'
    },
    {
      id: 'faculty',
      title: 'Faculty Management',
      description: 'Faculty profiles, recruitment & evaluation',
      icon: UserCheck,
      color: 'from-purple-500 to-purple-600',
      stats: '85 Faculty Members'
    },
    {
      id: 'students',
      title: 'Student Affairs',
      description: 'Student admissions, records & activities',
      icon: GraduationCap,
      color: 'from-orange-500 to-orange-600',
      stats: '1,200+ Students'
    },
    {
      id: 'academics',
      title: 'Academic Planning',
      description: 'Curriculum, timetables & academic calendar',
      icon: BookOpen,
      color: 'from-teal-500 to-teal-600',
      stats: '45 Courses'
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Welcome Board */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900 mb-2">Welcome back, Dr. Mehta!</h2>
                    <p className="text-gray-600">Leading with vision, inspiring excellence in education.</p>

                    {/* Quote of the Day */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Quote of the Day</p>
                          <p className="text-sm text-gray-600 italic mt-1">{quoteOfTheDay}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{new Date().getDate()}</p>
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">9</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">85</div>
                  <div className="text-sm text-gray-600">Faculty</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1,200</div>
                  <div className="text-sm text-gray-600">Students</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">45</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Options */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Management Dashboard</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {dashboardOptions.map((option) => (
                  <Card
                    key={option.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                    onClick={() => {
                      if (onNavigate) {
                        if (option.id === 'departments') onNavigate('departments')
                        else if (option.id === 'academics') onNavigate('timetable')
                        else if (option.id === 'students') onNavigate('student-affairs')
                        else if (option.id === 'faculty') onNavigate('faculty-management')
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <option.icon className="w-7 h-7 text-white" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-gray-900 group-hover:text-blue-600 transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                        <div className="pt-2">
                          <Badge variant="secondary" className="text-xs">
                            {option.stats}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Faculty Meeting Completed</div>
                      <div className="text-xs text-gray-600">Discussed new curriculum updates - 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">Budget Approval Processed</div>
                      <div className="text-xs text-gray-600">Approved lab equipment purchase - 4 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-purple-50">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">New Faculty Interview Scheduled</div>
                      <div className="text-xs text-gray-600">CS Department - Tomorrow 10:00 AM</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900">Messages</h2>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{message.sender}</span>
                          {message.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900">Notifications</h2>
              <Button variant="outline" size="sm">Mark All Read</Button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${notification.urgent ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{notification.title}</div>
                        <div className="text-xs text-gray-600">{notification.time}</div>
                      </div>
                      {notification.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-gray-900">Principal Dashboard</h1>
            <p className="text-sm text-gray-600">College Administration Portal</p>
          </div>

          {/* Menu Bar */}
          <div className="flex items-center gap-1">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('messages')}
              className="flex items-center gap-2 relative"
            >
              <MessageCircle className="w-4 h-4" />
              Messages
              {messages.filter(m => m.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {messages.filter(m => m.unread).length}
                </span>
              )}
            </Button>
            <Button
              variant={activeTab === 'notifications' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('notifications')}
              className="flex items-center gap-2 relative"
            >
              <Bell className="w-4 h-4" />
              Notifications
              {notifications.filter(n => n.urgent).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.urgent).length}
                </span>
              )}
            </Button>
            <AvatarDropdown
              userData={{
                name: principalData.name,
                role: principalData.designation,
                photo: principalData.photo,
                email: principalData.email,
                phone: principalData.phone,
                qualification: principalData.education
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
