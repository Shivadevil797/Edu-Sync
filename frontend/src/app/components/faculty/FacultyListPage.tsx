import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft, Search, Filter, Mail, Phone, User, Trash2, Loader2, Users,
  KeyRound, Eye, EyeOff, Copy, Check, ChevronDown, ChevronUp, Briefcase,
  GraduationCap, BookOpen, Clock, Building, Hash, X
} from 'lucide-react'
import { apiGetStaff, apiGetPrincipalFaculty, apiDeleteStaff, apiResetFacultyPassword } from '@/services/api'

interface FacultyListPageProps {
  onBack: () => void
  userRole?: 'admin' | 'principal'
}

interface FacultyItem {
  _id: string
  fullName: string
  employeeId?: string
  designation: string
  qualification?: string
  experience?: string
  specialization?: string
  phone?: string
  office?: string
  subjects?: string[]
  yearHandling?: number[]
  sectionHandling?: string[]
  weeklyHours?: number
  labHours?: number
  theoryHours?: number
  departmentId?: { _id: string; name: string; fullName: string }
  userId?: { _id: string; username: string; email: string; role: string }
  isHOD?: boolean
  credentials?: { username: string; password: string }
  createdAt?: string
}

export function FacultyListPage({ onBack, userRole = 'admin' }: FacultyListPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [facultyList, setFacultyList] = useState<FacultyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [departments, setDepartments] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showPasswordFor, setShowPasswordFor] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [resetModalFor, setResetModalFor] = useState<FacultyItem | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [resettingPassword, setResettingPassword] = useState(false)
  const [resetResult, setResetResult] = useState<{ username: string; password: string } | null>(null)

  // Fetch faculty from backend
  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    setLoading(true)
    setError('')
    try {
      let data: any
      if (userRole === 'admin') {
        data = await apiGetStaff({ limit: 200 })
        setFacultyList(data.staff || [])
      } else {
        data = await apiGetPrincipalFaculty()
        setFacultyList(data.faculty || [])
      }
      // Extract unique department names for filter dropdown
      const allFaculty = data.staff || data.faculty || []
      const deptNames = [...new Set(allFaculty.map((f: FacultyItem) =>
        f.departmentId?.name || 'Unknown'
      ))].filter(Boolean).sort() as string[]
      setDepartments(deptNames)
    } catch (err: any) {
      setError(err.message || 'Failed to load faculty list')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFaculty = async (faculty: FacultyItem) => {
    if (!window.confirm(`Are you sure you want to permanently delete ${faculty.fullName}? This action cannot be undone.`)) return

    try {
      await apiDeleteStaff(faculty._id, 'Removed by admin')
      setFacultyList(prev => prev.filter(f => f._id !== faculty._id))
      alert(`${faculty.fullName} has been permanently deleted.`)
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`)
    }
  }

  const handleResetPassword = async () => {
    if (!resetModalFor) return
    setResettingPassword(true)
    try {
      const data = await apiResetFacultyPassword(resetModalFor._id, newPassword || undefined)
      setResetResult(data.credentials)
      // Update the faculty list with the new credentials
      setFacultyList(prev => prev.map(f =>
        f._id === resetModalFor._id
          ? { ...f, credentials: data.credentials }
          : f
      ))
    } catch (err: any) {
      alert(`Failed to reset password: ${err.message}`)
    } finally {
      setResettingPassword(false)
    }
  }

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const filteredFaculty = facultyList
    .filter(faculty => {
      const name = faculty.fullName || ''
      const email = faculty.userId?.email || ''
      const empId = faculty.employeeId || ''
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           empId.toLowerCase().includes(searchQuery.toLowerCase())
      const dept = faculty.departmentId?.name || ''
      const matchesDepartment = departmentFilter === 'all' || dept === departmentFilter
      return matchesSearch && matchesDepartment
    })
    .sort((a, b) => {
      if (sortBy === 'name') return (a.fullName || '').localeCompare(b.fullName || '')
      if (sortBy === 'department') return (a.departmentId?.name || '').localeCompare(b.departmentId?.name || '')
      if (sortBy === 'designation') return (a.designation || '').localeCompare(b.designation || '')
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-gray-900">Faculty Management</h1>
            <p className="text-sm text-gray-600">View and manage all faculty members</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {facultyList.length} total
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email or employee ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="department">Sort by Department</SelectItem>
                  <SelectItem value="designation">Sort by Designation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-3" />
            <p className="text-sm text-gray-500">Loading faculty members...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-3">{error}</p>
              <Button size="sm" onClick={fetchFaculty}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && facultyList.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Faculty Registered Yet</h3>
              <p className="text-sm text-gray-500">Faculty members will appear here once they register through the Faculty or HOD registration portal.</p>
            </CardContent>
          </Card>
        )}

        {/* Faculty List */}
        {!loading && !error && filteredFaculty.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Showing {filteredFaculty.length} of {facultyList.length} faculty members</p>
            </div>

            {filteredFaculty.map((faculty) => {
              const isExpanded = expandedId === faculty._id
              return (
                <Card key={faculty._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Compact Row */}
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        faculty.isHOD || faculty.userId?.role === 'hod' ? 'bg-purple-100' : 'bg-blue-100'
                      }`}>
                        <User className={`w-5 h-5 ${
                          faculty.isHOD || faculty.userId?.role === 'hod' ? 'text-purple-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 mb-1 flex items-center gap-2 flex-wrap">
                          {faculty.fullName}
                          {(faculty.isHOD || faculty.userId?.role === 'hod') && (
                            <Badge className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0">HOD</Badge>
                          )}
                          {faculty.employeeId && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-mono">{faculty.employeeId}</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Building className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="font-medium">Dept:</span> {faculty.departmentId?.name || 'N/A'}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="font-medium">Designation:</span> {faculty.designation || 'N/A'}
                          </div>
                          {faculty.qualification && (
                            <div className="flex items-center gap-1.5">
                              <GraduationCap className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="font-medium">Qual:</span> {faculty.qualification}
                            </div>
                          )}
                          {faculty.userId?.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="truncate">{faculty.userId.email}</span>
                            </div>
                          )}
                          {faculty.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span>{faculty.phone}</span>
                            </div>
                          )}
                          {faculty.userId?.username && (
                            <div className="flex items-center gap-1">
                              <Hash className="w-3 h-3 text-gray-400 flex-shrink-0" />
                              <span className="font-mono text-[11px]">{faculty.userId.username}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          size="sm" variant="ghost"
                          className="text-gray-400 hover:text-blue-600 p-1.5 h-auto"
                          onClick={() => setExpandedId(isExpanded ? null : faculty._id)}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        {userRole === 'admin' && (
                          <>
                            <Button
                              size="sm" variant="ghost"
                              className="text-gray-400 hover:text-amber-600 p-1.5 h-auto"
                              title="Reset Password"
                              onClick={() => { setResetModalFor(faculty); setNewPassword(''); setResetResult(null) }}
                            >
                              <KeyRound className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm" variant="ghost"
                              className="text-gray-400 hover:text-red-600 p-1.5 h-auto"
                              title="Delete Faculty"
                              onClick={() => handleDeleteFaculty(faculty)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Experience */}
                          {faculty.experience && (
                            <div className="flex items-start gap-2 text-sm">
                              <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Experience</p>
                                <p className="text-gray-800">{faculty.experience}</p>
                              </div>
                            </div>
                          )}

                          {/* Specialization */}
                          {faculty.specialization && (
                            <div className="flex items-start gap-2 text-sm">
                              <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Specialization</p>
                                <p className="text-gray-800">{faculty.specialization}</p>
                              </div>
                            </div>
                          )}

                          {/* Office */}
                          {faculty.office && (
                            <div className="flex items-start gap-2 text-sm">
                              <Building className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Office</p>
                                <p className="text-gray-800">{faculty.office}</p>
                              </div>
                            </div>
                          )}

                          {/* Subjects */}
                          {faculty.subjects && faculty.subjects.length > 0 && (
                            <div className="flex items-start gap-2 text-sm md:col-span-2">
                              <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Subjects</p>
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {faculty.subjects.map((s, i) => (
                                    <Badge key={i} variant="secondary" className="text-[10px]">{s}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Year & Section Handling */}
                          {faculty.yearHandling && faculty.yearHandling.length > 0 && (
                            <div className="flex items-start gap-2 text-sm">
                              <GraduationCap className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Year Handling</p>
                                <p className="text-gray-800">{faculty.yearHandling.join(', ')}</p>
                              </div>
                            </div>
                          )}

                          {faculty.sectionHandling && faculty.sectionHandling.length > 0 && (
                            <div className="flex items-start gap-2 text-sm">
                              <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Section Handling</p>
                                <p className="text-gray-800">{faculty.sectionHandling.join(', ')}</p>
                              </div>
                            </div>
                          )}

                          {/* Hours */}
                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500 font-medium">Hours / Week</p>
                              <p className="text-gray-800">
                                {faculty.weeklyHours ?? '–'} total
                                {(faculty.theoryHours != null || faculty.labHours != null) && (
                                  <span className="text-gray-500 ml-1">
                                    ({faculty.theoryHours ?? 0} theory + {faculty.labHours ?? 0} lab)
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Credentials (Admin only) */}
                          {userRole === 'admin' && faculty.credentials && (
                            <div className="md:col-span-3 bg-amber-50 border border-amber-100 rounded-lg p-3">
                              <p className="text-xs text-amber-700 font-semibold mb-2 flex items-center gap-1.5">
                                <KeyRound className="w-3.5 h-3.5" /> Login Credentials
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-600 w-16">Username:</span>
                                  <code className="text-xs bg-white px-2 py-0.5 rounded border flex-1 font-mono">{faculty.credentials.username}</code>
                                  <button
                                    className="text-gray-400 hover:text-blue-600"
                                    onClick={() => copyToClipboard(faculty.credentials!.username, `user-${faculty._id}`)}
                                  >
                                    {copiedField === `user-${faculty._id}` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-600 w-16">Password:</span>
                                  <code className="text-xs bg-white px-2 py-0.5 rounded border flex-1 font-mono">
                                    {showPasswordFor === faculty._id ? (faculty.credentials.password || '[not available]') : '••••••••'}
                                  </code>
                                  <button
                                    className="text-gray-400 hover:text-blue-600"
                                    onClick={() => setShowPasswordFor(showPasswordFor === faculty._id ? null : faculty._id)}
                                  >
                                    {showPasswordFor === faculty._id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  </button>
                                  {faculty.credentials.password && (
                                    <button
                                      className="text-gray-400 hover:text-blue-600"
                                      onClick={() => copyToClipboard(faculty.credentials!.password, `pw-${faculty._id}`)}
                                    >
                                      {copiedField === `pw-${faculty._id}` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Joined Date */}
                          {faculty.createdAt && (
                            <div className="flex items-start gap-2 text-sm">
                              <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Joined</p>
                                <p className="text-gray-800">{new Date(faculty.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Filtered empty state */}
        {!loading && !error && facultyList.length > 0 && filteredFaculty.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No faculty members match your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Password Reset Modal */}
      {resetModalFor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-500" /> Reset Password
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setResetModalFor(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Resetting password for <strong>{resetModalFor.fullName}</strong>
                {resetModalFor.userId?.username && (
                  <span className="text-gray-400 ml-1">(@{resetModalFor.userId.username})</span>
                )}
              </p>

              {resetResult ? (
                /* Show new credentials after successful reset */
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-700 mb-3">✅ Password reset successfully!</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-16">Username:</span>
                        <code className="text-sm bg-white px-2 py-0.5 rounded border flex-1 font-mono">{resetResult.username}</code>
                        <button onClick={() => copyToClipboard(resetResult.username, 'reset-user')} className="text-gray-400 hover:text-blue-600">
                          {copiedField === 'reset-user' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-16">Password:</span>
                        <code className="text-sm bg-white px-2 py-0.5 rounded border flex-1 font-mono">{resetResult.password}</code>
                        <button onClick={() => copyToClipboard(resetResult.password, 'reset-pw')} className="text-gray-400 hover:text-blue-600">
                          {copiedField === 'reset-pw' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-amber-600 mt-3">⚠️ Make sure to share these credentials with the faculty member securely.</p>
                  </div>
                  <Button className="w-full" variant="outline" onClick={() => setResetModalFor(null)}>Close</Button>
                </div>
              ) : (
                /* Password reset form */
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">New Password (optional)</label>
                    <Input
                      type="text"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Leave blank to auto-generate"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-400 mt-1">If left blank, a secure password will be generated automatically.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setResetModalFor(null)}>Cancel</Button>
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                      onClick={handleResetPassword}
                      disabled={resettingPassword}
                    >
                      {resettingPassword ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <KeyRound className="w-4 h-4 mr-2" />}
                      Reset Password
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
