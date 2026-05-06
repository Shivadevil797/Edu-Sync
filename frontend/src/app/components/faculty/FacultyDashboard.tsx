import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { FacultyTimetablePage } from "@/components/faculty/FacultyTimetablePage"
import {
  apiGetFacultyDashboard,
  apiGetFacultyTimetables,
  apiGetFacultyLeaveRequests,
  apiSubmitFacultyLeave,
} from '@/services/api'
import {
  LogOut,
  Home,
  BookOpen,
  FileText,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Zap,
  Loader2,
  AlertTriangle,
  X,
} from 'lucide-react'

interface FacultyDashboardProps {
  onBack: () => void
}

interface FacultyProfile {
  fullName: string
  designation: string
  department: string
  departmentName: string
  email: string
  phone: string
  qualification: string
  employeeId: string
}

interface TimetableSlot {
  day: string
  period: number
  timeStart: string
  timeEnd: string
  subject: string
  facultyName: string
  room: string
  type: string
}

export function FacultyDashboard({ onBack }: FacultyDashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'leave' | 'timetable'>('home')
  const [currentDate, setCurrentDate] = useState(new Date())

  // API state
  const [faculty, setFaculty] = useState<FacultyProfile | null>(null)
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>([])
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Leave form state
  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [leaveForm, setLeaveForm] = useState({ leaveType: 'Casual', startDate: '', endDate: '', reason: '' })
  const [isSubmittingLeave, setIsSubmittingLeave] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError('')
      try {
        const [dashData, ttData, leaveData] = await Promise.all([
          apiGetFacultyDashboard(),
          apiGetFacultyTimetables().catch(() => ({ timetables: [] })),
          apiGetFacultyLeaveRequests().catch(() => ({ leaveRequests: [] })),
        ])

        // Parse faculty profile
        const f = dashData.faculty
        setFaculty({
          fullName: f.fullName || 'Faculty Member',
          designation: f.designation || 'Faculty',
          department: f.departmentId?.name || '',
          departmentName: f.departmentId?.fullName || f.departmentId?.name || '',
          email: f.userId?.email || '',
          phone: f.phone || '',
          qualification: f.qualification || '',
          employeeId: f.employeeId || '',
        })

        // Collect all slots from all timetables
        const allSlots: TimetableSlot[] = []
        for (const tt of (ttData.timetables || [])) {
          for (const slot of (tt.slots || [])) {
            allSlots.push(slot)
          }
        }
        setTimetableSlots(allSlots)

        setLeaveRequests(leaveData.leaveRequests || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Derived data from timetable slots
  const todayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
  const todaysSlots = timetableSlots
    .filter(s => s.day === todayName)
    .sort((a, b) => a.period - b.period)

  const uniqueSubjects = [...new Set(timetableSlots.map(s => s.subject))].filter(Boolean)

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

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) return
    setIsSubmittingLeave(true)
    try {
      await apiSubmitFacultyLeave(leaveForm)
      // Refresh leave requests
      const leaveData = await apiGetFacultyLeaveRequests()
      setLeaveRequests(leaveData.leaveRequests || [])
      setShowLeaveForm(false)
      setLeaveForm({ leaveType: 'Casual', startDate: '', endDate: '', reason: '' })
    } catch (err: any) {
      alert(err.message || 'Failed to submit leave')
    } finally {
      setIsSubmittingLeave(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-semibold text-red-800 mb-1">Failed to Load</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={onBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderHomeContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-gray-900 text-2xl font-semibold">Welcome back, {faculty?.fullName}!</h2>
          <p className="text-sm text-gray-600 mt-1">
            {faculty?.designation} · {faculty?.departmentName || faculty?.department} Department
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-blue-600">{currentDate.getDate()}</div>
          <div className="text-sm text-gray-600 mt-1">
            {currentDate.toLocaleDateString('en-US', { month: 'short' })} {currentDate.getFullYear()}
          </div>
        </div>
      </div>

      {/* Quote */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{todaysSlots.length}</div>
            <div className="text-sm text-gray-600">Classes Today</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{uniqueSubjects.length}</div>
            <div className="text-sm text-gray-600">Subjects Handled</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {leaveRequests.filter(l => l.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Leaves</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-gray-700" />
            <h3 className="text-gray-900 font-semibold">Today's Schedule — {todayName}</h3>
          </div>
          {todaysSlots.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No classes scheduled for today</p>
              {timetableSlots.length === 0 && (
                <p className="text-xs text-gray-400 mt-1">Timetable has not been generated yet</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {todaysSlots.map((slot, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{slot.timeStart} - {slot.timeEnd}</div>
                    <div className="text-sm text-gray-600">{slot.subject} · Period {slot.period}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{slot.room}</div>
                    <div className="text-xs text-gray-400">{slot.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subjects */}
      {uniqueSubjects.length > 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-gray-900 font-semibold mb-4">Subjects Handled</h3>
            <div className="grid gap-3">
              {uniqueSubjects.map((subj, i) => {
                const subSlots = timetableSlots.filter(s => s.subject === subj)
                return (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{subj}</h4>
                      <p className="text-sm text-gray-600">{subSlots.length} slots/week</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderLeaveContent = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 text-2xl font-semibold flex items-center gap-2">
          <FileText className="w-6 h-6" /> Leave Requests
        </h2>
        <Button onClick={() => setShowLeaveForm(true)} className="bg-gradient-to-r from-blue-500 to-blue-600">
          <Plus className="w-4 h-4 mr-2" /> Request Leave
        </Button>
      </div>

      {leaveRequests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Leave Requests</h3>
            <p className="text-sm text-gray-500">You haven't submitted any leave requests yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {leaveRequests.map((leave, i) => (
            <Card key={leave._id || i} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{leave.leaveType || 'Leave'}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {new Date(leave.startDate).toLocaleDateString()} — {new Date(leave.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{leave.reason}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                    leave.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {leave.status?.charAt(0).toUpperCase() + leave.status?.slice(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  const renderTimetableContent = () => (
    <FacultyTimetablePage onBack={() => setActiveTab('home')} department={faculty?.department || ''} />
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-base font-semibold text-slate-900">Faculty Dashboard</h1>
            <p className="text-xs text-slate-500">{faculty?.department} Department · {faculty?.designation}</p>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: faculty?.fullName || '',
                role: faculty?.designation || '',
                photo: '',
                email: faculty?.email || '',
                phone: faculty?.phone || '',
                qualification: faculty?.qualification || '',
                department: faculty?.department || ''
              }}
            />
            <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500 hover:text-rose-500 hover:bg-red-50 text-xs">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 border-t overflow-x-auto hide-scrollbar">
          <Button variant={activeTab === 'home' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 ${activeTab === 'home' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}>
            <Home className="w-4 h-4" /> Home
          </Button>
          <Button variant={activeTab === 'leave' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('leave')}
            className={`flex items-center gap-2 ${activeTab === 'leave' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}>
            <FileText className="w-4 h-4" /> Leave Requests
          </Button>
          <Button variant={activeTab === 'timetable' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 ${activeTab === 'timetable' ? 'border-b-2 border-blue-600 rounded-none' : ''}`}>
            <CalendarIcon className="w-4 h-4" /> Timetable
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'home' && renderHomeContent()}
          {activeTab === 'leave' && renderLeaveContent()}
          {activeTab === 'timetable' && renderTimetableContent()}
        </div>
      </div>

      {/* Leave Form Modal */}
      {showLeaveForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Request Leave</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowLeaveForm(false)}><X className="w-4 h-4" /></Button>
              </div>
              <form onSubmit={handleSubmitLeave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Leave Type</label>
                  <select value={leaveForm.leaveType} onChange={e => setLeaveForm(p => ({ ...p, leaveType: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-lg text-sm">
                    <option>Casual</option>
                    <option>Sick</option>
                    <option>Earned</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <input type="date" value={leaveForm.startDate} onChange={e => setLeaveForm(p => ({ ...p, startDate: e.target.value }))}
                      className="w-full mt-1 p-2 border rounded-lg text-sm" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <input type="date" value={leaveForm.endDate} onChange={e => setLeaveForm(p => ({ ...p, endDate: e.target.value }))}
                      className="w-full mt-1 p-2 border rounded-lg text-sm" required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Reason</label>
                  <textarea value={leaveForm.reason} onChange={e => setLeaveForm(p => ({ ...p, reason: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-lg text-sm" rows={3} required placeholder="Describe your reason..." />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmittingLeave}>
                  {isSubmittingLeave ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}