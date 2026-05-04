import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Users, Search, Filter, Phone, Mail, Calendar, MapPin, Star } from 'lucide-react'

interface CommitteeManagementPageProps {
  onBack: () => void
}

export function CommitteeManagementPage({ onBack }: CommitteeManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const committees = [
    {
      id: 1,
      name: 'Academic Council',
      convenor: 'Dr. Sunita Mehta',
      department: 'Administration',
      members: 12,
      category: 'academic',
      phone: '+91 98765 43210',
      email: 'academic.council@college.edu',
      meetingSchedule: 'Monthly - First Monday',
      status: 'active',
      responsibilities: 'Academic policy formulation and curriculum oversight'
    },
    {
      id: 2,
      name: 'Admission Committee',
      convenor: 'Dr. Rajesh Kumar',
      department: 'BCA',
      members: 8,
      category: 'administrative',
      phone: '+91 98765 43211',
      email: 'admissions@college.edu',
      meetingSchedule: 'Weekly during admission season',
      status: 'active',
      responsibilities: 'Student admission process and eligibility verification'
    },
    {
      id: 3,
      name: 'Examination Committee',
      convenor: 'Dr. Priya Sharma',
      department: 'BCOM',
      members: 10,
      category: 'academic',
      phone: '+91 98765 43212',
      email: 'examinations@college.edu',
      meetingSchedule: 'Bi-weekly',
      status: 'active',
      responsibilities: 'Examination scheduling and evaluation oversight'
    },
    {
      id: 4,
      name: 'Library Committee',
      convenor: 'Dr. Amit Verma',
      department: 'BCOM A&F',
      members: 6,
      category: 'academic',
      phone: '+91 98765 43213',
      email: 'library@college.edu',
      meetingSchedule: 'Monthly - Third Friday',
      status: 'active',
      responsibilities: 'Library resource management and policy development'
    },
    {
      id: 5,
      name: 'Student Disciplinary Committee',
      convenor: 'Dr. Neha Gupta',
      department: 'BBA',
      members: 7,
      category: 'administrative',
      phone: '+91 98765 43214',
      email: 'discipline@college.edu',
      meetingSchedule: 'As needed',
      status: 'active',
      responsibilities: 'Student conduct and disciplinary matters'
    },
    {
      id: 6,
      name: 'Anti-Ragging Committee',
      convenor: 'Dr. Anita Singh',
      department: 'BCA',
      members: 9,
      category: 'welfare',
      phone: '+91 98765 43215',
      email: 'antiragging@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Prevention and handling of ragging incidents'
    },
    {
      id: 7,
      name: 'Grievance Committee',
      convenor: 'Dr. Vikram Patel',
      department: 'BCOM',
      members: 5,
      category: 'welfare',
      phone: '+91 98765 43216',
      email: 'grievance@college.edu',
      meetingSchedule: 'Bi-weekly',
      status: 'active',
      responsibilities: 'Student and staff grievance resolution'
    },
    {
      id: 8,
      name: 'Cultural Committee',
      convenor: 'Dr. Kavita Joshi',
      department: 'BBA',
      members: 15,
      category: 'extracurricular',
      phone: '+91 98765 43217',
      email: 'cultural@college.edu',
      meetingSchedule: 'Weekly',
      status: 'active',
      responsibilities: 'Cultural events and student activities coordination'
    },
    {
      id: 9,
      name: 'Sports Committee',
      convenor: 'Prof. Ravi Sharma',
      department: 'Physical Education',
      members: 8,
      category: 'extracurricular',
      phone: '+91 98765 43218',
      email: 'sports@college.edu',
      meetingSchedule: 'Bi-weekly',
      status: 'active',
      responsibilities: 'Sports activities and inter-college competitions'
    },
    {
      id: 10,
      name: 'Finance Committee',
      convenor: 'Dr. Suresh Agarwal',
      department: 'BCOM A&F',
      members: 6,
      category: 'administrative',
      phone: '+91 98765 43219',
      email: 'finance@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Budget planning and financial oversight'
    },
    {
      id: 11,
      name: 'Infrastructure Committee',
      convenor: 'Dr. Mohan Reddy',
      department: 'Administration',
      members: 7,
      category: 'administrative',
      phone: '+91 98765 43220',
      email: 'infrastructure@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Campus infrastructure development and maintenance'
    },
    {
      id: 12,
      name: 'Research Committee',
      convenor: 'Dr. Deepa Nair',
      department: 'BCA',
      members: 10,
      category: 'academic',
      phone: '+91 98765 43221',
      email: 'research@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Research promotion and project coordination'
    },
    {
      id: 13,
      name: 'Placement Committee',
      convenor: 'Dr. Rajesh Khanna',
      department: 'BBA',
      members: 12,
      category: 'career',
      phone: '+91 98765 43222',
      email: 'placements@college.edu',
      meetingSchedule: 'Weekly',
      status: 'active',
      responsibilities: 'Student placement and career guidance'
    },
    {
      id: 14,
      name: 'Quality Assurance Committee',
      convenor: 'Dr. Meera Shah',
      department: 'Administration',
      members: 8,
      category: 'academic',
      phone: '+91 98765 43223',
      email: 'quality@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Academic quality monitoring and improvement'
    },
    {
      id: 15,
      name: 'IT Committee',
      convenor: 'Prof. Arjun Malhotra',
      department: 'BCA',
      members: 6,
      category: 'technical',
      phone: '+91 98765 43224',
      email: 'it@college.edu',
      meetingSchedule: 'Bi-weekly',
      status: 'active',
      responsibilities: 'IT infrastructure and digital initiatives'
    },
    {
      id: 16,
      name: 'Environment Committee',
      convenor: 'Dr. Green Kumar',
      department: 'General',
      members: 9,
      category: 'welfare',
      phone: '+91 98765 43225',
      email: 'environment@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Environmental conservation and green initiatives'
    },
    {
      id: 17,
      name: 'Women Empowerment Committee',
      convenor: 'Dr. Shanti Devi',
      department: 'BCOM',
      members: 11,
      category: 'welfare',
      phone: '+91 98765 43226',
      email: 'women@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Women safety and empowerment programs'
    },
    {
      id: 18,
      name: 'Alumni Committee',
      convenor: 'Dr. Rakesh Gupta',
      department: 'BBA',
      members: 8,
      category: 'networking',
      phone: '+91 98765 43227',
      email: 'alumni@college.edu',
      meetingSchedule: 'Quarterly',
      status: 'active',
      responsibilities: 'Alumni engagement and networking events'
    },
    {
      id: 19,
      name: 'Student Welfare Committee',
      convenor: 'Dr. Pooja Verma',
      department: 'BCOM A&F',
      members: 10,
      category: 'welfare',
      phone: '+91 98765 43228',
      email: 'welfare@college.edu',
      meetingSchedule: 'Bi-weekly',
      status: 'active',
      responsibilities: 'Student welfare and support services'
    },
    {
      id: 20,
      name: 'Canteen Committee',
      convenor: 'Prof. Ramesh Yadav',
      department: 'Administration',
      members: 5,
      category: 'administrative',
      phone: '+91 98765 43229',
      email: 'canteen@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Canteen management and food quality oversight'
    },
    {
      id: 21,
      name: 'Transport Committee',
      convenor: 'Dr. Sunil Kumar',
      department: 'Administration',
      members: 6,
      category: 'administrative',
      phone: '+91 98765 43230',
      email: 'transport@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Student transport services management'
    },
    {
      id: 22,
      name: 'Security Committee',
      convenor: 'Mr. Vijay Singh',
      department: 'Security',
      members: 7,
      category: 'administrative',
      phone: '+91 98765 43231',
      email: 'security@college.edu',
      meetingSchedule: 'Weekly',
      status: 'active',
      responsibilities: 'Campus security and safety protocols'
    },
    {
      id: 23,
      name: 'Health Committee',
      convenor: 'Dr. Sunanda Sharma',
      department: 'Health Center',
      members: 6,
      category: 'welfare',
      phone: '+91 98765 43232',
      email: 'health@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Student and staff health services coordination'
    },
    {
      id: 24,
      name: 'Scholarship Committee',
      convenor: 'Dr. Madhuri Jain',
      department: 'BCOM',
      members: 8,
      category: 'welfare',
      phone: '+91 98765 43233',
      email: 'scholarship@college.edu',
      meetingSchedule: 'Quarterly',
      status: 'active',
      responsibilities: 'Scholarship evaluation and distribution'
    },
    {
      id: 25,
      name: 'Internship Committee',
      convenor: 'Prof. Ashok Tiwari',
      department: 'BBA',
      members: 9,
      category: 'career',
      phone: '+91 98765 43234',
      email: 'internship@college.edu',
      meetingSchedule: 'Bi-weekly',
      status: 'active',
      responsibilities: 'Student internship coordination and monitoring'
    },
    {
      id: 26,
      name: 'Innovation Committee',
      convenor: 'Dr. Techno Geek',
      department: 'BCA',
      members: 7,
      category: 'academic',
      phone: '+91 98765 43235',
      email: 'innovation@college.edu',
      meetingSchedule: 'Monthly',
      status: 'active',
      responsibilities: 'Innovation projects and startup incubation'
    },
    {
      id: 27,
      name: 'Media Committee',
      convenor: 'Prof. Ravi Journalist',
      department: 'General',
      members: 8,
      category: 'communication',
      phone: '+91 98765 43236',
      email: 'media@college.edu',
      meetingSchedule: 'Weekly',
      status: 'active',
      responsibilities: 'College media relations and publicity'
    }
  ]

  const categories = ['all', 'academic', 'administrative', 'welfare', 'extracurricular', 'career', 'technical', 'networking', 'communication']

  const filteredCommittees = committees.filter(committee => {
    const matchesSearch = committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         committee.convenor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         committee.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || committee.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'from-blue-500 to-blue-600',
      administrative: 'from-gray-500 to-gray-600',
      welfare: 'from-green-500 to-green-600',
      extracurricular: 'from-purple-500 to-purple-600',
      career: 'from-orange-500 to-orange-600',
      technical: 'from-indigo-500 to-indigo-600',
      networking: 'from-pink-500 to-pink-600',
      communication: 'from-teal-500 to-teal-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      academic: '📚',
      administrative: '📋',
      welfare: '🤝',
      extracurricular: '🎭',
      career: '💼',
      technical: '💻',
      networking: '🌐',
      communication: '📢'
    }
    return icons[category as keyof typeof icons] || '📋'
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
            <h1 className="text-gray-900">Committee Management</h1>
            <p className="text-sm text-gray-600">Manage all college committees and convenors</p>
          </div>
          <Badge variant="secondary">{committees.length} Committees</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search committees, convenors, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Committee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommittees.map((committee) => (
            <Card key={committee.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
              <div className={`h-1 bg-gradient-to-r ${getCategoryColor(committee.category)}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(committee.category)} flex items-center justify-center shadow-lg`}>
                      <span className="text-lg">{getCategoryIcon(committee.category)}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base leading-tight group-hover:text-blue-600 transition-colors">
                        {committee.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {committee.category.charAt(0).toUpperCase() + committee.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Convenor Info */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm">Convenor</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{committee.convenor}</div>
                    <div className="text-gray-600">{committee.department}</div>
                  </div>
                </div>

                {/* Contact & Meeting Info */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    <span>{committee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{committee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{committee.meetingSchedule}</span>
                  </div>
                </div>

                {/* Members & Responsibilities */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Members</span>
                    <Badge variant="outline" className="text-xs">
                      {committee.members}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    {committee.responsibilities}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Committee Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">27</div>
                <div className="text-sm text-gray-600">Total Committees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {committees.reduce((sum, c) => sum + c.members, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Active Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}