import { useState } from 'react'
import { RoleSelection } from "@/components/common/RoleSelection"
import { CredentialPreviewPage } from "@/components/common/CredentialPreviewPage"
import { AdminLoginPage } from "@/components/admin/AdminLoginPage"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { LoginPage } from "@/components/common/LoginPage"
import { HODLoginPage } from "@/components/hod/HODLoginPage"
import { FacultyLoginPage } from "@/components/faculty/FacultyLoginPage"
import { FacultyRegistrationPage } from "@/components/faculty/FacultyRegistrationPage"
import { HODMainDashboard } from "@/components/hod/HODMainDashboard"
import { FacultyDashboard } from "@/components/faculty/FacultyDashboard"
import { PrincipalDashboard } from "@/components/principal/PrincipalDashboard"
import { DepartmentsPage } from "@/components/department/DepartmentsPage"
import { DepartmentDetailPage } from "@/components/department/DepartmentDetailPage"
import { StudentLoginPage } from "@/components/student/StudentLoginPage"
import { StudentDashboard } from "@/components/student/StudentDashboard"
import { StudentDetailPage } from "@/components/student/StudentDetailPage"
import { StudentSyllabusPage } from "@/components/student/StudentSyllabusPage"
import { StudentTimetablePage } from "@/components/student/StudentTimetablePage"
import { UnifiedTimetable } from "@/components/common/UnifiedTimetable"
import { FacultyListPage } from "@/components/faculty/FacultyListPage"
import { motion, AnimatePresence } from 'motion/react'
import { Wifi, Battery, Signal } from 'lucide-react'

type Screen = 'role-selection' | 'admin-creds' | 'admin-login' | 'admin-dashboard' | 'admin-faculty-list' | 'principal-creds' | 'hod-creds' | 'faculty-creds' | 'login' | 'hod-login' | 'faculty-login' | 'faculty-registration' | 'student-login' | 'student-dashboard' | 'student-details' | 'student-syllabus' | 'student-academic-timetable' | 'student-exam-timetable' | 'hod-main-dashboard' | 'faculty-dashboard' | 'principal-dashboard' | 'principal-student-affairs' | 'principal-faculty-management' | 'departments' | 'department-detail' | 'timetable'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('role-selection')
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)
  const [invalidRoleName, setInvalidRoleName] = useState<string>('')
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'principal' | 'hod' | 'faculty' | 'student'>('admin')
  const [selectedDepartmentData, setSelectedDepartmentData] = useState<any>(null)

  // Page transition variants
  const pageTransitions = {
    // Slide transitions for navigation flows
    slideRight: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100%', opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    slideLeft: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100%', opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    slideUp: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100%', opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    slideDown: {
      initial: { y: '-100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    // Scale transitions for modal-like pages
    scaleIn: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
      transition: { type: 'spring', stiffness: 400, damping: 25 }
    },
    // Fade transitions for subtle changes
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    // Rotation transition for special pages
    rotateIn: {
      initial: { rotate: -10, scale: 0.9, opacity: 0 },
      animate: { rotate: 0, scale: 1, opacity: 1 },
      exit: { rotate: 10, scale: 0.9, opacity: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    // Bounce transition for success/error pages
    bounce: {
      initial: { y: 100, scale: 0.6, opacity: 0 },
      animate: { y: 0, scale: 1, opacity: 1 },
      exit: { y: -100, scale: 0.6, opacity: 0 },
      transition: { type: 'spring', stiffness: 400, damping: 15 }
    }
  }

  // Get transition based on screen type
  const getTransition = (screen: Screen) => {
    const dashboardScreens = ['admin-dashboard', 'principal-dashboard', 'hod-main-dashboard', 'faculty-dashboard', 'student-dashboard']
    const loginScreens = ['admin-login', 'login', 'hod-login', 'faculty-login', 'student-login']
    const credScreens = ['admin-creds', 'principal-creds', 'hod-creds', 'faculty-creds']
    const registrationScreens = ['faculty-registration']
    const managementScreens = ['departments', 'department-detail', 'admin-faculty-list', 'principal-student-affairs', 'principal-faculty-management']
    const studentScreens = ['student-details', 'student-syllabus', 'student-academic-timetable', 'student-exam-timetable']

    if (screen === 'role-selection') return pageTransitions.scaleIn
    if (credScreens.includes(screen)) return pageTransitions.fade
    if (dashboardScreens.includes(screen)) return pageTransitions.slideRight
    if (loginScreens.includes(screen)) return pageTransitions.slideUp
    if (registrationScreens.includes(screen)) return pageTransitions.slideDown
    if (managementScreens.includes(screen)) return pageTransitions.slideLeft
    if (studentScreens.includes(screen)) return pageTransitions.slideRight

    return pageTransitions.fade // default
  }

  const handleRoleSelect = (role: string) => {
    if (role === 'admin') {
      setCurrentScreen('admin-creds')
    } else if (role === 'hod') {
      setCurrentScreen('hod-creds')
    } else if (role === 'principal') {
      setCurrentScreen('principal-creds')
    } else if (role === 'faculty') {
      setCurrentScreen('faculty-creds')
    } else if (role === 'student') {
      setCurrentScreen('student-login')
    }
  }

  const handleAdminLoginSuccess = () => {
    setCurrentUserRole('admin')
    setCurrentScreen('admin-dashboard')
  }

  const handleLoginSuccess = () => {
    setCurrentUserRole('principal')
    setCurrentScreen('principal-dashboard')
  }

  const handleHODLoginSuccess = () => {
    setCurrentUserRole('hod')
    setCurrentScreen('hod-main-dashboard')
  }

  const handleFacultyLoginSuccess = () => {
    setCurrentUserRole('faculty')
    setCurrentScreen('faculty-dashboard')
  }

  const handleFacultyRegistrationSuccess = () => {
    setCurrentScreen('faculty-login')
  }

  const handleFacultyNewUser = () => {
    setCurrentScreen('faculty-registration')
  }

  const handleStudentLoginSuccess = () => {
    setCurrentUserRole('student')
    setCurrentScreen('student-dashboard')
  }

  const handleStudentNavigation = (page: string) => {
    if (page === 'details') {
      setCurrentScreen('student-details')
    } else if (page === 'syllabus') {
      setCurrentScreen('student-syllabus')
    } else if (page === 'academic-timetable') {
      setCurrentScreen('student-academic-timetable')
    } else if (page === 'exam-timetable') {
      setCurrentScreen('student-exam-timetable')
    }
  }

  const handleNavigation = (page: string) => {
    if (page === 'departments') {
      setCurrentScreen('departments')
    } else if (page === 'timetable') {
      setCurrentScreen('timetable')
    } else if (page === 'student-affairs') {
      setCurrentScreen('principal-student-affairs')
    } else if (page === 'faculty-management') {
      setCurrentScreen('principal-faculty-management')
    }
  }

  const handleDepartmentClick = (department: any) => {
    setSelectedDepartmentData(department)
    setCurrentScreen('department-detail')
  }

  const handleAdminNavigation = (page: string) => {
    if (page === 'faculty') {
      setCurrentScreen('admin-faculty-list')
    }
  }

  const handleBack = () => {
    if (currentScreen === 'departments' || currentScreen === 'timetable' || currentScreen === 'principal-student-affairs' || currentScreen === 'principal-faculty-management') {
      setCurrentScreen('principal-dashboard')
    } else if (currentScreen === 'department-detail') {
      setCurrentScreen('departments')
    } else if (currentScreen === 'admin-faculty-list') {
      setCurrentScreen('admin-dashboard')
    } else if (currentScreen === 'student-details' || currentScreen === 'student-syllabus' || currentScreen === 'student-academic-timetable' || currentScreen === 'student-exam-timetable') {
      setCurrentScreen('student-dashboard')
    } else if (currentScreen === 'admin-login') {
      setCurrentScreen('admin-creds')
    } else if (currentScreen === 'login') {
      setCurrentScreen('principal-creds')
    } else if (currentScreen === 'hod-login') {
      setCurrentScreen('hod-creds')
    } else if (currentScreen === 'faculty-login' || currentScreen === 'faculty-registration') {
      setCurrentScreen('faculty-creds')
    } else if (currentScreen === 'admin-creds' || currentScreen === 'principal-creds' || currentScreen === 'hod-creds' || currentScreen === 'faculty-creds' || currentScreen === 'student-login') {
      setCurrentScreen('role-selection')
    } else {
      setCurrentScreen('role-selection')
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'role-selection':
        return <RoleSelection onRoleSelect={handleRoleSelect} />
      case 'admin-creds':
        return <CredentialPreviewPage role="admin" onBack={handleBack} onContinue={() => setCurrentScreen('admin-login')} />
      case 'admin-login':
        return <AdminLoginPage onBack={handleBack} onLoginSuccess={handleAdminLoginSuccess} />
      case 'admin-dashboard':
        return <AdminDashboard onBack={handleBack} onNavigate={handleAdminNavigation} />
      case 'admin-faculty-list':
        return <FacultyListPage onBack={handleBack} />
      case 'principal-creds':
        return <CredentialPreviewPage role="principal" onBack={handleBack} onContinue={() => setCurrentScreen('login')} />
      case 'hod-creds':
        return <CredentialPreviewPage role="hod" onBack={handleBack} onContinue={() => setCurrentScreen('hod-login')} />
      case 'faculty-creds':
        return <CredentialPreviewPage role="faculty" onBack={handleBack} onContinue={() => setCurrentScreen('faculty-login')} />
      case 'login':
        return <LoginPage onBack={handleBack} onLoginSuccess={handleLoginSuccess} />
      case 'hod-login':
        return <HODLoginPage onBack={handleBack} onLoginSuccess={handleHODLoginSuccess} />
      case 'faculty-registration':
        return <FacultyRegistrationPage onBack={handleBack} onRegistrationSuccess={handleFacultyRegistrationSuccess} />
      case 'faculty-login':
        return <FacultyLoginPage onBack={handleBack} onLoginSuccess={handleFacultyLoginSuccess} onNewUser={handleFacultyNewUser} />
      case 'student-login':
        return <StudentLoginPage onBack={handleBack} onLoginSuccess={handleStudentLoginSuccess} />
      case 'student-dashboard':
        return <StudentDashboard onBack={handleBack} onNavigate={handleStudentNavigation} />
      case 'student-details':
        return <StudentDetailPage onBack={handleBack} />
      case 'student-syllabus':
        return <StudentSyllabusPage onBack={handleBack} />
      case 'student-academic-timetable':
        return <StudentTimetablePage onBack={handleBack} type="academic" />
      case 'student-exam-timetable':
        return <StudentTimetablePage onBack={handleBack} type="exam" />
      case 'hod-main-dashboard':
        return <HODMainDashboard onBack={handleBack} />
      case 'faculty-dashboard':
        return <FacultyDashboard onBack={handleBack} />
      case 'principal-dashboard':
        return <PrincipalDashboard onBack={handleBack} onNavigate={handleNavigation} />
      case 'principal-student-affairs':
        return <AdminDashboard onBack={handleBack} onNavigate={() => {}} />
      case 'principal-faculty-management':
        return <FacultyListPage onBack={handleBack} />
      case 'departments':
        return <DepartmentsPage onBack={handleBack} onDepartmentClick={handleDepartmentClick} />
      case 'department-detail':
        return selectedDepartmentData ? <DepartmentDetailPage onBack={handleBack} department={selectedDepartmentData} /> : <DepartmentsPage onBack={handleBack} onDepartmentClick={handleDepartmentClick} />
      case 'timetable':
        return <UnifiedTimetable onBack={handleBack} userRole={currentUserRole} />
      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Mobile Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">9:41 AM</span>
        </div>
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span className="text-sm">100%</span>
        </div>
      </div>

      {/* Main Content with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          {...getTransition(currentScreen)}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}