import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft, Clock, CheckCircle, XCircle, Loader2, User,
  Calendar, FileText, Inbox
} from 'lucide-react'
import { apiGetPrincipalLeaveRequests, apiReviewPrincipalLeave } from '@/services/api'

interface PrincipalLeaveReviewPageProps {
  onBack: () => void
}

interface LeaveRequest {
  _id: string
  requesterId: string
  requesterRole: string
  requesterName: string
  department: string
  leaveType: string
  startDate: string
  endDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  reviewedAt?: string
  createdAt: string
}

export function PrincipalLeaveReviewPage({ onBack }: PrincipalLeaveReviewPageProps) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    fetchLeaves()
  }, [])

  const fetchLeaves = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiGetPrincipalLeaveRequests()
      setLeaveRequests(data.leaveRequests || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load leave requests')
    } finally {
      setLoading(false)
    }
  }

  const handleReview = async (leaveId: string, status: 'approved' | 'rejected') => {
    if (!window.confirm(`Are you sure you want to ${status === 'approved' ? 'approve' : 'reject'} this leave request?`)) return
    setProcessingId(leaveId)
    try {
      await apiReviewPrincipalLeave(leaveId, status)
      setLeaveRequests(prev => prev.map(l =>
        l._id === leaveId ? { ...l, status, reviewedAt: new Date().toISOString() } : l
      ))
    } catch (err: any) {
      alert(`Failed to ${status}: ${err.message}`)
    } finally {
      setProcessingId(null)
    }
  }

  const filtered = leaveRequests.filter(l => l.status === activeTab)
  const pendingCount = leaveRequests.filter(l => l.status === 'pending').length
  const approvedCount = leaveRequests.filter(l => l.status === 'approved').length
  const rejectedCount = leaveRequests.filter(l => l.status === 'rejected').length

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const getDays = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime()
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">HOD Leave Requests</h1>
            <p className="text-sm text-gray-500">Review and manage HOD leave applications</p>
          </div>
          {pendingCount > 0 && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">{pendingCount} Pending</Badge>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {(['pending', 'approved', 'rejected'] as const).map(tab => {
            const count = tab === 'pending' ? pendingCount : tab === 'approved' ? approvedCount : rejectedCount
            const Icon = tab === 'pending' ? Clock : tab === 'approved' ? CheckCircle : XCircle
            return (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="flex-1 flex items-center gap-1.5 text-xs capitalize"
              >
                <Icon className="w-3.5 h-3.5" />
                {tab} ({count})
              </Button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mb-3" />
            <p className="text-sm text-gray-500">Loading leave requests...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-3">{error}</p>
              <Button size="sm" onClick={fetchLeaves}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No {activeTab} requests</h3>
              <p className="text-sm text-gray-500">
                {activeTab === 'pending' ? 'All leave requests have been reviewed.' : `No ${activeTab} leave requests yet.`}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Leave Cards */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map(leave => (
              <Card key={leave._id} className={`transition-shadow hover:shadow-md ${
                leave.status === 'approved' ? 'border-green-200 bg-green-50/50' :
                leave.status === 'rejected' ? 'border-red-200 bg-red-50/50' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      leave.status === 'approved' ? 'bg-green-100' :
                      leave.status === 'rejected' ? 'bg-red-100' : 'bg-indigo-100'
                    }`}>
                      <User className={`w-5 h-5 ${
                        leave.status === 'approved' ? 'text-green-600' :
                        leave.status === 'rejected' ? 'text-red-600' : 'text-indigo-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-gray-900">{leave.requesterName || 'HOD'}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">HOD</Badge>
                        <Badge className={`text-[10px] px-1.5 py-0 ${
                          leave.leaveType === 'Casual' ? 'bg-blue-100 text-blue-700' :
                          leave.leaveType === 'Medical' ? 'bg-emerald-100 text-emerald-700' :
                          leave.leaveType === 'Duty' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{leave.leaveType}</Badge>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          {formatDate(leave.startDate)} — {formatDate(leave.endDate)}
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {getDays(leave.startDate, leave.endDate)} day{getDays(leave.startDate, leave.endDate) > 1 ? 's' : ''}
                        </Badge>
                      </div>

                      {/* Reason */}
                      <div className="flex items-start gap-1.5 text-sm text-gray-700 bg-slate-50 rounded-md p-2.5 mb-2">
                        <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="leading-relaxed">{leave.reason}</p>
                      </div>

                      {/* Submitted date */}
                      <p className="text-[11px] text-gray-400">
                        Submitted {formatDate(leave.createdAt)}
                        {leave.reviewedAt && ` · Reviewed ${formatDate(leave.reviewedAt)}`}
                      </p>
                    </div>

                    {/* Actions for pending */}
                    {leave.status === 'pending' && (
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-3"
                          disabled={processingId === leave._id}
                          onClick={() => handleReview(leave._id, 'approved')}
                        >
                          {processingId === leave._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 mr-1" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="text-xs h-8 px-3"
                          disabled={processingId === leave._id}
                          onClick={() => handleReview(leave._id, 'rejected')}
                        >
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {/* Status badge for reviewed */}
                    {leave.status !== 'pending' && (
                      <Badge className={`flex-shrink-0 ${
                        leave.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                        'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        {leave.status === 'approved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
