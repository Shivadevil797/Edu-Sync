import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, X, School, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface StudentRegistrationPageProps {
  onBack: () => void
  onSuccess: () => void
}

export function StudentRegistrationPage({ onBack, onSuccess }: StudentRegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailId: ''
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

  const removePhoto = () => {
    setProfilePhoto(null)
    setPhotoPreview('')
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter a valid 10-digit phone number'
    if (!formData.emailId.trim()) newErrors.emailId = 'Email ID is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) newErrors.emailId = 'Enter a valid email address'
    if (!profilePhoto) newErrors.profilePhoto = 'Profile photo is required'

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

      localStorage.setItem('studentRegistration', JSON.stringify(registrationData))
      
      toast.success('Registration Successful!', {
        description: 'Your registration has been submitted. Please contact admin for credentials.'
      })

      setIsSubmitting(false)
      
      setTimeout(() => {
        onSuccess()
      }, 1500)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
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

          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                <School className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Student Registration</CardTitle>
              <p className="text-white/80 text-sm mt-2">Join our academic community</p>
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
                  <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="10-digit phone number"
                    maxLength={10}
                    className={errors.phoneNumber ? 'border-red-500' : ''}
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-600">{errors.phoneNumber}</p>}
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
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
