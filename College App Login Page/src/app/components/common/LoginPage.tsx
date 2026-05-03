import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, EyeOff, Shield, RefreshCw, User, Lock, School, CheckCircle, Info } from 'lucide-react'
import { validateCredentials, getCredentialsHelp } from '@/components/credentials'

interface LoginPageProps {
  onBack: () => void
  onLoginSuccess: () => void
}

export function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha())
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoCredentials, setShowDemoCredentials] = useState(false)

  function generateCaptcha(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha())
    setCaptchaInput('')
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.userId.trim()) {
      newErrors.userId = 'User ID is required'
    } else if (formData.userId.length < 3) {
      newErrors.userId = 'User ID must be at least 3 characters'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!captchaInput.trim()) {
      newErrors.captcha = 'Please enter the captcha'
    } else if (captchaInput.toUpperCase() !== captchaCode) {
      newErrors.captcha = 'Captcha does not match'
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
      
      // Check credentials using centralized validation
      const user = validateCredentials(formData.userId, formData.password, 'principal')
      if (user) {
        // Store user info in localStorage for demo purposes
        localStorage.setItem('currentUser', JSON.stringify(user))
        onLoginSuccess()
      } else {
        setErrors({ general: 'Invalid user ID or password' })
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-white">Admin Login</h1>
            <p className="text-sm text-white/80">Principal Dashboard Access</p>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Secure Login
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* College Branding */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <School className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-white mb-2">Principal Access</h2>
            <p className="text-white/80 text-sm">Management System Login</p>
          </div>

          {/* Demo Credentials Helper */}
          <Card className="bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
            <CardContent className="p-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                className="w-full text-white hover:bg-white/20"
              >
                <Info className="w-4 h-4 mr-2" />
                {showDemoCredentials ? 'Hide' : 'Show'} Demo Credentials
              </Button>
              {showDemoCredentials && (
                <div className="mt-3 p-3 bg-white/90 rounded-lg">
                  <p className="text-xs text-gray-700 mb-2 font-medium">Demo Credentials:</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div><strong>Username:</strong> principal01</div>
                    <div><strong>Password:</strong> Principal@123</div>
                    <div className="border-t pt-1 mt-2">
                      <div><strong>Alt Login:</strong> admin / Admin@2024</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-center text-gray-900">
                Welcome Back
              </CardTitle>
              <p className="text-center text-sm text-gray-600">
                Please sign in to access the dashboard
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* General Error */}
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 text-center">{errors.general}</p>
                  </div>
                )}

                {/* User ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-gray-700">
                    User ID
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="userId"
                      type="text"
                      placeholder="Enter your user ID"
                      value={formData.userId}
                      onChange={(e) => handleInputChange('userId', e.target.value)}
                      className={`pl-10 ${errors.userId ? 'border-red-300 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.userId && (
                    <p className="text-sm text-red-600">{errors.userId}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
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
                </div>

                {/* Captcha */}
                <div className="space-y-2">
                  <Label htmlFor="captcha" className="text-gray-700">
                    Security Verification
                  </Label>
                  
                  {/* Captcha Display */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 select-none">
                      <div className="text-center">
                        <div className="text-2xl font-mono tracking-widest text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                          {captchaCode}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Enter the code above</div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={refreshCaptcha}
                      className="p-3"
                      disabled={isLoading}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Captcha Input */}
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="captcha"
                      type="text"
                      placeholder="Enter captcha code"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value.toUpperCase())
                        if (errors.captcha) {
                          setErrors(prev => ({ ...prev, captcha: '' }))
                        }
                      }}
                      className={`pl-10 font-mono tracking-widest ${errors.captcha ? 'border-red-300 focus:border-red-500' : ''}`}
                      maxLength={6}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.captcha && (
                    <p className="text-sm text-red-600">{errors.captcha}</p>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Sign In
                    </div>
                  )}
                </Button>

                {/* Forgot Password Link */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    onClick={() => alert('Please contact IT Administrator for password reset.\n\nEmail: admin@college.edu\nPhone: +91-xxx-xxx-xxxx')}
                    disabled={isLoading}
                  >
                    Forgot Password?
                  </button>
                </div>



              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              Protected by advanced security measures
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-white/40 text-xs">
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