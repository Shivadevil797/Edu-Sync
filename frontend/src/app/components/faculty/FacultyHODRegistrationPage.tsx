import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X, School, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface FacultyHODRegistrationPageProps {
  onBack: () => void
  onSuccess: () => void
}

export function FacultyHODRegistrationPage({ onBack, onSuccess }: FacultyHODRegistrationPageProps) {
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
    classDetails: {
      class: '',
      year: '',
      section: '',
      semester: ''
    },
    isHOD: '',
    hodDetails: {
      department: ''
    }
  })

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setProfilePhoto(file)
        setPhotoPreview(URL.createObjectURL(file))
        if (errors.profilePhoto) {
          setErrors(prev => ({ ...prev, profilePhoto: '' }))
        }
      }
    }
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleClassDetailsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      classDetails: { ...prev.classDetails, [field]: value }
    }))
    if (errors[`classDetails.${field}`]) {
      setErrors(prev => ({ ...prev, [`classDetails.${field}`]: '' }))
    }
  }

  const handleHODDetailsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      hodDetails: { ...prev.hodDetails, [field]: value }
    }))
    if (errors[`hodDetails.${field}`]) {
      setErrors(prev => ({ ...prev, [`hodDetails.${field}`]: '' }))
    }
  }

  const removePhoto = () => {
    setProfilePhoto(null)
    setPhotoPreview('')
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required'
    if (!formData.age.trim()) newErrors.age = 'Age is required'
    else if (parseInt(formData.age) < 22 || parseInt(formData.age) > 70) newErrors.age = 'Age must be between 22 and 70'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required'
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required'
    else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number'
    if (!formData.emailId.trim()) newErrors.emailId = 'Email ID is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) newErrors.emailId = 'Enter a valid email address'
    if (!profilePhoto) newErrors.profilePhoto = 'Profile photo is required'
    if (!formData.isClassTeacher) newErrors.isClassTeacher = 'Please select if you are a class teacher'
    
    if (formData.isClassTeacher === 'yes') {
      if (!formData.classDetails.class.trim()) newErrors['classDetails.class'] = 'Class is required'
      if (!formData.classDetails.year.trim()) newErrors['classDetails.year'] = 'Year is required'
      if (!formData.classDetails.section) newErrors['classDetails.section'] = 'Section is required'
      if (!formData.classDetails.semester) newErrors['classDetails.semester'] = 'Semester is required'
    }

    if (!formData.isHOD) newErrors.isHOD = 'Please select if you are an HOD'
    
    if (formData.isHOD === 'yes') {
      if (!formData.hodDetails.department.trim()) newErrors['hodDetails.department'] = 'Branch/Department is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const registrationData = {
        ...formData,
        profilePhoto: photoPreview,
        registrationDate: new Date().toISOString()
      }

      localStorage.setItem('facultyHODRegistration', JSON.stringify(registrationData))
      
      toast.success('Registration Successful!', {
        description: 'Your registration has been submitted. Please login with your credentials.'
      })

      setIsSubmitting(false)
      
      setTimeout(() => {
        onSuccess()
      }, 1500)
    }, 2000)
  }

  const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI']

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>

          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                <School className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Faculty / HOD Registration</CardTitle>
              <p className="text-white/80 text-sm mt-2">Join our esteemed institution</p>
            </CardHeader>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation <span className="text-red-500">*</span></Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    placeholder="e.g., Associate Professor"
                    className={errors.designation ? 'border-red-500' : ''}
                  />
                  {errors.designation && <p className="text-xs text-red-600">{errors.designation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age <span className="text-red-500">*</span></Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter age"
                    className={errors.age ? 'border-red-500' : ''}
                  />
                  {errors.age && <p className="text-xs text-red-600">{errors.age}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gender <span className="text-red-500">*</span></Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="cursor-pointer font-normal">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="cursor-pointer font-normal">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="cursor-pointer font-normal">Other</Label>
                    </div>
                  </div>
                </RadioGroup>
                {errors.gender && <p className="text-xs text-red-600">{errors.gender}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification <span className="text-red-500">*</span></Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  placeholder="e.g., Ph.D. in Computer Science"
                  className={errors.qualification ? 'border-red-500' : ''}
                />
                {errors.qualification && <p className="text-xs text-red-600">{errors.qualification}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={errors.mobileNumber ? 'border-red-500' : ''}
                  />
                  {errors.mobileNumber && <p className="text-xs text-red-600">{errors.mobileNumber}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailId">Email ID <span className="text-red-500">*</span></Label>
                  <Input
                    id="emailId"
                    type="email"
                    value={formData.emailId}
                    onChange={(e) => handleInputChange('emailId', e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.emailId ? 'border-red-500' : ''}
                  />
                  {errors.emailId && <p className="text-xs text-red-600">{errors.emailId}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo <span className="text-red-500">*</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div {...getRootProps()} className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}
                ${errors.profilePhoto ? 'border-red-500' : ''}
              `}>
                <input {...getInputProps()} />
                {photoPreview ? (
                  <div className="relative inline-block">
                    <img src={photoPreview} alt="Profile preview" className="w-32 h-32 rounded-full object-cover mx-auto" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removePhoto()
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {isDragActive ? 'Drop the photo here' : 'Drag & drop your photo here, or click to select'}
                    </p>
                    <p className="text-xs text-gray-500">Supports: JPG, PNG, GIF (Max 5MB)</p>
                  </div>
                )}
              </div>
              {errors.profilePhoto && <p className="text-xs text-red-600 mt-2">{errors.profilePhoto}</p>}
            </CardContent>
          </Card>

          {/* Class Teacher Status */}
          <Card>
            <CardHeader>
              <CardTitle>Are you a class teacher? <span className="text-red-500">*</span></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={formData.isClassTeacher} onValueChange={(value) => handleInputChange('isClassTeacher', value)}>
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="classTeacher-yes" />
                    <Label htmlFor="classTeacher-yes" className="cursor-pointer font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="classTeacher-no" />
                    <Label htmlFor="classTeacher-no" className="cursor-pointer font-normal">No</Label>
                  </div>
                </div>
              </RadioGroup>
              {errors.isClassTeacher && <p className="text-xs text-red-600">{errors.isClassTeacher}</p>}

              {/* Class Details (Conditional) */}
              {formData.isClassTeacher === 'yes' && (
                <Card className="mt-4 border-purple-200 bg-purple-50/50">
                  <CardHeader>
                    <CardTitle className="text-base">Class Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class">Class <span className="text-red-500">*</span></Label>
                        <Input
                          id="class"
                          value={formData.classDetails.class}
                          onChange={(e) => handleClassDetailsChange('class', e.target.value)}
                          placeholder="e.g., BCA, BCOM"
                          className={errors['classDetails.class'] ? 'border-red-500 bg-white' : 'bg-white'}
                        />
                        {errors['classDetails.class'] && <p className="text-xs text-red-600">{errors['classDetails.class']}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
                        <Input
                          id="year"
                          value={formData.classDetails.year}
                          onChange={(e) => handleClassDetailsChange('year', e.target.value)}
                          placeholder="e.g., 2024-2025"
                          className={errors['classDetails.year'] ? 'border-red-500 bg-white' : 'bg-white'}
                        />
                        {errors['classDetails.year'] && <p className="text-xs text-red-600">{errors['classDetails.year']}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="section">Section <span className="text-red-500">*</span></Label>
                        <Select value={formData.classDetails.section} onValueChange={(value) => handleClassDetailsChange('section', value)}>
                          <SelectTrigger className={`${errors['classDetails.section'] ? 'border-red-500' : ''} bg-white`}>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sections.map(section => (
                              <SelectItem key={section} value={section}>{section}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors['classDetails.section'] && <p className="text-xs text-red-600">{errors['classDetails.section']}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester <span className="text-red-500">*</span></Label>
                        <Select value={formData.classDetails.semester} onValueChange={(value) => handleClassDetailsChange('semester', value)}>
                          <SelectTrigger className={`${errors['classDetails.semester'] ? 'border-red-500' : ''} bg-white`}>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {semesters.map(semester => (
                              <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors['classDetails.semester'] && <p className="text-xs text-red-600">{errors['classDetails.semester']}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* HOD Status */}
          <Card>
            <CardHeader>
              <CardTitle>Are you an HOD? <span className="text-red-500">*</span></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={formData.isHOD} onValueChange={(value) => handleInputChange('isHOD', value)}>
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hod-yes" />
                    <Label htmlFor="hod-yes" className="cursor-pointer font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hod-no" />
                    <Label htmlFor="hod-no" className="cursor-pointer font-normal">No</Label>
                  </div>
                </div>
              </RadioGroup>
              {errors.isHOD && <p className="text-xs text-red-600">{errors.isHOD}</p>}

              {/* HOD Details (Conditional) */}
              {formData.isHOD === 'yes' && (
                <Card className="mt-4 border-teal-200 bg-teal-50/50">
                  <CardHeader>
                    <CardTitle className="text-base">HOD Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Branch / Department <span className="text-red-500">*</span></Label>
                      <Input
                        id="department"
                        value={formData.hodDetails.department}
                        onChange={(e) => handleHODDetailsChange('department', e.target.value)}
                        placeholder="e.g., Computer Science, Commerce"
                        className={errors['hodDetails.department'] ? 'border-red-500 bg-white' : 'bg-white'}
                      />
                      {errors['hodDetails.department'] && <p className="text-xs text-red-600">{errors['hodDetails.department']}</p>}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Submit Registration
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
