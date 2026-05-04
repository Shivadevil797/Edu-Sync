import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { ArrowLeft, Users, Search, Filter, Phone, Mail, Calendar, MapPin, Star, Award, BookOpen, GraduationCap, User, Home, CreditCard } from 'lucide-react'

interface StudentManagementPageProps {
  onBack: () => void
}

export function StudentManagementPage({ onBack }: StudentManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterYear, setFilterYear] = useState('all')

  const students = [
    {
      id: 1001,
      rollNo: 'BCA001',
      name: 'Arjun Sharma',
      department: 'BCA',
      year: '3rd Year',
      semester: '6th Sem',
      phone: '+91 98765 10001',
      email: 'arjun.sharma@student.college.edu',
      address: '123 Main Street, Delhi',
      fatherName: 'Rajesh Sharma',
      motherName: 'Sunita Sharma',
      guardianPhone: '+91 98765 20001',
      dateOfBirth: '2003-05-15',
      bloodGroup: 'B+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-15',
      cgpa: 8.5,
      attendance: 92,
      status: 'active',
      fees: { total: 45000, paid: 45000, pending: 0 }
    },
    {
      id: 1002,
      rollNo: 'BCOM002',
      name: 'Priya Patel',
      department: 'BCOM',
      year: '2nd Year',
      semester: '4th Sem',
      phone: '+91 98765 10002',
      email: 'priya.patel@student.college.edu',
      address: '456 Park Avenue, Mumbai',
      fatherName: 'Vikram Patel',
      motherName: 'Kavita Patel',
      guardianPhone: '+91 98765 20002',
      dateOfBirth: '2004-03-22',
      bloodGroup: 'O+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-20',
      cgpa: 7.8,
      attendance: 88,
      status: 'active',
      fees: { total: 35000, paid: 20000, pending: 15000 }
    },
    {
      id: 1003,
      rollNo: 'BBA003',
      name: 'Rahul Singh',
      department: 'BBA',
      year: '1st Year',
      semester: '2nd Sem',
      phone: '+91 98765 10003',
      email: 'rahul.singh@student.college.edu',
      address: '789 College Road, Bangalore',
      fatherName: 'Suresh Singh',
      motherName: 'Rekha Singh',
      guardianPhone: '+91 98765 20003',
      dateOfBirth: '2005-01-10',
      bloodGroup: 'A+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-10',
      cgpa: 8.2,
      attendance: 95,
      status: 'active',
      fees: { total: 40000, paid: 25000, pending: 15000 }
    },
    {
      id: 1004,
      rollNo: 'BCF004',
      name: 'Sneha Joshi',
      department: 'BCOM A&F',
      year: '3rd Year',
      semester: '5th Sem',
      phone: '+91 98765 10004',
      email: 'sneha.joshi@student.college.edu',
      address: '321 Finance Street, Pune',
      fatherName: 'Amit Joshi',
      motherName: 'Neeta Joshi',
      guardianPhone: '+91 98765 20004',
      dateOfBirth: '2003-08-18',
      bloodGroup: 'AB+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-25',
      cgpa: 9.1,
      attendance: 97,
      status: 'active',
      fees: { total: 50000, paid: 50000, pending: 0 }
    },
    {
      id: 1005,
      rollNo: 'BCA005',
      name: 'Karan Malhotra',
      department: 'BCA',
      year: '2nd Year',
      semester: '3rd Sem',
      phone: '+91 98765 10005',
      email: 'karan.malhotra@student.college.edu',
      address: '654 Tech Park, Hyderabad',
      fatherName: 'Deepak Malhotra',
      motherName: 'Sonia Malhotra',
      guardianPhone: '+91 98765 20005',
      dateOfBirth: '2004-11-02',
      bloodGroup: 'O-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-18',
      cgpa: 8.7,
      attendance: 90,
      status: 'active',
      fees: { total: 45000, paid: 30000, pending: 15000 }
    },
    {
      id: 1006,
      rollNo: 'BCOM006',
      name: 'Anjali Verma',
      department: 'BCOM',
      year: '3rd Year',
      semester: '6th Sem',
      phone: '+91 98765 10006',
      email: 'anjali.verma@student.college.edu',
      address: '987 Commerce Lane, Chennai',
      fatherName: 'Ramesh Verma',
      motherName: 'Usha Verma',
      guardianPhone: '+91 98765 20006',
      dateOfBirth: '2003-06-30',
      bloodGroup: 'B-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-12',
      cgpa: 8.0,
      attendance: 89,
      status: 'active',
      fees: { total: 35000, paid: 35000, pending: 0 }
    },
    {
      id: 1007,
      rollNo: 'BBA007',
      name: 'Rohit Gupta',
      department: 'BBA',
      year: '2nd Year',
      semester: '4th Sem',
      phone: '+91 98765 10007',
      email: 'rohit.gupta@student.college.edu',
      address: '147 Business District, Kolkata',
      fatherName: 'Manoj Gupta',
      motherName: 'Seema Gupta',
      guardianPhone: '+91 98765 20007',
      dateOfBirth: '2004-09-14',
      bloodGroup: 'A-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-22',
      cgpa: 7.5,
      attendance: 85,
      status: 'active',
      fees: { total: 40000, paid: 40000, pending: 0 }
    },
    {
      id: 1008,
      rollNo: 'BCF008',
      name: 'Meera Nair',
      department: 'BCOM A&F',
      year: '1st Year',
      semester: '1st Sem',
      phone: '+91 98765 10008',
      email: 'meera.nair@student.college.edu',
      address: '258 Accounting Avenue, Kochi',
      fatherName: 'Sunil Nair',
      motherName: 'Priya Nair',
      guardianPhone: '+91 98765 20008',
      dateOfBirth: '2005-04-07',
      bloodGroup: 'O+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-15',
      cgpa: 8.9,
      attendance: 98,
      status: 'active',
      fees: { total: 50000, paid: 25000, pending: 25000 }
    },
    {
      id: 1009,
      rollNo: 'KAN009',
      name: 'Pradeep Gowda',
      department: 'Kannada',
      year: '2nd Year',
      semester: '4th Sem',
      phone: '+91 98765 10009',
      email: 'pradeep.gowda@student.college.edu',
      address: '369 Kannada Sahitya Kendra, Mysore',
      fatherName: 'Krishnamurthy Gowda',
      motherName: 'Lakshmi Gowda',
      guardianPhone: '+91 98765 20009',
      dateOfBirth: '2004-02-14',
      bloodGroup: 'A+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-10',
      cgpa: 8.3,
      attendance: 91,
      status: 'active',
      fees: { total: 25000, paid: 25000, pending: 0 }
    },
    {
      id: 1010,
      rollNo: 'KAN010',
      name: 'Shruthi Rao',
      department: 'Kannada',
      year: '3rd Year',
      semester: '5th Sem',
      phone: '+91 98765 10010',
      email: 'shruthi.rao@student.college.edu',
      address: '147 Vijayanagar, Bangalore',
      fatherName: 'Nagaraj Rao',
      motherName: 'Suma Rao',
      guardianPhone: '+91 98765 20010',
      dateOfBirth: '2003-07-28',
      bloodGroup: 'B+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-08',
      cgpa: 8.7,
      attendance: 94,
      status: 'active',
      fees: { total: 25000, paid: 15000, pending: 10000 }
    },
    {
      id: 1011,
      rollNo: 'HIN011',
      name: 'Arjun Mishra',
      department: 'Hindi',
      year: '1st Year',
      semester: '2nd Sem',
      phone: '+91 98765 10011',
      email: 'arjun.mishra@student.college.edu',
      address: '258 Hindi Bhavan, Delhi',
      fatherName: 'Raj Kumar Mishra',
      motherName: 'Sita Mishra',
      guardianPhone: '+91 98765 20011',
      dateOfBirth: '2005-03-12',
      bloodGroup: 'O+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-20',
      cgpa: 8.1,
      attendance: 96,
      status: 'active',
      fees: { total: 25000, paid: 12500, pending: 12500 }
    },
    {
      id: 1012,
      rollNo: 'HIN012',
      name: 'Pooja Sharma',
      department: 'Hindi',
      year: '2nd Year',
      semester: '3rd Sem',
      phone: '+91 98765 10012',
      email: 'pooja.sharma@student.college.edu',
      address: '741 Sahitya Kunj, Jaipur',
      fatherName: 'Mohan Sharma',
      motherName: 'Geeta Sharma',
      guardianPhone: '+91 98765 20012',
      dateOfBirth: '2004-05-20',
      bloodGroup: 'AB+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-12',
      cgpa: 8.6,
      attendance: 93,
      status: 'active',
      fees: { total: 25000, paid: 25000, pending: 0 }
    },
    {
      id: 1013,
      rollNo: 'SAN013',
      name: 'Vikram Shastri',
      department: 'Sanskrit',
      year: '3rd Year',
      semester: '6th Sem',
      phone: '+91 98765 10013',
      email: 'vikram.shastri@student.college.edu',
      address: '852 Gurukul Society, Varanasi',
      fatherName: 'Pandit Ramesh Shastri',
      motherName: 'Sushma Shastri',
      guardianPhone: '+91 98765 20013',
      dateOfBirth: '2003-01-08',
      bloodGroup: 'A-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-05',
      cgpa: 9.2,
      attendance: 98,
      status: 'active',
      fees: { total: 20000, paid: 20000, pending: 0 }
    },
    {
      id: 1014,
      rollNo: 'SAN014',
      name: 'Divya Acharya',
      department: 'Sanskrit',
      year: '1st Year',
      semester: '1st Sem',
      phone: '+91 98765 10014',
      email: 'divya.acharya@student.college.edu',
      address: '963 Vedic Campus, Rishikesh',
      fatherName: 'Guru Mahesh Acharya',
      motherName: 'Bharati Acharya',
      guardianPhone: '+91 98765 20014',
      dateOfBirth: '2005-09-03',
      bloodGroup: 'B-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-25',
      cgpa: 8.9,
      attendance: 99,
      status: 'active',
      fees: { total: 20000, paid: 10000, pending: 10000 }
    }
  ]

  const departments = ['all', 'BCA', 'BCOM', 'BCOM A&F', 'BBA', 'Kannada', 'Hindi', 'Sanskrit']
  const years = ['all', '1st Year', '2nd Year', '3rd Year']

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm)
    const matchesDepartment = filterDepartment === 'all' || student.department === filterDepartment
    const matchesYear = filterYear === 'all' || student.year === filterYear
    return matchesSearch && matchesDepartment && matchesYear
  })

  const getDepartmentColor = (department: string) => {
    const colors = {
      'BCA': 'from-blue-500 to-blue-600',
      'BCOM': 'from-green-500 to-green-600',
      'BCOM A&F': 'from-orange-500 to-orange-600',
      'BBA': 'from-purple-500 to-purple-600',
      'Kannada': 'from-yellow-500 to-orange-600',
      'Hindi': 'from-red-500 to-pink-600',
      'Sanskrit': 'from-indigo-500 to-purple-600'
    }
    return colors[department as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'text-green-600 bg-green-50'
    if (attendance >= 85) return 'text-blue-600 bg-blue-50'
    if (attendance >= 75) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9) return 'text-green-600'
    if (cgpa >= 8) return 'text-blue-600'
    if (cgpa >= 7) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
            <h1 className="text-gray-900">Student Management</h1>
            <p className="text-sm text-gray-600">Manage all student details and records</p>
          </div>
          <Badge variant="secondary">{students.length} Students</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students by name, roll no, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
              <div className={`h-1 bg-gradient-to-r ${getDepartmentColor(student.department)}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={student.photo}
                      alt={student.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-1">{student.rollNo}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={`bg-gradient-to-r ${getDepartmentColor(student.department)} text-white border-0 text-xs`}>
                        {student.department}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {student.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Academic Performance */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className={`font-bold ${getCGPAColor(student.cgpa)}`}>
                      {student.cgpa}
                    </div>
                    <div className="text-xs text-gray-600">CGPA</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${getAttendanceColor(student.attendance)}`}>
                    <div className="font-bold">
                      {student.attendance}%
                    </div>
                    <div className="text-xs">Attendance</div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-3 h-3" />
                    <span className="truncate">{student.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Family Details */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">Family</span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div>Father: {student.fatherName}</div>
                    <div>Mother: {student.motherName}</div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {student.guardianPhone}
                    </div>
                  </div>
                </div>

                {/* Fees Status */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-medium text-green-600">₹{student.fees.paid.toLocaleString()}</div>
                    <div className="text-gray-600">Paid</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="font-medium text-orange-600">₹{student.fees.pending.toLocaleString()}</div>
                    <div className="text-gray-600">Pending</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-medium text-blue-600">₹{student.fees.total.toLocaleString()}</div>
                    <div className="text-gray-600">Total</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>{student.bloodGroup}</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {student.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Student Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{students.length}</div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg CGPA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
                </div>
                <div className="text-sm text-gray-600">Avg Attendance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ₹{Math.round(students.reduce((sum, s) => sum + s.fees.pending, 0) / 1000)}K
                </div>
                <div className="text-sm text-gray-600">Pending Fees</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}