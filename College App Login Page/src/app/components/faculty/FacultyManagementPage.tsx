import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { ArrowLeft, Users, Search, Filter, Phone, Mail, Calendar, MapPin, Star, Award, BookOpen, Clock, Trash2 } from 'lucide-react'

interface FacultyManagementPageProps {
  onBack: () => void
}

export function FacultyManagementPage({ onBack }: FacultyManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [facultyToDelete, setFacultyToDelete] = useState<number | null>(null)

  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: 'Dr. Sunita Mehta',
      designation: 'Principal',
      department: 'Administration',
      qualification: 'Ph.D. in Educational Administration',
      experience: '25 years',
      subjects: ['Educational Leadership', 'Academic Administration'],
      phone: '+91 98765 43210',
      email: 'principal@college.edu',
      joiningDate: '1999-07-15',
      specialization: 'Educational Management',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.9,
      isClassTeacher: false
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      designation: 'Professor & HOD',
      department: 'BCA',
      qualification: 'Ph.D. in Computer Science',
      experience: '18 years',
      subjects: ['Database Management', 'Data Structures', 'Software Engineering'],
      phone: '+91 98765 43211',
      email: 'rajesh.kumar@college.edu',
      joiningDate: '2006-08-20',
      specialization: 'Database Systems',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.8,
      isClassTeacher: false
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      designation: 'Associate Professor & HOD',
      department: 'BCOM',
      qualification: 'Ph.D. in Commerce, CA',
      experience: '15 years',
      subjects: ['Financial Accounting', 'Cost Accounting', 'Auditing'],
      phone: '+91 98765 43212',
      email: 'priya.sharma@college.edu',
      joiningDate: '2009-06-10',
      specialization: 'Financial Management',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Dr. Amit Verma',
      designation: 'Assistant Professor & HOD',
      department: 'BCOM A&F',
      qualification: 'Ph.D. in Finance, CFA',
      experience: '12 years',
      subjects: ['Corporate Finance', 'Investment Analysis', 'Financial Markets'],
      phone: '+91 98765 43213',
      email: 'amit.verma@college.edu',
      joiningDate: '2012-03-25',
      specialization: 'Investment Banking',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Dr. Neha Gupta',
      designation: 'Associate Professor & HOD',
      department: 'BBA',
      qualification: 'Ph.D. in Management, MBA',
      experience: '14 years',
      subjects: ['Human Resource Management', 'Organizational Behavior', 'Business Strategy'],
      phone: '+91 98765 43214',
      email: 'neha.gupta@college.edu',
      joiningDate: '2010-01-18',
      specialization: 'Human Resources',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Prof. Arjun Malhotra',
      designation: 'Assistant Professor & Class Teacher',
      department: 'BCA',
      qualification: 'M.Tech in IT, B.Tech CSE',
      experience: '8 years',
      subjects: ['Web Development', 'Mobile App Development', 'Cloud Computing'],
      phone: '+91 98765 43224',
      email: 'arjun.malhotra@college.edu',
      joiningDate: '2016-07-01',
      specialization: 'Web Technologies',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.5,
      isClassTeacher: true,
      classDetails: 'BCA-2A (2024-25)'
    },
    {
      id: 7,
      name: 'Dr. Deepa Nair',
      designation: 'Associate Professor',
      department: 'BCA',
      qualification: 'Ph.D. in Computer Science',
      experience: '16 years',
      subjects: ['Artificial Intelligence', 'Machine Learning', 'Research Methodology'],
      phone: '+91 98765 43221',
      email: 'deepa.nair@college.edu',
      joiningDate: '2008-03-12',
      specialization: 'AI & ML',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.9
    },
    {
      id: 8,
      name: 'Dr. Vikram Patel',
      designation: 'Assistant Professor & Class Teacher',
      department: 'BCOM',
      qualification: 'Ph.D. in Economics, M.Com',
      experience: '10 years',
      subjects: ['Microeconomics', 'Macroeconomics', 'Business Economics'],
      phone: '+91 98765 43216',
      email: 'vikram.patel@college.edu',
      joiningDate: '2014-08-15',
      specialization: 'Economic Analysis',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.4,
      isClassTeacher: true,
      classDetails: 'BCOM-1B (2024-25)'
    },
    {
      id: 9,
      name: 'Dr. Kavita Joshi',
      designation: 'Associate Professor',
      department: 'BBA',
      qualification: 'Ph.D. in Marketing, MBA',
      experience: '13 years',
      subjects: ['Digital Marketing', 'Consumer Behavior', 'Brand Management'],
      phone: '+91 98765 43217',
      email: 'kavita.joshi@college.edu',
      joiningDate: '2011-02-20',
      specialization: 'Digital Marketing',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.7
    },
    {
      id: 10,
      name: 'Prof. Ravi Sharma',
      designation: 'Lecturer',
      department: 'Physical Education',
      qualification: 'M.P.Ed, B.P.Ed',
      experience: '9 years',
      subjects: ['Sports Psychology', 'Physical Fitness', 'Sports Management'],
      phone: '+91 98765 43218',
      email: 'ravi.sharma@college.edu',
      joiningDate: '2015-06-10',
      specialization: 'Sports Sciences',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.3
    },
    {
      id: 11,
      name: 'Dr. Suresh Agarwal',
      designation: 'Professor',
      department: 'BCOM A&F',
      qualification: 'Ph.D. in Finance, FCA',
      experience: '20 years',
      subjects: ['Advanced Accounting', 'Taxation', 'Financial Statement Analysis'],
      phone: '+91 98765 43219',
      email: 'suresh.agarwal@college.edu',
      joiningDate: '2004-04-01',
      specialization: 'Taxation & Audit',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.6
    },
    {
      id: 12,
      name: 'Dr. Rajesh Khanna',
      designation: 'Assistant Professor',
      department: 'BBA',
      qualification: 'Ph.D. in Operations, MBA',
      experience: '11 years',
      subjects: ['Operations Management', 'Supply Chain', 'Project Management'],
      phone: '+91 98765 43222',
      email: 'rajesh.khanna@college.edu',
      joiningDate: '2013-09-05',
      specialization: 'Operations Research',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.5
    },
    {
      id: 13,
      name: 'Dr. Padmavathi Rao',
      designation: 'Associate Professor & HOD',
      department: 'Kannada',
      qualification: 'Ph.D. in Kannada Literature',
      experience: '16 years',
      subjects: ['Kannada Literature', 'Modern Kannada Poetry', 'Kannada Linguistics'],
      phone: '+91 98765 43237',
      email: 'padmavathi.rao@college.edu',
      joiningDate: '2008-06-15',
      specialization: 'Modern Kannada Literature',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.7
    },
    {
      id: 14,
      name: 'Prof. Lakshmi Devi',
      designation: 'Assistant Professor & Class Teacher',
      department: 'Kannada',
      qualification: 'M.A. in Kannada, M.Phil',
      experience: '11 years',
      subjects: ['Classical Kannada Literature', 'Folk Literature', 'Translation Studies'],
      phone: '+91 98765 43238',
      email: 'lakshmi.devi@college.edu',
      joiningDate: '2013-07-20',
      specialization: 'Classical Literature',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.4,
      isClassTeacher: true,
      classDetails: 'BA Kannada-3A (2024-25)'
    },
    {
      id: 15,
      name: 'Dr. Ramesh Chandra Sharma',
      designation: 'Professor & HOD',
      department: 'Hindi',
      qualification: 'Ph.D. in Hindi Literature',
      experience: '19 years',
      subjects: ['Modern Hindi Literature', 'Hindi Poetry', 'Comparative Literature'],
      phone: '+91 98765 43239',
      email: 'ramesh.sharma@college.edu',
      joiningDate: '2005-08-10',
      specialization: 'Modern Hindi Literature',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.8
    },
    {
      id: 16,
      name: 'Dr. Sunita Gupta',
      designation: 'Associate Professor',
      department: 'Hindi',
      qualification: 'Ph.D. in Hindi Linguistics',
      experience: '14 years',
      subjects: ['Hindi Grammar', 'Hindi Prose', 'Language Teaching Methodology'],
      phone: '+91 98765 43240',
      email: 'sunita.gupta@college.edu',
      joiningDate: '2010-06-25',
      specialization: 'Hindi Linguistics',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.6
    },
    {
      id: 17,
      name: 'Dr. Vidya Shankar Mishra',
      designation: 'Professor & HOD',
      department: 'Sanskrit',
      qualification: 'Ph.D. in Sanskrit Literature, Acharya',
      experience: '22 years',
      subjects: ['Vedic Literature', 'Sanskrit Grammar', 'Indian Philosophy'],
      phone: '+91 98765 43241',
      email: 'vidya.mishra@college.edu',
      joiningDate: '2002-07-01',
      specialization: 'Vedic Studies',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.9
    },
    {
      id: 18,
      name: 'Prof. Ananda Kumar',
      designation: 'Assistant Professor',
      department: 'Sanskrit',
      qualification: 'M.A. Sanskrit, Shastri',
      experience: '9 years',
      subjects: ['Classical Sanskrit Poetry', 'Ayurveda Texts', 'Yoga Philosophy'],
      phone: '+91 98765 43242',
      email: 'ananda.kumar@college.edu',
      joiningDate: '2015-08-18',
      specialization: 'Classical Literature',
      photo: 'https://images.unsplash.com/photo-1573878737679-7587b08b1a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmYWN1bHR5JTIwdGVhY2hlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzE4MTk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'active',
      rating: 4.3
    }
  ])

  const departments = ['all', 'Administration', 'BCA', 'BCOM', 'BCOM A&F', 'BBA', 'Kannada', 'Hindi', 'Sanskrit', 'Physical Education']

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filterDepartment === 'all' || member.department === filterDepartment
    return matchesSearch && matchesFilter
  })

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Administration': 'from-gray-500 to-gray-600',
      'BCA': 'from-blue-500 to-blue-600',
      'BCOM': 'from-green-500 to-green-600',
      'BCOM A&F': 'from-orange-500 to-orange-600',
      'BBA': 'from-purple-500 to-purple-600',
      'Kannada': 'from-yellow-500 to-orange-600',
      'Hindi': 'from-red-500 to-pink-600',
      'Sanskrit': 'from-indigo-500 to-purple-600',
      'Physical Education': 'from-red-500 to-red-600'
    }
    return colors[department as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const handleDelete = (id: number) => {
    setFacultyToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (facultyToDelete !== null) {
      setFaculty(faculty.filter(member => member.id !== facultyToDelete))
      setDeleteDialogOpen(false)
      setFacultyToDelete(null)
    }
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
            <h1 className="text-gray-900">Faculty Management</h1>
            <p className="text-sm text-gray-600">Manage all teaching staff details and information</p>
          </div>
          <Badge variant="secondary">{faculty.length} Faculty Members</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search faculty by name, designation, department, or subjects..."
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
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Faculty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
              <div className={`h-1 bg-gradient-to-r ${getDepartmentColor(member.department)}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={member.photo}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base leading-tight group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mb-1">{member.designation}</p>
                    <Badge className={`bg-gradient-to-r ${getDepartmentColor(member.department)} text-white border-0 text-xs`}>
                      {member.department}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="text-sm font-medium">{member.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {member.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Qualification & Experience */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-sm">Qualification</span>
                    </div>
                    <div className="text-xs text-gray-700">{member.qualification}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-green-50 rounded-lg text-center">
                      <div className="font-medium text-sm text-green-700">{member.experience}</div>
                      <div className="text-xs text-gray-600">Experience</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg text-center">
                      <div className="font-medium text-sm text-purple-700">{member.subjects.length}</div>
                      <div className="text-xs text-gray-600">Subjects</div>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-sm">Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.subjects.slice(0, 2).map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {member.subjects.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.subjects.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>Joined: {new Date(member.joiningDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Specialization */}
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Specialization</div>
                  <div className="text-sm font-medium text-gray-900">{member.specialization}</div>
                </div>

                {/* Delete Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Faculty
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{faculty.length}</div>
                <div className="text-sm text-gray-600">Total Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {faculty.filter(f => f.designation.includes('Professor')).length}
                </div>
                <div className="text-sm text-gray-600">Professors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {faculty.filter(f => f.designation.includes('HOD')).length}
                </div>
                <div className="text-sm text-gray-600">HODs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {(faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the faculty member from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}