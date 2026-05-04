import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface StudentAttendancePageProps {
  onBack: () => void
}

export function StudentAttendancePage({ onBack }: StudentAttendancePageProps) {
  // Mock attendance data
  const attendanceData = [
    {
      subject: 'Data Structures and Algorithms',
      code: 'CS301',
      totalClasses: 45,
      attendedClasses: 42,
      percentage: 93.3,
      requiredAttendance: 75,
      status: 'good'
    },
    {
      subject: 'Database Management Systems',
      code: 'CS302',
      totalClasses: 40,
      attendedClasses: 35,
      percentage: 87.5,
      requiredAttendance: 75,
      status: 'good'
    },
    {
      subject: 'Operating Systems',
      code: 'CS303',
      totalClasses: 38,
      attendedClasses: 30,
      percentage: 78.9,
      requiredAttendance: 75,
      status: 'good'
    },
    {
      subject: 'Software Engineering',
      code: 'CS304',
      totalClasses: 42,
      attendedClasses: 30,
      percentage: 71.4,
      requiredAttendance: 75,
      status: 'warning'
    },
    {
      subject: 'Computer Networks',
      code: 'CS305',
      totalClasses: 35,
      attendedClasses: 32,
      percentage: 91.4,
      requiredAttendance: 75,
      status: 'good'
    },
    {
      subject: 'Web Development',
      code: 'CS306',
      totalClasses: 30,
      attendedClasses: 20,
      percentage: 66.7,
      requiredAttendance: 75,
      status: 'critical'
    }
  ]

  // Calculate overall attendance
  const totalClasses = attendanceData.reduce((sum, subject) => sum + subject.totalClasses, 0)
  const totalAttended = attendanceData.reduce((sum, subject) => sum + subject.attendedClasses, 0)
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1)

  // Prepare pie chart data
  const pieChartData = [
    {
      name: 'Present',
      value: totalAttended,
      color: '#10b981'
    },
    {
      name: 'Absent',
      value: totalClasses - totalAttended,
      color: '#ef4444'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'critical': return <XCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            Classes: {data.value} ({((data.value / totalClasses) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-gray-900">Attendance Management</h1>
              <p className="text-sm text-gray-600">Track your class attendance records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Attendance Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{overallPercentage}%</p>
                    <p className="text-sm text-gray-600">Overall Attendance</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{totalAttended}</p>
                    <p className="text-sm text-gray-600">Classes Attended</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{totalClasses - totalAttended}</p>
                    <p className="text-sm text-gray-600">Classes Missed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Subject-wise Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Subject-wise Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Attended/Total</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData.map((subject, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{subject.subject}</TableCell>
                          <TableCell>{subject.code}</TableCell>
                          <TableCell>
                            <span className="font-medium text-blue-600">
                              {subject.attendedClasses}
                            </span>
                            <span className="text-gray-500">/{subject.totalClasses}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${
                              subject.percentage >= 75 ? 'text-green-600' : 
                              subject.percentage >= 65 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {subject.percentage.toFixed(1)}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="w-full">
                              <Progress 
                                value={subject.percentage} 
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0%</span>
                                <span className="text-gray-400">Required: {subject.requiredAttendance}%</span>
                                <span>100%</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(subject.status)}
                              <Badge className={getStatusColor(subject.status)}>
                                {subject.status === 'good' ? 'Good' : 
                                 subject.status === 'warning' ? 'Warning' : 'Critical'}
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Attendance Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Minimum 75% attendance required
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          65-74% attendance requires special permission
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          Below 65% may result in debarment from exams
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Tips to Improve</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Attend all scheduled classes regularly</li>
                        <li>• Inform faculty in advance for planned absences</li>
                        <li>• Submit medical certificates for sick leave</li>
                        <li>• Participate in college activities for additional attendance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Pie Chart */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-center">Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          formatter={(value) => <span className="text-sm">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Summary Stats */}
                  <div className="mt-6 space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{overallPercentage}%</p>
                      <p className="text-sm text-gray-600">Overall Attendance</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Present</span>
                        </div>
                        <span className="text-sm font-bold text-green-700">{totalAttended} classes</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium">Absent</span>
                        </div>
                        <span className="text-sm font-bold text-red-700">{totalClasses - totalAttended} classes</span>
                      </div>
                    </div>

                    {/* Warning if attendance is low */}
                    {parseFloat(overallPercentage) < 75 && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="font-medium text-yellow-800">Attendance Warning</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Your attendance is below the required 75%. Please attend more classes to avoid exam debarment.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}