import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { ArrowLeft, Search, Mail, Phone, Award, BookOpen, Filter } from 'lucide-react'

interface FacultyDetailsProps {
  onBack: () => void
}

export function FacultyDetails({ onBack }: FacultyDetailsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const facultyMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      designation: 'Professor & HOD',
      department: 'CSE',
      email: 'sarah.johnson@college.edu',
      phone: '(555) 123-4567',
      experience: '15 years',
      specialization: 'AI & Machine Learning',
      publications: 45,
      image: 'https://images.unsplash.com/photo-1670191069225-f992139f6545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRvY3RvciUyMHByb2Zlc3NvcnxlbnwxfHx8fDE3NTcxNzU1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      designation: 'Associate Professor',
      department: 'ECE',
      email: 'michael.chen@college.edu',
      phone: '(555) 234-5678',
      experience: '12 years',
      specialization: 'Signal Processing',
      publications: 32,
      image: 'https://images.unsplash.com/photo-1622016579436-14c1844c99ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMGZhY3VsdHklMjB0ZWFjaGVyc3xlbnwxfHx8fDE3NTcxNzU1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      name: 'Prof. Emily Davis',
      designation: 'Assistant Professor',
      department: 'CSE',
      email: 'emily.davis@college.edu',
      phone: '(555) 345-6789',
      experience: '8 years',
      specialization: 'Software Engineering',
      publications: 28,
      image: 'https://images.unsplash.com/photo-1622016579436-14c1844c99ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMGZhY3VsdHklMjB0ZWFjaGVyc3xlbnwxfHx8fDE3NTcxNzU1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      name: 'Dr. Robert Smith',
      designation: 'Professor',
      department: 'MECH',
      email: 'robert.smith@college.edu',
      phone: '(555) 456-7890',
      experience: '18 years',
      specialization: 'Thermal Engineering',
      publications: 52,
      image: 'https://images.unsplash.com/photo-1622016579436-14c1844c99ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMGZhY3VsdHklMjB0ZWFjaGVyc3xlbnwxfHx8fDE3NTcxNzU1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 5,
      name: 'Prof. Lisa Wilson',
      designation: 'Assistant Professor',
      department: 'CIVIL',
      email: 'lisa.wilson@college.edu',
      phone: '(555) 567-8901',
      experience: '6 years',
      specialization: 'Structural Engineering',
      publications: 18,
      image: 'https://images.unsplash.com/photo-1622016579436-14c1844c99ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMGZhY3VsdHklMjB0ZWFjaGVyc3xlbnwxfHx8fDE3NTcxNzU1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 6,
      name: 'Dr. James Taylor',
      designation: 'Associate Professor',
      department: 'ECE',
      email: 'james.taylor@college.edu',
      phone: '(555) 678-9012',
      experience: '10 years',
      specialization: 'Digital Communications',
      publications: 35,
      image: 'https://images.unsplash.com/photo-1622016579436-14c1844c99ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdW5pdmVyc2l0eSUyMGZhY3VsdHklMjB0ZWFjaGVyc3xlbnwxfHx8fDE3NTcxNzU1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]

  const departments = ['all', 'CSE', 'ECE', 'MECH', 'CIVIL']

  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
          <div>
            <h1 className="text-gray-900">Faculty Directory</h1>
            <p className="text-sm text-gray-600">Department Faculty Information</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search faculty by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDepartment(dept)}
                className="flex-shrink-0 capitalize"
              >
                {dept === 'all' ? 'All Departments' : dept}
              </Button>
            ))}
          </div>
        </div>

        {/* Faculty Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{filteredFaculty.length}</div>
              <div className="text-xs text-gray-600">Faculty Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredFaculty.reduce((sum, f) => sum + f.publications, 0)}
              </div>
              <div className="text-xs text-gray-600">Publications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-xs text-gray-600">Departments</div>
            </CardContent>
          </Card>
        </div>

        {/* Faculty List */}
        <div className="space-y-4">
          {filteredFaculty.map((faculty) => (
            <Card key={faculty.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={faculty.image}
                      alt={faculty.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{faculty.name}</h3>
                        <p className="text-sm text-gray-600">{faculty.designation}</p>
                      </div>
                      <Badge variant="secondary">{faculty.department}</Badge>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-3 h-3" />
                        <span>{faculty.specialization}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-3 h-3" />
                        <span>{faculty.publications} Publications • {faculty.experience}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No faculty members found matching your criteria.</p>
                <p className="text-sm mt-2">Try adjusting your search or filter options.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}