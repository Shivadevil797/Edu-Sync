import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, User, CheckCircle, XCircle, MessageCircle, Clock } from 'lucide-react'

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

interface HODLeaveNotificationsProps {
  requests: LeaveRequest[]
  onApprove: (requestId: string, message?: string) => void
  onReject: (requestId: string, message?: string) => void
  department: string
}

export function HODLeaveNotifications({ requests, onApprove, onReject, department }: HODLeaveNotificationsProps) {
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const departmentRequests = requests
    .filter(r => r.department === department)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())

  const pendingRequests = departmentRequests.filter(r => r.status === 'pending')
  const processedRequests = departmentRequests.filter(r => r.status !== 'pending')

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

  const handleApprove = (requestId: string) => {
    onApprove(requestId, message.trim() || undefined)
    setRespondingTo(null)
    setMessage('')
  }

  const handleReject = (requestId: string) => {
    onReject(requestId, message.trim() || undefined)
    setRespondingTo(null)
    setMessage('')
  }

  const renderRequest = (request: LeaveRequest, isPending: boolean) => (
    <Card key={request.id} className={`${isPending ? 'border-l-4 border-orange-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900">{request.facultyName}</span>
              {request.status === 'approved' && (
                <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>
              )}
              {request.status === 'rejected' && (
                <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>
              )}
              {request.status === 'pending' && (
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {formatDate(request.startDate)} - {formatDate(request.endDate)}
                <span className="text-xs text-gray-500">({calculateDays(request.startDate, request.endDate)} days)</span>
              </span>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg mb-3">
              <p className="text-xs font-medium text-gray-600 mb-1">Reason:</p>
              <p className="text-sm text-gray-900">{request.reason}</p>
            </div>

            {request.hodMessage && (
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 mb-3">
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-900">Your Response</p>
                    <p className="text-xs text-gray-700 mt-1">{request.hodMessage}</p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500">
              Submitted: {new Date(request.submittedAt).toLocaleString()}
            </p>
          </div>
        </div>

        {isPending && (
          <div className="mt-4 pt-4 border-t">
            {respondingTo === request.id ? (
              <div className="space-y-3">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add optional message (e.g., 'Approved for the dates requested')"
                  rows={2}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setRespondingTo(null)
                      setMessage('')
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReject(request.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRespondingTo(request.id)}
                  className="flex-1"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Respond
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleReject(request.id, undefined)}
                  variant="outline"
                  className="flex-1 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleApprove(request.id, undefined)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {pendingRequests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Pending Requests ({pendingRequests.length})
            </h3>
          </div>
          <div className="space-y-3">
            {pendingRequests.map((request) => renderRequest(request, true))}
          </div>
        </div>
      )}

      {processedRequests.length > 0 && (
        <div>
          <h3 className="text-gray-900 mb-4">Processed Requests</h3>
          <div className="space-y-3">
            {processedRequests.map((request) => renderRequest(request, false))}
          </div>
        </div>
      )}

      {departmentRequests.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            <p className="text-sm">No leave requests yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}