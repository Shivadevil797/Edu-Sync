import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Briefcase, 
  Users, 
  DollarSign, 
  Building, 
  FileText,
  Settings,
  UserCheck,
  CreditCard,
  Wrench,
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Database,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  MoreVertical,
  Plus
} from 'lucide-react'

interface AdministrationPageProps {
  onBack: () => void
}

export function AdministrationPage({ onBack }: AdministrationPageProps) {
  const [activeSection, setActiveSection] = useState('overview')

  const administrationSections = [
    {
      id: 'hr',
      title: 'Human Resources',
      description: 'Staff management, payroll, recruitment, and employee relations',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      stats: {
        totalEmployees: 95,
        newHires: 5,
        pendingLeaves: 12,
        activeRecruitment: 3
      },
      recentActivities: [
        'New faculty interview scheduled for Mathematics dept',
        'Payroll processed for December 2024',
        'Employee handbook updated with new policies'
      ]
    },
    {
      id: 'finance',
      title: 'Finance & Accounts',
      description: 'Budget management, financial planning, and accounting operations',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      stats: {
        monthlyBudget: '₹45L',
        pendingPayments: '₹12L',
        revenue: '₹52L',
        expenses: '₹38L'
      },
      recentActivities: [
        'Monthly financial report generated',
        'Vendor payment of ₹2.5L processed',
        'Budget allocation approved for infrastructure'
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & Maintenance',
      description: 'Facility management, maintenance schedules, and infrastructure planning',
      icon: Building,
      color: 'from-orange-500 to-orange-600',
      stats: {
        activeTickets: 8,
        completedThisMonth: 25,
        scheduledMaintenance: 15,
        facilityUtilization: '87%'
      },
      recentActivities: [
        'AC maintenance completed in Block A',
        'New LED lighting installed in library',
        'Elevator servicing scheduled for next week'
      ]
    },
    {
      id: 'it',
      title: 'IT Services & Support',
      description: 'Technology infrastructure, network management, and technical support',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      stats: {
        systemUptime: '99.8%',
        openTickets: 6,
        softwareLicenses: 45,
        networkNodes: 120
      },
      recentActivities: [
        'Network upgrade completed in computer labs',
        'New antivirus licenses purchased',
        'WiFi password reset for guest network'
      ]
    },
    {
      id: 'security',
      title: 'Security & Safety',
      description: 'Campus security, safety protocols, and emergency management',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      stats: {
        securityPersonnel: 12,
        cctvCameras: 48,
        emergencyDrills: 4,
        incidentReports: 2
      },
      recentActivities: [
        'Monthly security review conducted',
        'Fire safety drill completed successfully',
        'New visitor management system installed'
      ]
    },
    {
      id: 'procurement',
      title: 'Procurement & Supplies',
      description: 'Purchase management, vendor relations, and inventory control',
      icon: FileText,
      color: 'from-teal-500 to-teal-600',
      stats: {
        activeOrders: 15,
        pendingApprovals: 8,
        suppliers: 35,
        inventoryItems: 250
      },
      recentActivities: [
        'Office supplies restocked for all departments',
        'New vendor registration completed',
        'Quarterly inventory audit scheduled'
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Staff Directory',
      description: 'View and manage employee information',
      icon: UserCheck,
      action: 'staff-directory'
    },
    {
      title: 'Financial Reports',
      description: 'Generate financial statements and reports',
      icon: TrendingUp,
      action: 'financial-reports'
    },
    {
      title: 'Maintenance Requests',
      description: 'Submit and track maintenance requests',
      icon: Wrench,
      action: 'maintenance'
    },
    {
      title: 'System Backup',
      description: 'Manage data backup and recovery',
      icon: Database,
      action: 'backup'
    },
    {
      title: 'Emergency Protocols',
      description: 'Access emergency procedures and contacts',
      icon: AlertTriangle,
      action: 'emergency'
    },
    {
      title: 'Vendor Management',
      description: 'Manage supplier relationships and contracts',
      icon: Briefcase,
      action: 'vendors'
    }
  ]

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Budget Alert',
      message: 'Monthly budget utilization has reached 85%',
      time: '2 hours ago',
      department: 'Finance'
    },
    {
      id: 2,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Server maintenance scheduled for this weekend',
      time: '4 hours ago',
      department: 'IT Services'
    },
    {
      id: 3,
      type: 'success',
      title: 'Compliance Check',
      message: 'Annual safety audit completed successfully',
      time: '1 day ago',
      department: 'Security'
    },
    {
      id: 4,
      type: 'warning',
      title: 'License Expiry',
      message: '5 software licenses expiring next month',
      time: '2 days ago',
      department: 'IT Services'
    }
  ]

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800'
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800'
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800'
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800'
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle
      case 'success':
        return CheckCircle
      case 'info':
        return Bell
      case 'error':
        return AlertTriangle
      default:
        return Bell
    }
  }

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
            <h1 className="text-gray-800">Administration</h1>
            <p className="text-sm text-gray-600">HR, finance, infrastructure management</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-gray-700 border-white/30">
            Administrative Portal
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-800">Administrative Management</h2>
          <p className="text-gray-600 text-sm">
            Comprehensive administration, finance, and operational management systems
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto hide-scrollbar">
          <Button
            variant={activeSection === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('overview')}
            className="whitespace-nowrap"
          >
            <Activity className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeSection === 'alerts' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('alerts')}
            className="whitespace-nowrap"
          >
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </Button>
          <Button
            variant={activeSection === 'actions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('actions')}
            className="whitespace-nowrap"
          >
            <Settings className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {administrationSections.map((section) => (
              <Card 
                key={section.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    {Object.entries(section.stats).map(([key, value], index) => (
                      <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-sm text-gray-900">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Recent Activities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activities:</h4>
                    <div className="space-y-1">
                      {section.recentActivities.slice(0, 2).map((activity, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-start gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Alerts Section */}
        {activeSection === 'alerts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts & Notifications</h3>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </div>
            
            {recentAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type)
              return (
                <Card key={alert.id} className={`border ${getAlertColor(alert.type)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <AlertIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {alert.department}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">{alert.time}</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              Dismiss
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Quick Actions Section */}
        {activeSection === 'actions' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Summary Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Administrative Dashboard Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95</div>
                <div className="text-sm text-gray-600">Total Staff</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹45L</div>
                <div className="text-sm text-gray-600">Monthly Budget</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-600">Active Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">99.8%</div>
                <div className="text-sm text-gray-600">System Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Request
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Meeting
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System Settings
          </Button>
        </div>
      </div>
    </div>
  )
}