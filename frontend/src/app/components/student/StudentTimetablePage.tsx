import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowLeft } from 'lucide-react'

interface StudentTimetablePageProps {
  onBack: () => void
  type: 'academic' | 'exam'
}

export function StudentTimetablePage({ onBack, type }: StudentTimetablePageProps) {
  const timeSlots = [
    { time: '7:30-8:30', label: '7:30-8:30' },
    { time: '8:30-9:30', label: '8:30-9:30' },
    { time: '9:30-10:30', label: '9:30-10:30' },
    { time: '10:30-11:30', label: '10:30-11:30' },
    { time: '11:00-12:00', label: '11:00-12:00' }
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const academicTimetableData: Record<string, Record<string, { subject: string, faculty: string, room: string, color: string } | null>> = {
    'Monday': {
      '7:30-8:30': null,
      '8:30-9:30': { subject: 'Web Development', faculty: 'Prof. Rohit', room: 'Room 102', color: 'bg-blue-100 border-blue-300' },
      '9:30-10:30': { subject: 'Programming', faculty: 'Prof. Priya', room: 'Room 205', color: 'bg-yellow-100 border-yellow-300' },
      '10:30-11:30': { subject: 'Data Structures', faculty: 'Dr. Amit', room: 'Room 108', color: 'bg-yellow-100 border-yellow-300' },
      '11:00-12:00': { subject: 'Web Development', faculty: 'Prof. Rohit', room: 'Room 102', color: 'bg-blue-100 border-blue-300' }
    },
    'Tuesday': {
      '7:30-8:30': null,
      '8:30-9:30': { subject: 'DBMS', faculty: 'Prof. Neha', room: 'Room 201', color: 'bg-green-100 border-green-300' },
      '9:30-10:30': null,
      '10:30-11:30': null,
      '11:00-12:00': { subject: 'Programming', faculty: 'Prof. Priya', room: 'Room 205', color: 'bg-yellow-100 border-yellow-300' }
    },
    'Wednesday': {
      '7:30-8:30': null,
      '8:30-9:30': null,
      '9:30-10:30': { subject: 'DBMS', faculty: 'Prof. Neha', room: 'Room 201', color: 'bg-green-100 border-green-300' },
      '10:30-11:30': null,
      '11:00-12:00': null
    },
    'Thursday': {
      '7:30-8:30': null,
      '8:30-9:30': null,
      '9:30-10:30': null,
      '10:30-11:30': null,
      '11:00-12:00': null
    },
    'Friday': {
      '7:30-8:30': null,
      '8:30-9:30': null,
      '9:30-10:30': null,
      '10:30-11:30': null,
      '11:00-12:00': null
    },
    'Saturday': {
      '7:30-8:30': null,
      '8:30-9:30': null,
      '9:30-10:30': null,
      '10:30-11:30': null,
      '11:00-12:00': null
    }
  }

  const examTimetableData = [
    {
      date: 'May 15, 2026',
      day: 'Friday',
      time: '10:00 AM - 1:00 PM',
      subject: 'Data Structures',
      room: 'Hall A',
      color: 'from-purple-50 to-pink-50'
    },
    {
      date: 'May 18, 2026',
      day: 'Monday',
      time: '10:00 AM - 1:00 PM',
      subject: 'Database Systems',
      room: 'Hall B',
      color: 'from-purple-50 to-pink-50'
    },
    {
      date: 'May 22, 2026',
      day: 'Friday',
      time: '10:00 AM - 1:00 PM',
      subject: 'Web Technologies',
      room: 'Hall A',
      color: 'from-purple-50 to-pink-50'
    },
    {
      date: 'May 25, 2026',
      day: 'Monday',
      time: '10:00 AM - 1:00 PM',
      subject: 'Operating Systems',
      room: 'Hall C',
      color: 'from-purple-50 to-pink-50'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${type === 'academic' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'} rounded-xl flex items-center justify-center`}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {type === 'academic' ? 'Academic Time-table' : 'Exam Time-table'}
                </h2>
                <p className="text-sm text-gray-600">
                  {type === 'academic' ? 'BCA 3rd Semester - Section A' : 'End Semester Examination Schedule'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {type === 'academic' ? (
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 border-r">Time</th>
                      {days.map(day => (
                        <th key={day} className="p-4 text-left font-semibold text-gray-700 bg-gray-50 border-r last:border-r-0 min-w-[150px]">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr key={slot.time} className="border-b last:border-b-0">
                        <td className="p-4 font-medium text-gray-900 bg-gray-50 border-r whitespace-nowrap">
                          {slot.label}
                        </td>
                        {days.map(day => {
                          const classData = academicTimetableData[day]?.[slot.time]
                          return (
                            <td key={`${day}-${slot.time}`} className="p-2 border-r last:border-r-0 align-top">
                              {classData ? (
                                <div className={`${classData.color} border rounded-lg p-3 h-full`}>
                                  <div className="font-semibold text-gray-900 text-sm mb-1">
                                    {classData.subject}
                                  </div>
                                  <div className="text-xs text-gray-700">
                                    {classData.faculty}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {classData.room}
                                  </div>
                                </div>
                              ) : (
                                <div className="h-full min-h-[60px] flex items-center justify-center text-gray-300">
                                  -
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {examTimetableData.map((exam, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className={`p-6 bg-gradient-to-r ${exam.color} border-l-4 border-purple-500`}>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Date</p>
                      <p className="font-semibold text-gray-900">{exam.date}</p>
                      <p className="text-xs text-gray-600">{exam.day}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Time</p>
                      <p className="font-semibold text-gray-900">{exam.time}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Subject</p>
                      <p className="font-semibold text-gray-900">{exam.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Venue</p>
                      <p className="font-semibold text-gray-900">{exam.room}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
