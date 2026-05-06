import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Mail, Phone, User, Trash2, Loader2, Users } from 'lucide-react'
import { apiGetStaff, apiGetPrincipalFaculty, apiDeleteStaff } from '@/services/api'

interface FacultyListPageProps {
  onBack: () => void
  userRole?: 'admin' | 'principal'
}

interface FacultyItem {
  _id: string
  fullName: string
  designation: string
  qualification?: string
  phone?: string
  departmentId?: { _id: string; name: string; fullName: string }
  userId?: { _id: string; username: string; email: string; role: string }
  isHOD?: boolean
}

export function FacultyListPage({ onBack, userRole = 'admin' }: FacultyListPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [facultyList, setFacultyList] = useState<FacultyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [departments, setDepartments] = useState<string[]>([])

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
    if (!window.confirm(`Are you sure you want to remove ${faculty.fullName}? This will soft-delete (terminate) their account.`)) return

    try {
      await apiDeleteStaff(faculty._id, 'Removed by admin')
      setFacultyList(prev => prev.filter(f => f._id !== faculty._id))
      alert(`${faculty.fullName} has been terminated successfully.`)
    } catch (err: any) {
      alert(`Failed to delete: ${err.message}`)
    }
  }

  const filteredFaculty = facultyList
    .filter(faculty => {
      const name = faculty.fullName || ''
      const email = faculty.userId?.email || ''
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           email.toLowerCase().includes(searchQuery.toLowerCase())
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
                  placeholder="Search by name or email..."
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

            {filteredFaculty.map((faculty) => (
              <Card key={faculty._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      faculty.isHOD || faculty.userId?.role === 'hod' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      <User className={`w-5 h-5 ${
                        faculty.isHOD || faculty.userId?.role === 'hod' ? 'text-purple-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                        {faculty.fullName}
                        {(faculty.isHOD || faculty.userId?.role === 'hod') && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">HOD</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
                        <div><span className="font-medium">Dept:</span> {faculty.departmentId?.name || 'N/A'}</div>
                        <div><span className="font-medium">Designation:</span> {faculty.designation || 'N/A'}</div>
                        {faculty.qualification && (
                          <div><span className="font-medium">Qualification:</span> {faculty.qualification}</div>
                        )}
                        {faculty.userId?.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{faculty.userId.email}</span>
                          </div>
                        )}
                        {faculty.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{faculty.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {userRole === 'admin' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                        onClick={() => handleDeleteFaculty(faculty)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
    </div>
  )
}
