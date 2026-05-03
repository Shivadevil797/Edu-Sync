import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Clock, Award, Target, FileText, Download, Calendar } from 'lucide-react'

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

interface Subject {
  code: string
  name: string
  credits: number
  totalHours: number
  theoryHours: number
  practicalHours: number
  type: 'Core' | 'Elective' | 'Practical' | 'Project'
  description: string
  objectives: string[]
  prerequisites?: string[]
}

interface DepartmentSyllabusPageProps {
  onBack: () => void
  department: Department
}

export function DepartmentSyllabusPage({ onBack, department }: DepartmentSyllabusPageProps) {
  const [selectedYear, setSelectedYear] = useState('1st Year')
  const [selectedSemester, setSemester] = useState('1st Semester')

  const years = ['1st Year', '2nd Year', '3rd Year']
  const semesters = ['1st Semester', '2nd Semester']

  // Generate syllabus data based on department
  const generateSyllabus = (dept: string, year: string, semester: string): Subject[] => {
    const syllabusMap = {
      'BCA': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'BCA101',
              name: 'Programming Fundamentals',
              credits: 4,
              totalHours: 60,
              theoryHours: 45,
              practicalHours: 15,
              type: 'Core' as const,
              description: 'Introduction to programming concepts using C language',
              objectives: ['Understand basic programming concepts', 'Learn C language syntax', 'Develop problem-solving skills'],
              prerequisites: ['Basic Mathematics']
            },
            {
              code: 'BCA102',
              name: 'Computer Fundamentals',
              credits: 3,
              totalHours: 45,
              theoryHours: 35,
              practicalHours: 10,
              type: 'Core' as const,
              description: 'Basic computer concepts and digital literacy',
              objectives: ['Understand computer hardware', 'Learn operating systems', 'Basic networking concepts']
            },
            {
              code: 'BCA103',
              name: 'Mathematics - I',
              credits: 4,
              totalHours: 60,
              theoryHours: 55,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Mathematical foundations for computer applications',
              objectives: ['Discrete Mathematics', 'Set Theory', 'Number Systems']
            },
            {
              code: 'BCA104',
              name: 'English Communication',
              credits: 2,
              totalHours: 30,
              theoryHours: 25,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Develop communication skills for professional environment',
              objectives: ['Improve spoken English', 'Business communication', 'Technical writing']
            },
            {
              code: 'BCA105',
              name: 'Environmental Studies',
              credits: 2,
              totalHours: 30,
              theoryHours: 30,
              practicalHours: 0,
              type: 'Core' as const,
              description: 'Understanding environmental challenges and sustainability',
              objectives: ['Environmental awareness', 'Conservation methods', 'Sustainable development']
            }
          ],
          '2nd Semester': [
            {
              code: 'BCA201',
              name: 'Data Structures',
              credits: 4,
              totalHours: 60,
              theoryHours: 40,
              practicalHours: 20,
              type: 'Core' as const,
              description: 'Advanced data organization and algorithms',
              objectives: ['Linear data structures', 'Tree structures', 'Graph algorithms'],
              prerequisites: ['BCA101']
            },
            {
              code: 'BCA202',
              name: 'Database Management',
              credits: 4,
              totalHours: 60,
              theoryHours: 40,
              practicalHours: 20,
              type: 'Core' as const,
              description: 'Database design and management systems',
              objectives: ['SQL programming', 'Database normalization', 'Transaction management']
            }
          ]
        }
      },
      'BCOM': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'COM101',
              name: 'Financial Accounting - I',
              credits: 4,
              totalHours: 60,
              theoryHours: 50,
              practicalHours: 10,
              type: 'Core' as const,
              description: 'Fundamentals of financial accounting and bookkeeping',
              objectives: ['Double entry system', 'Trial balance', 'Final accounts']
            },
            {
              code: 'COM102',
              name: 'Business Economics - I',
              credits: 3,
              totalHours: 45,
              theoryHours: 45,
              practicalHours: 0,
              type: 'Core' as const,
              description: 'Microeconomic principles for business applications',
              objectives: ['Demand and supply', 'Market structures', 'Price determination']
            },
            {
              code: 'COM103',
              name: 'Business Mathematics',
              credits: 3,
              totalHours: 45,
              theoryHours: 35,
              practicalHours: 10,
              type: 'Core' as const,
              description: 'Mathematical tools for business and commerce',
              objectives: ['Statistics', 'Probability', 'Financial mathematics']
            }
          ]
        }
      },
      'BCOM A&F': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'CAF101',
              name: 'Advanced Financial Accounting',
              credits: 5,
              totalHours: 75,
              theoryHours: 60,
              practicalHours: 15,
              type: 'Core' as const,
              description: 'Advanced accounting principles and practices',
              objectives: ['Partnership accounting', 'Company accounts', 'Financial statement analysis']
            },
            {
              code: 'CAF102',
              name: 'Corporate Finance',
              credits: 4,
              totalHours: 60,
              theoryHours: 50,
              practicalHours: 10,
              type: 'Core' as const,
              description: 'Financial management in corporate environment',
              objectives: ['Capital structure', 'Working capital', 'Investment decisions']
            }
          ]
        }
      },
      'BBA': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'BBA101',
              name: 'Principles of Management',
              credits: 4,
              totalHours: 60,
              theoryHours: 50,
              practicalHours: 10,
              type: 'Core' as const,
              description: 'Fundamental concepts of management and organization',
              objectives: ['Planning and organizing', 'Leadership styles', 'Control systems']
            },
            {
              code: 'BBA102',
              name: 'Business Communication',
              credits: 3,
              totalHours: 45,
              theoryHours: 30,
              practicalHours: 15,
              type: 'Core' as const,
              description: 'Effective communication in business environment',
              objectives: ['Verbal communication', 'Written communication', 'Presentation skills']
            }
          ]
        }
      },
      'Kannada': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'KAN101',
              name: 'Classical Kannada Literature',
              credits: 4,
              totalHours: 60,
              theoryHours: 55,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Study of ancient Kannada literary works',
              objectives: ['Pampa Bharata', 'Ramayana literature', 'Jaina literature']
            },
            {
              code: 'KAN102',
              name: 'Kannada Grammar',
              credits: 3,
              totalHours: 45,
              theoryHours: 40,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Comprehensive study of Kannada grammar',
              objectives: ['Phonetics', 'Morphology', 'Syntax']
            }
          ]
        }
      },
      'Hindi': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'HIN101',
              name: 'Modern Hindi Literature',
              credits: 4,
              totalHours: 60,
              theoryHours: 55,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Contemporary Hindi literary movements and authors',
              objectives: ['Chhayavad poetry', 'Modern prose', 'Literary criticism']
            },
            {
              code: 'HIN102',
              name: 'Hindi Language Structure',
              credits: 3,
              totalHours: 45,
              theoryHours: 40,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Linguistic analysis of Hindi language',
              objectives: ['Hindi phonology', 'Morphology', 'Syntax']
            }
          ]
        }
      },
      'Sanskrit': {
        '1st Year': {
          '1st Semester': [
            {
              code: 'SAN101',
              name: 'Vedic Literature',
              credits: 4,
              totalHours: 60,
              theoryHours: 55,
              practicalHours: 5,
              type: 'Core' as const,
              description: 'Study of ancient Vedic texts and their significance',
              objectives: ['Rigveda study', 'Samhitas', 'Brahmanas and Upanishads']
            },
            {
              code: 'SAN102',
              name: 'Sanskrit Grammar',
              credits: 4,
              totalHours: 60,
              theoryHours: 50,
              practicalHours: 10,
              type: 'Core' as const,
              description: 'Classical Sanskrit grammar based on Panini',
              objectives: ['Sandhi rules', 'Dhatu rupa', 'Subanta prakarana']
            }
          ]
        }
      }
    }

    const deptSyllabus = syllabusMap[dept as keyof typeof syllabusMap]
    const yearSyllabus = deptSyllabus?.[year as keyof typeof deptSyllabus]
    const semesterSyllabus = yearSyllabus?.[semester as keyof typeof yearSyllabus]
    
    return semesterSyllabus || []
  }

  const subjects = generateSyllabus(department.shortName, selectedYear, selectedSemester)
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0)
  const totalHours = subjects.reduce((sum, subject) => sum + subject.totalHours, 0)

  const getTypeColor = (type: string) => {
    const colors = {
      'Core': 'bg-blue-100 text-blue-800',
      'Elective': 'bg-green-100 text-green-800',
      'Practical': 'bg-purple-100 text-purple-800',
      'Project': 'bg-orange-100 text-orange-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
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
            <h1 className="text-gray-900">{department.shortName} Syllabus</h1>
            <p className="text-sm text-gray-600">{selectedYear} - {selectedSemester}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{subjects.length} Subjects</Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
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
                <p className="text-white/90 text-sm mb-3">Academic Year 2024-25 Curriculum</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{totalCredits}</div>
                    <div className="text-xs text-white/80">Total Credits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{totalHours}</div>
                    <div className="text-xs text-white/80">Total Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{subjects.length}</div>
                    <div className="text-xs text-white/80">Subjects</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Semester:</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSemester(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subjects */}
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Badge className={getTypeColor(subject.type)}>
                        {subject.type}
                      </Badge>
                      <Badge variant="outline">
                        {subject.code}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{subject.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Hours and Credits */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700">Credits</span>
                    </div>
                    <div className="text-xl font-bold text-blue-600">{subject.credits}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Total Hours</span>
                    </div>
                    <div className="text-xl font-bold text-green-600">{subject.totalHours}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-purple-700">Theory</span>
                    </div>
                    <div className="text-xl font-bold text-purple-600">{subject.theoryHours}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-700">Practical</span>
                    </div>
                    <div className="text-xl font-bold text-orange-600">{subject.practicalHours}</div>
                  </div>
                </div>

                {/* Theory vs Practical Distribution */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Theory vs Practical Distribution</span>
                    <span>{Math.round((subject.theoryHours / subject.totalHours) * 100)}% Theory</span>
                  </div>
                  <Progress 
                    value={(subject.theoryHours / subject.totalHours) * 100}
                    className="h-2"
                  />
                </div>

                {/* Learning Objectives */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-indigo-500" />
                    <span className="font-medium text-sm">Learning Objectives</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {subject.objectives.map((objective, objIndex) => (
                      <div key={objIndex} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                {subject.prerequisites && subject.prerequisites.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-sm">Prerequisites</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subject.prerequisites.map((prereq, preIndex) => (
                        <Badge key={preIndex} variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCredits}</div>
              <div className="text-sm text-gray-600">Total Credits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{totalHours}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {subjects.reduce((sum, s) => sum + s.theoryHours, 0)}
              </div>
              <div className="text-sm text-gray-600">Theory Hours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {subjects.reduce((sum, s) => sum + s.practicalHours, 0)}
              </div>
              <div className="text-sm text-gray-600">Practical Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Academic Calendar Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Semester Duration:</span>
                <span className="font-medium">6 months</span>
              </div>
              <div className="flex justify-between">
                <span>Teaching Weeks:</span>
                <span className="font-medium">18 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Examination Period:</span>
                <span className="font-medium">2 weeks</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Assessment Pattern:</span>
                <span className="font-medium">Continuous + Final</span>
              </div>
              <div className="flex justify-between">
                <span>Passing Criteria:</span>
                <span className="font-medium">40% minimum</span>
              </div>
              <div className="flex justify-between">
                <span>Credit System:</span>
                <span className="font-medium">Choice Based</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}