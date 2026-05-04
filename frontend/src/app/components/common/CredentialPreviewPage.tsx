import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, User, Lock, Info } from 'lucide-react'

interface CredentialPreviewPageProps {
  onBack: () => void
  onContinue: () => void
  role: 'admin' | 'principal' | 'hod' | 'faculty'
}

export function CredentialPreviewPage({ onBack, onContinue, role }: CredentialPreviewPageProps) {
  const credentials = {
    admin: {
      userId: 'admin@college.edu',
      password: 'admin123',
      title: 'Admin Login',
      gradient: 'from-red-500 to-orange-600'
    },
    principal: {
      userId: 'principal@college.edu',
      password: 'principal123',
      title: 'Principal Login',
      gradient: 'from-purple-500 to-indigo-600'
    },
    hod: {
      userId: 'hod.bca@college.edu',
      password: 'hod123',
      title: 'HOD Login',
      gradient: 'from-blue-500 to-cyan-600'
    },
    faculty: {
      userId: 'faculty@college.edu',
      password: 'faculty123',
      title: 'Faculty Login',
      gradient: 'from-green-500 to-emerald-600'
    }
  }

  const cred = credentials[role]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-gray-900">Demo Credentials</h1>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto space-y-6">
        {/* Role Card */}
        <Card className="overflow-hidden">
          <div className={`h-32 bg-gradient-to-br ${cred.gradient} flex items-center justify-center`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-white font-semibold">{cred.title}</h2>
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Use these credentials to login to the demo account
                </p>
              </div>
            </div>

            {/* User ID */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span className="font-medium">User ID / Email</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <code className="text-sm font-mono text-gray-900">{cred.userId}</code>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span className="font-medium">Password</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <code className="text-sm font-mono text-gray-900">{cred.password}</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          className={`w-full h-14 bg-gradient-to-r ${cred.gradient} text-white text-lg font-medium shadow-lg active:scale-98 transition-transform`}
        >
          Continue to Login
        </Button>
      </div>
    </div>
  )
}
