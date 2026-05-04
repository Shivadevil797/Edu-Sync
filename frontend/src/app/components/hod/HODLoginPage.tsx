import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Users } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'

const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

interface HODLoginPageProps { onBack: () => void; onLoginSuccess: () => void; onRegister?: () => void }

export function HODLoginPage({ onBack, onLoginSuccess }: HODLoginPageProps) {
  const [formData, setFormData] = useState({ userId: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[k:string]:string}>({})
  const [captchaOk, setCaptchaOk] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const onCaptcha = useCallback((t: string | null) => { setCaptchaOk(!!t); if (errors.captcha) setErrors(p => ({ ...p, captcha: '' })) }, [errors.captcha])
  const validate = () => { const e: {[k:string]:string} = {}; if (!formData.userId.trim()) e.userId = 'User ID required'; if (!formData.password) e.password = 'Password required'; else if (formData.password.length < 6) e.password = 'Min 6 characters'; if (!captchaOk) e.captcha = 'Complete the CAPTCHA'; setErrors(e); return Object.keys(e).length === 0 }
  const handleSubmit = async (ev: React.FormEvent) => { ev.preventDefault(); if (!validate()) return; setIsLoading(true); setTimeout(() => { setIsLoading(false); if (formData.userId.trim() && formData.password.length >= 6) { localStorage.setItem('currentUser', JSON.stringify({ username: formData.userId, name: 'HOD User', role: 'hod' })); onLoginSuccess() } else { setErrors({ general: 'Invalid credentials.' }); recaptchaRef.current?.reset(); setCaptchaOk(false) } }, 1200) }
  const onChange = (f: string, v: string) => { setFormData(p => ({ ...p, [f]: v })); if (errors[f]) setErrors(p => ({ ...p, [f]: '' })); if (errors.general) setErrors(p => ({ ...p, general: '' })) }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-100/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-3xl pointer-events-none" />
      <motion.div className="w-full max-w-md relative z-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 mb-6 transition-colors" whileHover={{ x: -3 }}><ArrowLeft className="w-4 h-4" /> Back</motion.button>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"><svg width="100%" height="100%"><defs><pattern id="dh" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#dh)"/></svg></div>
            <motion.div className="relative mx-auto w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}><Users className="w-8 h-8 text-white" /></motion.div>
            <h2 className="text-xl font-bold text-white mb-1">Head of Department</h2>
            <p className="text-sm text-violet-200">Department Management Login</p>
          </div>
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.general && <div className="p-3 bg-red-50 border border-red-200 rounded-xl"><p className="text-sm text-red-600">{errors.general}</p></div>}
              <div className="space-y-1.5"><label className="text-sm font-medium text-slate-600">User ID</label><Input type="text" value={formData.userId} onChange={e => onChange('userId', e.target.value)} placeholder="Enter user ID" className={`h-11 bg-slate-50 border-slate-200 focus:border-violet-400 rounded-xl ${errors.userId ? 'border-red-400' : ''}`} disabled={isLoading} />{errors.userId && <p className="text-xs text-red-500">{errors.userId}</p>}</div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-slate-600">Password</label><div className="relative"><Input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => onChange('password', e.target.value)} placeholder="Enter password" className={`h-11 pr-11 bg-slate-50 border-slate-200 focus:border-violet-400 rounded-xl ${errors.password ? 'border-red-400' : ''}`} disabled={isLoading} /><button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>{errors.password && <p className="text-xs text-red-500">{errors.password}</p>}</div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-slate-600">Security Verification</label><div className="flex justify-center"><ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onCaptcha} theme="light" size="normal" /></div>{errors.captcha && <p className="text-xs text-red-500 text-center">{errors.captcha}</p>}</div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}><Button type="submit" className="w-full h-11 bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:from-violet-700 hover:to-purple-600 rounded-xl font-semibold shadow-lg shadow-violet-500/25" disabled={isLoading}>{isLoading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing In...</div> : 'Sign In'}</Button></motion.div>
              <div className="text-center"><button type="button" className="text-xs text-slate-400 hover:text-violet-600 hover:underline" onClick={() => alert('Contact System Administrator.')} disabled={isLoading}>Forgot Password?</button></div>
            </form>
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">© {new Date().getFullYear()} Edu-Sync · Secure portal</p>
      </motion.div>
    </div>
  )
}