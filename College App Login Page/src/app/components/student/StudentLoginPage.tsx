import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, RefreshCw, School, Info } from 'lucide-react'
import { validateCredentials } from '@/components/credentials'

interface StudentLoginPageProps {
  onBack: () => void
  onLoginSuccess: () => void
  onRegister?: () => void
}

export function StudentLoginPage({ onBack, onLoginSuccess, onRegister }: StudentLoginPageProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaCode, setCaptchaCode] = useState('STU42')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)
  const [studentInfo, setStudentInfo] = useState<any>(null)

  // Load student registration info on component mount
  useEffect(() => {
    const registrationData = localStorage.getItem('studentRegistration')
    if (registrationData) {
      const data = JSON.parse(registrationData)
      setStudentInfo(data)
    }
  }, [])

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(result)
    setCaptchaInput('')
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Student ID is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!captchaInput.trim()) {
      newErrors.captcha = 'Please enter the captcha'
    } else if (captchaInput.toUpperCase() !== captchaCode) {
      newErrors.captcha = 'Invalid captcha code'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    // Validate credentials - check both demo credentials and registered users
    setTimeout(() => {
      setIsLoading(false)
      
      // First try demo credentials
      let user = validateCredentials(formData.username, formData.password, 'student')
      let studentProfile = null
      
      if (user) {
        // Demo user found
        studentProfile = {
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').slice(1).join(' '),
          rollNumber: formData.username.toUpperCase(),
          course: user.department === 'BCA' ? 'Bachelor of Computer Applications' : 
                  user.department === 'BCOM' ? 'Bachelor of Commerce' :
                  user.department === 'BBA' ? 'Bachelor of Business Administration' : 'Bachelor Degree',
          semester: user.designation,
          emailId: user.email,
          mobileNumber: '9876543210',
          address: 'Student Hostel, College Campus',
          dateOfBirth: '2002-01-15',
          fatherName: 'Father Name',
          motherName: 'Mother Name',
          bloodGroup: 'B+',
          category: 'General',
          yearOfJoining: '2022',
          yearOfPassing: '2026',
          age: '22',
          gender: 'male',
          idCardNumber: formData.username,
          cgpa: '8.45'
        }
      } else {
        // Check registered students
        const registrationData = localStorage.getItem('studentRegistration')
        if (registrationData) {
          try {
            const regData = JSON.parse(registrationData)
            // Create a simple username from registration data for login
            const regUsername = `${regData.firstName.toLowerCase()}_${regData.lastName.toLowerCase()}`
            const regPassword1 = `${regData.firstName}@123`
            const regPassword2 = `${regData.firstName}@2024`
            
            if (formData.username.toLowerCase() === regUsername || 
                formData.username.toLowerCase() === regData.idCardNumber.toLowerCase() ||
                formData.username === regData.idCardNumber) {
              if (formData.password === regPassword1 || formData.password === regPassword2) {
                // Registered user found
                studentProfile = {
                  ...regData,
                  rollNumber: regData.idCardNumber,
                  semester: `${new Date().getFullYear() - parseInt(regData.yearOfJoining) + 1}${['st', 'nd', 'rd', 'th'][Math.min(3, new Date().getFullYear() - parseInt(regData.yearOfJoining))]} Year`,
                  cgpa: '8.45'
                }
                user = {
                  username: formData.username,
                  password: formData.password,
                  name: `${regData.firstName} ${regData.lastName}`,
                  email: regData.emailId,
                  department: regData.course.includes('BCA') ? 'BCA' : 
                            regData.course.includes('BCOM') ? 'BCOM' :
                            regData.course.includes('BBA') ? 'BBA' : 'Other',
                  designation: `${new Date().getFullYear() - parseInt(regData.yearOfJoining) + 1}${['st', 'nd', 'rd', 'th'][Math.min(3, new Date().getFullYear() - parseInt(regData.yearOfJoining))]} Year`
                }
              }
            }
          } catch (error) {
            console.error('Error parsing registration data:', error)
          }
        }
      }
      
      if (user && studentProfile) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('studentData', JSON.stringify(studentProfile))
        onLoginSuccess()
      } else {
        setErrors({ general: 'Invalid credentials. Please check your username and password, or contact admin if you\'re a new user.' })
      }
    }, 1500)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Role Selection
        </Button>

        <Card className="shadow-2xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
            {/* College Branding */}
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <School className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white mb-2">Student Portal</h2>
              <p className="text-white/80 text-sm">Academic Access Login</p>
              {studentInfo && (
                <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-white/90 text-sm">Welcome back!</p>
                  <p className="text-white text-sm font-medium">{studentInfo.firstName} {studentInfo.lastName}</p>
                  <p className="text-white/80 text-xs">{studentInfo.course}</p>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Demo Credentials Helper */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="w-full text-blue-700 hover:bg-blue-100"
              >
                <Info className="w-4 h-4 mr-2" />
                {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
              </Button>
              {showDemoCredentials && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="text-xs text-gray-700 mb-2 font-medium">Demo Student Credentials:</p>
                  <div className="space-y-1 text-xs text-gray-600 mb-3">
                    <div><strong>Rahul:</strong> stu2024001 / Student@123</div>
                    <div><strong>Priya:</strong> stu2024002 / Priya@2024</div>
                    <div><strong>Amit:</strong> stu2024003 / Amit@123</div>
                    <div><strong>Sneha:</strong> stu2024004 / Sneha@2024</div>
                    <div><strong>Ravi:</strong> stu2024005 / Ravi@123</div>
                    <div><strong>Ankita:</strong> stu2024006 / Ankita@2024</div>
                    <div><strong>Test:</strong> test_student / Test@123</div>
                    <div><strong>Demo:</strong> demo_student / Demo@123</div>
                  </div>
                  {studentInfo && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-blue-700 mb-1 font-medium">Your Registered Account:</p>
                      <div className="space-y-1 text-xs text-blue-600">
                        <div><strong>Username:</strong> {studentInfo.firstName.toLowerCase()}_{studentInfo.lastName.toLowerCase()}</div>
                        <div><strong>Or ID:</strong> {studentInfo.idCardNumber}</div>
                        <div><strong>Password:</strong> {studentInfo.firstName}@123 or {studentInfo.firstName}@2024</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error Message */}
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}
              
              {/* Student ID Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Student ID
                </label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter your student ID"
                  className={`h-12 ${errors.username ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`h-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
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

              {/* Captcha Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Security Verification
                </label>
                
                {/* Captcha Display */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
                    <div className="relative">
                      <span className="text-xl font-mono font-bold text-gray-700 tracking-wider transform rotate-1">
                        {captchaCode}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -rotate-12"></div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateCaptcha}
                    className="p-3 h-12"
                    disabled={isLoading}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Captcha Input */}
                <Input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => {
                    setCaptchaInput(e.target.value)
                    if (errors.captcha) {
                      setErrors(prev => ({ ...prev, captcha: '' }))
                    }
                  }}
                  placeholder="Enter the code above"
                  className={`h-12 ${errors.captcha ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  maxLength={5}
                />
                {errors.captcha && (
                  <p className="text-sm text-red-600">{errors.captcha}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Additional Options */}
              <div className="text-center space-y-3">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  onClick={() => alert('Please contact IT Administrator for password reset.\\n\\nEmail: admin@college.edu\\nPhone: +91-xxx-xxx-xxxx')}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>
            </form>

            {/* Register Link */}
            {onRegister && (
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
                <button
                  type="button"
                  onClick={onRegister}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                  disabled={isLoading}
                >
                  Register as New Student
                </button>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Secure student portal access
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