import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Mail, Phone, User, Trash2 } from 'lucide-react'

interface FacultyListPageProps {
  onBack: () => void
}

export function FacultyListPage({ onBack }: FacultyListPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const [facultyList, setFacultyList] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', department: 'BCA', designation: 'Professor & HOD', email: 'rajesh@college.edu', phone: '+91 98765 43210', specialization: 'Data Structures' },
    { id: 2, name: 'Prof. Priya Sharma', department: 'BCOM', designation: 'Associate Professor & HOD', email: 'priya@college.edu', phone: '+91 98765 43211', specialization: 'Financial Accounting' },
    { id: 3, name: 'Dr. Amit Verma', department: 'BCOM A&F', designation: 'Assistant Professor & HOD', email: 'amit@college.edu', phone: '+91 98765 43212', specialization: 'Financial Management' },
    { id: 4, name: 'Dr. Neha Gupta', department: 'BBA', designation: 'Professor & HOD', email: 'neha@college.edu', phone: '+91 98765 43213', specialization: 'HR Management' },
    { id: 5, name: 'Prof. Suresh Kumar', department: 'BCA', designation: 'Assistant Professor', email: 'suresh@college.edu', phone: '+91 98765 43214', specialization: 'Database Management' },
    { id: 6, name: 'Dr. Kavita Rao', department: 'BCOM', designation: 'Associate Professor', email: 'kavita@college.edu', phone: '+91 98765 43215', specialization: 'Business Economics' },
    { id: 7, name: 'Dr. Padmavathi Rao', department: 'Kannada', designation: 'Professor & HOD', email: 'padmavathi@college.edu', phone: '+91 98765 43216', specialization: 'Kannada Literature' },
    { id: 8, name: 'Dr. Ramesh Chandra Sharma', department: 'Hindi', designation: 'Professor & HOD', email: 'ramesh.sharma@college.edu', phone: '+91 98765 43217', specialization: 'Hindi Literature' },
    { id: 9, name: 'Dr. Vidya Shankar Mishra', department: 'Sanskrit', designation: 'Professor & HOD', email: 'vidya@college.edu', phone: '+91 98765 43218', specialization: 'Vedic Studies' },
    { id: 10, name: 'Dr. Margaret Thompson', department: 'English Literature', designation: 'Professor & HOD', email: 'margaret@college.edu', phone: '+91 98765 43219', specialization: 'English Literature' },
    { id: 11, name: 'Dr. Suresh Kumar Singh', department: 'Mathematics', designation: 'Professor & HOD', email: 'suresh.singh@college.edu', phone: '+91 98765 43230', specialization: 'Applied Mathematics' }
  ])

  const handleDeleteFaculty = (facultyId: number, facultyName: string) => {
    if (window.confirm(`Are you sure you want to delete ${facultyName}'s details? This action cannot be undone.`)) {
      setFacultyList(prev => prev.filter(f => f.id !== facultyId))
      alert(`${facultyName}'s details have been deleted successfully.`)
    }
  }

  const filteredFaculty = facultyList
    .filter(faculty => {
      const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           faculty.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDepartment = departmentFilter === 'all' || faculty.department === departmentFilter
      return matchesSearch && matchesDepartment
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'department') return a.department.localeCompare(b.department)
      if (sortBy === 'designation') return a.designation.localeCompare(b.designation)
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
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
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Department Filter */}
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BCOM">BCOM</SelectItem>
                  <SelectItem value="BCOM A&F">BCOM A&F</SelectItem>
                  <SelectItem value="BBA">BBA</SelectItem>
                  <SelectItem value="Kannada">Kannada</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                  <SelectItem value="English Literature">English Literature</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
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

        {/* Faculty List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Showing {filteredFaculty.length} faculty members</p>
          </div>

          {filteredFaculty.map((faculty) => (
            <Card key={faculty.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 mb-1">{faculty.name}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
                      <div><span className="font-medium">Dept:</span> {faculty.department}</div>
                      <div><span className="font-medium">Designation:</span> {faculty.designation}</div>
                      <div><span className="font-medium">Specialization:</span> {faculty.specialization}</div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{faculty.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{faculty.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                    onClick={() => handleDeleteFaculty(faculty.id, faculty.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
