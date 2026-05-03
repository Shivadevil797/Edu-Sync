import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  FileText,
  Users,
  Building,
  Search,
  Filter,
  Eye,
  Check,
  X,
  MessageSquare,
  BookOpen,
  Briefcase
} from 'lucide-react'

interface ApprovalCenterPageProps {
  onBack: () => void
}

export function ApprovalCenterPage({ onBack }: ApprovalCenterPageProps) {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const pendingApprovals = [
    {
      id: 1,
      type: 'Budget Approval',
      title: 'Computer Lab Equipment Purchase',
      requester: 'Dr. Rajesh Kumar (HOD - BCA)',
      department: 'BCA',
      amount: '₹2,50,000',
      requestDate: '2024-01-15',
      priority: 'high',
      status: 'pending',
      description: 'Purchase of 30 new computers and lab accessories for BCA department',
      documents: ['quotation.pdf', 'technical_specs.pdf'],
      category: 'budget'
    },
    {
      id: 2,
      type: 'Faculty Hiring',
      title: 'Assistant Professor - Mathematics',
      requester: 'Dr. Suresh Kumar Singh (HOD - Mathematics)',
      department: 'Mathematics',
      amount: '₹8,50,000/year',
      requestDate: '2024-01-14',
      priority: 'medium',
      status: 'pending',
      description: 'Hiring of Assistant Professor for Mathematics department',
      documents: ['job_description.pdf', 'candidate_profiles.pdf'],
      category: 'faculty'
    },
    {
      id: 3,
      type: 'Policy Change',
      title: 'Student Attendance Policy Update',
      requester: 'Academic Committee',
      department: 'Academic Office',
      amount: 'N/A',
      requestDate: '2024-01-13',
      priority: 'high',
      status: 'pending',
      description: 'Update to student attendance requirements and grading policy',
      documents: ['policy_draft.pdf', 'committee_recommendations.pdf'],
      category: 'policy'
    },
    {
      id: 4,
      type: 'Infrastructure',
      title: 'Library Extension Construction',
      requester: 'Infrastructure Committee',
      department: 'Administration',
      amount: '₹15,00,000',
      requestDate: '2024-01-12',
      priority: 'medium',
      status: 'pending',
      description: 'Construction of additional reading space and digital library section',
      documents: ['architectural_plans.pdf', 'cost_estimate.pdf'],
      category: 'infrastructure'
    },
    {
      id: 5,
      type: 'Event Approval',
      title: 'Annual Technical Fest - TechnoVision 2024',
      requester: 'Student Council',
      department: 'BCA',
      amount: '₹3,75,000',
      requestDate: '2024-01-11',
      priority: 'medium',
      status: 'pending',
      description: 'Annual technical festival with competitions, workshops, and guest lectures',
      documents: ['event_proposal.pdf', 'budget_breakdown.pdf'],
      category: 'event'
    },
    {
      id: 6,
      type: 'Research Grant',
      title: 'AI Research Project Funding',
      requester: 'Dr. Deepa Nair (BCA)',
      department: 'BCA',
      amount: '₹5,00,000',
      requestDate: '2024-01-10',
      priority: 'high',
      status: 'pending',
      description: 'Research project on Machine Learning applications in education',
      documents: ['research_proposal.pdf', 'literature_review.pdf'],
      category: 'research'
    },
    {
      id: 7,
      type: 'Course Addition',
      title: 'Digital Marketing Certificate Course',
      requester: 'Dr. Neha Gupta (HOD - BBA)',
      department: 'BBA',
      amount: '₁,20,000',
      requestDate: '2024-01-09',
      priority: 'low',
      status: 'pending',
      description: 'New 6-month certificate course in Digital Marketing',
      documents: ['course_curriculum.pdf', 'market_analysis.pdf'],
      category: 'academic'
    },
    {
      id: 8,
      type: 'Scholarship Approval',
      title: 'Merit-based Scholarship Program',
      requester: 'Student Welfare Committee',
      department: 'Administration',
      amount: '₹10,00,000',
      requestDate: '2024-01-08',
      priority: 'medium',
      status: 'pending',
      description: 'Scholarship program for economically disadvantaged students',
      documents: ['eligibility_criteria.pdf', 'selection_process.pdf'],
      category: 'student'
    }
  ]

  const approvedRequests = [
    {
      id: 101,
      type: 'Budget Approval',
      title: 'Faculty Training Program',
      requester: 'HR Department',
      amount: '₹1,50,000',
      approvedDate: '2024-01-05',
      status: 'approved'
    },
    {
      id: 102,
      type: 'Event Approval',
      title: 'Inter-college Sports Meet',
      requester: 'Sports Committee',
      amount: '₹2,25,000',
      approvedDate: '2024-01-03',
      status: 'approved'
    }
  ]

  const rejectedRequests = [
    {
      id: 201,
      type: 'Budget Approval',
      title: 'Unnecessary Equipment Purchase',
      requester: 'Various Department',
      amount: '₹75,000',
      rejectedDate: '2024-01-04',
      reason: 'Budget constraints and unclear necessity',
      status: 'rejected'
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'budget', label: 'Budget' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'policy', label: 'Policy' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'event', label: 'Events' },
    { value: 'research', label: 'Research' },
    { value: 'academic', label: 'Academic' },
    { value: 'student', label: 'Student Affairs' }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'budget':
        return DollarSign
      case 'faculty':
        return Users
      case 'infrastructure':
        return Building
      case 'academic':
        return BookOpen
      case 'research':
        return FileText
      case 'event':
        return Calendar
      default:
        return Briefcase
    }
  }

  const handleApprove = (id: number) => {
    alert(`Approval request ${id} has been approved.`)
  }

  const handleReject = (id: number) => {
    const reason = prompt('Please provide a reason for rejection:')
    if (reason) {
      alert(`Approval request ${id} has been rejected.\nReason: ${reason}`)
    }
  }

  const filteredPendingApprovals = pendingApprovals.filter(approval => {
    const matchesSearch = approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || approval.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
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
            <h1 className="text-gray-800">Approval Center</h1>
            <p className="text-sm text-gray-600">Manage budget approvals and policy decisions</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-gray-700 border-white/30">
            {pendingApprovals.length} Pending
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-800">Approval Management Center</h2>
          <p className="text-gray-600 text-sm">
            Review and process institutional approvals, budget requests, and policy decisions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'pending' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('pending')}
            className="flex-1 flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Pending ({pendingApprovals.length})
          </Button>
          <Button
            variant={activeTab === 'approved' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('approved')}
            className="flex-1 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedRequests.length})
          </Button>
          <Button
            variant={activeTab === 'rejected' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('rejected')}
            className="flex-1 flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Rejected ({rejectedRequests.length})
          </Button>
        </div>

        {/* Search and Filter */}
        {activeTab === 'pending' && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search approvals by title, requester, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {filteredPendingApprovals.map((approval) => {
              const CategoryIcon = getCategoryIcon(approval.category)
              return (
                <Card key={approval.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-base">{approval.title}</CardTitle>
                            <Badge className={`text-xs ${getPriorityColor(approval.priority)}`}>
                              {approval.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{approval.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {approval.requester}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {approval.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(approval.requestDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900 mb-2">{approval.amount}</div>
                        <Badge variant="outline" className="text-xs">
                          {approval.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Documents */}
                    {approval.documents && approval.documents.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Documents:</h4>
                        <div className="flex flex-wrap gap-2">
                          {approval.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-gray-50">
                              <FileText className="w-3 h-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Comment
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(approval.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(approval.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === 'approved' && (
          <div className="space-y-4">
            {approvedRequests.map((approval) => (
              <Card key={approval.id} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{approval.title}</h3>
                      <p className="text-sm text-gray-600">{approval.requester}</p>
                      <p className="text-xs text-gray-500">Approved: {new Date(approval.approvedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{approval.amount}</div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="space-y-4">
            {rejectedRequests.map((approval) => (
              <Card key={approval.id} className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{approval.title}</h3>
                      <p className="text-sm text-gray-600">{approval.requester}</p>
                      <p className="text-xs text-gray-500">Rejected: {new Date(approval.rejectedDate).toLocaleDateString()}</p>
                      <p className="text-xs text-red-600 mt-1">Reason: {approval.reason}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{approval.amount}</div>
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Approval Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{pendingApprovals.length}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{approvedRequests.length}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{rejectedRequests.length}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {pendingApprovals.filter(a => a.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}