import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, User, Calendar, Download, Printer } from 'lucide-react'

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

interface DepartmentTimetablePageProps {
  onBack: () => void
  department: Department
}

interface TimetableSlot {
  time: string
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
}

interface FacultySchedule {
  facultyName: string
  schedule: {
    [day: string]: {
      [time: string]: {
        department: string
        year: string
        semester: string
        subject: string
        room: string
      } | null
    }
  }
}

export function DepartmentTimetablePage({ onBack, department }: DepartmentTimetablePageProps) {
  const [selectedYear, setSelectedYear] = useState('1st Year')
  const [selectedSemester, setSemester] = useState('1st Semester')

  const years = ['1st Year', '2nd Year', '3rd Year']
  const semesters = ['1st Semester', '2nd Semester']

  // Global faculty schedule tracker to prevent overlaps
  const globalFacultySchedule = new Map<string, FacultySchedule>()

  // Initialize global schedule for all faculty
  const initializeGlobalSchedule = () => {
    const allFaculty = getAllFaculty()
    const timeSlots = [
      '9:00 - 9:50', '10:00 - 10:50', '11:00 - 11:50',
      '2:00 - 2:50', '3:00 - 3:50', '4:00 - 4:50'
    ]
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    allFaculty.forEach(faculty => {
      if (!globalFacultySchedule.has(faculty)) {
        const schedule: any = {}
        days.forEach(day => {
          schedule[day] = {}
          timeSlots.forEach(time => {
            schedule[day][time] = null
          })
        })
        globalFacultySchedule.set(faculty, { facultyName: faculty, schedule })
      }
    })
  }

  // Check if faculty is available at a specific time
  const isFacultyAvailable = (faculty: string, day: string, time: string): boolean => {
    const facultySchedule = globalFacultySchedule.get(faculty)
    if (!facultySchedule) return true
    return facultySchedule.schedule[day][time] === null
  }

  // Book faculty for a specific time slot
  const bookFaculty = (faculty: string, day: string, time: string, details: any) => {
    const facultySchedule = globalFacultySchedule.get(faculty)
    if (facultySchedule) {
      facultySchedule.schedule[day][time] = details
    }
  }

  // Get all faculty from all departments
  const getAllFaculty = (): string[] => {
    const allDeptFaculty = [
      ...getFacultyByDepartment('BCA'),
      ...getFacultyByDepartment('BCOM'),
      ...getFacultyByDepartment('BCOM A&F'),
      ...getFacultyByDepartment('BBA'),
      ...getFacultyByDepartment('Kannada'),
      ...getFacultyByDepartment('Hindi'),
      ...getFacultyByDepartment('Sanskrit'),
      'Prof. English Dept', 'Dr. Physical Education', 'Prof. Environmental Science'
    ]
    return [...new Set(allDeptFaculty)] // Remove duplicates
  }

  // Generate timetable data based on department, year, and semester
  const generateTimetable = (dept: string, year: string, semester: string): TimetableSlot[] => {
    // Initialize global schedule
    initializeGlobalSchedule()

    const subjects = getSubjectsByDepartment(dept, year, semester)
    const rooms = ['101', '102', '103', '104', '105', 'Lab-1', 'Lab-2', 'Auditorium', '201', '202']
    const deptFaculty = getFacultyByDepartment(dept)
    const allFaculty = getAllFaculty()
    
    const timeSlots = [
      '9:00 - 9:50',
      '10:00 - 10:50', 
      '11:00 - 11:50',
      '12:00 - 12:50',
      '2:00 - 2:50',
      '3:00 - 3:50',
      '4:00 - 4:50'
    ]

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const usedCombinations = new Set<string>()

    return timeSlots.map(time => {
      const slot: TimetableSlot = {
        time,
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: ''
      }

      // Special handling for lunch break
      if (time === '12:00 - 12:50') {
        slot.monday = 'LUNCH BREAK'
        slot.tuesday = 'LUNCH BREAK'
        slot.wednesday = 'LUNCH BREAK'
        slot.thursday = 'LUNCH BREAK'
        slot.friday = 'LUNCH BREAK'
        slot.saturday = 'LUNCH BREAK'
        return slot
      }

      days.forEach((day, dayIndex) => {
        let attempts = 0
        let assigned = false

        while (!assigned && attempts < 20) {
          const subjectIndex = (timeSlots.indexOf(time) + dayIndex + attempts) % subjects.length
          const subject = subjects[subjectIndex]
          
          // Determine faculty based on subject type
          let faculty: string
          if (subject.toLowerCase().includes('language') || subject.toLowerCase().includes('english')) {
            faculty = 'Prof. English Dept'
          } else if (subject.toLowerCase().includes('physical') || subject.toLowerCase().includes('sports')) {
            faculty = 'Dr. Physical Education'
          } else if (subject.toLowerCase().includes('environmental')) {
            faculty = 'Prof. Environmental Science'
          } else {
            const facultyIndex = (subjectIndex + dayIndex + attempts) % deptFaculty.length
            faculty = deptFaculty[facultyIndex]
          }

          const roomIndex = (subjectIndex + dayIndex + attempts) % rooms.length
          const room = rooms[roomIndex]

          const combinationKey = `${day}-${time}-${faculty}`

          // Check if faculty is available and combination hasn't been used
          if (isFacultyAvailable(faculty, day, time) && !usedCombinations.has(combinationKey)) {
            // Saturday has shorter schedule
            if (day === 'saturday' && timeSlots.indexOf(time) > 2) {
              slot[day as keyof TimetableSlot] = '---'
            } else {
              slot[day as keyof TimetableSlot] = `${subject}|${room}|${faculty}`
              
              // Book the faculty
              bookFaculty(faculty, day, time, {
                department: dept,
                year,
                semester,
                subject,
                room
              })
              
              usedCombinations.add(combinationKey)
            }
            assigned = true
          }
          attempts++
        }

        // If couldn't assign after multiple attempts, use fallback
        if (!assigned && day !== 'saturday') {
          slot[day as keyof TimetableSlot] = `Study Hour|${rooms[0]}|Self Study`
        }
      })

      return slot
    })
  }

  const getSubjectsByDepartment = (dept: string, year: string, semester: string): string[] => {
    const subjectMap: { [key: string]: { [key: string]: { [key: string]: string[] } } } = {
      'BCA': {
        '1st Year': {
          '1st Semester': ['Programming in C', 'Computer Fundamentals', 'Mathematics-I', 'English Language', 'Environmental Studies', 'Physical Education'],
          '2nd Semester': ['Programming in C++', 'Data Structures', 'Mathematics-II', 'English Communication', 'Digital Electronics', 'Physical Education']
        },
        '2nd Year': {
          '1st Semester': ['Java Programming', 'Database Management', 'Web Technologies', 'Software Engineering', 'Computer Networks', 'Kannada Language'],
          '2nd Semester': ['Advanced Java', 'Operating Systems', 'System Analysis', 'Mobile App Development', 'Cloud Computing', 'Hindi Language']
        },
        '3rd Year': {
          '1st Semester': ['Python Programming', 'Artificial Intelligence', 'Project Work-I', 'Cyber Security', 'Data Science', 'Elective-I'],
          '2nd Semester': ['Machine Learning', 'Blockchain Technology', 'Project Work-II', 'Industry Training', 'Entrepreneurship', 'Elective-II']
        }
      },
      'BCOM': {
        '1st Year': {
          '1st Semester': ['Financial Accounting-I', 'Business Economics-I', 'Business Mathematics', 'English Language', 'Environmental Studies', 'Physical Education'],
          '2nd Semester': ['Financial Accounting-II', 'Business Economics-II', 'Business Statistics', 'Business Communication', 'Computer Applications', 'Kannada Language']
        },
        '2nd Year': {
          '1st Semester': ['Corporate Accounting', 'Cost Accounting', 'Company Law', 'Marketing Management', 'Banking & Insurance', 'Hindi Language'],
          '2nd Semester': ['Management Accounting', 'Income Tax', 'Business Law', 'International Trade', 'E-Commerce', 'Physical Education']
        },
        '3rd Year': {
          '1st Semester': ['Advanced Accounting', 'Auditing', 'Investment Management', 'Research Methodology', 'Project Work-I', 'Elective-I'],
          '2nd Semester': ['Financial Management', 'Goods & Service Tax', 'Entrepreneurship', 'Industry Training', 'Project Work-II', 'Elective-II']
        }
      },
      'BCOM A&F': {
        '1st Year': {
          '1st Semester': ['Advanced Accounting-I', 'Corporate Finance-I', 'Financial Markets', 'English Language', 'Business Mathematics', 'Environmental Studies'],
          '2nd Semester': ['Advanced Accounting-II', 'Corporate Finance-II', 'Investment Analysis', 'Business Communication', 'Financial Software', 'Physical Education']
        },
        '2nd Year': {
          '1st Semester': ['Portfolio Management', 'Risk Management', 'International Finance', 'Derivatives Trading', 'Financial Planning', 'Kannada Language'],
          '2nd Semester': ['Banking Operations', 'Insurance Management', 'Mutual Funds', 'Financial Modeling', 'Treasury Management', 'Hindi Language']
        },
        '3rd Year': {
          '1st Semester': ['Advanced Portfolio Theory', 'Financial Engineering', 'Credit Analysis', 'Project Work-I', 'Research Methods', 'Elective-I'],
          '2nd Semester': ['Wealth Management', 'Corporate Valuation', 'Financial Regulations', 'Industry Training', 'Project Work-II', 'Elective-II']
        }
      },
      'BBA': {
        '1st Year': {
          '1st Semester': ['Principles of Management', 'Business Economics', 'Accounting for Managers', 'English Language', 'Business Mathematics', 'Environmental Studies'],
          '2nd Semester': ['Organizational Behavior', 'Marketing Management', 'Financial Management', 'Business Communication', 'Computer Applications', 'Physical Education']
        },
        '2nd Year': {
          '1st Semester': ['Human Resource Management', 'Operations Management', 'Business Law', 'International Business', 'Kannada Language', 'Elective-I'],
          '2nd Semester': ['Strategic Management', 'Project Management', 'Supply Chain Management', 'Digital Marketing', 'Hindi Language', 'Elective-II']
        },
        '3rd Year': {
          '1st Semester': ['Leadership & Team Building', 'Business Analytics', 'Entrepreneurship', 'Project Work-I', 'Industry Interface', 'Specialization-I'],
          '2nd Semester': ['Corporate Strategy', 'Change Management', 'Innovation Management', 'Industry Training', 'Project Work-II', 'Specialization-II']
        }
      },
      'Kannada': {
        '1st Year': {
          '1st Semester': ['Classical Kannada Literature', 'Kannada Grammar', 'Phonetics & Phonology', 'English Language', 'Environmental Studies', 'Physical Education'],
          '2nd Semester': ['Medieval Kannada Literature', 'Prosody & Rhetoric', 'Comparative Literature', 'Hindi Language', 'Computer Applications', 'Cultural Studies']
        },
        '2nd Year': {
          '1st Semester': ['Modern Kannada Literature', 'Folk Literature', 'Translation Studies', 'Linguistics', 'Sanskrit Language', 'Research Methodology'],
          '2nd Semester': ['Contemporary Writers', 'Literary Criticism', 'Kannada Cinema', 'Journalism', 'Mass Communication', 'Project Work-I']
        },
        '3rd Year': {
          '1st Semester': ['Kannada Drama', 'Creative Writing', 'Language Teaching', 'Dialectology', 'Project Work-II', 'Specialization-I'],
          '2nd Semester': ['Modern Trends', 'Comparative Study', 'Industry Training', 'Dissertation', 'Viva Voce', 'Specialization-II']
        }
      },
      'Hindi': {
        '1st Year': {
          '1st Semester': ['Hindi Literature (Aadikal)', 'Hindi Grammar', 'Devanagari Script', 'English Language', 'Environmental Studies', 'Physical Education'],
          '2nd Semester': ['Hindi Literature (Bhaktikal)', 'Poetry Analysis', 'Prose Writing', 'Kannada Language', 'Computer Applications', 'Cultural Studies']
        },
        '2nd Year': {
          '1st Semester': ['Modern Hindi Poetry', 'Hindi Novel', 'Literary Criticism', 'Linguistics', 'Sanskrit Language', 'Research Methodology'],
          '2nd Semester': ['Contemporary Literature', 'Drama & Theatre', 'Hindi Cinema', 'Translation Studies', 'Mass Media', 'Project Work-I']
        },
        '3rd Year': {
          '1st Semester': ['Hindi Short Stories', 'Creative Writing', 'Language Teaching', 'Comparative Literature', 'Project Work-II', 'Specialization-I'],
          '2nd Semester': ['Modern Trends', 'Literary Movements', 'Industry Training', 'Dissertation', 'Viva Voce', 'Specialization-II']
        }
      },
      'Sanskrit': {
        '1st Year': {
          '1st Semester': ['Vedic Literature', 'Sanskrit Grammar (Laghu Kaumudi)', 'Devanagari & Manuscripts', 'English Language', 'Environmental Studies', 'Yoga & Meditation'],
          '2nd Semester': ['Classical Sanskrit Poetry', 'Sandhi & Morphology', 'Hindu Philosophy', 'Hindi Language', 'Computer Applications', 'Ayurveda Basics']
        },
        '2nd Year': {
          '1st Semester': ['Upanishads Study', 'Sanskrit Drama', 'Dharmashastra', 'Comparative Philosophy', 'Kannada Language', 'Research Methodology'],
          '2nd Semester': ['Puranas Study', 'Kavya Literature', 'Jyotisha (Astrology)', 'Translation Studies', 'Sanskrit Computing', 'Project Work-I']
        },
        '3rd Year': {
          '1st Semester': ['Advanced Grammar', 'Manuscript Study', 'Teaching Methodology', 'Yoga Philosophy', 'Project Work-II', 'Specialization-I'],
          '2nd Semester': ['Modern Sanskrit', 'Comparative Studies', 'Industry Training', 'Dissertation', 'Viva Voce', 'Specialization-II']
        }
      }
    }
    
    return subjectMap[dept]?.[year]?.[semester] || ['Subject 1', 'Subject 2', 'Subject 3', 'English Language', 'Physical Education', 'Environmental Studies']
  }

  const getFacultyByDepartment = (dept: string): string[] => {
    const facultyMap = {
      'BCA': ['Dr. Rajesh Kumar', 'Prof. Arjun Malhotra', 'Dr. Deepa Nair'],
      'BCOM': ['Dr. Priya Sharma', 'Dr. Vikram Patel'],
      'BCOM A&F': ['Dr. Amit Verma', 'Dr. Suresh Agarwal'],
      'BBA': ['Dr. Neha Gupta', 'Dr. Kavita Joshi', 'Dr. Rajesh Khanna'],
      'Kannada': ['Dr. Padmavathi Rao', 'Prof. Lakshmi Devi'],
      'Hindi': ['Dr. Ramesh Sharma', 'Dr. Sunita Gupta'],
      'Sanskrit': ['Dr. Vidya Mishra', 'Prof. Ananda Kumar']
    }
    return facultyMap[dept as keyof typeof facultyMap] || ['Faculty 1', 'Faculty 2']
  }

  const timetable = generateTimetable(department.shortName, selectedYear, selectedSemester)

  const formatCell = (content: string) => {
    if (content === 'LUNCH BREAK') {
      return (
        <div className="text-center py-2 bg-orange-100 text-orange-800 rounded font-medium">
          🍽️ LUNCH BREAK
        </div>
      )
    }
    
    if (content === '---') {
      return (
        <div className="text-center py-2 text-gray-400">
          ---
        </div>
      )
    }

    const [subject, room, faculty] = content.split('|')
    return (
      <div className="p-2 bg-white rounded border border-gray-200 hover:shadow-sm transition-shadow">
        <div className="font-medium text-sm text-gray-900 mb-1 leading-tight">{subject}</div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{room}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span className="truncate">{faculty.split(' ').slice(-1)[0]}</span>
          </div>
        </div>
      </div>
    )
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
            <h1 className="text-gray-900">{department.shortName} Timetable</h1>
            <p className="text-sm text-gray-600">{selectedYear} - {selectedSemester}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
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
                <p className="text-white/90 text-sm mb-3">Academic Year 2024-25</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                    <Calendar className="w-3 h-3 mr-1" />
                    {selectedYear}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedSemester}
                  </Badge>
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

        {/* Timetable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Weekly Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-medium text-gray-700 w-32">Time</th>
                    <th className="text-left p-4 font-medium text-gray-700">Monday</th>
                    <th className="text-left p-4 font-medium text-gray-700">Tuesday</th>
                    <th className="text-left p-4 font-medium text-gray-700">Wednesday</th>
                    <th className="text-left p-4 font-medium text-gray-700">Thursday</th>
                    <th className="text-left p-4 font-medium text-gray-700">Friday</th>
                    <th className="text-left p-4 font-medium text-gray-700">Saturday</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((slot, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-900 bg-blue-50 border-r">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          {slot.time}
                        </div>
                      </td>
                      <td className="p-3">{formatCell(slot.monday)}</td>
                      <td className="p-3">{formatCell(slot.tuesday)}</td>
                      <td className="p-3">{formatCell(slot.wednesday)}</td>
                      <td className="p-3">{formatCell(slot.thursday)}</td>
                      <td className="p-3">{formatCell(slot.friday)}</td>
                      <td className="p-3">{formatCell(slot.saturday)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Class Timings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Morning Session:</span>
                <span className="font-medium">9:00 AM - 12:50 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Lunch Break:</span>
                <span className="font-medium">12:50 PM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Afternoon Session:</span>
                <span className="font-medium">2:00 PM - 4:50 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday Classes:</span>
                <span className="font-medium">9:00 AM - 12:00 PM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Room Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>101-105:</span>
                <span className="font-medium">Lecture Halls</span>
              </div>
              <div className="flex justify-between">
                <span>101-105, 201-202:</span>
                <span className="font-medium">Lecture Halls</span>
              </div>
              <div className="flex justify-between">
                <span>Lab-1, Lab-2:</span>
                <span className="font-medium">Computer Labs</span>
              </div>
              <div className="flex justify-between">
                <span>Auditorium:</span>
                <span className="font-medium">Main Hall</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Academic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Subjects:</span>
                <span className="font-medium">{getSubjectsByDepartment(department.shortName, selectedYear, selectedSemester).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Faculty Count:</span>
                <span className="font-medium">{getFacultyByDepartment(department.shortName).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Working Days:</span>
                <span className="font-medium">6 days/week</span>
              </div>
              <div className="flex justify-between">
                <span>Class Duration:</span>
                <span className="font-medium">50 minutes</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Semester-specific Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Semester Details - {selectedYear} {selectedSemester}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Core Subjects:</span>
                <span className="font-medium">
                  {getSubjectsByDepartment(department.shortName, selectedYear, selectedSemester)
                    .filter(s => !s.toLowerCase().includes('language') && !s.toLowerCase().includes('physical') && !s.toLowerCase().includes('environmental'))
                    .length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Language Subjects:</span>
                <span className="font-medium">
                  {getSubjectsByDepartment(department.shortName, selectedYear, selectedSemester)
                    .filter(s => s.toLowerCase().includes('language'))
                    .length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>General Subjects:</span>
                <span className="font-medium">
                  {getSubjectsByDepartment(department.shortName, selectedYear, selectedSemester)
                    .filter(s => s.toLowerCase().includes('physical') || s.toLowerCase().includes('environmental'))
                    .length}
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Theory Classes:</span>
                <span className="font-medium">30 hours/week</span>
              </div>
              <div className="flex justify-between">
                <span>Practical Classes:</span>
                <span className="font-medium">6 hours/week</span>
              </div>
              <div className="flex justify-between">
                <span>Total Contact Hours:</span>
                <span className="font-medium">36 hours/week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Schedule Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Faculty Allocation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-600">{getFacultyByDepartment(department.shortName).length}</div>
                <div className="text-gray-600">Dept Faculty</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-green-600">3</div>
                <div className="text-gray-600">Lang Faculty</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-600">2</div>
                <div className="text-gray-600">Gen Faculty</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="font-medium text-orange-600">0</div>
                <div className="text-gray-600">Conflicts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>Room Number</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <span>Faculty Name</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-100 rounded border"></div>
                <span>Break Time</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}