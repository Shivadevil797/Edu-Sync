import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, School, Check, Upload, FileText, Image, AlertCircle } from 'lucide-react'

interface StudentNewUserRegistrationPageProps {
  onBack: () => void
  onRegistrationSuccess: () => void
}

export function StudentNewUserRegistrationPage({ onBack, onRegistrationSuccess }: StudentNewUserRegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    address: '',
    course: '',
    mobileNumber: '',
    emailId: '',
    idCardNumber: '',
    yearOfJoining: '',
    yearOfPassing: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({
    photo: null,
    aadharCard: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    transferCertificate: null,
    conductCertificate: null,
    incomeCertificate: null,
    casteCertificate: null
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)

  const courses = [
    'B.Tech Computer Science',
    'B.Tech Information Technology',
    'B.Tech Electronics & Communication',
    'B.Tech Mechanical Engineering',
    'B.Tech Civil Engineering',
    'B.Tech Electrical Engineering',
    'BCA (Bachelor of Computer Applications)',
    'BBA (Bachelor of Business Administration)',
    'B.Com (Bachelor of Commerce)',
    'B.Sc Mathematics',
    'B.Sc Physics',
    'B.Sc Chemistry',
    'BA English',
    'BA History',
    'MA English',
    'M.Tech Computer Science',
    'MBA (Master of Business Administration)'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i)

  const documentTypes = [
    { key: 'photo', label: 'Passport Photo', required: true, accept: 'image/*' },
    { key: 'aadharCard', label: 'Aadhar Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'tenthMarksheet', label: '10th Marks Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'twelfthMarksheet', label: '12th Marks Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'transferCertificate', label: 'Transfer Certificate', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'conductCertificate', label: 'Conduct Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'incomeCertificate', label: 'Income Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'casteCertificate', label: 'Caste Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' }
  ]

  const handleFileUpload = (documentType: string, file: File) => {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [documentType]: 'File size must be less than 5MB'
      }))
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [documentType]: 'Only PDF, JPG, JPEG, and PNG files are allowed'
      }))
      return
    }

    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }))

    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[documentType]
      return newErrors
    })
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required'
    } else if (parseInt(formData.age) < 16 || parseInt(formData.age) > 50) {
      newErrors.age = 'Age must be between 16 and 50'
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters'
    }

    if (!formData.course) {
      newErrors.course = 'Course is required'
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number'
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email ID is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Enter a valid email address'
    }

    if (!formData.idCardNumber.trim()) {
      newErrors.idCardNumber = 'ID card number is required'
    } else if (formData.idCardNumber.length < 6) {
      newErrors.idCardNumber = 'ID card number must be at least 6 characters'
    }

    if (!formData.yearOfJoining) {
      newErrors.yearOfJoining = 'Year of joining is required'
    }

    if (!formData.yearOfPassing) {
      newErrors.yearOfPassing = 'Year of passing is required'
    } else if (parseInt(formData.yearOfPassing) <= parseInt(formData.yearOfJoining)) {
      newErrors.yearOfPassing = 'Year of passing must be after year of joining'
    }

    // Validate required documents
    documentTypes.forEach(doc => {
      if (doc.required && !uploadedFiles[doc.key]) {
        newErrors[doc.key] = `${doc.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      
      // Save registration data to localStorage
      localStorage.setItem('studentRegistration', JSON.stringify(formData))
      
      // Generate login credentials
      const username1 = `${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}`
      const username2 = formData.idCardNumber
      const password1 = `${formData.firstName}@123`
      const password2 = `${formData.firstName}@2024`
      
      alert(`Student registration successful! 🎉\n\nYour login credentials:\n\nUsername Options:\n• ${username1}\n• ${username2}\n\nPassword Options:\n• ${password1}\n• ${password2}\n\nYou can now login to your student portal!`)
      onRegistrationSuccess()
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      address: '',
      course: '',
      mobileNumber: '',
      emailId: '',
      idCardNumber: '',
      yearOfJoining: '',
      yearOfPassing: ''
    })
    setUploadedFiles({
      photo: null,
      aadharCard: null,
      tenthMarksheet: null,
      twelfthMarksheet: null,
      transferCertificate: null,
      conductCertificate: null,
      incomeCertificate: null,
      casteCertificate: null
    })
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Student Login
        </Button>

        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white mb-2">Student Registration</h2>
              <p className="text-white/80 text-sm">Create Your Student Account</p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      className={`h-12 ${errors.firstName ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      className={`h-12 ${errors.lastName ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Age *
                    </label>
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Enter your age"
                      className={`h-12 ${errors.age ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                      min="16"
                      max="50"
                    />
                    {errors.age && (
                      <p className="text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Gender *
                    </label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)} disabled={isLoading}>
                      <SelectTrigger className={`h-12 ${errors.gender ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-sm text-red-600">{errors.gender}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address *
                  </label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your complete address"
                    className={`min-h-20 ${errors.address ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900 border-b border-gray-200 pb-2">Academic Information</h3>
                
                {/* Course */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Course *
                  </label>
                  <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)} disabled={isLoading}>
                    <SelectTrigger className={`h-12 ${errors.course ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course && (
                    <p className="text-sm text-red-600">{errors.course}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Year of Joining */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Year of Joining *
                    </label>
                    <Select value={formData.yearOfJoining} onValueChange={(value) => handleInputChange('yearOfJoining', value)} disabled={isLoading}>
                      <SelectTrigger className={`h-12 ${errors.yearOfJoining ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.yearOfJoining && (
                      <p className="text-sm text-red-600">{errors.yearOfJoining}</p>
                    )}
                  </div>

                  {/* Year of Passing */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Year of Passing *
                    </label>
                    <Select value={formData.yearOfPassing} onValueChange={(value) => handleInputChange('yearOfPassing', value)} disabled={isLoading}>
                      <SelectTrigger className={`h-12 ${errors.yearOfPassing ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.yearOfPassing && (
                      <p className="text-sm text-red-600">{errors.yearOfPassing}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900 border-b border-gray-200 pb-2">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className={`h-12 ${errors.mobileNumber ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                      maxLength={10}
                    />
                    {errors.mobileNumber && (
                      <p className="text-sm text-red-600">{errors.mobileNumber}</p>
                    )}
                  </div>

                  {/* Email ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email ID *
                    </label>
                    <Input
                      type="email"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange('emailId', e.target.value)}
                      placeholder="Enter your email address"
                      className={`h-12 ${errors.emailId ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.emailId && (
                      <p className="text-sm text-red-600">{errors.emailId}</p>
                    )}
                  </div>
                </div>

                {/* ID Card Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ID Card Number *
                  </label>
                  <Input
                    type="text"
                    value={formData.idCardNumber}
                    onChange={(e) => handleInputChange('idCardNumber', e.target.value)}
                    placeholder="Enter your ID card number"
                    className={`h-12 ${errors.idCardNumber ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.idCardNumber && (
                    <p className="text-sm text-red-600">{errors.idCardNumber}</p>
                  )}
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Upload
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentTypes.map((doc) => (
                    <div key={doc.key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        {doc.key === 'photo' ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        {doc.label} {doc.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      <div className="relative">
                        <input
                          type="file"
                          accept={doc.accept}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(doc.key, file)
                            }
                          }}
                          className="hidden"
                          id={`file-${doc.key}`}
                          disabled={isLoading}
                        />
                        
                        <label
                          htmlFor={`file-${doc.key}`}
                          className={`
                            flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                            ${uploadedFiles[doc.key] 
                              ? 'border-green-300 bg-green-50 text-green-700' 
                              : errors[doc.key] 
                                ? 'border-red-300 bg-red-50 text-red-700'
                                : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-400 hover:bg-blue-50'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          {uploadedFiles[doc.key] ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {uploadedFiles[doc.key]?.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span className="text-sm">
                                Click to upload {doc.label}
                              </span>
                            </>
                          )}
                        </label>
                        
                        {errors[doc.key] && (
                          <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[doc.key]}
                          </p>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500">
                        {doc.key === 'photo' ? 'Max 5MB. JPG, JPEG, PNG only.' : 'Max 5MB. PDF, JPG, JPEG, PNG allowed.'}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Document Upload Guidelines:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Ensure all documents are clear and readable</li>
                        <li>• Maximum file size: 5MB per document</li>
                        <li>• Accepted formats: PDF, JPG, JPEG, PNG</li>
                        <li>• Documents marked with * are mandatory</li>
                        <li>• Keep original documents ready for verification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Submit Registration
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Reset Form
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500 pt-4">
                All fields marked with * are mandatory. Please ensure all information is accurate.
              </div>
            </form>
          </CardContent>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Student registration portal
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-gray-300 text-xs">
              <span>© 2024 College Management System</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}