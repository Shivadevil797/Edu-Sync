import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, GraduationCap, CheckCircle, AlertCircle, User, Mail, Phone, Calendar, Lock } from 'lucide-react'
import { apiRegisterStudent, apiGetDepartments } from '@/services/api'

interface StudentRegistrationPageProps {
  onBack: () => void
  onSuccess: () => void
}

export function StudentRegistrationPage({ onBack, onSuccess }: StudentRegistrationPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    registerNumber: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    department: 'BCA',
    section: 'A',
    yearOfJoining: new Date().getFullYear(),
  })

  const [departments, setDepartments] = useState<{name: string; fullName: string}[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successData, setSuccessData] = useState<{registerNumber: string; username: string} | null>(null)

  useEffect(() => {
    apiGetDepartments()
      .then(data => { if (data.departments?.length) setDepartments(data.departments) })
      .catch(() => setDepartments([
        { name: 'BCA', fullName: 'Bachelor of Computer Applications' },
        { name: 'BBA', fullName: 'Bachelor of Business Administration' },
        { name: 'BCOM', fullName: 'Bachelor of Commerce' },
      ]))
  }, [])

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    if (errors.general) setErrors(prev => ({ ...prev, general: '' }))
  }

  const validateForm = () => {
    const e: {[key: string]: string} = {}
    if (!formData.firstName.trim()) e.firstName = 'First name is required'
    if (!formData.lastName.trim()) e.lastName = 'Last name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phone)) e.phone = 'Enter a valid 10-digit phone number'
    if (!formData.password) e.password = 'Password is required'
    else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!formData.gender) e.gender = 'Please select your gender'
    if (!formData.department) e.department = 'Please select a department'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      const data = await apiRegisterStudent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth || undefined,
        gender: formData.gender || undefined,
        department: formData.department,
        section: formData.section,
        yearOfJoining: formData.yearOfJoining,
      })

      setSuccessData({
        registerNumber: data.student?.registerNumber || 'N/A',
        username: data.user?.username || 'N/A',
      })

      // Auto-redirect after showing success
      setTimeout(() => onSuccess(), 3000)
    } catch (err: any) {
      setErrors({ general: err.message || 'Registration failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen
  if (successData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-12 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
                <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-emerald-100">Welcome to Edu-Sync</p>
            </div>
            <CardContent className="p-8 space-y-4">
              <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Register Number</span>
                  <span className="font-bold text-emerald-700 text-lg">{successData.registerNumber}</span>
                </div>
                <div className="border-t border-emerald-100" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Username</span>
                  <span className="font-semibold text-emerald-700">{successData.username}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">You are being redirected to the dashboard...</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <motion.div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3, ease: 'linear' }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-100/40 blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-orange-100/30 blur-3xl pointer-events-none z-0" />
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <motion.button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 mb-4 transition-colors" whileHover={{ x: -3 }}>
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </motion.button>
          <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-xl shadow-amber-500/20 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%"><defs><pattern id="sr" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#sr)"/></svg>
            </div>
            <CardHeader className="text-center relative">
              <motion.div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-sm" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-white text-xl">Student Registration</CardTitle>
              <p className="text-amber-100 text-sm mt-1">Create your academic account</p>
            </CardHeader>
          </Card>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {errors.general && (
            <motion.div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{errors.general}</p>
            </motion.div>
          )}

          {/* Personal Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-lg border-slate-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><User className="w-4 h-4 text-amber-500" /> Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                    <Input id="firstName" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} placeholder="Enter first name" className={`h-11 rounded-xl ${errors.firstName ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                    <Input id="lastName" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} placeholder="Enter last name" className={`h-11 rounded-xl ${errors.lastName ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="dob"><Calendar className="w-3.5 h-3.5 inline mr-1" />Date of Birth</Label>
                    <Input id="dob" type="date" value={formData.dateOfBirth} onChange={e => handleChange('dateOfBirth', e.target.value)} className="h-11 rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Gender <span className="text-red-500">*</span></Label>
                    <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} className={`w-full h-11 px-3 rounded-xl border bg-white text-sm ${errors.gender ? 'border-red-400' : 'border-slate-200'}`}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-lg border-slate-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><Mail className="w-4 h-4 text-amber-500" /> Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="your@email.com" className={`h-11 rounded-xl ${errors.email ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone"><Phone className="w-3.5 h-3.5 inline mr-1" />Phone <span className="text-red-500">*</span></Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="10-digit number" maxLength={10} className={`h-11 rounded-xl ${errors.phone ? 'border-red-400' : 'border-slate-200'}`} />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="registerNumber">Register Number (Reg No)</Label>
                  <Input id="registerNumber" type="text" value={formData.registerNumber} onChange={e => handleChange('registerNumber', e.target.value)} placeholder="e.g., BCA2026001" className="h-11 rounded-xl border-slate-200" />
                  <p className="text-[10px] text-slate-400">Your university roll/register number. Leave blank to auto-generate.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Academic Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-lg border-slate-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><GraduationCap className="w-4 h-4 text-amber-500" /> Academic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label>Department <span className="text-red-500">*</span></Label>
                    <select value={formData.department} onChange={e => handleChange('department', e.target.value)} className={`w-full h-11 px-3 rounded-xl border bg-white text-sm ${errors.department ? 'border-red-400' : 'border-slate-200'}`}>
                      {departments.length > 0 ? departments.map(d => (
                        <option key={d.name} value={d.name}>{d.name} — {d.fullName}</option>
                      )) : (
                        <>
                          <option value="BCA">BCA</option>
                          <option value="BBA">BBA</option>
                          <option value="BCOM">BCOM</option>
                        </>
                      )}
                    </select>
                    {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Section</Label>
                    <select value={formData.section} onChange={e => handleChange('section', e.target.value)} className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm">
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Year of Joining</Label>
                    <Input type="number" value={formData.yearOfJoining} onChange={e => handleChange('yearOfJoining', parseInt(e.target.value) || new Date().getFullYear())} className="h-11 rounded-xl border-slate-200" min={2020} max={2030} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="shadow-lg border-slate-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><Lock className="w-4 h-4 text-amber-500" /> Set Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => handleChange('password', e.target.value)} placeholder="Min 6 characters" className={`h-11 pr-11 rounded-xl ${errors.password ? 'border-red-400' : 'border-slate-200'}`} />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <Input id="confirmPassword" type={showConfirm ? 'text' : 'password'} value={formData.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} placeholder="Re-enter password" className={`h-11 pr-11 rounded-xl ${errors.confirmPassword ? 'border-red-400' : 'border-slate-200'}`} />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit */}
          <motion.div className="flex gap-3 pb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl" disabled={isSubmitting}>Cancel</Button>
            <motion.div className="flex-1" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/25" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating Account...</div>
                ) : (
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Create Account</div>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
