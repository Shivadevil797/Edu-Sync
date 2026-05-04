import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { GraduationCap, Shield, Users, BookOpen, Building2, ArrowRight, BarChart3, Clock, FileText, ChevronDown, Sparkles, Zap, Globe } from 'lucide-react'

interface RoleSelectionProps { onRoleSelect: (role: string) => void }

const features = [
  { icon: BookOpen, title: 'Academic Management', desc: 'Centralized course management, syllabus tracking, and exam scheduling.', gradient: 'from-blue-500 to-cyan-400' },
  { icon: Users, title: 'Faculty Portal', desc: 'Streamlined leave management, timetable coordination, and oversight.', gradient: 'from-violet-500 to-purple-400' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Track student progress, attendance, and departmental performance.', gradient: 'from-emerald-500 to-teal-400' },
  { icon: Clock, title: 'Smart Timetables', desc: 'Intelligent scheduling respecting workload and room availability.', gradient: 'from-amber-500 to-orange-400' },
  { icon: FileText, title: 'Records & Reports', desc: 'Comprehensive student records with CSV/Excel export.', gradient: 'from-rose-500 to-pink-400' },
  { icon: Globe, title: 'Multi-Department', desc: 'Unified platform for BCA, BCOM, BBA — each with tailored workflows.', gradient: 'from-indigo-500 to-blue-400' },
]

const roles = [
  { id: 'admin', title: 'Administrator', desc: 'Full system access & institutional management', icon: Shield, gradient: 'from-indigo-600 to-violet-600', shadow: 'shadow-indigo-500/25' },
  { id: 'principal', title: 'Principal', desc: 'Academic oversight & approval authority', icon: Building2, gradient: 'from-blue-600 to-cyan-500', shadow: 'shadow-blue-500/25' },
  { id: 'hod', title: 'Head of Dept', desc: 'Department management & faculty coordination', icon: Users, gradient: 'from-violet-600 to-purple-500', shadow: 'shadow-violet-500/25' },
  { id: 'faculty', title: 'Faculty', desc: 'Teaching portal, schedules & leave management', icon: BookOpen, gradient: 'from-emerald-600 to-teal-500', shadow: 'shadow-emerald-500/25' },
  { id: 'student', title: 'Student', desc: 'Academic resources, grades & campus services', icon: GraduationCap, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/25' },
]

// Floating orbs for hero background
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { size: 600, x: '-10%', y: '-20%', color: 'rgba(79,70,229,0.15)', delay: 0, dur: 20 },
        { size: 500, x: '60%', y: '-10%', color: 'rgba(124,58,237,0.12)', delay: 2, dur: 25 },
        { size: 400, x: '80%', y: '50%', color: 'rgba(59,130,246,0.1)', delay: 4, dur: 18 },
        { size: 350, x: '-5%', y: '60%', color: 'rgba(6,182,212,0.08)', delay: 1, dur: 22 },
        { size: 200, x: '40%', y: '70%', color: 'rgba(245,158,11,0.1)', delay: 3, dur: 15 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: `radial-gradient(circle, ${orb.color}, transparent 70%)` }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Animated grid pattern
function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
    </div>
  )
}

// Animated text reveal
function AnimatedTitle({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Badge with shimmer
function ShimmerBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100"
    >
      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
      <span className="text-xs font-medium text-indigo-600 tracking-wide">{children}</span>
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="animate-shimmer w-full h-full" />
      </div>
    </motion.div>
  )
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])

  // Auto-cycle features
  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % features.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <FloatingOrbs />
        <GridPattern />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <ShimmerBadge>College Management Platform</ShimmerBadge>

          {/* Main title with letter animation */}
          <div className="mt-8 mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none">
              <AnimatedTitle text="Edu-Sync" className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 bg-clip-text text-transparent" />
            </h1>
          </div>

          {/* Animated subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-3 font-medium"
          >
            The all-in-one platform for modern campuses.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto mb-10"
          >
            Streamlining academics, administration, and campus operations — from attendance to annual reports.
          </motion.p>

          {/* CTA buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => document.getElementById('role-selection')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-semibold text-sm overflow-hidden"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(79,70,229,0.35)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <motion.a
              href="#features"
              className="flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-semibold text-sm hover:border-indigo-300 hover:text-indigo-600 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-4 h-4" />
              Explore Features
            </motion.a>
          </motion.div>

          {/* Floating stats pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-3"
          >
            {[
              { label: '5 Portals', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
              { label: 'All Devices', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
              { label: 'Real-time', color: 'bg-amber-50 text-amber-600 border-amber-100' },
              { label: 'Secure', color: 'bg-rose-50 text-rose-600 border-rose-100' },
            ].map((pill, i) => (
              <motion.span
                key={pill.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border ${pill.color}`}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-300 hover:text-indigo-500 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </motion.section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Powerful Features</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Everything your campus needs</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-lg">Built for modern education — from daily attendance to annual reports.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onHoverStart={() => setActiveFeature(i)}
                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-default"
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />
                
                <div className="relative">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <f.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-base">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>

                {/* Active indicator */}
                <AnimatePresence>
                  {activeFeature === i && (
                    <motion.div
                      layoutId="featureHighlight"
                      className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r ${f.gradient}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%"><defs><pattern id="dotgrid" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#dotgrid)"/></svg>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Designed for academic excellence</h2>
            <p className="text-indigo-200 max-w-xl mx-auto">Bridging the gap between administration and academics with a unified interface tailored to every role.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: '5', label: 'Dedicated Portals', sub: 'Admin · Principal · HOD · Faculty · Student' },
              { val: '100%', label: 'Responsive', sub: 'iPhone SE to 4K displays' },
              { val: '24/7', label: 'Access', sub: 'Anywhere, anytime' },
              { val: '∞', label: 'Scalable', sub: 'Grow without limits' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors"
              >
                <motion.div className="text-3xl sm:text-4xl font-extrabold text-white mb-2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, delay: 0.3 + i * 0.1 }}>
                  {s.val}
                </motion.div>
                <div className="font-semibold text-white/90 text-sm mb-1">{s.label}</div>
                <div className="text-xs text-indigo-200/70">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROLE SELECTION ─── */}
      <section id="role-selection" className="py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 mb-6">
              <GraduationCap className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider">Get Started</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Select your role</h2>
            <p className="text-slate-500 text-lg">Choose your portal to access your personalized dashboard.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role, i) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onRoleSelect(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`group relative p-6 rounded-2xl bg-white border text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${
                  hoveredRole === role.id ? `border-transparent shadow-2xl ${role.shadow}` : 'border-slate-100 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${role.gradient} transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredRole === role.id ? 0.05 : 0 }}
                />

                <div className="relative">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 shadow-lg ${role.shadow}`}
                    animate={hoveredRole === role.id ? { rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <role.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-slate-900 mb-1 text-lg">{role.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{role.desc}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-violet-600 transition-colors">
                    Sign in
                    <motion.div animate={hoveredRole === role.id ? { x: [0, 4, 0] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 sm:px-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">Edu-Sync</span>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Edu-Sync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}