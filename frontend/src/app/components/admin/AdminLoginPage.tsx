import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react'

interface AdminLoginPageProps { onBack: () => void; onLoginSuccess: () => void }

export function AdminLoginPage({ onBack, onLoginSuccess }: AdminLoginPageProps) {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[k:string]:string}>({})

  const validateForm = () => {
    const e: {[k:string]:string} = {}
    if (!formData.username.trim()) e.username = 'Admin ID is required'
    if (!formData.password) e.password = 'Password is required'
    else if (formData.password.length < 6) e.password = 'Min 6 characters'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault(); if (!validateForm()) return; setIsLoading(true)
    setTimeout(() => { setIsLoading(false); if (formData.username.trim() && formData.password.length >= 6) { onLoginSuccess() } else { setErrors({ general: 'Invalid credentials.' }) } }, 1000)
  }

  const onChange = (f: string, v: string) => { setFormData(p => ({ ...p, [f]: v })); if (errors[f]) setErrors(p => ({ ...p, [f]: '' })); if (errors.general) setErrors(p => ({ ...p, general: '' })) }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-violet-100/40 blur-3xl pointer-events-none" />
      <motion.div className="w-full max-w-md relative z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <motion.button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors" whileHover={{ x: -3 }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.button>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"><svg width="100%" height="100%"><defs><pattern id="d" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#d)"/></svg></div>
            <motion.div className="relative mx-auto w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-bold text-white mb-1">Administrator</h2>
            <p className="text-sm text-indigo-200">System Administration Portal</p>
          </div>
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.general && <div className="p-3 bg-red-50 border border-red-200 rounded-xl"><p className="text-sm text-red-600">{errors.general}</p></div>}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-600">Admin ID / Email</label>
                <Input type="text" value={formData.username} onChange={e => onChange('username', e.target.value)} placeholder="Enter admin ID" className={`h-11 bg-slate-50 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl ${errors.username ? 'border-red-400' : ''}`} disabled={isLoading} />
                {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-600">Password</label>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => onChange('password', e.target.value)} placeholder="Enter password" className={`h-11 pr-11 bg-slate-50 border-slate-200 focus:border-indigo-400 rounded-xl ${errors.password ? 'border-red-400' : ''}`} disabled={isLoading} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button type="submit" className="w-full h-11 bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 rounded-xl font-semibold shadow-lg shadow-indigo-500/25" disabled={isLoading}>
                  {isLoading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing In...</div> : 'Sign In'}
                </Button>
              </motion.div>
              <div className="text-center"><button type="button" className="text-xs text-slate-400 hover:text-indigo-600 hover:underline transition-colors" onClick={() => alert('Contact System Administrator.')} disabled={isLoading}>Forgot Password?</button></div>
            </form>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">© {new Date().getFullYear()} Edu-Sync · Secure admin access</p>
      </motion.div>
    </div>
  )
}
