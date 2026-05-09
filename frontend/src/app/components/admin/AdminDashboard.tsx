import { useState, useEffect } from 'react'
import { TimetableManagementModal } from './TimetableManagementModal'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { apiGetStudents, apiDeleteStudent } from '@/services/api'
import {
  LogOut,
  UserPlus,
  Users,
  GraduationCap,
  BookOpen,
  X,
  Search,
  Trash2,
  Calendar,
  Upload,
  Loader2,
  AlertTriangle
} from 'lucide-react'

interface AdminDashboardProps {
  onBack: () => void
  onNavigate?: (page: string) => void
}

export function AdminDashboard({ onBack, onNavigate }: AdminDashboardProps) {
  const [showCreatePrincipal, setShowCreatePrincipal] = useState(false)
  const [showStudentRecords, setShowStudentRecords] = useState(false)
  const [showAcademicSettings, setShowAcademicSettings] = useState(false)
  const [showTimetable, setShowTimetable] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [studentSearch, setStudentSearch] = useState('')
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [showSyllabusUpload, setShowSyllabusUpload] = useState(false)
  const [newCourse, setNewCourse] = useState({ name: '', courseId: '' })
  const [syllabusForm, setSyllabusForm] = useState({ stream: '', year: '', file: null as File | null })

  const adminData = {
    name: 'System Administrator',
    email: 'admin@college.edu',
    phone: '+91 99999 99999',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  }

  const [principalForm, setPrincipalForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [allStudents, setAllStudents] = useState<any[]>([])
  const [isLoadingStudents, setIsLoadingStudents] = useState(false)
  const [studentError, setStudentError] = useState('')
  const [totalStudents, setTotalStudents] = useState(0)
  const [isDeletingStudent, setIsDeletingStudent] = useState<string | null>(null)

  const departments = [
    { id: 'BCA', name: 'BCA', color: 'from-blue-500 to-cyan-600' },
    { id: 'BCOM', name: 'BCOM', color: 'from-green-500 to-emerald-600' },
    { id: 'BBA', name: 'BBA', color: 'from-purple-500 to-pink-600' },
    { id: 'BCOM A&F', name: 'BCOM A&F', color: 'from-orange-500 to-red-600' },
    { id: 'MCA', name: 'MCA', color: 'from-indigo-500 to-blue-600' },
    { id: 'MBA', name: 'MBA', color: 'from-pink-500 to-rose-600' },
    { id: 'MCOM', name: 'MCOM', color: 'from-teal-500 to-cyan-600' }
  ]

  const [courses, setCourses] = useState([
    { id: 1, name: 'BCA', courseId: 'BCA' },
    { id: 2, name: 'BBA', courseId: 'BBA' },
    { id: 3, name: 'BCOM', courseId: 'BCOM' },
    { id: 4, name: 'BCOM A&F', courseId: 'BCAF' },
    { id: 5, name: 'MCOM', courseId: 'MCOM' },
    { id: 6, name: 'MBA', courseId: 'MBA' },
    { id: 7, name: 'MCA', courseId: 'MCA' }
  ])

  const academicSettings = {
    currentSession: '2024-2025',
    totalCourses: courses.length
  }

  // Fetch students from API when the modal opens
  const fetchStudents = async (searchTerm?: string, dept?: string) => {
    setIsLoadingStudents(true)
    setStudentError('')
    try {
      const params: any = { limit: '100' }
      if (searchTerm) params.search = searchTerm
      if (dept) params.department = dept
      const res = await apiGetStudents(params)
      setAllStudents(res.students || [])
      setTotalStudents(res.total || 0)
    } catch (err: any) {
      setStudentError(err.message || 'Failed to load students')
      setAllStudents([])
    } finally {
      setIsLoadingStudents(false)
    }
  }

  // Fetch when student records modal opens
  useEffect(() => {
    if (showStudentRecords) {
      fetchStudents(studentSearch || undefined, selectedDepartment || undefined)
    }
  }, [showStudentRecords])

  // Re-fetch when department filter or search changes
  useEffect(() => {
    if (showStudentRecords) {
      const timer = setTimeout(() => {
        fetchStudents(studentSearch || undefined, selectedDepartment || undefined)
      }, 300) // debounce
      return () => clearTimeout(timer)
    }
  }, [studentSearch, selectedDepartment])

  const handleCreatePrincipal = () => {
    alert(`Principal account created!\n\nName: ${principalForm.name}\nEmail: ${principalForm.email}\nPassword: ${principalForm.password}`)
    setShowCreatePrincipal(false)
    setPrincipalForm({ name: '', email: '', phone: '', password: '' })
  }

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}'s record? This action cannot be undone.`)) return
    setIsDeletingStudent(studentId)
    try {
      await apiDeleteStudent(studentId)
      // Refresh the list
      fetchStudents(studentSearch || undefined, selectedDepartment || undefined)
    } catch (err: any) {
      alert(err.message || 'Failed to delete student')
    } finally {
      setIsDeletingStudent(null)
    }
  }

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.courseId) {
      alert('Please fill in both Course Name and Course ID')
      return
    }
    const newCourseObj = {
      id: courses.length + 1,
      name: newCourse.name,
      courseId: newCourse.courseId
    }
    setCourses([...courses, newCourseObj])
    setNewCourse({ name: '', courseId: '' })
    setShowAddCourse(false)
    alert('Course added successfully!')
  }

  const handleSyllabusUpload = () => {
    if (!syllabusForm.stream || !syllabusForm.year || !syllabusForm.file) {
      alert('Please select stream, year, and upload a PDF file')
      return
    }
    alert(`Syllabus uploaded successfully!\n\nStream: ${syllabusForm.stream}\nYear: ${syllabusForm.year}\nFile: ${syllabusForm.file.name}`)
    setSyllabusForm({ stream: '', year: '', file: null })
    setShowSyllabusUpload(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
          <div>
            <h1 className="text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">System Administration Panel</p>
          </div>

          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: adminData.name,
                role: 'System Administrator',
                photo: adminData.photo,
                email: adminData.email,
                phone: adminData.phone
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
      </div>

      {/* Main Content */}
      <div className="p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-gray-900 mb-6">Management Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create Principal */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => setShowCreatePrincipal(true)}>
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">Create Principal</h3>
                <p className="text-sm text-gray-600">Set up new principal account</p>
              </CardContent>
            </Card>

            {/* Faculty Management */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => onNavigate && onNavigate('faculty')}>
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">Faculty Management</h3>
                <p className="text-sm text-gray-600">Manage faculty members</p>
              </CardContent>
            </Card>

            {/* Student Records */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => setShowStudentRecords(true)}>
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">Student Records</h3>
                <p className="text-sm text-gray-600">Manage student data</p>
              </CardContent>
            </Card>

            {/* Academic Settings */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => setShowAcademicSettings(true)}>
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">Academic Settings</h3>
                <p className="text-sm text-gray-600">Configure courses & syllabus</p>
              </CardContent>
            </Card>

            {/* Timetable */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105" onClick={() => setShowTimetable(true)}>
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">Timetable</h3>
                <p className="text-sm text-gray-600">Manage academic & exam timetables</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Principal Modal */}
      {showCreatePrincipal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Create Principal Account</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowCreatePrincipal(false)} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  value={principalForm.name}
                  onChange={(e) => setPrincipalForm({...principalForm, name: e.target.value})}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={principalForm.email}
                  onChange={(e) => setPrincipalForm({...principalForm, email: e.target.value})}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <Input
                  type="tel"
                  value={principalForm.phone}
                  onChange={(e) => setPrincipalForm({...principalForm, phone: e.target.value})}
                  placeholder="Enter phone"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input
                  type="password"
                  value={principalForm.password}
                  onChange={(e) => setPrincipalForm({...principalForm, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreatePrincipal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreatePrincipal} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600">
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Records Modal */}
      {showStudentRecords && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-gray-900">Student Records</h3>
                <p className="text-xs text-gray-600">Manage all student data</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setShowStudentRecords(false); setSelectedDepartment(null); setStudentSearch(''); }} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
                    <div className="text-xs text-gray-600">Total Students</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{allStudents.length}</div>
                    <div className="text-xs text-gray-600">Showing</div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name or register number..."
                  value={studentSearch}
                  onChange={(e) => { setStudentSearch(e.target.value); setSelectedDepartment(null); }}
                  className="pl-10"
                />
              </div>

              {/* Department Filter Chips */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={!selectedDepartment ? 'default' : 'outline'}
                  onClick={() => setSelectedDepartment(null)}
                  className="text-xs"
                >
                  All Departments
                </Button>
                {departments.map((dept) => (
                  <Button
                    key={dept.id}
                    size="sm"
                    variant={selectedDepartment === dept.id ? 'default' : 'outline'}
                    onClick={() => { setSelectedDepartment(dept.id); setStudentSearch(''); }}
                    className="text-xs"
                  >
                    {dept.name}
                  </Button>
                ))}
              </div>

              {/* Loading / Error / Content */}
              {isLoadingStudents ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-3" />
                  <span className="text-gray-600">Loading students...</span>
                </div>
              ) : studentError ? (
                <div className="flex items-center justify-center py-12">
                  <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                  <span className="text-red-600">{studentError}</span>
                </div>
              ) : allStudents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium">No students found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {studentSearch || selectedDepartment ? 'Try a different search or filter' : 'No students registered yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allStudents.map((student: any) => (
                    <Card key={student._id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                              <div><span className="font-medium">Register No:</span> {student.registerNumber || 'N/A'}</div>
                              <div><span className="font-medium">Department:</span> {student.departmentId?.name || student.departmentId?.fullName || 'N/A'}</div>
                              <div><span className="font-medium">Section:</span> {student.section || 'N/A'}</div>
                              <div><span className="font-medium">Phone:</span> {student.phone || 'N/A'}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            disabled={isDeletingStudent === student._id}
                            onClick={() => handleDeleteStudent(student._id, `${student.firstName} ${student.lastName}`)}
                          >
                            {isDeletingStudent === student._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Academic Settings Modal */}
      {showAcademicSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-gray-900">Academic Settings</h3>
                <p className="text-xs text-gray-600">Configure courses, semesters, and academic calendar</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowAcademicSettings(false)} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Session Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-teal-600">{academicSettings.currentSession}</div>
                    <div className="text-xs text-gray-600">Current Session</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{academicSettings.totalCourses}</div>
                    <div className="text-xs text-gray-600">Total Courses</div>
                  </CardContent>
                </Card>
              </div>

              {/* Courses */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Course Management</h4>
                    <Button size="sm" variant="outline" onClick={() => setShowAddCourse(true)}>Add Course</Button>
                  </div>
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-teal-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{course.name}</div>
                            <div className="text-xs text-gray-600">Course ID: {course.courseId}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Syllabus Management */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Syllabus Management</h4>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-600"
                      onClick={() => setShowSyllabusUpload(true)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Syllabus
                    </Button>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <p className="text-xs text-gray-700">
                      Upload course syllabus PDFs for different streams and years. Students will be able to view and download these files.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Reset to Default</Button>
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-600">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Syllabus Upload Modal */}
      {showSyllabusUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Upload Syllabus</h3>
              <Button variant="ghost" size="sm" onClick={() => { setShowSyllabusUpload(false); setSyllabusForm({ stream: '', year: '', file: null }); }} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Stream</label>
                <select
                  value={syllabusForm.stream}
                  onChange={(e) => setSyllabusForm({ ...syllabusForm, stream: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Stream</option>
                  <option value="BCA">BCA</option>
                  <option value="BCOM">BCOM</option>
                  <option value="BBA">BBA</option>
                  <option value="BCOM A&F">BCOM A&F</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="MCOM">MCOM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <select
                  value={syllabusForm.year}
                  onChange={(e) => setSyllabusForm({ ...syllabusForm, year: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Upload PDF</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSyllabusForm({ ...syllabusForm, file })
                      }
                    }}
                    className="hidden"
                    id="syllabus-upload"
                  />
                  <label htmlFor="syllabus-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      {syllabusForm.file ? (
                        <p className="text-sm font-medium text-blue-600">{syllabusForm.file.name}</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium">Click to upload PDF</p>
                          <p className="text-xs text-gray-500 mt-1">PDF files only</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => { setShowSyllabusUpload(false); setSyllabusForm({ stream: '', year: '', file: null }); }} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSyllabusUpload} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600">
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Add New Course</h3>
              <Button variant="ghost" size="sm" onClick={() => { setShowAddCourse(false); setNewCourse({ name: '', courseId: '' }); }} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Name</label>
                <Input
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="e.g., Bachelor of Computer Applications"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course ID</label>
                <Input
                  value={newCourse.courseId}
                  onChange={(e) => setNewCourse({ ...newCourse, courseId: e.target.value })}
                  placeholder="e.g., BCA, MBA, etc."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => { setShowAddCourse(false); setNewCourse({ name: '', courseId: '' }); }} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddCourse} className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600">
                  Add Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timetable Modal — Connected to Real API */}
      {showTimetable && (
        <TimetableManagementModal onClose={() => setShowTimetable(false)} />
      )}
    </div>
  )
}
