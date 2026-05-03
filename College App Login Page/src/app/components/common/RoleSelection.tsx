import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { HelpCircle, Bot, Send, X } from 'lucide-react'

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const [showHelpAssistant, setShowHelpAssistant] = useState(false)
  const [helpMessages, setHelpMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m here to help you navigate the college management system. How can I assist you today?' }
  ])
  const [helpInput, setHelpInput] = useState('')

  const handleHelpMessage = () => {
    if (!helpInput.trim()) return
    
    const userMessage = helpInput.trim()
    setHelpMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setHelpInput('')
    
    // Simulate AI response based on common questions
    setTimeout(() => {
      let response = ''
      const lowerInput = userMessage.toLowerCase()
      
      if (lowerInput.includes('role') || lowerInput.includes('login') || lowerInput.includes('access')) {
        response = "Great question! Choose your role based on your position:\n\n• Principal: For college administrators and top management\n• HOD: For department heads and coordinators\n• Faculty: For teaching staff and mentors\n• Student: For enrolled students\n\nEach role has different access levels and features."
      } else if (lowerInput.includes('principal')) {
        response = "The Principal role provides complete administrative access including:\n• Department management\n• Faculty oversight\n• Student affairs\n• Committee management\n• Budget approvals\n• Reports and analytics"
      } else if (lowerInput.includes('hod')) {
        response = "HOD (Head of Department) role includes:\n• Department-specific management\n• Faculty coordination\n• Student progress monitoring\n• Course planning\n• Resource allocation"
      } else if (lowerInput.includes('faculty')) {
        response = "Faculty role provides access to:\n• Student management\n• Course materials\n• Attendance tracking\n• Grade management\n• Timetable access"
      } else if (lowerInput.includes('student')) {
        response = "Student role includes:\n• Course enrollment\n• Assignment submissions\n• Grade viewing\n• Timetable access\n• Communication tools"
      } else if (lowerInput.includes('password') || lowerInput.includes('forgot')) {
        response = "For password issues:\n• Contact your system administrator\n• Use the forgot password option if available\n• Ensure you're using the correct user ID format\n• Check if caps lock is enabled"
      } else {
        response = "I can help you with:\n• Role selection guidance\n• Login assistance\n• System navigation\n• Feature explanations\n• Common troubleshooting\n\nWhat specific area would you like help with?"
      }
      
      setHelpMessages(prev => [...prev, { role: 'assistant', content: response }])
    }, 1000)
  }

  const roles = [
    {
      id: 'admin',
      title: 'ADMIN',
      subtitle: 'System Administrator & Account Manager',
      icon: 'A',
      gradient: 'from-red-400 via-orange-400 to-yellow-400'
    },
    {
      id: 'principal',
      title: 'PRINCIPAL',
      subtitle: 'Administrator & Head of Institution',
      icon: 'P',
      gradient: 'from-purple-400 via-pink-400 to-red-400'
    },
    {
      id: 'hod',
      title: 'HOD',
      subtitle: 'Head of Department & Coordinator',
      icon: 'HOD',
      gradient: 'from-yellow-400 via-orange-400 to-pink-400'
    },
    {
      id: 'faculty',
      title: 'FACULTY',
      subtitle: 'Teaching Staff & Mentors',
      icon: 'F',
      gradient: 'from-green-400 via-blue-400 to-purple-400'
    },
    {
      id: 'student',
      title: 'STUDENT',
      subtitle: 'Learners & Campus Members',
      icon: 'S',
      gradient: 'from-pink-400 via-red-400 to-purple-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-gray-800">Select Your Role</h1>
          <p className="text-gray-600">
            Please choose your login role to proceed
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {roles.map((role) => (
            <Button
              key={role.id}
              onClick={() => onRoleSelect(role.id)}
              className={`w-full h-20 p-0 overflow-hidden bg-gradient-to-r ${role.gradient} hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl`}
              variant="ghost"
            >
              <div className="flex items-center justify-between w-full h-full px-6">
                <div className="text-left">
                  <div className="text-gray-800 font-bold text-lg mb-1">
                    {role.title}
                  </div>
                  <div className="text-gray-700 text-sm">
                    {role.subtitle}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                    <span className="font-bold text-gray-800 text-sm">
                      {role.icon}
                    </span>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Help Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          onClick={() => setShowHelpAssistant(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          size="sm"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Help AI Assistant Modal */}
      {showHelpAssistant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
            {/* Help Assistant Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Help Assistant</h3>
                  <p className="text-sm text-gray-600">Get help with role selection and login</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHelpAssistant(false)}
                className="p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Help Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {helpMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Help Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={helpInput}
                  onChange={(e) => setHelpInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleHelpMessage()}
                  placeholder="Ask about roles, login, or system features..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleHelpMessage} disabled={!helpInput.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Quick Help Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHelpInput('What role should I choose?')
                    handleHelpMessage()
                  }}
                  className="text-xs"
                >
                  Role Selection Help
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHelpInput('Principal role features')
                    handleHelpMessage()
                  }}
                  className="text-xs"
                >
                  Principal Features
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHelpInput('Login issues')
                    handleHelpMessage()
                  }}
                  className="text-xs"
                >
                  Login Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}