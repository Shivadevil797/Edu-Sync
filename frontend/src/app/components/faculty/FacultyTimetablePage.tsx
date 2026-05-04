import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Edit } from 'lucide-react'

interface FacultyTimetablePageProps {
  onBack?: () => void
  department?: string
}

export function FacultyTimetablePage({ onBack, department = "BCA" }: FacultyTimetablePageProps) {
  const timeSlots = [
    { time: '7:30-8:30', label: '7:30-8:30' },
    { time: '8:30-9:30', label: '8:30-9:30' },
    { time: '9:30-10:30', label: '9:30-10:30' },
    { time: '10:30-11:30', label: '10:30-11:30' },
    { time: '11:00-12:00', label: '11:00-12:00' }
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const timetableData: Record<string, Record<string, { faculty: string, subject: string, section: string, color: string } | null>> = {
    'Monday': {
      '7:30-8:30': null,
      '8:30-9:30': { faculty: 'Prof. Rohit', subject: 'Web Dev', section: 'BCA-1', color: 'bg-blue-100 border-blue-300' },
      '9:30-10:30': { faculty: 'Prof. Priya', subject: 'Programming', section: 'BCA-1', color: 'bg-yellow-100 border-yellow-300' },
      '10:30-11:30': { faculty: 'Dr. Amit', subject: 'Data Structures', section: 'BCA-1', color: 'bg-yellow-100 border-yellow-300' },
      '11:00-12:00': { faculty: 'Prof. Rohit', subject: 'Web Dev', section: 'BCA-3', color: 'bg-blue-100 border-blue-300' }
    },
    'Tuesday': {
      '7:30-8:30': null,
      '8:30-9:30': { faculty: 'Prof. Neha', subject: 'DBMS', section: 'BCA-2', color: 'bg-green-100 border-green-300' },
      '9:30-10:30': null,
      '10:30-11:30': null,
      '11:00-12:00': { faculty: 'Prof. Priya', subject: 'Programming', section: 'BCA-2', color: 'bg-yellow-100 border-yellow-300' }
    },
    'Wednesday': {
      '7:30-8:30': null,
      '8:30-9:30': null,
      '9:30-10:30': { faculty: 'Prof. Neha', subject: 'DBMS', section: 'BCA-3', color: 'bg-green-100 border-green-300' },
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

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Department Timetable Management</h2>
              <p className="text-xs sm:text-sm text-gray-600">Working Hours: 7:30 AM - 2:30 PM | Max 4 hours per faculty</p>
            </div>
          </div>
          {/* Edit removed: Faculty can only view timetable */}
        </div>

        {/* Timetable Grid */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-semibold text-gray-700 bg-gray-50 border-r sticky left-0 z-10">Time</th>
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
                      <td className="p-4 font-medium text-gray-900 bg-gray-50 border-r whitespace-nowrap sticky left-0 z-10">
                        {slot.label}
                      </td>
                      {days.map(day => {
                        const classData = timetableData[day]?.[slot.time]
                        return (
                          <td key={`${day}-${slot.time}`} className="p-2 border-r last:border-r-0 align-top">
                            {classData ? (
                              <div className={`${classData.color} border rounded-lg p-3 h-full`}>
                                <div className="font-semibold text-gray-900 text-sm mb-1">
                                  {classData.faculty}
                                </div>
                                <div className="text-xs text-gray-700">
                                  {classData.subject}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  {classData.section}
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

      </div>
    </div>
  )
}
