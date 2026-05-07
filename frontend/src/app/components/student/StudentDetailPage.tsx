import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DefaultAvatar } from "@/components/common/DefaultAvatar"
import {
  ArrowLeft, User, Users, MapPin, Phone, Mail, GraduationCap,
  BookOpen, Calendar, Hash, Loader2, AlertTriangle
} from 'lucide-react'
import { getUser, apiGetStudentProfile } from '@/services/api'

interface StudentDetailPageProps {
  onBack: () => void
}

export function StudentDetailPage({ onBack }: StudentDetailPageProps) {
  const [studentData, setStudentData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const localUser = getUser()

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      setError('')
      try {
        const data = await apiGetStudentProfile()
        if (data.student) {
          setStudentData(data.student)
        } else {
          setError('Failed to load profile')
        }
      } catch (err: any) {
        setError(err.message || 'Network error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-red-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Profile</h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button onClick={onBack} className="text-sm text-indigo-600 hover:underline">← Go back</button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const fullName = studentData
    ? `${studentData.firstName || ''} ${studentData.lastName || ''}`.trim()
    : localUser?.fullName || 'Student'

  const deptName = studentData?.departmentId?.fullName || studentData?.departmentId?.name || '—'

  const detailSections = [
    {
      title: 'Personal Information',
      icon: User,
      color: 'from-indigo-500 to-blue-500',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      items: [
        { label: 'Full Name', value: fullName, icon: User },
        { label: 'Date of Birth', value: studentData?.dateOfBirth ? new Date(studentData.dateOfBirth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—', icon: Calendar },
        { label: 'Gender', value: studentData?.gender ? studentData.gender.charAt(0).toUpperCase() + studentData.gender.slice(1) : '—', icon: User },
      ],
    },
    {
      title: 'Family Details',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      items: [
        { label: "Father's Name", value: studentData?.fatherName || '—', icon: User },
        { label: "Mother's Name", value: studentData?.motherName || '—', icon: User },
      ],
    },
    {
      title: 'Contact Information',
      icon: Phone,
      color: 'from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      items: [
        { label: 'Phone', value: studentData?.phone || '—', icon: Phone },
        { label: 'Email', value: localUser?.email || '—', icon: Mail },
        { label: 'Address', value: studentData?.address || '—', icon: MapPin },
      ],
    },
    {
      title: 'Academic Details',
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      items: [
        { label: 'Register Number', value: studentData?.registerNumber || '—', icon: Hash },
        { label: 'Department', value: deptName, icon: BookOpen },
        { label: 'Semester', value: studentData?.semester ? `Semester ${studentData.semester}` : '—', icon: BookOpen },
        { label: 'Section', value: studentData?.section || '—', icon: BookOpen },
        { label: 'Year of Joining', value: studentData?.yearOfJoining || '—', icon: Calendar },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="px-6 py-5 flex items-center gap-4 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">My Details</h1>
            <p className="text-sm text-white/70">Personal & Academic Profile</p>
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="max-w-4xl mx-auto px-6 -mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <DefaultAvatar name={fullName} size="lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">{fullName}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{localUser?.email || ''}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 text-xs">
                      {deptName}
                    </Badge>
                    {studentData?.registerNumber && (
                      <Badge variant="outline" className="text-xs border-purple-200 text-purple-600">
                        {studentData.registerNumber}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detail Sections */}
      <motion.div
        className="max-w-4xl mx-auto px-6 py-6 space-y-5"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {detailSections.map((section, sIdx) => (
          <motion.div key={section.title} variants={fadeUp} custom={sIdx}>
            <Card className="shadow-md border-0 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.color} px-5 py-3 flex items-center gap-3`}>
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <section.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white tracking-wide">{section.title}</h3>
              </div>
              {/* Section Content */}
              <CardContent className="p-0">
                {section.items.map((item, iIdx) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 px-5 py-4 ${iIdx < section.items.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50/50 transition-colors`}
                  >
                    <div className={`w-10 h-10 ${section.bgLight} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${section.textColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-medium text-slate-800 mt-0.5 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}