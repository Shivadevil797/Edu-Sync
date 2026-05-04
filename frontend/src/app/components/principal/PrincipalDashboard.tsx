import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { DefaultAvatar } from "@/components/common/DefaultAvatar"
import {
  Home,
  LogOut,
  Users,
  Building,
  UserCheck,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Quote,
} from 'lucide-react'

interface PrincipalDashboardProps {
  onBack: () => void
  onNavigate?: (page: string) => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function PrincipalDashboard({ onBack, onNavigate }: PrincipalDashboardProps) {
  const quotes = [
    "Leadership is not about being in charge. It is about taking care of those in your charge.",
    "The function of leadership is to produce more leaders, not more followers.",
    "Education is the most powerful weapon which you can use to change the world.",
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Great leaders are willing to sacrifice the numbers to save the people.",
  ]

  const [quoteOfTheDay] = useState(() => {
    const today = new Date().getDate()
    return quotes[today % quotes.length]
  })

  const principalData = {
    name: 'Dr. Sunita Mehta',
    designation: 'Principal',
    email: 'principal@college.edu',
    phone: '+91 98765 43210',
    education: 'Ph.D. in Educational Administration',
  }

  const stats = [
    { value: '9', label: 'Departments', color: '#1E2022' },
    { value: '85', label: 'Faculty', color: '#52616B' },
    { value: '1,200', label: 'Students', color: '#52616B' },
    { value: '45', label: 'Courses', color: '#1E2022' },
  ]

  const dashboardOptions = [
    { id: 'departments', title: 'Departments', description: 'View and manage all academic departments', icon: Building, stats: '9 Departments' },
    { id: 'faculty', title: 'Faculty Management', description: 'Faculty profiles, recruitment & evaluation', icon: UserCheck, stats: '85 Faculty Members' },
    { id: 'students', title: 'Student Affairs', description: 'Student admissions, records & activities', icon: GraduationCap, stats: '1,200+ Students' },
    { id: 'academics', title: 'Academic Planning', description: 'Curriculum, timetables & academic calendar', icon: BookOpen, stats: '45 Courses' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900">Principal Dashboard</h1>
              <p className="text-xs text-slate-500">College Administration Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: principalData.name,
                role: principalData.designation,
                photo: '',
                email: principalData.email,
                phone: principalData.phone,
                qualification: principalData.education,
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-500 hover:text-rose-500 hover:bg-red-50 text-xs"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 overflow-y-auto">
        <motion.div
          className="max-w-7xl mx-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* Welcome + Quote */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <DefaultAvatar name={principalData.name} size="lg" />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Welcome back, Dr. Mehta</h2>
                    <p className="text-sm text-slate-500">Leading with vision, inspiring excellence in education.</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-3xl font-bold text-slate-900">{new Date().getDate()}</div>
                  <div className="text-xs text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</div>
                  <div className="text-xs text-slate-400">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-5 p-4 bg-slate-50 rounded-lg border-l-3 border-[#52616B]">
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">Quote of the Day</p>
                    <p className="text-sm text-slate-500 italic leading-relaxed">{quoteOfTheDay}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i + 1}>
                <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Management Dashboard */}
          <motion.div variants={fadeUp} custom={5}>
            <h2 className="text-sm font-medium text-slate-500 mb-3">Management Dashboard</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardOptions.map((option, i) => (
              <motion.div key={option.id} variants={fadeUp} custom={i + 6}>
                <Card
                  className="cursor-pointer bg-white border-slate-100 hover:border-[#C9D6DF] hover:shadow-md transition-all duration-200 group"
                  onClick={() => {
                    if (onNavigate) {
                      if (option.id === 'departments') onNavigate('departments')
                      else if (option.id === 'academics') onNavigate('timetable')
                      else if (option.id === 'students') onNavigate('student-affairs')
                      else if (option.id === 'faculty') onNavigate('faculty-management')
                    }
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-gradient-to-r from-indigo-600 to-violet-600 transition-colors duration-300">
                        <option.icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm">{option.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{option.description}</p>
                    <span className="text-xs text-slate-400 font-medium">{option.stats}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
