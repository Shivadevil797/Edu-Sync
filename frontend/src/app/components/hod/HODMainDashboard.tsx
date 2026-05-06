import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import {
  apiGetHODDashboard,
  apiGetHODFaculty,
  apiGetHODTimetables,
  apiGetHODLeaveRequests,
  apiReviewHODLeave,
  apiSubmitHODLeave,
  getUser,
} from '@/services/api'
import {
  LogOut, Home, Users, Calendar, Clock,
  CheckCircle, XCircle, Loader2, AlertTriangle,
  FileText, Plus, X, Coffee
} from 'lucide-react'

interface HODMainDashboardProps {
  onBack: () => void
}

interface TimetableSlot {
  day: string; period: number; timeStart: string; timeEnd: string
  subject: string; facultyName: string; room: string; type: string
}

interface TimetableData {
  _id: string; department: string; departmentId?: { name: string; fullName: string }
  year: number; section: string; semester: number; slots: TimetableSlot[]; isPublished: boolean
}

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

export function HODMainDashboard({ onBack }: HODMainDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')
  const [currentDate, setCurrentDate] = useState(new Date())

  // API state
  const [stats, setStats] = useState({ deptFaculty: 0, deptStudents: 0, pendingLeaves: 0 })
  const [deptName, setDeptName] = useState('')
  const [facultyList, setFacultyList] = useState<any[]>([])
  const [timetables, setTimetables] = useState<TimetableData[]>([])
  const [leaveRequests, setLeaveRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Leave form
  const [showLeaveForm, setShowLeaveForm] = useState(false)
  const [leaveForm, setLeaveForm] = useState({ leaveType: 'Casual', startDate: '', endDate: '', reason: '' })
  const [isSubmittingLeave, setIsSubmittingLeave] = useState(false)

  // Logged-in user info
  const user = getUser()
  const hodName = user?.fullName || user?.username || 'HOD'

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true)
      setError('')
      try {
        const [dashData, facData, ttData, leaveData] = await Promise.all([
          apiGetHODDashboard(),
          apiGetHODFaculty().catch(() => ({ faculty: [] })),
          apiGetHODTimetables().catch(() => ({ timetables: [] })),
          apiGetHODLeaveRequests().catch(() => ({ leaveRequests: [] })),
        ])
        setStats(dashData.stats)
        setDeptName(dashData.department?.name || dashData.department?.fullName || '')
        setFacultyList(facData.faculty || [])
        setTimetables(ttData.timetables || [])
        setLeaveRequests(leaveData.leaveRequests || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    fetchAll()
  }, [])

  const handleReviewLeave = async (leaveId: string, status: 'approved' | 'rejected') => {
    try {
      await apiReviewHODLeave(leaveId, status)
      const leaveData = await apiGetHODLeaveRequests()
      setLeaveRequests(leaveData.leaveRequests || [])
      const dashData = await apiGetHODDashboard()
      setStats(dashData.stats)
    } catch (err: any) {
      alert(err.message || `Failed to ${status} leave`)
    }
  }

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leaveForm.startDate || !leaveForm.endDate || !leaveForm.reason) return
    setIsSubmittingLeave(true)
    try {
      await apiSubmitHODLeave(leaveForm)
      setShowLeaveForm(false)
      setLeaveForm({ leaveType: 'Casual', startDate: '', endDate: '', reason: '' })
      alert('Leave request submitted to Principal')
    } catch (err: any) {
      alert(err.message || 'Failed to submit leave')
    } finally {
      setIsSubmittingLeave(false)
    }
  }

  // Timetable grid builder
  const buildGrid = (tt: TimetableData) => {
    const maxPeriod = Math.max(8, ...tt.slots.map(s => s.period))
    const grid: (TimetableSlot | null)[][] = []
    for (let p = 1; p <= maxPeriod; p++) {
      const row: (TimetableSlot | null)[] = []
      for (const day of dayNames) {
        row.push(tt.slots.find(s => s.day === day && s.period === p) || null)
      }
      grid.push(row)
    }
    return grid
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-3" />
        <span className="text-gray-600">Loading dashboard...</span>
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

  const renderHomeContent = () => {
    const day = currentDate.getDate()
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' })
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
      <div className="space-y-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {hodName}!</h2>
            <p className="text-gray-600">{deptName} Department · Head of Department</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-green-600">{day}</div>
            <div className="text-sm text-gray-600">{dayName}</div>
            <div className="text-sm text-gray-600">{monthYear}</div>
          </div>
        </div>

        {/* Quote */}
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

        {/* Stats + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Department Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Students:</span>
                  <span className="text-xl font-bold text-gray-900">{stats.deptStudents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Faculty Members:</span>
                  <span className="text-xl font-bold text-gray-900">{stats.deptFaculty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Leave Requests:</span>
                  <span className={`text-xl font-bold ${stats.pendingLeaves > 0 ? 'text-red-600' : 'text-gray-900'}`}>{stats.pendingLeaves}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('faculty')}>
                  <Users className="w-4 h-4 mr-2" /> View Faculty
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('timetable')}>
                  <Calendar className="w-4 h-4 mr-2" /> View Timetable
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('leave')}>
                  <FileText className="w-4 h-4 mr-2" /> Leave Requests
                  {stats.pendingLeaves > 0 && <Badge className="ml-auto bg-red-500">{stats.pendingLeaves}</Badge>}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowLeaveForm(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Request My Leave
                </Button>
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
          <Users className="w-5 h-5" /> Faculty Management — {deptName}
        </h2>
      </div>

      {facultyList.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Faculty Members</h3>
            <p className="text-sm text-gray-500">No faculty have been registered in your department yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Faculty</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Designation</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyList.map((fac) => {
                    const initials = fac.fullName?.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase() || '?'
                    return (
                      <tr key={fac._id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center font-bold text-sm">
                              {initials}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{fac.fullName}</div>
                              {fac.qualification && <div className="text-xs text-gray-500">{fac.qualification}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-700">{fac.designation || '—'}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{fac.userId?.email || '—'}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{fac.phone || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderLeaveContent = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5" /> Faculty Leave Requests
        </h2>
      </div>

      {leaveRequests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Leave Requests</h3>
            <p className="text-sm text-gray-500">No faculty leave requests to review.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {leaveRequests.map((leave) => (
            <Card key={leave._id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{leave.requesterName}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {leave.leaveType} · {new Date(leave.startDate).toLocaleDateString()} — {new Date(leave.endDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{leave.reason}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {leave.status === 'pending' ? (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8" onClick={() => handleReviewLeave(leave._id, 'approved')}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8" onClick={() => handleReviewLeave(leave._id, 'rejected')}>
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                      </>
                    ) : (
                      <Badge className={leave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {leave.status?.charAt(0).toUpperCase() + leave.status?.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )

  const renderTimetableContent = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Department Timetable
          </h2>
          <p className="text-sm text-gray-600">{deptName} Department</p>
        </div>
      </div>

      {timetables.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Timetable Available</h3>
            <p className="text-sm text-gray-500">Timetable has not been generated for your department yet.</p>
          </CardContent>
        </Card>
      ) : (
        timetables.map(tt => {
          const grid = buildGrid(tt)
          return (
            <Card key={tt._id} className="shadow-lg mb-6">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="w-4 h-4 text-blue-500" />
                  {tt.departmentId?.name || tt.department} — Year {tt.year}, Section {tt.section}
                  {tt.semester && <span className="text-gray-400">· Sem {tt.semester}</span>}
                </div>
              </div>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 border-r sticky left-0 z-10">Time</th>
                        {dayNames.map(d => (
                          <th key={d} className="p-4 text-left font-semibold text-gray-700 bg-gray-50 border-r last:border-r-0 min-w-[150px]">{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {grid.map((row, pIdx) => {
                        const sample = row.find(s => s !== null)
                        const timeLabel = sample ? `${sample.timeStart || ''}–${sample.timeEnd || ''}` : `P${pIdx + 1}`
                        return (
                          <tr key={pIdx} className="border-b last:border-b-0">
                            <td className="p-3 font-medium text-gray-900 bg-gray-50 border-r whitespace-nowrap text-sm sticky left-0 z-10">{timeLabel}</td>
                            {row.map((slot, dIdx) => (
                              <td key={dIdx} className="p-2 border-r last:border-r-0 align-top">
                                {!slot ? (
                                  <div className="h-full min-h-[60px] flex items-center justify-center text-gray-300">—</div>
                                ) : slot.type === 'free' ? (
                                  <div className="text-center py-3 bg-orange-50 text-orange-600 rounded-lg min-h-[60px] flex flex-col items-center justify-center">
                                    <Coffee className="w-4 h-4 mb-1" /><span className="text-xs">Free</span>
                                  </div>
                                ) : (
                                  <div className={`${slot.type === 'lab' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-3 h-full min-h-[60px]`}>
                                    <div className="font-semibold text-gray-900 text-sm mb-1">{slot.facultyName || 'TBA'}</div>
                                    <div className="text-xs text-gray-700">{slot.subject || 'N/A'}</div>
                                    {slot.room && <div className="text-xs text-gray-500 mt-0.5">{slot.room}</div>}
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-base font-semibold text-slate-900">HOD Dashboard</h1>
            <p className="text-xs text-slate-500">{deptName} Department Management</p>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: hodName,
                role: 'Head of Department',
                photo: '',
                email: user?.email || '',
                department: deptName,
              }}
            />
            <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500 hover:text-rose-500 hover:bg-red-50 text-xs">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 border-t overflow-x-auto hide-scrollbar">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'faculty', icon: Users, label: 'Faculty' },
            { id: 'leave', icon: FileText, label: 'Leave Requests' },
            { id: 'timetable', icon: Calendar, label: 'Timetable' },
          ].map(tab => (
            <Button key={tab.id} variant={activeTab === tab.id ? 'default' : 'ghost'} size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${activeTab === tab.id ? 'border-b-2 border-blue-600 rounded-none' : ''}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
              {tab.id === 'leave' && stats.pendingLeaves > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-[10px] px-1.5 h-4">{stats.pendingLeaves}</Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'home' && renderHomeContent()}
          {activeTab === 'faculty' && renderFacultyContent()}
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
                <h3 className="text-lg font-semibold">Request Leave (to Principal)</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowLeaveForm(false)}><X className="w-4 h-4" /></Button>
              </div>
              <form onSubmit={handleSubmitLeave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Leave Type</label>
                  <select value={leaveForm.leaveType} onChange={e => setLeaveForm(p => ({ ...p, leaveType: e.target.value }))}
                    className="w-full mt-1 p-2 border rounded-lg text-sm">
                    <option>Casual</option><option>Sick</option><option>Earned</option><option>Emergency</option>
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
                  {isSubmittingLeave && <Loader2 className="w-4 h-4 animate-spin mr-2" />} Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}