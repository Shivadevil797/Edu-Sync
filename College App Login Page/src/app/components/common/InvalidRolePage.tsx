import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, Home, HelpCircle } from 'lucide-react'

interface InvalidRolePageProps {
  onBack: () => void
  roleName?: string
}

export function InvalidRolePage({ onBack, roleName }: InvalidRolePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 text-gray-700 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-gray-800">Access Restricted</h1>
            <p className="text-sm text-gray-600">Role not available</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Warning Icon */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-gray-800 mb-2">Role Not Available</h2>
            <p className="text-gray-600 text-sm">
              {roleName ? `The "${roleName}" role is currently not accessible.` : 'This role is currently not accessible.'}
            </p>
          </div>

          {/* Information Card */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-6">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-gray-900 flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                What can you do?
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Available Roles</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Principal:</strong> Administrator access</li>
                    <li>• <strong>HOD:</strong> Department head access</li>
                    <li>• <strong>Faculty:</strong> Teaching staff access</li>
                    <li>• <strong>Student:</strong> Learner access</li>
                  </ul>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-1">Need Access?</h4>
                  <p className="text-sm text-amber-700">
                    Contact your system administrator if you believe you should have access to this role.
                  </p>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">New User?</h4>
                  <p className="text-sm text-green-700">
                    If you're a new faculty member, you may need to complete registration first.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button 
                  onClick={onBack}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Role Selection
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => alert('Contact Information:\n\nIT Support: support@college.edu\nPhone: +91-xxx-xxx-xxxx\nOffice: Admin Block, Room 101\n\nOffice Hours: 9:00 AM - 5:00 PM')}
                  className="w-full"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              For immediate assistance, contact the IT helpdesk
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-gray-400 text-xs">
              <span>© 2024 College Management System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}