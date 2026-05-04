import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageWithFallback } from "@/components/figma/ImageWithFallback"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, BookOpen, Users } from 'lucide-react'

interface HODProfileProps {
  onBack: () => void
  departmentData: any
}

export function HODProfile({ onBack, departmentData }: HODProfileProps) {
  const hodDetails = {
    name: departmentData?.hod || 'Dr. Sarah Johnson',
    title: `Head of Department - ${departmentData?.name || 'Computer Science & Engineering'}`,
    email: 'sarah.johnson@college.edu',
    phone: '+1 (555) 123-4567',
    location: 'Engineering Block, Room 301',
    experience: '15 years',
    education: [
      'Ph.D. in Computer Science - MIT (2008)',
      'M.S. in Software Engineering - Stanford (2005)',
      'B.Tech in Computer Science - IIT Delhi (2003)'
    ],
    research: [
      'Artificial Intelligence & Machine Learning',
      'Data Science & Analytics',
      'Cloud Computing & Distributed Systems'
    ],
    achievements: [
      'Best Faculty Award 2023',
      'Research Excellence Award 2022',
      'Outstanding Teaching Award 2021'
    ],
    publications: '45+ Research Papers',
    projects: '12 Active Research Projects'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-gray-900">HOD Profile</h1>
            <p className="text-sm text-gray-600">{departmentData?.shortName} Department</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1670191069225-f992139f6545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRvY3RvciUyMHByb2Zlc3NvcnxlbnwxfHx8fDE3NTcxNzU1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="HOD Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="text-center">
                <h2 className="text-gray-900 mb-1">{hodDetails.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{hodDetails.title}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Active</Badge>
                  <Badge variant="outline">Senior Faculty</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{hodDetails.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{hodDetails.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{hodDetails.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="font-semibold">{hodDetails.publications}</div>
              <div className="text-xs text-gray-600">Publications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="font-semibold">{departmentData?.faculty || 15}</div>
              <div className="text-xs text-gray-600">Faculty Members</div>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hodDetails.education.map((edu, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {edu}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Research Areas */}
        <Card>
          <CardHeader>
            <CardTitle>Research Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hodDetails.research.map((area, index) => (
                <Badge key={index} variant="outline">{area}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hodDetails.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-12 bg-gradient-to-r from-blue-500 to-purple-500">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="h-12">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}