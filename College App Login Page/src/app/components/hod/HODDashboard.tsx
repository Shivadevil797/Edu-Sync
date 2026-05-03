import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Calendar, BookOpen, Settings } from 'lucide-react'

interface HODDashboardProps {
  onBack: () => void
  onNavigate: (page: string, data?: any) => void
  selectedDepartment: any
}

export function HODDashboard({ onBack, onNavigate, selectedDepartment }: HODDashboardProps) {
  const departments = [
    {
      id: 'cse',
      name: 'Computer Science & Engineering',
      shortName: 'CSE',
      faculty: 15,
      students: 240,
      courses: 12,
      hod: 'Dr. Sarah Johnson'
    },
    {
      id: 'ece',
      name: 'Electronics & Communication Engineering',
      shortName: 'ECE',
      faculty: 12,
      students: 180,
      courses: 10,
      hod: 'Dr. Michael Chen'
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      shortName: 'MECH',
      faculty: 18,
      students: 200,
      courses: 14,
      hod: 'Dr. Robert Smith'
    },
    {
      id: 'civil',
      name: 'Civil Engineering',
      shortName: 'CIVIL',
      faculty: 14,
      students: 160,
      courses: 11,
      hod: 'Dr. Emily Davis'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">HOD Dashboard</h1>
              <p className="text-sm text-gray-600">{selectedDepartment?.name || 'Department Overview'}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Department Info Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedDepartment?.gradient || 'from-blue-400 to-cyan-500'} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{selectedDepartment?.icon || '🎓'}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-gray-900 mb-2">{selectedDepartment?.name || 'Department Name'}</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">{selectedDepartment?.students || '0'}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">{selectedDepartment?.faculty || '0'}</div>
                    <div className="text-xs text-gray-600">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">{selectedDepartment?.courses || '0'}</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('timetable')}
            className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <div className="flex flex-col items-center gap-1">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">View Timetable</span>
            </div>
          </Button>
          <Button
            onClick={() => onNavigate('faculty')}
            className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <div className="flex flex-col items-center gap-1">
              <Users className="w-6 h-6" />
              <span className="text-sm">Faculty Details</span>
            </div>
          </Button>
        </div>

        {/* Management Actions */}
        <div className="space-y-4">
          <h2 className="text-gray-900">Department Management</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('hod-profile', selectedDepartment)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">HOD Profile</h3>
                    <p className="text-sm text-gray-600">View department head information</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Course Management</h3>
                    <p className="text-sm text-gray-600">Manage courses and curriculum</p>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Student Records</h3>
                    <p className="text-sm text-gray-600">View and manage student information</p>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}