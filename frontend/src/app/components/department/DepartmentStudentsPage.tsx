import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { ArrowLeft, Users, Search, GraduationCap, Phone, Mail, MapPin, User, Star, Award, TrendingUp, Calendar, DollarSign } from 'lucide-react'

interface Department {
  id: string
  name: string
  shortName: string
  students: number
  faculty: number
  courses: number
  hod: string
  gradient: string
  icon: string
  description: string
}

interface DepartmentStudentsPageProps {
  onBack: () => void
  department: Department
}

export function DepartmentStudentsPage({ onBack, department }: DepartmentStudentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')

  const years = ['all', '1st Year', '2nd Year', '3rd Year']

  // All students data - same as in StudentManagementPage
  const allStudents = [
    {
      id: 1001,
      rollNo: 'BCA001',
      name: 'Rahul Sharma',
      department: 'BCA',
      year: '3rd Year',
      semester: '6th Sem',
      phone: '+91 98765 10001',
      email: 'rahul.sharma@student.college.edu',
      address: '123 Tech Park, Bangalore',
      fatherName: 'Suresh Sharma',
      motherName: 'Priya Sharma',
      guardianPhone: '+91 98765 20001',
      dateOfBirth: '2003-05-15',
      bloodGroup: 'B+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-15',
      cgpa: 8.5,
      attendance: 87,
      status: 'active',
      fees: { total: 80000, paid: 50000, pending: 30000 }
    },
    {
      id: 1002,
      rollNo: 'BCA002',
      name: 'Priya Patel',
      department: 'BCA',
      year: '2nd Year',
      semester: '4th Sem',
      phone: '+91 98765 10002',
      email: 'priya.patel@student.college.edu',
      address: '456 Software City, Pune',
      fatherName: 'Amit Patel',
      motherName: 'Neeta Patel',
      guardianPhone: '+91 98765 20002',
      dateOfBirth: '2004-03-22',
      bloodGroup: 'A+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-18',
      cgpa: 9.1,
      attendance: 92,
      status: 'active',
      fees: { total: 80000, paid: 80000, pending: 0 }
    },
    {
      id: 1003,
      rollNo: 'COM003',
      name: 'Arjun Singh',
      department: 'BCOM',
      year: '1st Year',
      semester: '2nd Sem',
      phone: '+91 98765 10003',
      email: 'arjun.singh@student.college.edu',
      address: '789 Commerce Street, Delhi',
      fatherName: 'Vikram Singh',
      motherName: 'Sunita Singh',
      guardianPhone: '+91 98765 20003',
      dateOfBirth: '2005-01-10',
      bloodGroup: 'O+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-22',
      cgpa: 7.8,
      attendance: 85,
      status: 'active',
      fees: { total: 60000, paid: 30000, pending: 30000 }
    },
    {
      id: 1004,
      rollNo: 'COM004',
      name: 'Kavya Reddy',
      department: 'BCOM',
      year: '3rd Year',
      semester: '5th Sem',
      phone: '+91 98765 10004',
      email: 'kavya.reddy@student.college.edu',
      address: '321 Business District, Hyderabad',
      fatherName: 'Ravi Reddy',
      motherName: 'Lakshmi Reddy',
      guardianPhone: '+91 98765 20004',
      dateOfBirth: '2003-09-05',
      bloodGroup: 'AB+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-12',
      cgpa: 8.9,
      attendance: 94,
      status: 'active',
      fees: { total: 60000, paid: 45000, pending: 15000 }
    },
    {
      id: 1005,
      rollNo: 'CAF005',
      name: 'Deepak Kumar',
      department: 'BCOM A&F',
      year: '2nd Year',
      semester: '3rd Sem',
      phone: '+91 98765 10005',
      email: 'deepak.kumar@student.college.edu',
      address: '654 Finance Hub, Mumbai',
      fatherName: 'Manoj Kumar',
      motherName: 'Seema Kumar',
      guardianPhone: '+91 98765 20005',
      dateOfBirth: '2004-11-30',
      bloodGroup: 'A-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2023-07-08',
      cgpa: 8.2,
      attendance: 89,
      status: 'active',
      fees: { total: 70000, paid: 70000, pending: 0 }
    },
    {
      id: 1006,
      rollNo: 'CAF006',
      name: 'Sneha Joshi',
      department: 'BCOM A&F',
      year: '1st Year',
      semester: '1st Sem',
      phone: '+91 98765 10006',
      email: 'sneha.joshi@student.college.edu',
      address: '987 Investment Lane, Chennai',
      fatherName: 'Rajesh Joshi',
      motherName: 'Meena Joshi',
      guardianPhone: '+91 98765 20006',
      dateOfBirth: '2005-04-18',
      bloodGroup: 'B-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-30',
      cgpa: 8.0,
      attendance: 90,
      status: 'active',
      fees: { total: 70000, paid: 35000, pending: 35000 }
    },
    {
      id: 1007,
      rollNo: 'BBA007',
      name: 'Rohit Agarwal',
      department: 'BBA',
      year: '3rd Year',
      semester: '6th Sem',
      phone: '+91 98765 10007',
      email: 'rohit.agarwal@student.college.edu',
      address: '159 Management Square, Kolkata',
      fatherName: 'Sanjay Agarwal',
      motherName: 'Pooja Agarwal',
      guardianPhone: '+91 98765 20007',
      dateOfBirth: '2003-07-25',
      bloodGroup: 'O-',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2022-07-01',
      cgpa: 8.7,
      attendance: 88,
      status: 'active',
      fees: { total: 75000, paid: 75000, pending: 0 }
    },
    {
      id: 1008,
      rollNo: 'BBA008',
      name: 'Anita Nair',
      department: 'BBA',
      year: '1st Year',
      semester: '2nd Sem',
      phone: '+91 98765 10008',
      email: 'anita.nair@student.college.edu',
      address: '753 Business Park, Kochi',
      fatherName: 'Sunil Nair',
      motherName: 'Radha Nair',
      guardianPhone: '+91 98765 20008',
      dateOfBirth: '2005-12-03',
      bloodGroup: 'A+',
      photo: 'https://images.unsplash.com/photo-1744320911030-1ab998d994d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU3MTgyMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      admissionDate: '2024-07-14',
      cgpa: 7.5,
      attendance: 83,
      status: 'active',
      fees: { total: 75000, paid: 37500, pending: 37500 }
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

  // Filter students by department
  const departmentStudents = allStudents.filter(student => 
    student.department === department.shortName
  ).filter(student => 
    (selectedYear === 'all' || student.year === selectedYear) &&
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

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

  const getStatusColor = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'suspended': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600'
    if (attendance >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 9.0) return 'text-green-600'
    if (cgpa >= 8.0) return 'text-blue-600'
    if (cgpa >= 7.0) return 'text-yellow-600'
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
            <h1 className="text-gray-900">{department.shortName} Students</h1>
            <p className="text-sm text-gray-600">{department.name}</p>
          </div>
          <Badge variant="secondary">{departmentStudents.length} Students</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Department Info */}
        <Card className={`bg-gradient-to-r ${department.gradient} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{department.icon}</div>
              <div className="flex-1">
                <h2 className="text-white mb-2">{department.name}</h2>
                <p className="text-white/90 text-sm mb-3">{department.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{department.students}</div>
                    <div className="text-xs text-white/80">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{departmentStudents.length}</div>
                    <div className="text-xs text-white/80">Current View</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">
                      {departmentStudents.length > 0 ? 
                        (departmentStudents.reduce((sum, s) => sum + s.cgpa, 0) / departmentStudents.length).toFixed(1) : 
                        'N/A'
                      }
                    </div>
                    <div className="text-xs text-white/80">Avg CGPA</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search students by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white min-w-[120px]"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={student.photo}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {student.name}
                      </CardTitle>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{student.rollNo} • {student.year}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${getCGPAColor(student.cgpa)}`} fill="currentColor" />
                        <span className={`font-medium ${getCGPAColor(student.cgpa)}`}>{student.cgpa}</span>
                        <span className="text-xs text-gray-500">CGPA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-4 h-4 ${getAttendanceColor(student.attendance)}`} />
                        <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>{student.attendance}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Academic Info */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">Academic Details</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Semester: </span>
                      <span className="font-medium">{student.semester}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Admission: </span>
                      <span className="font-medium">{new Date(student.admissionDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">Personal Information</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-500">Father: </span>
                      <span className="font-medium">{student.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Blood Group: </span>
                      <span className="font-medium">{student.bloodGroup}</span>
                    </div>
                  </div>
                </div>

                {/* Fees Info */}
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    <span className="font-medium text-sm">Fee Status</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">₹{student.fees.total.toLocaleString()}</div>
                      <div className="text-gray-500">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-green-600">₹{student.fees.paid.toLocaleString()}</div>
                      <div className="text-gray-500">Paid</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${student.fees.pending > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ₹{student.fees.pending.toLocaleString()}
                      </div>
                      <div className="text-gray-500">Pending</div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{student.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {departmentStudents.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600 text-sm">
                {searchTerm || selectedYear !== 'all' ? 
                  'Try adjusting your search or filter criteria.' : 
                  `No students enrolled in ${department.shortName} department.`
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{departmentStudents.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {departmentStudents.filter(s => s.attendance >= 75).length}
              </div>
              <div className="text-sm text-gray-600">Good Attendance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {departmentStudents.filter(s => s.fees.pending === 0).length}
              </div>
              <div className="text-sm text-gray-600">Fees Cleared</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {departmentStudents.filter(s => s.cgpa >= 8.0).length}
              </div>
              <div className="text-sm text-gray-600">High Performers</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}