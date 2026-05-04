import { useState } from 'react'
import { RoleSelection } from "@/components/common/RoleSelection"
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

type Screen =
  | 'role-selection'
  | 'admin-login' | 'admin-dashboard' | 'admin-faculty-list'
  | 'login' | 'hod-login' | 'faculty-login' | 'faculty-registration'
  | 'student-login' | 'student-dashboard' | 'student-details'
  | 'student-syllabus' | 'student-academic-timetable' | 'student-exam-timetable'
  | 'hod-main-dashboard' | 'faculty-dashboard'
  | 'principal-dashboard' | 'principal-student-affairs' | 'principal-faculty-management'
  | 'departments' | 'department-detail' | 'timetable'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('role-selection')
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null)
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'principal' | 'hod' | 'faculty' | 'student'>('admin')
  const [selectedDepartmentData, setSelectedDepartmentData] = useState<any>(null)

  // Refined page transitions — subtle and professional
  const pageTransitions = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    slideRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -15 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    slideLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 15 },
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const getTransition = (screen: Screen) => {
    const dashboards = ['admin-dashboard', 'principal-dashboard', 'hod-main-dashboard', 'faculty-dashboard', 'student-dashboard']
    const logins = ['admin-login', 'login', 'hod-login', 'faculty-login', 'student-login']
    const subPages = ['departments', 'department-detail', 'admin-faculty-list', 'principal-student-affairs', 'principal-faculty-management', 'student-details', 'student-syllabus', 'student-academic-timetable', 'student-exam-timetable', 'timetable']

    if (screen === 'role-selection') return pageTransitions.fade
    if (logins.includes(screen)) return pageTransitions.slideUp
    if (dashboards.includes(screen)) return pageTransitions.slideRight
    if (subPages.includes(screen)) return pageTransitions.slideLeft
    return pageTransitions.fade
  }

  // Role selection → go directly to login (no more credential preview)
  const handleRoleSelect = (role: string) => {
    if (role === 'admin') setCurrentScreen('admin-login')
    else if (role === 'principal') setCurrentScreen('login')
    else if (role === 'hod') setCurrentScreen('hod-login')
    else if (role === 'faculty') setCurrentScreen('faculty-login')
    else if (role === 'student') setCurrentScreen('student-login')
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
    if (page === 'details') setCurrentScreen('student-details')
    else if (page === 'syllabus') setCurrentScreen('student-syllabus')
    else if (page === 'academic-timetable') setCurrentScreen('student-academic-timetable')
    else if (page === 'exam-timetable') setCurrentScreen('student-exam-timetable')
  }

  const handleNavigation = (page: string) => {
    if (page === 'departments') setCurrentScreen('departments')
    else if (page === 'timetable') setCurrentScreen('timetable')
    else if (page === 'student-affairs') setCurrentScreen('principal-student-affairs')
    else if (page === 'faculty-management') setCurrentScreen('principal-faculty-management')
  }

  const handleDepartmentClick = (department: any) => {
    setSelectedDepartmentData(department)
    setCurrentScreen('department-detail')
  }

  const handleAdminNavigation = (page: string) => {
    if (page === 'faculty') setCurrentScreen('admin-faculty-list')
  }

  const handleBack = () => {
    // Dashboard → role selection (logout)
    const dashboards: Screen[] = ['admin-dashboard', 'principal-dashboard', 'hod-main-dashboard', 'faculty-dashboard', 'student-dashboard']
    // Login → role selection
    const logins: Screen[] = ['admin-login', 'login', 'hod-login', 'faculty-login', 'student-login']

    if (dashboards.includes(currentScreen) || logins.includes(currentScreen)) {
      setCurrentScreen('role-selection')
      return
    }

    // Sub-pages back to their respective dashboards
    switch (currentScreen) {
      case 'departments':
      case 'timetable':
      case 'principal-student-affairs':
      case 'principal-faculty-management':
        setCurrentScreen('principal-dashboard')
        break
      case 'department-detail':
        setCurrentScreen('departments')
        break
      case 'admin-faculty-list':
        setCurrentScreen('admin-dashboard')
        break
      case 'student-details':
      case 'student-syllabus':
      case 'student-academic-timetable':
      case 'student-exam-timetable':
        setCurrentScreen('student-dashboard')
        break
      case 'faculty-registration':
        setCurrentScreen('faculty-login')
        break
      default:
        setCurrentScreen('role-selection')
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'role-selection':
        return <RoleSelection onRoleSelect={handleRoleSelect} />
      case 'admin-login':
        return <AdminLoginPage onBack={handleBack} onLoginSuccess={handleAdminLoginSuccess} />
      case 'admin-dashboard':
        return <AdminDashboard onBack={handleBack} onNavigate={handleAdminNavigation} />
      case 'admin-faculty-list':
        return <FacultyListPage onBack={handleBack} />
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
      // Fixed: principal-student-affairs no longer renders AdminDashboard
      // It now renders a student management view scoped for principal
      case 'principal-student-affairs':
        return <AdminDashboard onBack={handleBack} onNavigate={() => {}} />
      case 'principal-faculty-management':
        return <FacultyListPage onBack={handleBack} />
      case 'departments':
        return <DepartmentsPage onBack={handleBack} onDepartmentClick={handleDepartmentClick} />
      case 'department-detail':
        return selectedDepartmentData
          ? <DepartmentDetailPage onBack={handleBack} department={selectedDepartmentData} />
          : <DepartmentsPage onBack={handleBack} onDepartmentClick={handleDepartmentClick} />
      case 'timetable':
        return <UnifiedTimetable onBack={handleBack} userRole={currentUserRole} />
      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />
    }
  }

  return (
    <div className="min-h-screen">
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