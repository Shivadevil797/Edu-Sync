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
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap,
  RefreshCw,
  CheckCircle,
  UserPlus,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  Users,
  Upload,
  FileText,
  Building2,
  X,
  AlertCircle
} from 'lucide-react'

interface FacultyNewUserRegistrationPageProps {
  onBack: () => void
  onRegistrationSuccess: () => void
}

export function FacultyNewUserRegistrationPage({ onBack, onRegistrationSuccess }: FacultyNewUserRegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    designation: '',
    age: '',
    gender: '',
    address: '',
    qualification: '',
    mobileNumber: '',
    emailId: '',
    isClassTeacher: '',
    class: '',
    section: '',
    year: '',
    semester: '',
    isHOD: '',
    branch: '',
    password: '',
    confirmPassword: ''
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    photo: null as File | null,
    aadharCard: null as File | null,
    degreeCertificate: null as File | null,
    pgDegree: null as File | null,
    tenthMarksheet: null as File | null,
    twelfthMarksheet: null as File | null,
    ugMarksheet: null as File | null,
    pgMarksheet: null as File | null,
    experienceCertificate: null as File | null,
    salarySlips: null as File | null,
    panCard: null as File | null,
    bankPassbook: null as File | null
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const facultyDocumentTypes = [
    { key: 'photo', label: 'Passport Photo', required: true, accept: 'image/*' },
    { key: 'aadharCard', label: 'Aadhar Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'degreeCertificate', label: 'Highest Degree Certificate', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'pgDegree', label: 'PG Degree (if applicable)', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'tenthMarksheet', label: '10th Marks Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'twelfthMarksheet', label: '12th Marks Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'ugMarksheet', label: 'UG Marksheet', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'pgMarksheet', label: 'PG Marksheet (if applicable)', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'experienceCertificate', label: 'Experience Certificate', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'salarySlips', label: 'Last 3 Months Salary Slips', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'panCard', label: 'PAN Card', required: true, accept: '.pdf,.jpg,.jpeg,.png' },
    { key: 'bankPassbook', label: 'Bank Passbook/Statement', required: true, accept: '.pdf,.jpg,.jpeg,.png' }
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

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please provide a complete address (minimum 10 characters)'
    }

    // Qualification validation
    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required'
    } else if (formData.qualification.trim().length < 5) {
      newErrors.qualification = 'Please provide detailed qualification information'
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

    // Class Teacher validation
    if (!formData.isClassTeacher) {
      newErrors.isClassTeacher = 'Please specify if you are a class teacher'
    }

    // Class details validation (only if they are a class teacher)
    if (formData.isClassTeacher === 'yes') {
      if (!formData.class.trim()) {
        newErrors.class = 'Class is required for class teachers'
      }
      if (!formData.section.trim()) {
        newErrors.section = 'Section is required for class teachers'
      }
      if (!formData.year.trim()) {
        newErrors.year = 'Year is required for class teachers'
      } else {
        const year = parseInt(formData.year)
        const currentYear = new Date().getFullYear()
        if (isNaN(year) || year < 2020 || year > currentYear + 2) {
          newErrors.year = `Year must be between 2020 and ${currentYear + 2}`
        }
      }
      if (!formData.semester.trim()) {
        newErrors.semester = 'Semester is required for class teachers'
      }
    }

    // HOD validation
    if (!formData.isHOD) {
      newErrors.isHOD = 'Please specify if you are a HOD'
    }

    // Branch validation (only if they are a HOD)
    if (formData.isHOD === 'yes') {
      if (!formData.branch.trim()) {
        newErrors.branch = 'Branch is required for HODs'
      } else if (formData.branch.trim().length < 2) {
        newErrors.branch = 'Please provide a valid branch name'
      }
    }

    // Document upload validation
    facultyDocumentTypes.forEach(doc => {
      if (doc.required && !uploadedFiles[doc.key as keyof typeof uploadedFiles]) {
        newErrors[doc.key] = `${doc.label} is required`
      }
    })

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }

    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

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
        fullName: `${formData.firstName} ${formData.lastName}`,
        registrationDate: new Date().toISOString(),
        isRegistered: true,
        facultyId: `FAC${Date.now()}`,
        status: 'pending-approval'
      }
      
      localStorage.setItem('facultyNewUserRegistration', JSON.stringify(registrationData))
      
      // Show success message and redirect
      alert('Registration submitted successfully!\n\nYour application is now under review. You will be contacted within 2-3 business days.\n\nFaculty ID: ' + registrationData.facultyId)
      onRegistrationSuccess()
    }, 2000)
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      designation: '',
      age: '',
      gender: '',
      address: '',
      qualification: '',
      mobileNumber: '',
      emailId: '',
      isClassTeacher: '',
      class: '',
      section: '',
      year: '',
      semester: '',
      isHOD: '',
      branch: '',
      password: '',
      confirmPassword: ''
    })
    setUploadedFiles({
      photo: null,
      aadharCard: null,
      degreeCertificate: null,
      pgDegree: null,
      tenthMarksheet: null,
      twelfthMarksheet: null,
      ugMarksheet: null,
      pgMarksheet: null,
      experienceCertificate: null,
      salarySlips: null,
      panCard: null,
      bankPassbook: null
    })
    setErrors({})
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
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
            <h1 className="text-gray-800">Faculty Registration</h1>
            <p className="text-sm text-gray-600">New User Registration Form</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-gray-700 border-white/30">
            Faculty Form
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl">
          {/* Registration Form */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-gray-900 flex items-center justify-center gap-2">
                <UserPlus className="w-6 h-6 text-purple-600" />
                New Faculty Registration
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

                {/* Qualification */}
                <div className="space-y-2">
                  <Label htmlFor="qualification" className="text-gray-700">
                    Qualification *
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <Textarea
                      id="qualification"
                      placeholder="Enter educational qualification details"
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

                {/* Are you a class teacher? */}
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

                {/* Class Teacher Details - Only show if "Yes" is selected */}
                {formData.isClassTeacher === 'yes' && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h4 className="text-gray-900 font-medium">Class Details</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class" className="text-gray-700">
                          Class *
                        </Label>
                        <div className="relative">
                          <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="class"
                            type="text"
                            placeholder="e.g., Class-1, BCA-1"
                            value={formData.class}
                            onChange={(e) => handleInputChange('class', e.target.value)}
                            className={`pl-10 ${errors.class ? 'border-red-300 focus:border-red-500' : ''}`}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.class && (
                          <p className="text-sm text-red-600">{errors.class}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="section" className="text-gray-700">
                          Section *
                        </Label>
                        <Select value={formData.section} onValueChange={(value) => handleInputChange('section', value)} disabled={isLoading}>
                          <SelectTrigger className={errors.section ? 'border-red-300 focus:border-red-500' : ''}>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A">Section A</SelectItem>
                            <SelectItem value="B">Section B</SelectItem>
                            <SelectItem value="C">Section C</SelectItem>
                            <SelectItem value="D">Section D</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.section && (
                          <p className="text-sm text-red-600">{errors.section}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-gray-700">
                          Year *
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="year"
                            type="number"
                            placeholder="e.g., 2024"
                            value={formData.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            className={`pl-10 ${errors.year ? 'border-red-300 focus:border-red-500' : ''}`}
                            min="2020"
                            max={new Date().getFullYear() + 2}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.year && (
                          <p className="text-sm text-red-600">{errors.year}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semester" className="text-gray-700">
                          Semester *
                        </Label>
                        <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)} disabled={isLoading}>
                          <SelectTrigger className={errors.semester ? 'border-red-300 focus:border-red-500' : ''}>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Semester 1</SelectItem>
                            <SelectItem value="2">Semester 2</SelectItem>
                            <SelectItem value="3">Semester 3</SelectItem>
                            <SelectItem value="4">Semester 4</SelectItem>
                            <SelectItem value="5">Semester 5</SelectItem>
                            <SelectItem value="6">Semester 6</SelectItem>
                            <SelectItem value="7">Semester 7</SelectItem>
                            <SelectItem value="8">Semester 8</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.semester && (
                          <p className="text-sm text-red-600">{errors.semester}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Are you a HOD? */}
                <div className="space-y-3">
                  <Label className="text-gray-700">Are you a HOD? *</Label>
                  <RadioGroup 
                    value={formData.isHOD} 
                    onValueChange={(value) => handleInputChange('isHOD', value)}
                    className="flex space-x-6"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="hod-yes" />
                      <Label htmlFor="hod-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="hod-no" />
                      <Label htmlFor="hod-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.isHOD && (
                    <p className="text-sm text-red-600">{errors.isHOD}</p>
                  )}
                </div>

                {/* HOD Details - Only show if "Yes" is selected */}
                {formData.isHOD === 'yes' && (
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-green-600" />
                      <h4 className="text-gray-900 font-medium">HOD Details</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="branch" className="text-gray-700">
                        Branch/Department *
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="branch"
                          type="text"
                          placeholder="e.g., Computer Science, Commerce, Mathematics"
                          value={formData.branch}
                          onChange={(e) => handleInputChange('branch', e.target.value)}
                          className={`pl-10 ${errors.branch ? 'border-red-300 focus:border-red-500' : ''}`}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.branch && (
                        <p className="text-sm text-red-600">{errors.branch}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Document Upload Section */}
                <div className="space-y-4">
                  <h4 className="text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Document Upload
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {facultyDocumentTypes.map((doc) => (
                      <div key={doc.key} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          {doc.key === 'photo' ? <Upload className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
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
                                <CheckCircle className="w-4 h-4" />
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
                              <X className="w-3 h-3" />
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
                      <Upload className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
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
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`pl-10 pr-12 ${errors.password ? 'border-red-300 focus:border-red-500' : ''}`}
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
                        className={`pl-10 pr-12 ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : ''}`}
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

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
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