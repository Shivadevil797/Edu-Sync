import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  User, 
  Calendar, 
  Download, 
  Printer,
  Coffee
} from 'lucide-react'

interface UnifiedTimetableProps {
  onBack: () => void
  userRole: 'principal' | 'hod' | 'faculty' | 'student'
  department?: string
  title?: string
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

export function UnifiedTimetable({ onBack, userRole, department = '', title }: UnifiedTimetableProps) {
  const [selectedYear, setSelectedYear] = useState('1st Year')
  const [selectedSemester, setSelectedSemester] = useState('1st Semester')
  const [selectedDepartment, setSelectedDepartment] = useState(department || 'BCA')

  // Unified time slots as per requirement
  const timeSlots = [
    '8:00-9:00',
    '9:00-10:00',
    '10:00-10:30',  // Break
    '10:30-11:30',
    '11:30-12:30',
    '12:30-13:30',
    '13:30-14:30'
  ]

  const years = ['1st Year', '2nd Year', '3rd Year']
  const semesters = ['1st Semester', '2nd Semester']
  const departments = ['BCA', 'BCOM', 'BCOM A&F', 'BBA', 'Kannada', 'Hindi', 'Sanskrit']

  // Get current week dates
  const getCurrentWeekDates = () => {
    const today = new Date()
    const currentDay = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1))
    
    const weekDates = []
    for (let i = 0; i < 6; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      weekDates.push(date)
    }
    return weekDates
  }

  const weekDates = getCurrentWeekDates()
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Generate sample timetable data
  const generateTimetableData = (): TimetableSlot[] => {
    const subjects = getSubjectsByDepartment(selectedDepartment, selectedYear, selectedSemester)
    const faculty = getFacultyByDepartment(selectedDepartment)
    const rooms = ['101', '102', '103', '104', '105', 'Lab-1', 'Lab-2', '201', '202', 'Auditorium']

    return timeSlots.map((time, timeIndex) => {
      const slot: TimetableSlot = {
        time,
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: ''
      }

      // Handle break time
      if (time === '10:00-10:30') {
        slot.monday = 'BREAK'
        slot.tuesday = 'BREAK'
        slot.wednesday = 'BREAK'
        slot.thursday = 'BREAK'
        slot.friday = 'BREAK'
        slot.saturday = 'BREAK'
        return slot
      }

      // Assign subjects to each day
      dayNames.forEach((day, dayIndex) => {
        const dayKey = day.toLowerCase() as keyof TimetableSlot
        
        // Saturday has shorter schedule
        if (day === 'Saturday' && timeIndex >= 5) {
          slot[dayKey] = '---'
          return
        }

        const subjectIndex = (timeIndex + dayIndex) % subjects.length
        const facultyIndex = (timeIndex + dayIndex + 1) % faculty.length
        const roomIndex = (timeIndex + dayIndex + 2) % rooms.length

        const subject = subjects[subjectIndex]
        const teacherName = faculty[facultyIndex]
        const room = rooms[roomIndex]

        slot[dayKey] = `${subject}|${room}|${teacherName}`
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
      'BCA': ['Dr. Rajesh Kumar', 'Prof. Arjun Malhotra', 'Dr. Deepa Nair', 'Prof. Sanjay Singh', 'Dr. Meera Patel'],
      'BCOM': ['Dr. Priya Sharma', 'Dr. Vikram Patel', 'Prof. Ravi Kumar', 'Dr. Sneha Gupta'],
      'BCOM A&F': ['Dr. Amit Verma', 'Dr. Suresh Agarwal', 'Prof. Nisha Reddy', 'Dr. Rohit Jain'],
      'BBA': ['Dr. Neha Gupta', 'Dr. Kavita Joshi', 'Dr. Rajesh Khanna', 'Prof. Anjali Mehta'],
      'Kannada': ['Dr. Padmavathi Rao', 'Prof. Lakshmi Devi', 'Dr. Ramesh Gowda'],
      'Hindi': ['Dr. Ramesh Sharma', 'Dr. Sunita Gupta', 'Prof. Ajay Tiwari'],
      'Sanskrit': ['Dr. Vidya Mishra', 'Prof. Ananda Kumar', 'Dr. Sharada Bhat']
    }
    return facultyMap[dept as keyof typeof facultyMap] || ['Faculty 1', 'Faculty 2', 'Faculty 3']
  }

  const timetableData = generateTimetableData()

  const formatCell = (content: string) => {
    if (content === 'BREAK') {
      return (
        <div className="text-center py-3 bg-orange-100 text-orange-800 rounded-lg font-medium">
          <Coffee className="w-4 h-4 mx-auto mb-1" />
          <div className="text-xs">BREAK</div>
        </div>
      )
    }
    
    if (content === '---') {
      return (
        <div className="text-center py-3 text-gray-400">
          ---
        </div>
      )
    }

    const [subject, room, faculty] = content.split('|')
    return (
      <div className="p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow min-h-[80px]">
        <div className="font-medium text-sm text-gray-900 mb-2 leading-tight">{subject}</div>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>{room}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{faculty.split(' ').slice(-1)[0]}</span>
          </div>
        </div>
      </div>
    )
  }

  const getRoleColor = () => {
    switch (userRole) {
      case 'principal': return 'from-indigo-600 to-purple-600'
      case 'hod': return 'from-green-600 to-teal-600'
      case 'faculty': return 'from-purple-600 to-indigo-600'
      case 'student': return 'from-blue-600 to-purple-600'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  const getRoleTitle = () => {
    if (title) return title
    switch (userRole) {
      case 'principal': return 'Principal Dashboard - Timetable'
      case 'hod': return 'HOD Dashboard - Timetable'
      case 'faculty': return 'Faculty Dashboard - Timetable'
      case 'student': return 'Student Dashboard - Timetable'
      default: return 'Timetable'
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
            <h1 className="text-gray-900">{getRoleTitle()}</h1>
            <p className="text-sm text-gray-600">Academic Year 2024-25</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Role-specific header */}
        <Card className={`bg-gradient-to-r ${getRoleColor()} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📅</div>
              <div className="flex-1">
                <h2 className="text-white mb-2">College Timetable</h2>
                <p className="text-white/90 text-sm mb-3">Working Hours: 8:00 AM - 2:30 PM</p>
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
        <div className="flex flex-wrap gap-4 overflow-x-auto hide-scrollbar pb-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Department:</label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Year:</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Semester:</label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {semesters.map(sem => (
                  <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Timetable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Weekly Schedule - {selectedDepartment} ({selectedYear}, {selectedSemester})
            </CardTitle>
            <div className="text-sm text-gray-600">
              Current Week: {weekDates[0].toLocaleDateString()} - {weekDates[5].toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-medium text-gray-700 w-32 sticky left-0 bg-gray-50 z-10">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time
                      </div>
                    </th>
                    {dayNames.map((day, index) => (
                      <th key={day} className="text-left p-4 font-medium text-gray-700 min-w-[200px]">
                        <div className="space-y-1">
                          <div>{day}</div>
                          <div className="text-xs font-normal text-gray-500">
                            {weekDates[index].toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableData.map((slot, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-900 bg-blue-50 border-r sticky left-0 z-10">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="text-sm">{slot.time}</div>
                            {slot.time === '10:00-10:30' && (
                              <div className="text-xs text-orange-600">Break</div>
                            )}
                          </div>
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

        {/* Schedule Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Daily Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>First Session:</span>
                <span className="font-medium">8:00 AM - 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Break Time:</span>
                <span className="font-medium">10:00 AM - 10:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Second Session:</span>
                <span className="font-medium">10:30 AM - 12:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Third Session:</span>
                <span className="font-medium">12:30 PM - 2:30 PM</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total Duration:</span>
                <span className="font-medium">6.5 hours</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Class Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Classes per Day:</span>
                <span className="font-medium">6 periods</span>
              </div>
              <div className="flex justify-between">
                <span>Period Duration:</span>
                <span className="font-medium">1 hour</span>
              </div>
              <div className="flex justify-between">
                <span>Break Duration:</span>
                <span className="font-medium">30 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday Classes:</span>
                <span className="font-medium">Half Day</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Working Days:</span>
                <span className="font-medium">6 days/week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Department:</span>
                <span className="font-medium">{selectedDepartment}</span>
              </div>
              <div className="flex justify-between">
                <span>Academic Year:</span>
                <span className="font-medium">2024-25</span>
              </div>
              <div className="flex justify-between">
                <span>Current Week:</span>
                <span className="font-medium">Week {Math.ceil(new Date().getDate() / 7)}</span>
              </div>
              <div className="flex justify-between">
                <span>Today:</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>User Role:</span>
                <span className="font-medium capitalize">{userRole}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}