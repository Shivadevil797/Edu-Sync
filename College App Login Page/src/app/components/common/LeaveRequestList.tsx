import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageCircle } from 'lucide-react'

interface LeaveRequest {
  id: string
  facultyId: string
  facultyName: string
  department: string
  startDate: string
  endDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  hodMessage?: string | null
}

interface LeaveRequestListProps {
  requests: LeaveRequest[]
  facultyId: string
}

export function LeaveRequestList({ requests, facultyId }: LeaveRequestListProps) {
  const myRequests = requests.filter(r => r.facultyId === facultyId)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

  if (myRequests.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p className="text-sm">No leave requests yet</p>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>
    } else if (status === 'rejected') {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>
    }
    return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Pending</Badge>
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <div className="space-y-3">
      {myRequests.map((request) => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    {calculateDays(request.startDate, request.endDate)} {calculateDays(request.startDate, request.endDate) === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="font-medium">From: {formatDate(request.startDate)}</div>
                  <div className="font-medium">To: {formatDate(request.endDate)}</div>
                </div>
              </div>
              {getStatusBadge(request.status)}
            </div>

            <div className="p-3 bg-gray-50 rounded-lg mb-2">
              <p className="text-xs font-medium text-gray-600 mb-1">Reason:</p>
              <p className="text-sm text-gray-900">{request.reason}</p>
            </div>

            {request.hodMessage && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-900">HOD Response</p>
                    <p className="text-xs text-gray-700 mt-1">{request.hodMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">
                Submitted: {new Date(request.submittedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}