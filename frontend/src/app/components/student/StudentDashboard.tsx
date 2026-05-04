import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarDropdown } from "@/components/common/AvatarDropdown"
import { DefaultAvatar } from "@/components/common/DefaultAvatar"
import {
  LogOut,
  Calendar,
  BookOpen,
  GraduationCap,
  FileText,
  ClipboardList,
} from 'lucide-react'

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

  const studentData = {
    name: 'Student User',
    rollNumber: 'STU2024001',
    course: 'BCA',
    semester: '5th Semester',
    email: 'student@college.edu',
    phone: '+91 98765 43210',
  }

  // Try to load from localStorage (set by login)
  const storedUser = (() => {
    try {
      const data = localStorage.getItem('studentData')
      if (data) return JSON.parse(data)
    } catch { /* empty */ }
    return null
  })()

  const displayName = storedUser?.firstName
    ? `${storedUser.firstName} ${storedUser.lastName || ''}`
    : studentData.name

  const navItems = [
    { id: 'academic-timetable', icon: Calendar, label: 'Academic Timetable', description: 'View your daily class schedule and timings', accent: '#1E2022' },
    { id: 'exam-timetable', icon: ClipboardList, label: 'Exam Timetable', description: 'Check examination schedule and venues', accent: '#52616B' },
    { id: 'syllabus', icon: BookOpen, label: 'Syllabus', description: 'Course syllabus and study materials', accent: '#52616B' },
    { id: 'details', icon: FileText, label: 'My Details', description: 'View your academic profile and records', accent: '#1E2022' },
  ]

  return (
    <div className="min-h-screen bg-[#F0F5F9] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#C9D6DF]/50">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1E2022] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-[#1E2022]">Student Portal</h1>
              <p className="text-xs text-[#52616B]">Welcome back, {displayName.split(' ')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AvatarDropdown
              userData={{
                name: displayName,
                role: 'Student',
                photo: '',
                email: storedUser?.emailId || studentData.email,
                phone: storedUser?.mobileNumber || studentData.phone,
                department: storedUser?.course || studentData.course,
              }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[#52616B] hover:text-red-600 hover:bg-red-50 text-xs"
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
            <div className="bg-white rounded-xl border border-[#C9D6DF]/40 p-6">
              <div className="flex items-center gap-4">
                <DefaultAvatar name={displayName} size="lg" />
                <div>
                  <h2 className="text-xl font-semibold text-[#1E2022]">{displayName}</h2>
                  <p className="text-sm text-[#52616B]">{storedUser?.course || studentData.course} · {storedUser?.semester || studentData.semester}</p>
                  <p className="text-xs text-[#C9D6DF] mt-1">ID: {storedUser?.rollNumber || studentData.rollNumber}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Cards */}
          <div>
            <h3 className="text-sm font-medium text-[#52616B] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Quick Access
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {navItems.map((item, i) => (
                <motion.div key={item.id} variants={fadeUp} custom={i + 1}>
                  <Card
                    className="cursor-pointer bg-white border-[#C9D6DF]/40 hover:border-[#C9D6DF] hover:shadow-md transition-all duration-200 group"
                    onClick={() => onNavigate(item.id)}
                  >
                    <CardContent className="p-5">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: `${item.accent}10` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                      </div>
                      <h4 className="font-semibold text-[#1E2022] mb-1 text-sm group-hover:text-[#52616B] transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-xs text-[#52616B] leading-relaxed">{item.description}</p>
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
