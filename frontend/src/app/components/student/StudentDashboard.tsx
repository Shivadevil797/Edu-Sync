import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { DefaultAvatar } from "@/components/common/DefaultAvatar"
import {
  LogOut,
  Calendar,
  BookOpen,
  GraduationCap,
  FileText,
  ClipboardList,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

import { getUser } from '@/services/api'

interface StudentDashboardProps {
  onBack: () => void
  onNavigate: (page: string) => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function StudentDashboard({ onBack, onNavigate }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('home')
  const [greeting, setGreeting] = useState('')

  // Load user data from login/registration (stored by api.ts setUser)
  const user = getUser()
  const displayName = user?.fullName || user?.username || 'Student'

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const navItems = [
    {
      id: 'academic-timetable',
      icon: Calendar,
      label: 'Academic Timetable',
      description: 'View your daily class schedule and timings',
      gradient: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      id: 'exam-timetable',
      icon: ClipboardList,
      label: 'Exam Timetable',
      description: 'Check examination schedule and venues',
      gradient: 'from-violet-500 to-purple-600',
      bgLight: 'bg-violet-50',
      iconColor: 'text-violet-600',
      borderColor: 'border-violet-200',
    },
    {
      id: 'syllabus',
      icon: BookOpen,
      label: 'Syllabus',
      description: 'Course syllabus and study materials',
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'details',
      icon: FileText,
      label: 'My Details',
      description: 'View your academic profile and records',
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-500/20">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">Student Portal</h1>
              <p className="text-xs text-white/70">{greeting}, {displayName.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: displayName,
                role: 'Student',
                photo: '',
                email: user?.email || '',
                phone: '',
                department: '',
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white/80 hover:text-white hover:bg-white/20 text-xs"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Welcome Card */}
          <motion.div variants={fadeUp} custom={0}>
            <Card className="overflow-hidden border-0 shadow-xl relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-[0.03]" />
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <DefaultAvatar name={displayName} size="lg" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-slate-800">{displayName}</h2>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-sm text-slate-500">{user?.email || ''}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 text-xs font-medium">
                        Student
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Cards */}
          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2 px-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              Quick Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {navItems.map((item, i) => (
                <motion.div key={item.id} variants={fadeUp} custom={i + 1}>
                  <Card
                    className={`cursor-pointer border ${item.borderColor} hover:shadow-lg transition-all duration-300 group overflow-hidden relative`}
                    onClick={() => onNavigate(item.id)}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />
                    <CardContent className="p-5 relative">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${item.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-1 text-sm group-hover:text-slate-900 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
