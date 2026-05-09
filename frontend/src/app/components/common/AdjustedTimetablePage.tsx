import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft, Calendar, Clock, User, UserCheck, UserX,
  AlertTriangle, Loader2, ArrowRightLeft, XCircle, MapPin
} from 'lucide-react'

interface AdjustedSlot {
  period: number
  timeStart: string
  timeEnd: string
  subject: string
  originalFacultyName: string
  substituteFacultyName: string | null
  room: string
  type: string
  status: 'substituted' | 'cancelled'
}

interface AdjustedTimetableData {
  _id: string
  absentFacultyName: string
  departmentId?: { name: string; fullName: string }
  date: string
  dayOfWeek: string
  year: number
  section: string
  leaveType: string
  leaveReason: string
  adjustedSlots: AdjustedSlot[]
}

interface AdjustedTimetablePageProps {
  onBack: () => void
  fetchFn: () => Promise<{ adjustedTimetables: AdjustedTimetableData[] }>
  role: 'student' | 'faculty' | 'hod' | 'principal'
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function AdjustedTimetablePage({ onBack, fetchFn, role }: AdjustedTimetablePageProps) {
  const [data, setData] = useState<AdjustedTimetableData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError('')
      try {
        const res = await fetchFn()
        setData(res.adjustedTimetables || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load adjusted timetables')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // Group by date
  const grouped = data.reduce((acc, item) => {
    const dateKey = new Date(item.date).toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(item)
    return acc
  }, {} as Record<string, AdjustedTimetableData[]>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 text-white shadow-lg shadow-orange-500/20">
        <div className="px-6 py-5 flex items-center gap-4 max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Adjusted Timetable</h2>
              <p className="text-sm text-white/70">Schedule changes due to faculty leave</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500 mx-auto mb-3" />
              <span className="text-slate-500 text-sm">Loading adjustments...</span>
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
        ) : data.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg opacity-20">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No Adjustments</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  There are no upcoming schedule adjustments at this time. All classes are running on the regular timetable.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            className="space-y-8"
          >
            {Object.entries(grouped).map(([dateLabel, items], gIdx) => (
              <motion.div key={dateLabel} variants={fadeUp} custom={gIdx} className="space-y-4">
                {/* Date Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{dateLabel}</h3>
                </div>

                {items.map((item, iIdx) => (
                  <motion.div key={item._id} variants={fadeUp} custom={gIdx + iIdx + 1}>
                    <Card className="border-0 shadow-lg overflow-hidden">
                      {/* Leave Banner */}
                      <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 px-5 py-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <UserX className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-base">
                              {item.absentFacultyName} is on leave
                            </h4>
                            <p className="text-white/80 text-sm">
                              {item.dayOfWeek} · {item.departmentId?.fullName || item.departmentId?.name || ''}
                              {item.year ? ` · Year ${item.year}` : ''}
                              {item.section ? ` · Section ${item.section}` : ''}
                            </p>
                          </div>
                          <Badge className="bg-white/20 text-white hover:bg-white/30 text-xs backdrop-blur-sm">
                            {item.leaveType || 'Leave'}
                          </Badge>
                        </div>
                        {item.leaveReason && (
                          <p className="text-white/70 text-xs ml-[52px] italic">
                            Reason: {item.leaveReason}
                          </p>
                        )}
                      </div>

                      {/* Adjusted Slots */}
                      <CardContent className="p-0">
                        {item.adjustedSlots
                          .sort((a, b) => a.period - b.period)
                          .map((slot, sIdx) => (
                            <div
                              key={sIdx}
                              className={`flex items-stretch border-b last:border-b-0 border-slate-100 ${
                                slot.status === 'cancelled'
                                  ? 'bg-gradient-to-r from-red-50/50 to-rose-50/30'
                                  : 'bg-gradient-to-r from-teal-50/50 to-cyan-50/30'
                              } hover:bg-slate-50/80 transition-colors`}
                            >
                              {/* Period indicator */}
                              <div className={`w-1.5 flex-shrink-0 ${
                                slot.status === 'cancelled'
                                  ? 'bg-gradient-to-b from-red-400 to-rose-500'
                                  : 'bg-gradient-to-b from-teal-400 to-cyan-500'
                              }`} />

                              <div className="flex-1 p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    {/* Time */}
                                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                      <Clock className="w-4 h-4 text-slate-400" />
                                      <span className="font-medium">
                                        {slot.timeStart || ''} – {slot.timeEnd || ''}
                                      </span>
                                      <span className="text-slate-300 mx-1">·</span>
                                      <span className="text-xs text-slate-400">Period {slot.period}</span>
                                    </div>
                                  </div>

                                  {/* Status Badge */}
                                  {slot.status === 'substituted' ? (
                                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 text-xs font-medium">
                                      <UserCheck className="w-3 h-3 mr-1" />
                                      Substituted
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs font-medium">
                                      <XCircle className="w-3 h-3 mr-1" />
                                      Cancelled
                                    </Badge>
                                  )}
                                </div>

                                {/* Subject */}
                                <div className="mb-2">
                                  <span className="font-semibold text-slate-800 text-sm">{slot.subject || 'N/A'}</span>
                                  {slot.type === 'lab' && (
                                    <Badge className="ml-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] px-1.5 py-0">
                                      Lab
                                    </Badge>
                                  )}
                                </div>

                                {/* Faculty swap info */}
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                                  <div className="flex items-center gap-1.5">
                                    <UserX className="w-3.5 h-3.5 text-red-400" />
                                    <span className="text-slate-400">Original:</span>
                                    <span className="text-slate-600 font-medium line-through">
                                      {slot.originalFacultyName}
                                    </span>
                                  </div>

                                  {slot.status === 'substituted' && slot.substituteFacultyName && (
                                    <div className="flex items-center gap-1.5">
                                      <UserCheck className="w-3.5 h-3.5 text-teal-500" />
                                      <span className="text-slate-400">Substitute:</span>
                                      <span className="text-teal-700 font-semibold">
                                        {slot.substituteFacultyName}
                                      </span>
                                    </div>
                                  )}

                                  {slot.status === 'cancelled' && (
                                    <div className="flex items-center gap-1.5">
                                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                                      <span className="text-red-600 font-medium">
                                        No substitute available
                                      </span>
                                    </div>
                                  )}

                                  {slot.room && (
                                    <div className="flex items-center gap-1.5">
                                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                      <span className="text-slate-500">{slot.room}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
