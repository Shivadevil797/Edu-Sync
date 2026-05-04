import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, UserPlus } from 'lucide-react'

interface FacultyRegistrationPageProps {
  onBack: () => void
  onRegistrationSuccess: () => void
}

export function FacultyRegistrationPage({ onBack, onRegistrationSuccess }: FacultyRegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    age: '',
    gender: '',
    address: '',
    qualification: '',
    mobile: '',
    isClassTeacher: '',
    classSection: '',
    class: '',
    isHOD: '',
    department: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate registration
    setTimeout(() => {
      onRegistrationSuccess()
    }, 1000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6 pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Form Card */}
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white mb-2">Faculty Registration</h1>
            <p className="text-white/80 text-sm">Create your faculty account</p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Designation</label>
              <Select value={formData.designation} onValueChange={(value) => handleChange('designation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mr">Mr</SelectItem>
                  <SelectItem value="ms">Ms</SelectItem>
                  <SelectItem value="mrs">Mrs</SelectItem>
                  <SelectItem value="dr">Dr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="Enter age"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gender</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Male</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Female</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="others"
                      checked={formData.gender === 'others'}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Others</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter full address"
                rows={3}
                required
              />
            </div>

            {/* Qualification and Mobile */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Qualification</label>
                <Input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => handleChange('qualification', e.target.value)}
                  placeholder="e.g., M.Tech, Ph.D."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                <Input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>

            {/* Class Teacher Option */}
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              <label className="text-sm font-medium text-gray-900">Are you a class teacher?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isClassTeacher"
                    value="yes"
                    checked={formData.isClassTeacher === 'yes'}
                    onChange={(e) => handleChange('isClassTeacher', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isClassTeacher"
                    value="no"
                    checked={formData.isClassTeacher === 'no'}
                    onChange={(e) => handleChange('isClassTeacher', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>

              {formData.isClassTeacher === 'yes' && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Class</label>
                    <Input
                      type="text"
                      value={formData.class}
                      onChange={(e) => handleChange('class', e.target.value)}
                      placeholder="e.g., 1st Year BCA"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Section</label>
                    <Input
                      type="text"
                      value={formData.classSection}
                      onChange={(e) => handleChange('classSection', e.target.value)}
                      placeholder="e.g., A, B"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* HOD Option */}
            <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
              <label className="text-sm font-medium text-gray-900">Are you a HOD?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isHOD"
                    value="yes"
                    checked={formData.isHOD === 'yes'}
                    onChange={(e) => handleChange('isHOD', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isHOD"
                    value="no"
                    checked={formData.isHOD === 'no'}
                    onChange={(e) => handleChange('isHOD', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>

              {formData.isHOD === 'yes' && (
                <div className="space-y-2 mt-3">
                  <label className="text-sm font-medium text-gray-700">Department/Branch</label>
                  <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="bcom">BCOM</SelectItem>
                      <SelectItem value="bcom-af">BCOM A&F</SelectItem>
                      <SelectItem value="bba">BBA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
