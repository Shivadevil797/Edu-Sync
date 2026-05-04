import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Lock,
  UserCheck,
  RefreshCw,
  CheckCircle,
  Upload,
  FileText,
  Image,
  AlertCircle,
  Check
} from 'lucide-react'

interface NewCandidateRegistrationPageProps {
  onBack: () => void
  onRegistrationSuccess: () => void
}

export function NewCandidateRegistrationPage({ onBack, onRegistrationSuccess }: NewCandidateRegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    mobileNumber: '',
    emailId: '',
    address: '',
    age: '',
    gender: '',
    qualification: '',
    experience: '',
    password: '',
    confirmPassword: '',
    isClassTeacher: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [uploadedFiles, setUploadedFiles] = useState({
    photo: null as File | null,
    resume: null as File | null,
    aadharCard: null as File | null,
    panCard: null as File | null,
    degreeCertificate: null as File | null,
    pgDegree: null as File | null,
    experienceCertificate: null as File | null,
    salarySlips: null as File | null,
    relievingLetter: null as File | null,
    noObjectionCertificate: null as File | null
  })

  const candidateDocumentTypes = [
    { key: 'photo', label: 'Passport Photo', required: true, accept: 'image/*' },
    { key: 'resume', label: 'Resume/CV', required: true, accept: '.pdf,.doc,.docx' },
    { key: 'aadharCard', label: 'Aadhar Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'panCard', label: 'PAN Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'degreeCertificate', label: 'Degree Certificate', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'pgDegree', label: 'PG Degree (if applicable)', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'experienceCertificate', label: 'Experience Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'salarySlips', label: 'Salary Slips (Last 3 months)', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'relievingLetter', label: 'Relieving Letter', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'noObjectionCertificate', label: 'No Objection Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' }
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

    // Validate file type based on document type
    let allowedTypes: string[] = []
    if (documentType === 'photo') {
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    } else if (documentType === 'resume') {
      allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    } else {
      allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [documentType]: 'Invalid file type. Please check the allowed formats.'
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
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters'
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters'
    }

    // Designation validation
    if (!formData.designation) {
      newErrors.designation = 'Please select a designation'
    }

    // Mobile Number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number'
    }

    // Email validation
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email ID is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address'
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please provide a complete address (minimum 10 characters)'
    }

    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required'
    } else {
      const age = parseInt(formData.age)
      if (isNaN(age) || age < 21 || age > 65) {
        newErrors.age = 'Age must be between 21 and 65 years'
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
    }

    // Qualification validation
    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required'
    } else if (formData.qualification.trim().length < 5) {
      newErrors.qualification = 'Please provide detailed qualification information'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character'
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Class Teacher validation
    if (!formData.isClassTeacher) {
      newErrors.isClassTeacher = 'Please specify if you are a class teacher'
    }

    // Document validation
    candidateDocumentTypes.forEach(doc => {
      if (doc.required && !uploadedFiles[doc.key as keyof typeof uploadedFiles]) {
        newErrors[doc.key] = `${doc.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      // Save registration data to localStorage
      const registrationData = {
        ...formData,
        registrationDate: new Date().toISOString(),
        isRegistered: true,
        candidateId: `CAND${Date.now()}`,
        status: 'pending-approval'
      }
      
      localStorage.setItem('newCandidateRegistration', JSON.stringify(registrationData))
      
      // Show success message and redirect
      alert('Registration submitted successfully!\n\nYour application is now under review. You will be contacted within 2-3 business days.\n\nCandidate ID: ' + registrationData.candidateId)
      onRegistrationSuccess()
    }, 2000)
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      designation: '',
      mobileNumber: '',
      emailId: '',
      address: '',
      age: '',
      gender: '',
      qualification: '',
      experience: '',
      password: '',
      confirmPassword: '',
      isClassTeacher: ''
    })
    setUploadedFiles({
      photo: null,
      resume: null,
      aadharCard: null,
      panCard: null,
      degreeCertificate: null,
      pgDegree: null,
      experienceCertificate: null,
      salarySlips: null,
      relievingLetter: null,
      noObjectionCertificate: null
    })
    setErrors({})
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
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
            <h1 className="text-gray-800">New Candidate Registration</h1>
            <p className="text-sm text-gray-600">Faculty Application Form</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-gray-700 border-white/30">
            Application Form
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">
          {/* Registration Form */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-gray-900 flex items-center justify-center gap-2">
                <UserCheck className="w-6 h-6 text-green-600" />
                Faculty Registration Form
              </CardTitle>
              <p className="text-center text-sm text-gray-600">
                Please fill in all the required information below
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700">
                      First Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`pl-10 ${errors.firstName ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">
                      Last Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`pl-10 ${errors.lastName ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Designation and Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-gray-700">
                      Designation *
                    </Label>
                    <Select value={formData.designation} onValueChange={(value) => handleInputChange('designation', value)} disabled={isLoading}>
                      <SelectTrigger className={errors.designation ? 'border-red-300 focus:border-red-500' : ''}>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.designation && (
                      <p className="text-sm text-red-600">{errors.designation}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-gray-700">
                      Age *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className={`pl-10 ${errors.age ? 'border-red-300 focus:border-red-500' : ''}`}
                        min="21"
                        max="65"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.age && (
                      <p className="text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-gray-700">
                      Mobile Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={`pl-10 ${errors.mobileNumber ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="text-sm text-red-600">{errors.mobileNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailId" className="text-gray-700">
                      Email ID *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="emailId"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.emailId}
                        onChange={(e) => handleInputChange('emailId', e.target.value)}
                        className={`pl-10 ${errors.emailId ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.emailId && (
                      <p className="text-sm text-red-600">{errors.emailId}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">
                    Address *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Textarea
                      id="address"
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`pl-10 min-h-[80px] resize-none ${errors.address ? 'border-red-300 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <Label className="text-gray-700">Gender *</Label>
                  <RadioGroup 
                    value={formData.gender} 
                    onValueChange={(value) => handleInputChange('gender', value)}
                    className="flex space-x-6"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="others" id="others" />
                      <Label htmlFor="others" className="cursor-pointer">Others</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-sm text-red-600">{errors.gender}</p>
                  )}
                </div>

                {/* Qualification and Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="qualification" className="text-gray-700">
                      Qualification *
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Textarea
                        id="qualification"
                        placeholder="Enter educational qualification"
                        value={formData.qualification}
                        onChange={(e) => handleInputChange('qualification', e.target.value)}
                        className={`pl-10 min-h-[80px] resize-none ${errors.qualification ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.qualification && (
                      <p className="text-sm text-red-600">{errors.qualification}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700">
                      Experience (if any)
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <Textarea
                        id="experience"
                        placeholder="Enter work experience (optional)"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="pl-10 min-h-[80px] resize-none"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">
                      Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 h-auto"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Must include uppercase, lowercase, number, and special character
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 h-auto"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Class Teacher */}
                <div className="space-y-3">
                  <Label className="text-gray-700">Are you a class teacher? *</Label>
                  <RadioGroup 
                    value={formData.isClassTeacher} 
                    onValueChange={(value) => handleInputChange('isClassTeacher', value)}
                    className="flex space-x-6"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="class-teacher-yes" />
                      <Label htmlFor="class-teacher-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="class-teacher-no" />
                      <Label htmlFor="class-teacher-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.isClassTeacher && (
                    <p className="text-sm text-red-600">{errors.isClassTeacher}</p>
                  )}
                </div>

                {/* Document Upload Section */}
                <div className="space-y-4">
                  <h4 className="text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Document Upload
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {candidateDocumentTypes.map((doc) => (
                      <div key={doc.key} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          {doc.key === 'photo' ? <Image className="w-4 h-4" /> : 
                           doc.key === 'resume' ? <FileText className="w-4 h-4" /> : 
                           <FileText className="w-4 h-4" />}
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
                              ${uploadedFiles[doc.key as keyof typeof uploadedFiles] 
                                ? 'border-green-300 bg-green-50 text-green-700' 
                                : errors[doc.key] 
                                  ? 'border-red-300 bg-red-50 text-red-700'
                                  : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-400 hover:bg-blue-50'
                              }
                              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          >
                            {uploadedFiles[doc.key as keyof typeof uploadedFiles] ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {(uploadedFiles[doc.key as keyof typeof uploadedFiles] as File)?.name}
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
                          {doc.key === 'photo' ? 'Max 5MB. JPG, JPEG, PNG only.' : 
                           doc.key === 'resume' ? 'Max 5MB. PDF, DOC, DOCX allowed.' :
                           'Max 5MB. PDF, JPG, JPEG, PNG allowed.'}
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
                          <li>• Accepted formats vary by document type</li>
                          <li>• Documents marked with * are mandatory</li>
                          <li>• Keep original documents ready for verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Submit Application
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Your application will be reviewed within 2-3 business days
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-gray-400 text-xs">
              <span>© 2024 College Management System</span>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}