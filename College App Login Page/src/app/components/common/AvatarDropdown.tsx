import { useState } from 'react'
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Award, Building, X, Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react'

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

export function AvatarDropdown({ userData }: AvatarDropdownProps) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
      {/* Avatar Button */}
      <button
        onClick={() => setShowProfile(true)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg hover:scale-110 transition-transform active:scale-95"
      >
        <ImageWithFallback
          src={userData.photo}
          alt={userData.name}
          className="w-full h-full object-cover"
        />
      </button>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative">
              <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl"></div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <ImageWithFallback
                    src={userData.photo}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(false)}
                className="absolute top-2 right-2 p-2 text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Profile Content */}
            <div className="pt-16 pb-6 px-6 space-y-4 overflow-y-auto flex-1">
              <div className="text-center mb-6">
                <h2 className="text-gray-900 mb-1">{userData.name}</h2>
                <p className="text-gray-600">{userData.role}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <p className="text-sm text-gray-900 truncate">{userData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <p className="text-sm text-gray-900">{userData.phone}</p>
                  </div>
                </div>

                {userData.department && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Department</p>
                      <p className="text-sm text-gray-900">{userData.department}</p>
                    </div>
                  </div>
                )}

                {userData.qualification && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Qualification</p>
                      <p className="text-sm text-gray-900">{userData.qualification}</p>
                    </div>
                  </div>
                )}

                {userData.dob && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Date of Birth</p>
                      <p className="text-sm text-gray-900">{userData.dob}</p>
                    </div>
                  </div>
                )}

                {userData.office && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Office</p>
                      <p className="text-sm text-gray-900">{userData.office}</p>
                    </div>
                  </div>
                )}

                {userData.experience && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Experience</p>
                      <p className="text-sm text-gray-900">{userData.experience}</p>
                    </div>
                  </div>
                )}

                {userData.specialization && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Specialization</p>
                      <p className="text-sm text-gray-900">{userData.specialization}</p>
                    </div>
                  </div>
                )}

                {userData.education && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-0.5">Education</p>
                      <p className="text-sm text-gray-900 leading-relaxed">{userData.education}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => setShowProfile(false)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
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
