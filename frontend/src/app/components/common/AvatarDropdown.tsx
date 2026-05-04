import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { X, Mail, Phone, Award, Building, Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react'
import { DefaultAvatar } from "@/components/common/DefaultAvatar"

interface AvatarDropdownProps {
  userData: {
    name: string
    role: string
    photo: string
    email: string
    phone: string
    department?: string
    qualification?: string
    dob?: string
    office?: string
    education?: string
    experience?: string
    specialization?: string
  }
}

const infoFields = [
  { key: 'email', label: 'Email', icon: Mail, color: '#3b82f6' },
  { key: 'phone', label: 'Phone', icon: Phone, color: '#10b981' },
  { key: 'department', label: 'Department', icon: Building, color: '#8b5cf6' },
  { key: 'qualification', label: 'Qualification', icon: Award, color: '#f59e0b' },
  { key: 'dob', label: 'Date of Birth', icon: Calendar, color: '#ec4899' },
  { key: 'office', label: 'Office', icon: MapPin, color: '#06b6d4' },
  { key: 'experience', label: 'Experience', icon: Briefcase, color: '#eab308' },
  { key: 'specialization', label: 'Specialization', icon: Award, color: '#6366f1' },
  { key: 'education', label: 'Education', icon: GraduationCap, color: '#14b8a6' },
] as const

export function AvatarDropdown({ userData }: AvatarDropdownProps) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
      {/* Avatar Button — uses DefaultAvatar instead of photo URL */}
      <button
        onClick={() => setShowProfile(true)}
        className="rounded-full overflow-hidden border-2 border-indigo-200 shadow-sm hover:scale-105 transition-transform active:scale-95 hover:shadow-md hover:shadow-indigo-500/20"
      >
        <DefaultAvatar name={userData.name} size="md" />
      </button>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowProfile(false)}>
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="relative">
              <div className="h-20 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-t-xl" />
              <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <DefaultAvatar name={userData.name} size="lg" className="border-4 border-white shadow-lg" />
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-3 right-3 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="pt-16 pb-6 px-6 space-y-4 overflow-y-auto flex-1">
              <div className="text-center mb-5">
                <h2 className="text-lg font-semibold text-slate-900">{userData.name}</h2>
                <p className="text-sm text-slate-500">{userData.role}</p>
              </div>

              <div className="space-y-2.5">
                {infoFields.map(({ key, label, icon: Icon, color }) => {
                  const value = userData[key as keyof typeof userData]
                  if (!value) return null
                  return (
                    <div key={key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}15` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</p>
                        <p className="text-sm text-slate-900 truncate">{value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-3">
                <Button
                  onClick={() => setShowProfile(false)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 text-sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
