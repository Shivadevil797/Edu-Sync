import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, MapPin, User } from 'lucide-react'

interface TimetableProps {
  onBack: () => void
}

export function Timetable({ onBack }: TimetableProps) {
  const [selectedDay, setSelectedDay] = useState('monday')

  const timeSlots = [
    '9:00 AM',
    '10:00 AM', 
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM'
  ]

  const timetableData = {
    monday: [
      { time: '9:00 AM', subject: 'Data Structures', room: 'CSE-101', faculty: 'Dr. Smith', type: 'lecture' },
      { time: '10:00 AM', subject: 'Algorithm Design', room: 'CSE-102', faculty: 'Dr. Johnson', type: 'lecture' },
      { time: '11:00 AM', subject: 'Programming Lab', room: 'Lab-1', faculty: 'Prof. Davis', type: 'lab' },
      { time: '12:00 PM', subject: 'Database Systems', room: 'CSE-103', faculty: 'Dr. Wilson', type: 'lecture' },
      { time: '1:00 PM', subject: 'Lunch Break', room: '', faculty: '', type: 'break' },
      { time: '2:00 PM', subject: 'Software Engineering', room: 'CSE-104', faculty: 'Dr. Brown', type: 'lecture' },
      { time: '3:00 PM', subject: 'Project Work', room: 'Lab-2', faculty: 'Prof. Miller', type: 'project' },
      { time: '4:00 PM', subject: 'Free Period', room: '', faculty: '', type: 'free' }
    ],
    tuesday: [
      { time: '9:00 AM', subject: 'Machine Learning', room: 'CSE-201', faculty: 'Dr. Anderson', type: 'lecture' },
      { time: '10:00 AM', subject: 'Computer Networks', room: 'CSE-202', faculty: 'Dr. Taylor', type: 'lecture' },
      { time: '11:00 AM', subject: 'ML Lab', room: 'Lab-3', faculty: 'Prof. Lee', type: 'lab' },
      { time: '12:00 PM', subject: 'Operating Systems', room: 'CSE-203', faculty: 'Dr. Clark', type: 'lecture' },
      { time: '1:00 PM', subject: 'Lunch Break', room: '', faculty: '', type: 'break' },
      { time: '2:00 PM', subject: 'Web Development', room: 'Lab-4', faculty: 'Prof. White', type: 'lab' },
      { time: '3:00 PM', subject: 'Seminar', room: 'Seminar Hall', faculty: 'Various', type: 'seminar' },
      { time: '4:00 PM', subject: 'Faculty Meeting', room: 'Conference Room', faculty: 'All Faculty', type: 'meeting' }
    ]
  }

  const getSubjectColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800'
      case 'lab': return 'bg-green-100 text-green-800'
      case 'project': return 'bg-purple-100 text-purple-800'
      case 'seminar': return 'bg-orange-100 text-orange-800'
      case 'meeting': return 'bg-red-100 text-red-800'
      case 'break': return 'bg-yellow-100 text-yellow-800'
      case 'free': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const days = [
    { id: 'monday', label: 'Mon' },
    { id: 'tuesday', label: 'Tue' },
    { id: 'wednesday', label: 'Wed' },
    { id: 'thursday', label: 'Thu' },
    { id: 'friday', label: 'Fri' }
  ]

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
            <h1 className="text-gray-900">Department Timetable</h1>
            <p className="text-sm text-gray-600">Weekly Schedule Overview</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Day Selector */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <Button
                key={day.id}
                variant={selectedDay === day.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(day.id)}
                className="flex-shrink-0"
              >
                {day.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Day Schedule */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900 capitalize">{selectedDay} Schedule</h2>
          </div>

          {(timetableData[selectedDay as keyof typeof timetableData] || timetableData.monday).map((slot, index) => (
            <Card key={index} className={`${slot.type === 'break' || slot.type === 'free' ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-center min-w-[70px]">
                      <div className="font-semibold text-sm">{slot.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{slot.subject}</h3>
                        <Badge className={getSubjectColor(slot.type)} variant="secondary">
                          {slot.type}
                        </Badge>
                      </div>
                      {slot.room && (
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{slot.room}</span>
                          </div>
                          {slot.faculty && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{slot.faculty}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">32</div>
                <div className="text-sm text-gray-600">Total Classes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Lab Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}