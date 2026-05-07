import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, Clock, MapPin, User, Coffee, Loader2, AlertTriangle, BookOpen } from 'lucide-react'
import { apiGetStudentAcademicTimetable, apiGetStudentExamTimetable } from '@/services/api'

interface StudentTimetablePageProps {
  onBack: () => void
  type: 'academic' | 'exam'
}

interface TimetableSlot {
  day: string
  period: number
  timeStart: string
  timeEnd: string
  subject: string
  facultyName: string
  room: string
  type: string
}

interface TimetableData {
  _id: string
  department: string
  departmentId?: { name: string; fullName: string }
  year: number
  section: string
  semester: number
  slots: TimetableSlot[]
  isPublished: boolean
}

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

export function StudentTimetablePage({ onBack, type }: StudentTimetablePageProps) {
  const [timetables, setTimetables] = useState<TimetableData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError('')
      try {
        const data = type === 'academic'
          ? await apiGetStudentAcademicTimetable()
          : await apiGetStudentExamTimetable()
        setTimetables(data?.timetables || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load timetable')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [type])

  const buildGrid = (tt: TimetableData) => {
    const maxPeriod = Math.max(8, ...tt.slots.map(s => s.period))
    const grid: (TimetableSlot | null)[][] = []
    for (let p = 1; p <= maxPeriod; p++) {
      const row: (TimetableSlot | null)[] = []
      for (const day of dayNames) {
        const slot = tt.slots.find(s => s.day === day && s.period === p) || null
        row.push(slot)
      }
      grid.push(row)
    }
    return grid
  }

  const formatSlotCell = (slot: TimetableSlot | null) => {
    if (!slot) {
      return <div className="h-full min-h-[68px] flex items-center justify-center text-slate-200">—</div>
    }
    if (slot.type === 'free') {
      return (
        <div className="text-center py-3 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 rounded-xl min-h-[68px] flex flex-col items-center justify-center border border-amber-100">
          <Coffee className="w-4 h-4 mb-1" /><span className="text-xs font-medium">Free</span>
        </div>
      )
    }
    const colorMap: Record<string, { bg: string; border: string; badge: string; badgeText: string }> = {
      theory: {
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        border: 'border-blue-200/80',
        badge: 'bg-blue-100',
        badgeText: 'text-blue-700',
      },
      lab: {
        bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        border: 'border-emerald-200/80',
        badge: 'bg-emerald-100',
        badgeText: 'text-emerald-700',
      },
    }
    const colors = colorMap[slot.type] || { bg: 'bg-white', border: 'border-slate-200', badge: 'bg-slate-100', badgeText: 'text-slate-700' }
    return (
      <div className={`${colors.bg} ${colors.border} border rounded-xl p-3 h-full min-h-[68px] hover:shadow-sm transition-shadow`}>
        <div className="font-semibold text-slate-800 text-sm mb-1 leading-tight">{slot.subject || 'N/A'}</div>
        {slot.facultyName && (
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-0.5">
            <User className="w-3 h-3" />{slot.facultyName}
          </div>
        )}
        {slot.room && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <MapPin className="w-3 h-3" />{slot.room}
          </div>
        )}
        {slot.type === 'lab' && (
          <Badge className={`mt-1.5 text-[10px] px-2 py-0 ${colors.badge} ${colors.badgeText} font-medium hover:${colors.badge}`}>
            Lab
          </Badge>
        )}
      </div>
    )
  }

  const isAcademic = type === 'academic'
  const headerGradient = isAcademic
    ? 'from-blue-600 via-indigo-600 to-purple-600'
    : 'from-purple-600 via-pink-600 to-rose-500'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <div className={`bg-gradient-to-r ${headerGradient} text-white shadow-lg`}>
        <div className="px-6 py-5 flex items-center gap-4 max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isAcademic ? 'Academic Timetable' : 'Exam Timetable'}
              </h2>
              <p className="text-sm text-white/70">
                {isAcademic ? 'Your weekly class schedule' : 'End Semester Examination Schedule'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Loading */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-3" />
              <span className="text-slate-500 text-sm">Loading timetable...</span>
            </div>
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="font-semibold text-red-800 mb-2 text-lg">Failed to Load</h3>
              <p className="text-sm text-red-600">{error}</p>
            </CardContent>
          </Card>
        ) : timetables.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-16 text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${headerGradient} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg opacity-20`}>
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No Timetable Available</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  {isAcademic
                    ? 'Your academic timetable has not been generated yet. Please check with your administration or HOD.'
                    : 'No exam timetable has been published for your class yet.'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : isAcademic ? (
          // Academic timetable — grid view
          timetables.map(tt => {
            const grid = buildGrid(tt)
            return (
              <motion.div key={tt._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="shadow-xl border-0 overflow-hidden">
                  {/* Timetable header */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">
                            {tt.departmentId?.fullName || tt.departmentId?.name || tt.department}
                          </span>
                          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 text-xs">
                            Year {tt.year}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                            Section {tt.section}
                          </Badge>
                          {tt.semester && (
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-500">
                              Sem {tt.semester}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80 border-b border-r border-slate-100 sticky left-0 z-10 bg-slate-50">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                                Time
                              </div>
                            </th>
                            {dayNames.map(day => (
                              <th key={day} className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/80 border-b border-r last:border-r-0 border-slate-100 min-w-[160px]">
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {grid.map((row, pIdx) => {
                            const sample = row.find(s => s !== null)
                            const timeLabel = sample ? `${sample.timeStart || ''}–${sample.timeEnd || ''}` : `P${pIdx + 1}`
                            return (
                              <tr key={pIdx} className="border-b last:border-b-0 border-slate-100 hover:bg-slate-50/30 transition-colors">
                                <td className="p-3 font-medium text-slate-700 bg-slate-50/50 border-r border-slate-100 whitespace-nowrap text-sm sticky left-0 z-10 bg-slate-50">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                    {timeLabel}
                                  </div>
                                </td>
                                {row.map((slot, dIdx) => (
                                  <td key={dIdx} className="p-2 border-r last:border-r-0 border-slate-100 align-top">{formatSlotCell(slot)}</td>
                                ))}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        ) : (
          // Exam timetable — card list view
          <div className="space-y-4">
            {timetables.map(tt => (
              tt.slots.map((slot, idx) => (
                <motion.div
                  key={`${tt._id}-${idx}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <Card className="shadow-md hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Color side accent */}
                        <div className="w-1.5 bg-gradient-to-b from-purple-500 to-pink-500" />
                        <div className="flex-1 p-5 bg-gradient-to-r from-purple-50/50 to-pink-50/30">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Day</p>
                              <p className="font-semibold text-slate-800">{slot.day}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Time</p>
                              <p className="font-semibold text-slate-800">{slot.timeStart || ''} - {slot.timeEnd || ''}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Subject</p>
                              <p className="font-semibold text-slate-800">{slot.subject}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Venue</p>
                              <p className="font-semibold text-slate-800">{slot.room || 'TBA'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
