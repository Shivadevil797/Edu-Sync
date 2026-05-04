import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
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
  Upload
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
  const [showAcademicTimetableUpload, setShowAcademicTimetableUpload] = useState(false)
  const [showExamTimetableUpload, setShowExamTimetableUpload] = useState(false)
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

  const [allStudents, setAllStudents] = useState([
    { id: 1, name: 'Rahul Sharma', registerNo: 'BCA21001', department: 'BCA', email: 'rahul@student.edu', phone: '+91 98765 11111' },
    { id: 2, name: 'Priya Patel', registerNo: 'BCA21002', department: 'BCA', email: 'priya@student.edu', phone: '+91 98765 22222' },
    { id: 3, name: 'Amit Kumar', registerNo: 'BCOM21045', department: 'BCOM', email: 'amit@student.edu', phone: '+91 98765 33333' },
    { id: 4, name: 'Sneha Reddy', registerNo: 'BCOM21046', department: 'BCOM', email: 'sneha@student.edu', phone: '+91 98765 44444' },
    { id: 5, name: 'Vikram Singh', registerNo: 'BBA21023', department: 'BBA', email: 'vikram@student.edu', phone: '+91 98765 55555' },
    { id: 6, name: 'Anita Desai', registerNo: 'BBA21024', department: 'BBA', email: 'anita@student.edu', phone: '+91 98765 66666' },
    { id: 7, name: 'Ravi Verma', registerNo: 'BCAF21012', department: 'BCOM A&F', email: 'ravi@student.edu', phone: '+91 98765 77777' },
    { id: 8, name: 'Divya Shah', registerNo: 'MCA21001', department: 'MCA', email: 'divya@student.edu', phone: '+91 98765 88888' },
    { id: 9, name: 'Karan Joshi', registerNo: 'MBA21015', department: 'MBA', email: 'karan@student.edu', phone: '+91 98765 99999' },
    { id: 10, name: 'Pooja Agarwal', registerNo: 'MCOM21008', department: 'MCOM', email: 'pooja@student.edu', phone: '+91 98765 10101' }
  ])

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

  const handleCreatePrincipal = () => {
    alert(`Principal account created!\n\nName: ${principalForm.name}\nEmail: ${principalForm.email}\nPassword: ${principalForm.password}`)
    setShowCreatePrincipal(false)
    setPrincipalForm({ name: '', email: '', phone: '', password: '' })
  }

  const handleDeleteStudent = (studentId: number, studentName: string) => {
    if (window.confirm(`Are you sure you want to delete ${studentName}'s record? This action cannot be undone.`)) {
      setAllStudents(prev => prev.filter(s => s.id !== studentId))
      alert(`${studentName}'s record has been deleted successfully.`)
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

  const filteredStudents = selectedDepartment
    ? allStudents.filter(s => s.department === selectedDepartment)
    : allStudents.filter(s =>
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.registerNo.toLowerCase().includes(studentSearch.toLowerCase())
      )

  const totalStudents = allStudents.length
  const activeStudents = allStudents.length
  const graduatedStudents = 850

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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
                    <div className="text-xs text-gray-600">Total Students</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{activeStudents}</div>
                    <div className="text-xs text-gray-600">Active</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{graduatedStudents}</div>
                    <div className="text-xs text-gray-600">Graduated</div>
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

              {/* Department Cards */}
              {!selectedDepartment && !studentSearch && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Select Department</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {departments.map((dept) => (
                      <Card
                        key={dept.id}
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                        onClick={() => setSelectedDepartment(dept.id)}
                      >
                        <CardContent className="p-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center mx-auto mb-2`}>
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900 text-sm">{dept.name}</div>
                            <div className="text-xs text-gray-600">{allStudents.filter(s => s.department === dept.id).length} students</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Student List */}
              {(selectedDepartment || studentSearch) && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">
                      {selectedDepartment ? `${selectedDepartment} Students` : 'Search Results'}
                    </h4>
                    {selectedDepartment && (
                      <Button size="sm" variant="outline" onClick={() => setSelectedDepartment(null)}>
                        View All Departments
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {filteredStudents.map((student) => (
                      <Card key={student.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 mt-1">
                                <div><span className="font-medium">Register No:</span> {student.registerNo}</div>
                                <div><span className="font-medium">Department:</span> {student.department}</div>
                                <div><span className="font-medium">Email:</span> {student.email}</div>
                                <div><span className="font-medium">Phone:</span> {student.phone}</div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteStudent(student.id, student.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredStudents.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>No students found</p>
                      </div>
                    )}
                  </div>
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

      {/* Timetable Modal */}
      {showTimetable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-gray-900">Timetable Management</h3>
                <p className="text-xs text-gray-600">Manage academic and exam timetables</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => { setShowTimetable(false); setShowAcademicTimetableUpload(false); setShowExamTimetableUpload(false); }} className="p-2">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
              {/* Academic Timetable Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Academic Timetable</h4>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600"
                    onClick={() => setShowAcademicTimetableUpload(!showAcademicTimetableUpload)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Excel/CSV
                  </Button>
                </div>

                {/* Upload Interface */}
                {showAcademicTimetableUpload && (
                  <Card className="mb-4">
                    <CardContent className="p-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              alert(`Academic timetable file uploaded: ${file.name}\n\nThis feature will process and display the timetable.`)
                              setShowAcademicTimetableUpload(false)
                            }
                          }}
                          className="hidden"
                          id="academic-timetable-upload"
                        />
                        <label htmlFor="academic-timetable-upload" className="cursor-pointer">
                          <div className="text-gray-600">
                            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">Excel (.xlsx, .xls) or CSV files only</p>
                          </div>
                        </label>
                      </div>
                      <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                        <p className="text-xs text-gray-700">
                          <strong>Required format:</strong> Include columns for Day, Time, Subject, Faculty, Room
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Current Timetable */}
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium text-gray-900 mb-4">Current Academic Timetable</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 text-left border">Day</th>
                            <th className="p-2 text-left border">9:00-10:00</th>
                            <th className="p-2 text-left border">10:00-11:00</th>
                            <th className="p-2 text-left border">11:00-12:00</th>
                            <th className="p-2 text-left border">12:00-1:00</th>
                            <th className="p-2 text-left border">2:00-3:00</th>
                            <th className="p-2 text-left border">3:00-4:00</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border font-medium">Monday</td>
                            <td className="p-2 border">Data Structures<br/><span className="text-gray-500">Dr. Rajesh</span></td>
                            <td className="p-2 border">Database Systems<br/><span className="text-gray-500">Prof. Suresh</span></td>
                            <td className="p-2 border">Web Tech<br/><span className="text-gray-500">Dr. Amit</span></td>
                            <td className="p-2 border bg-gray-100">Lunch Break</td>
                            <td className="p-2 border">Programming Lab<br/><span className="text-gray-500">Lab 1</span></td>
                            <td className="p-2 border">Programming Lab<br/><span className="text-gray-500">Lab 1</span></td>
                          </tr>
                          <tr>
                            <td className="p-2 border font-medium">Tuesday</td>
                            <td className="p-2 border">Java Programming<br/><span className="text-gray-500">Dr. Neha</span></td>
                            <td className="p-2 border">Computer Networks<br/><span className="text-gray-500">Prof. Kumar</span></td>
                            <td className="p-2 border">OS<br/><span className="text-gray-500">Dr. Rajesh</span></td>
                            <td className="p-2 border bg-gray-100">Lunch Break</td>
                            <td className="p-2 border">Database Lab<br/><span className="text-gray-500">Lab 2</span></td>
                            <td className="p-2 border">Database Lab<br/><span className="text-gray-500">Lab 2</span></td>
                          </tr>
                          <tr>
                            <td className="p-2 border font-medium">Wednesday</td>
                            <td className="p-2 border">Software Engg<br/><span className="text-gray-500">Dr. Amit</span></td>
                            <td className="p-2 border">Data Structures<br/><span className="text-gray-500">Dr. Rajesh</span></td>
                            <td className="p-2 border">Web Tech<br/><span className="text-gray-500">Dr. Amit</span></td>
                            <td className="p-2 border bg-gray-100">Lunch Break</td>
                            <td className="p-2 border">Project Work<br/><span className="text-gray-500">All Faculty</span></td>
                            <td className="p-2 border">Project Work<br/><span className="text-gray-500">All Faculty</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Exam Timetable Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Exam Timetable</h4>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-600"
                    onClick={() => setShowExamTimetableUpload(!showExamTimetableUpload)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Excel/CSV
                  </Button>
                </div>

                {/* Upload Interface */}
                {showExamTimetableUpload && (
                  <Card className="mb-4">
                    <CardContent className="p-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              alert(`Exam timetable file uploaded: ${file.name}\n\nThis feature will process and display the exam schedule.`)
                              setShowExamTimetableUpload(false)
                            }
                          }}
                          className="hidden"
                          id="exam-timetable-upload"
                        />
                        <label htmlFor="exam-timetable-upload" className="cursor-pointer">
                          <div className="text-gray-600">
                            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 mt-1">Excel (.xlsx, .xls) or CSV files only</p>
                          </div>
                        </label>
                      </div>
                      <div className="mt-4 bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r-lg">
                        <p className="text-xs text-gray-700">
                          <strong>Required format:</strong> Include columns for Date, Time, Subject, Room, Duration
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Current Exam Timetable */}
                <Card>
                  <CardContent className="p-4">
                    <h5 className="font-medium text-gray-900 mb-4">Current Exam Timetable</h5>
                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div>
                            <p className="text-gray-600 mb-1">Date</p>
                            <p className="font-medium text-gray-900">May 15, 2026</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Time</p>
                            <p className="font-medium text-gray-900">10:00 AM - 1:00 PM</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Subject</p>
                            <p className="font-medium text-gray-900">Data Structures</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Room</p>
                            <p className="font-medium text-gray-900">Hall A</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div>
                            <p className="text-gray-600 mb-1">Date</p>
                            <p className="font-medium text-gray-900">May 18, 2026</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Time</p>
                            <p className="font-medium text-gray-900">10:00 AM - 1:00 PM</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Subject</p>
                            <p className="font-medium text-gray-900">Database Systems</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Room</p>
                            <p className="font-medium text-gray-900">Hall B</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div>
                            <p className="text-gray-600 mb-1">Date</p>
                            <p className="font-medium text-gray-900">May 22, 2026</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Time</p>
                            <p className="font-medium text-gray-900">10:00 AM - 1:00 PM</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Subject</p>
                            <p className="font-medium text-gray-900">Web Technologies</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Room</p>
                            <p className="font-medium text-gray-900">Hall A</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
