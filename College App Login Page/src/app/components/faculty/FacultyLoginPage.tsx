import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, RefreshCw, School, Info } from 'lucide-react'
import { validateCredentials } from '@/components/credentials'

interface FacultyLoginPageProps {
  onBack: () => void
  onLoginSuccess: () => void
  onNewUser: () => void
  onRegister?: () => void
}

export function FacultyLoginPage({ onBack, onLoginSuccess, onNewUser, onRegister }: FacultyLoginPageProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaCode, setCaptchaCode] = useState('FAC87')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)
  const [facultyInfo, setFacultyInfo] = useState<any>(null)

  // Load faculty registration info on component mount
  useEffect(() => {
    const registrationData = localStorage.getItem('facultyRegistration')
    if (registrationData) {
      const data = JSON.parse(registrationData)
      setFacultyInfo(data)
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
      newErrors.username = 'Username is required'
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

    // Validate credentials
    setTimeout(() => {
      setIsLoading(false)
      
      const user = validateCredentials(formData.username, formData.password, 'faculty')
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        onLoginSuccess()
      } else {
        setErrors({ general: 'Invalid faculty credentials' })
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
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
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-8">
            {/* College Branding */}
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <School className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white mb-2">Faculty Access</h2>
              <p className="text-white/80 text-sm">Teaching Portal Login</p>
              {facultyInfo && (
                <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-white/90 text-sm">Welcome back!</p>
                  <p className="text-white text-sm font-medium">{facultyInfo.fullName}</p>
                  <p className="text-white/80 text-xs">{facultyInfo.designation}</p>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Demo Credentials Helper */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="w-full text-purple-700 hover:bg-purple-100"
              >
                <Info className="w-4 h-4 mr-2" />
                {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
              </Button>
              {showDemoCredentials && (
                <div className="mt-3 p-3 bg-white rounded border">
                  <p className="text-xs text-gray-700 mb-2 font-medium">Demo Faculty Credentials:</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div><strong>General:</strong> faculty01 / Faculty@123</div>
                    <div><strong>Prof. Deepa:</strong> prof_deepa / Deepa@2024</div>
                    <div><strong>Prof. Vikram:</strong> prof_vikram / Vikram@123</div>
                    <div><strong>Prof. Neha:</strong> prof_neha / Neha@2024</div>
                  </div>
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
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter your username"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-50"></div>
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
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
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
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                  onClick={() => alert('Please contact IT Administrator for password reset.\\n\\nEmail: admin@college.edu\\nPhone: +91-xxx-xxx-xxxx')}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-orange-600 hover:text-orange-800 hover:underline transition-colors font-medium"
                    onClick={onNewUser}
                    disabled={isLoading}
                  >
                    New User
                  </button>
                </div>
                
                <div className="text-xs text-gray-500">
                  Contact HOD for account assistance
                </div>
              </div>
            </form>

            {/* Register Link */}
            {onRegister && (
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Don't have an account?</p>
                <button
                  type="button"
                  onClick={onRegister}
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium transition-colors"
                  disabled={isLoading}
                >
                  Register as New Faculty
                </button>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Secure faculty portal access
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