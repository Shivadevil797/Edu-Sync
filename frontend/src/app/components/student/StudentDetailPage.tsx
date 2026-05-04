import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, User, Users, MapPin, Phone } from 'lucide-react'

interface StudentDetailPageProps {
  onBack: () => void
}

export function StudentDetailPage({ onBack }: StudentDetailPageProps) {
  const [studentData, setStudentData] = useState<any>(null)
  const studentDetails = {
    name: 'Rahul Kumar',
    fatherName: 'Suresh Kumar',
    motherName: 'Priya Devi',
    address: 'House No. 123, Street Name, City, State - 560001',
    phoneNumber: '+91 98765 43210'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Student Details</h1>
            <p className="text-sm text-gray-600">Personal Information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 space-y-6">
            {/* Name */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="text-gray-900">{studentDetails.name}</p>
              </div>
            </div>

            {/* Parent Names */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Parent Names</p>
                <p className="text-gray-900 mb-1">Father: {studentDetails.fatherName}</p>
                <p className="text-gray-900">Mother: {studentDetails.motherName}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-gray-900">{studentDetails.address}</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="text-gray-900">{studentDetails.phoneNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}