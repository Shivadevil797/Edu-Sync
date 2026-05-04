import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Calendar, 
  Download, 
  Eye, 
  Filter,
  PieChart,
  LineChart,
  Activity,
  FileText,
  Building,
  Target,
  BookOpen,
  Award
} from 'lucide-react'

interface ReportsAnalyticsPageProps {
  onBack: () => void
}

export function ReportsAnalyticsPage({ onBack }: ReportsAnalyticsPageProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly')
  const [selectedReportType, setSelectedReportType] = useState('all')

  const analyticsCards = [
    {
      id: 'student-performance',
      title: 'Student Performance Analytics',
      description: 'Comprehensive analysis of student grades, attendance, and academic progress',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      metrics: {
        totalStudents: 1205,
        averageGrade: 85.2,
        attendanceRate: 92.5,
        passRate: 94.8
      },
      trend: '+5.2%',
      status: 'updated'
    },
    {
      id: 'faculty-analytics',
      title: 'Faculty Performance',
      description: 'Faculty workload, student feedback ratings, and teaching effectiveness',
      icon: Users,
      color: 'from-green-500 to-green-600',
      metrics: {
        totalFaculty: 85,
        averageRating: 4.6,
        coursesPerFaculty: 3.2,
        researchPapers: 45
      },
      trend: '+2.8%',
      status: 'updated'
    },
    {
      id: 'department-analysis',
      title: 'Department Performance',
      description: 'Department-wise student enrollment, faculty ratio, and resource utilization',
      icon: Building,
      color: 'from-purple-500 to-purple-600',
      metrics: {
        totalDepartments: 9,
        avgEnrollment: 134,
        facultyStudentRatio: '1:14',
        resourceUtilization: '87%'
      },
      trend: '+1.5%',
      status: 'updated'
    },
    {
      id: 'financial-reports',
      title: 'Financial Analytics',
      description: 'Budget allocation, expenditure tracking, and revenue analysis',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600',
      metrics: {
        totalBudget: '₹2.5 Cr',
        utilized: '78%',
        pendingPayments: '₹45 L',
        revenue: '₹3.2 Cr'
      },
      trend: '+12.3%',
      status: 'updated'
    },
    {
      id: 'academic-calendar',
      title: 'Academic Progress',
      description: 'Semester progress, exam schedules, and academic milestone tracking',
      icon: Calendar,
      color: 'from-teal-500 to-teal-600',
      metrics: {
        semesterProgress: '65%',
        examsCompleted: 12,
        assignmentsSubmitted: '89%',
        projectsOngoing: 28
      },
      trend: 'On Track',
      status: 'active'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Utilization',
      description: 'Classroom usage, lab equipment status, and facility management',
      icon: Activity,
      color: 'from-indigo-500 to-indigo-600',
      metrics: {
        classroomUtilization: '85%',
        labEquipmentStatus: '94%',
        maintenanceRequests: 8,
        facilityRating: 4.3
      },
      trend: '+3.1%',
      status: 'operational'
    }
  ]

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'academic', label: 'Academic Reports' },
    { value: 'financial', label: 'Financial Reports' },
    { value: 'administrative', label: 'Administrative Reports' },
    { value: 'performance', label: 'Performance Reports' }
  ]

  const timeframes = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ]

  const recentReports = [
    {
      id: 1,
      title: 'Monthly Academic Performance Report',
      department: 'All Departments',
      generatedDate: '2024-01-15',
      type: 'Academic',
      status: 'completed',
      downloadCount: 45
    },
    {
      id: 2,
      title: 'Faculty Workload Analysis Q4',
      department: 'HR Department',
      generatedDate: '2024-01-12',
      type: 'Administrative',
      status: 'completed',
      downloadCount: 23
    },
    {
      id: 3,
      title: 'Student Attendance Trends',
      department: 'Academic Office',
      generatedDate: '2024-01-10',
      type: 'Performance',
      status: 'completed',
      downloadCount: 67
    },
    {
      id: 4,
      title: 'Infrastructure Maintenance Report',
      department: 'Facilities',
      generatedDate: '2024-01-08',
      type: 'Administrative',
      status: 'completed',
      downloadCount: 12
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
            <h1 className="text-gray-800">Reports & Analytics</h1>
            <p className="text-sm text-gray-600">Data insights and performance analytics</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-gray-700 border-white/30">
            Analytics Dashboard
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-600 text-sm">
            Comprehensive reporting and data analysis for informed decision making
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-3">
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              {timeframes.map(timeframe => (
                <option key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </option>
              ))}
            </select>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyticsCards.map((card) => (
            <Card 
              key={card.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{card.trend}</div>
                    <Badge variant="secondary" className="text-xs">
                      {card.status}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(card.metrics).map(([key, value], index) => (
                    <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-sm text-gray-900">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{report.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {report.department} • Generated: {new Date(report.generatedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {report.downloadCount} downloads
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate New Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Custom Analytics
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Set KPI Targets
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Reports
          </Button>
        </div>
      </div>
    </div>
  )
}