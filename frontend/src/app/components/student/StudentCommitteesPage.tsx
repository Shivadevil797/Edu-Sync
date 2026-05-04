import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Users,
  Search,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  UserPlus,
  Mail,
  Phone,
  Award,
  Star,
  Activity
} from 'lucide-react'

interface StudentCommitteesPageProps {
  onBack: () => void
}

export function StudentCommitteesPage({ onBack }: StudentCommitteesPageProps) {
  const [studentData, setStudentData] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const registrationData = localStorage.getItem('studentRegistration')
    if (registrationData) {
      const data = JSON.parse(registrationData)
      setStudentData(data)
    }
  }, [])

  // All 27 committees as requested
  const allCommittees = [
    {
      id: 1,
      name: 'Student Council',
      category: 'Administrative',
      description: 'Main governing body representing student interests and facilitating communication between students and administration.',
      head: 'Rahul Sharma',
      totalMembers: 25,
      meetingFrequency: 'Weekly',
      meetingDay: 'Monday',
      meetingTime: '4:00 PM',
      venue: 'Conference Hall A',
      status: 'Active',
      established: '2010',
      contact: 'council@college.edu',
      responsibilities: ['Student representation', 'Event coordination', 'Policy feedback', 'Grievance handling'],
      currentProjects: ['Digital Notice Board', 'Student Feedback System', 'Library Enhancement']
    },
    {
      id: 2,
      name: 'Cultural Committee',
      category: 'Cultural',
      description: 'Organizes cultural events, festivals, and artistic activities to promote creativity and cultural awareness.',
      head: 'Priya Singh',
      totalMembers: 30,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Wednesday',
      meetingTime: '5:30 PM',
      venue: 'Auditorium',
      status: 'Active',
      established: '2008',
      contact: 'cultural@college.edu',
      responsibilities: ['Cultural events', 'Festival celebrations', 'Art competitions', 'Performance coordination'],
      currentProjects: ['Annual Cultural Fest', 'Talent Hunt Competition', 'Inter-college Dance Competition']
    },
    {
      id: 3,
      name: 'Technical Committee',
      category: 'Technical',
      description: 'Focuses on technical events, coding competitions, and technology-related workshops and seminars.',
      head: 'Arjun Patel',
      totalMembers: 35,
      meetingFrequency: 'Weekly',
      meetingDay: 'Friday',
      meetingTime: '3:00 PM',
      venue: 'Computer Lab 1',
      status: 'Active',
      established: '2012',
      contact: 'tech@college.edu',
      responsibilities: ['Coding competitions', 'Technical workshops', 'Hackathons', 'Tech seminars'],
      currentProjects: ['Annual Hackathon', 'AI Workshop Series', 'Mobile App Development Contest']
    },
    {
      id: 4,
      name: 'Sports Committee',
      category: 'Sports',
      description: 'Manages sports activities, tournaments, and promotes physical fitness among students.',
      head: 'Vikram Kumar',
      totalMembers: 28,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Tuesday',
      meetingTime: '4:30 PM',
      venue: 'Sports Complex',
      status: 'Active',
      established: '2009',
      contact: 'sports@college.edu',
      responsibilities: ['Sports tournaments', 'Fitness programs', 'Equipment management', 'Inter-college competitions'],
      currentProjects: ['Annual Sports Meet', 'Basketball Championship', 'Fitness Challenge']
    },
    {
      id: 5,
      name: 'Literary Committee',
      category: 'Cultural',
      description: 'Promotes literary activities including debates, poetry, creative writing, and literary competitions.',
      head: 'Anjali Sharma',
      totalMembers: 22,
      meetingFrequency: 'Weekly',
      meetingDay: 'Thursday',
      meetingTime: '2:30 PM',
      venue: 'Library Hall',
      status: 'Active',
      established: '2011',
      contact: 'literary@college.edu',
      responsibilities: ['Literary events', 'Debate competitions', 'Creative writing', 'Book club'],
      currentProjects: ['Poetry Competition', 'Debate Championship', 'Literary Magazine']
    },
    {
      id: 6,
      name: 'Environmental Committee',
      category: 'Social',
      description: 'Promotes environmental awareness and sustainability initiatives within the campus.',
      head: 'Ravi Verma',
      totalMembers: 20,
      meetingFrequency: 'Monthly',
      meetingDay: 'Saturday',
      meetingTime: '10:00 AM',
      venue: 'Botanical Garden',
      status: 'Active',
      established: '2015',
      contact: 'environment@college.edu',
      responsibilities: ['Environmental campaigns', 'Tree plantation', 'Waste management', 'Sustainability projects'],
      currentProjects: ['Campus Green Initiative', 'Plastic-Free Campus', 'Solar Panel Installation']
    },
    {
      id: 7,
      name: 'Photography Committee',
      category: 'Creative',
      description: 'Captures and documents college events, creates visual content, and promotes photography skills.',
      head: 'Sneha Gupta',
      totalMembers: 18,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Sunday',
      meetingTime: '11:00 AM',
      venue: 'Media Room',
      status: 'Active',
      established: '2013',
      contact: 'photo@college.edu',
      responsibilities: ['Event photography', 'Social media content', 'Photo exhibitions', 'Portfolio development'],
      currentProjects: ['Campus Life Documentation', 'Photography Exhibition', 'Workshop Series']
    },
    {
      id: 8,
      name: 'Music Committee',
      category: 'Cultural',
      description: 'Organizes musical events, concerts, and provides platform for musical talent development.',
      head: 'Amit Singh',
      totalMembers: 25,
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesday',
      meetingTime: '6:00 PM',
      venue: 'Music Room',
      status: 'Active',
      established: '2010',
      contact: 'music@college.edu',
      responsibilities: ['Musical events', 'Concerts', 'Band formation', 'Music competitions'],
      currentProjects: ['Annual Music Concert', 'Battle of Bands', 'Classical Music Workshop']
    },
    {
      id: 9,
      name: 'Drama Committee',
      category: 'Cultural',
      description: 'Produces theatrical performances, street plays, and develops acting and directing skills.',
      head: 'Kavya Reddy',
      totalMembers: 20,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Saturday',
      meetingTime: '3:00 PM',
      venue: 'Drama Studio',
      status: 'Active',
      established: '2012',
      contact: 'drama@college.edu',
      responsibilities: ['Theatre productions', 'Street plays', 'Acting workshops', 'Script writing'],
      currentProjects: ['Annual Drama Festival', 'Social Awareness Play', 'Shakespeare Adaptation']
    },
    {
      id: 10,
      name: 'Debate Committee',
      category: 'Academic',
      description: 'Organizes debates, discussions, and develops public speaking and critical thinking skills.',
      head: 'Rohit Jain',
      totalMembers: 24,
      meetingFrequency: 'Weekly',
      meetingDay: 'Tuesday',
      meetingTime: '5:00 PM',
      venue: 'Seminar Hall',
      status: 'Active',
      established: '2009',
      contact: 'debate@college.edu',
      responsibilities: ['Debate competitions', 'Public speaking', 'Discussion forums', 'Model UN'],
      currentProjects: ['Inter-college Debate', 'Model United Nations', 'Public Speaking Workshop']
    },
    {
      id: 11,
      name: 'Community Service Committee',
      category: 'Social',
      description: 'Engages in social service activities and community outreach programs.',
      head: 'Pooja Agarwal',
      totalMembers: 32,
      meetingFrequency: 'Weekly',
      meetingDay: 'Sunday',
      meetingTime: '9:00 AM',
      venue: 'Community Hall',
      status: 'Active',
      established: '2008',
      contact: 'service@college.edu',
      responsibilities: ['Community outreach', 'Social service', 'Charity drives', 'Volunteer coordination'],
      currentProjects: ['Village Adoption Program', 'Old Age Home Visit', 'Blood Donation Drive']
    },
    {
      id: 12,
      name: 'Entrepreneurship Committee',
      category: 'Business',
      description: 'Promotes entrepreneurial skills, startup culture, and business development among students.',
      head: 'Harsh Malhotra',
      totalMembers: 26,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Thursday',
      meetingTime: '4:00 PM',
      venue: 'Innovation Hub',
      status: 'Active',
      established: '2016',
      contact: 'entrepreneur@college.edu',
      responsibilities: ['Startup workshops', 'Business plan competitions', 'Investor meets', 'Mentorship programs'],
      currentProjects: ['Startup Incubation', 'Business Plan Contest', 'Entrepreneur Guest Lectures']
    },
    {
      id: 13,
      name: 'Magazine Committee',
      category: 'Creative',
      description: 'Publishes college magazine, newsletters, and manages written content for various publications.',
      head: 'Divya Kapoor',
      totalMembers: 15,
      meetingFrequency: 'Monthly',
      meetingDay: 'Friday',
      meetingTime: '3:30 PM',
      venue: 'Editorial Office',
      status: 'Active',
      established: '2007',
      contact: 'magazine@college.edu',
      responsibilities: ['Magazine publication', 'Newsletter creation', 'Content writing', 'Editorial work'],
      currentProjects: ['Annual Magazine', 'Monthly Newsletter', 'Digital Publication Platform']
    },
    {
      id: 14,
      name: 'Science Committee',
      category: 'Academic',
      description: 'Organizes science exhibitions, experiments, and promotes scientific research and innovation.',
      head: 'Aditya Sharma',
      totalMembers: 30,
      meetingFrequency: 'Weekly',
      meetingDay: 'Monday',
      meetingTime: '2:00 PM',
      venue: 'Science Laboratory',
      status: 'Active',
      established: '2011',
      contact: 'science@college.edu',
      responsibilities: ['Science exhibitions', 'Research projects', 'Laboratory demonstrations', 'Science fairs'],
      currentProjects: ['Science Exhibition', 'Research Symposium', 'Lab Innovation Challenge']
    },
    {
      id: 15,
      name: 'Dance Committee',
      category: 'Cultural',
      description: 'Organizes dance performances, competitions, and promotes various dance forms and choreography.',
      head: 'Riya Mehta',
      totalMembers: 28,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Saturday',
      meetingTime: '5:00 PM',
      venue: 'Dance Studio',
      status: 'Active',
      established: '2010',
      contact: 'dance@college.edu',
      responsibilities: ['Dance performances', 'Choreography', 'Dance competitions', 'Cultural shows'],
      currentProjects: ['Annual Dance Competition', 'Classical Dance Workshop', 'Street Dance Battle']
    },
    {
      id: 16,
      name: 'Quiz Committee',
      category: 'Academic',
      description: 'Conducts quiz competitions, trivia events, and promotes general knowledge and learning.',
      head: 'Karan Gupta',
      totalMembers: 20,
      meetingFrequency: 'Weekly',
      meetingDay: 'Wednesday',
      meetingTime: '1:00 PM',
      venue: 'Quiz Room',
      status: 'Active',
      established: '2009',
      contact: 'quiz@college.edu',
      responsibilities: ['Quiz competitions', 'Trivia events', 'Knowledge contests', 'Brain teasers'],
      currentProjects: ['Inter-college Quiz', 'Weekly Quiz Sessions', 'Online Quiz Platform']
    },
    {
      id: 17,
      name: 'Art Committee',
      category: 'Creative',
      description: 'Promotes visual arts, painting, sculpture, and organizes art exhibitions and workshops.',
      head: 'Saumya Singh',
      totalMembers: 22,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Sunday',
      meetingTime: '2:00 PM',
      venue: 'Art Studio',
      status: 'Active',
      established: '2008',
      contact: 'art@college.edu',
      responsibilities: ['Art exhibitions', 'Painting workshops', 'Sculpture classes', 'Creative contests'],
      currentProjects: ['Art Exhibition', 'Mural Painting', 'Digital Art Workshop']
    },
    {
      id: 18,
      name: 'Food Committee',
      category: 'Administrative',
      description: 'Manages food quality, canteen operations, and organizes food-related events and festivals.',
      head: 'Manish Kumar',
      totalMembers: 18,
      meetingFrequency: 'Monthly',
      meetingDay: 'Tuesday',
      meetingTime: '12:00 PM',
      venue: 'Canteen',
      status: 'Active',
      established: '2014',
      contact: 'food@college.edu',
      responsibilities: ['Food quality monitoring', 'Menu planning', 'Food festivals', 'Hygiene standards'],
      currentProjects: ['Healthy Food Initiative', 'Regional Food Festival', 'Organic Food Campaign']
    },
    {
      id: 19,
      name: 'Fashion Committee',
      category: 'Creative',
      description: 'Organizes fashion shows, style competitions, and promotes fashion design and modeling.',
      head: 'Ishita Verma',
      totalMembers: 24,
      meetingFrequency: 'Monthly',
      meetingDay: 'Friday',
      meetingTime: '6:30 PM',
      venue: 'Fashion Studio',
      status: 'Active',
      established: '2013',
      contact: 'fashion@college.edu',
      responsibilities: ['Fashion shows', 'Style competitions', 'Design workshops', 'Modeling events'],
      currentProjects: ['Annual Fashion Show', 'Designer Workshop', 'Style Competition']
    },
    {
      id: 20,
      name: 'Finance Committee',
      category: 'Administrative',
      description: 'Manages student activity funds, budgets, and financial planning for various events and committees.',
      head: 'Rajesh Agarwal',
      totalMembers: 12,
      meetingFrequency: 'Monthly',
      meetingDay: 'Thursday',
      meetingTime: '11:00 AM',
      venue: 'Finance Office',
      status: 'Active',
      established: '2010',
      contact: 'finance@college.edu',
      responsibilities: ['Budget management', 'Financial planning', 'Fund allocation', 'Expense tracking'],
      currentProjects: ['Annual Budget Planning', 'Financial Audit', 'Cost Optimization']
    },
    {
      id: 21,
      name: 'Placement Committee',
      category: 'Career',
      description: 'Assists students with career guidance, placement opportunities, and industry connections.',
      head: 'Neha Saxena',
      totalMembers: 16,
      meetingFrequency: 'Bi-weekly',
      meetingDay: 'Monday',
      meetingTime: '10:00 AM',
      venue: 'Placement Cell',
      status: 'Active',
      established: '2012',
      contact: 'placement@college.edu',
      responsibilities: ['Career guidance', 'Company interactions', 'Resume building', 'Interview preparation'],
      currentProjects: ['Campus Placement Drive', 'Industry Interaction', 'Career Counseling Sessions']
    },
    {
      id: 22,
      name: 'International Committee',
      category: 'Academic',
      description: 'Manages international relations, exchange programs, and cultural exchange activities.',
      head: 'Priyanka Joshi',
      totalMembers: 14,
      meetingFrequency: 'Monthly',
      meetingDay: 'Wednesday',
      meetingTime: '9:30 AM',
      venue: 'International Office',
      status: 'Active',
      established: '2017',
      contact: 'international@college.edu',
      responsibilities: ['Exchange programs', 'International events', 'Cultural exchange', 'Foreign collaborations'],
      currentProjects: ['Student Exchange Program', 'International Cultural Night', 'Global Partnership']
    },
    {
      id: 23,
      name: 'Alumni Committee',
      category: 'Administrative',
      description: 'Maintains alumni relations, organizes reunions, and facilitates alumni-student interactions.',
      head: 'Vikash Singh',
      totalMembers: 20,
      meetingFrequency: 'Quarterly',
      meetingDay: 'Saturday',
      meetingTime: '4:00 PM',
      venue: 'Alumni Hall',
      status: 'Active',
      established: '2011',
      contact: 'alumni@college.edu',
      responsibilities: ['Alumni relations', 'Reunion organization', 'Networking events', 'Alumni database'],
      currentProjects: ['Annual Alumni Meet', 'Alumni Mentorship Program', 'Alumni Achievement Awards']
    },
    {
      id: 24,
      name: 'Innovation Committee',
      category: 'Technical',
      description: 'Promotes innovation, research projects, patents, and cutting-edge technology development.',
      head: 'Abhishek Tiwari',
      totalMembers: 19,
      meetingFrequency: 'Weekly',
      meetingDay: 'Friday',
      meetingTime: '1:30 PM',
      venue: 'Innovation Lab',
      status: 'Active',
      established: '2018',
      contact: 'innovation@college.edu',
      responsibilities: ['Innovation projects', 'Patent filing', 'Research support', 'Technology development'],
      currentProjects: ['Innovation Challenge', 'Patent Workshop', 'Research Funding Program']
    },
    {
      id: 25,
      name: 'Health and Wellness Committee',
      category: 'Social',
      description: 'Promotes student health, wellness programs, mental health awareness, and medical assistance.',
      head: 'Dr. Sunita Rawat',
      totalMembers: 21,
      meetingFrequency: 'Monthly',
      meetingDay: 'Thursday',
      meetingTime: '10:30 AM',
      venue: 'Medical Centre',
      status: 'Active',
      established: '2019',
      contact: 'health@college.edu',
      responsibilities: ['Health awareness', 'Wellness programs', 'Mental health support', 'Emergency medical aid'],
      currentProjects: ['Mental Health Week', 'Fitness Challenge', 'Health Screening Camp']
    },
    {
      id: 26,
      name: 'Discipline Committee',
      category: 'Administrative',
      description: 'Maintains campus discipline, handles student conduct issues, and ensures code of conduct compliance.',
      head: 'Prof. Rajesh Kumar',
      totalMembers: 15,
      meetingFrequency: 'As needed',
      meetingDay: 'Tuesday',
      meetingTime: '11:00 AM',
      venue: 'Administration Office',
      status: 'Active',
      established: '2008',
      contact: 'discipline@college.edu',
      responsibilities: ['Code of conduct', 'Disciplinary actions', 'Student behavior', 'Campus security'],
      currentProjects: ['Code of Conduct Review', 'Anti-Ragging Campaign', 'Campus Safety Initiative']
    },
    {
      id: 27,
      name: 'Research Committee',
      category: 'Academic',
      description: 'Facilitates research activities, academic publications, conference participation, and research funding.',
      head: 'Dr. Meera Joshi',
      totalMembers: 23,
      meetingFrequency: 'Monthly',
      meetingDay: 'Friday',
      meetingTime: '2:30 PM',
      venue: 'Research Centre',
      status: 'Active',
      established: '2015',
      contact: 'research@college.edu',
      responsibilities: ['Research guidance', 'Publication support', 'Conference funding', 'Research methodology'],
      currentProjects: ['Research Symposium', 'Publication Workshop', 'Research Grant Program']
    }
  ]

  // Student's current committee memberships
  const studentMemberships = [
    { committeeId: 1, role: 'Member', joinDate: '2024-08-01', status: 'Active', contributions: 8 },
    { committeeId: 3, role: 'Volunteer', joinDate: '2024-09-15', status: 'Active', contributions: 5 },
    { committeeId: 7, role: 'Coordinator', joinDate: '2024-07-20', status: 'Active', contributions: 12 }
  ]

  const filteredCommittees = allCommittees.filter(committee =>
    committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Administrative': 'bg-blue-600',
      'Cultural': 'bg-purple-600',
      'Technical': 'bg-green-600',
      'Sports': 'bg-orange-600',
      'Social': 'bg-pink-600',
      'Creative': 'bg-indigo-600',
      'Academic': 'bg-teal-600',
      'Business': 'bg-yellow-600',
      'Career': 'bg-red-600'
    }
    return colors[category] || 'bg-gray-600'
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Coordinator': return 'bg-purple-600'
      case 'Member': return 'bg-blue-600'
      case 'Volunteer': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading committees data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div>
              <h1 className="text-gray-900">Student Committees</h1>
              <p className="text-sm text-gray-600">All 27 college committees and participation opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{allCommittees.length}</p>
              <p className="text-sm text-gray-600">Total Committees</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{studentMemberships.length}</p>
              <p className="text-sm text-gray-600">Your Memberships</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {studentMemberships.reduce((sum, membership) => sum + membership.contributions, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Contributions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {studentMemberships.filter(m => m.role === 'Coordinator').length}
              </p>
              <p className="text-sm text-gray-600">Leadership Roles</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search committees by name, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {['All', 'Administrative', 'Cultural', 'Technical', 'Sports', 'Social'].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm(category === 'All' ? '' : category)}
                    className={searchTerm === category || (category === 'All' && !searchTerm) ? 'bg-blue-100' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Committee Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Committee Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Committees ({filteredCommittees.length})</TabsTrigger>
                <TabsTrigger value="my">My Committees ({studentMemberships.length})</TabsTrigger>
                <TabsTrigger value="join">Available to Join</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCommittees.map((committee) => (
                    <Card key={committee.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1">{committee.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getCategoryColor(committee.category)}>
                                {committee.category}
                              </Badge>
                              <Badge className={getStatusColor(committee.status)}>
                                {committee.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <p>Est. {committee.established}</p>
                            <p>{committee.totalMembers} members</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{committee.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="w-4 h-4 text-gray-500" />
                            <span>Head: {committee.head}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span>Meets: {committee.meetingFrequency} ({committee.meetingDay}s)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>Time: {committee.meetingTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>Venue: {committee.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{committee.contact}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                          <div className="flex flex-wrap gap-1">
                            {committee.responsibilities.slice(0, 3).map((resp, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {resp}
                              </Badge>
                            ))}
                            {committee.responsibilities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{committee.responsibilities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Current Projects:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {committee.currentProjects.map((project, index) => (
                              <li key={index}>• {project}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex gap-2">
                          {studentMemberships.find(m => m.committeeId === committee.id) ? (
                            <Badge className="bg-green-600">
                              Member ({studentMemberships.find(m => m.committeeId === committee.id)?.role})
                            </Badge>
                          ) : (
                            <Button size="sm" className="flex items-center gap-2">
                              <UserPlus className="w-4 h-4" />
                              Join Committee
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my" className="space-y-4">
                <div className="space-y-4">
                  {studentMemberships.map((membership) => {
                    const committee = allCommittees.find(c => c.id === membership.committeeId)
                    if (!committee) return null
                    
                    return (
                      <Card key={membership.committeeId} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">{committee.name}</h3>
                              <div className="flex items-center gap-2">
                                <Badge className={getRoleColor(membership.role)}>
                                  {membership.role}
                                </Badge>
                                <Badge className={getCategoryColor(committee.category)}>
                                  {committee.category}
                                </Badge>
                                <Badge variant="outline">
                                  {membership.contributions} contributions
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <p>Joined: {new Date(membership.joinDate).toLocaleDateString()}</p>
                              <p>Status: {membership.status}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{committee.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Meeting Schedule:</span>
                              <p>{committee.meetingFrequency} on {committee.meetingDay}s</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Next Meeting:</span>
                              <p>{committee.meetingTime} at {committee.venue}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="join" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {allCommittees
                    .filter(committee => !studentMemberships.find(m => m.committeeId === committee.id))
                    .slice(0, 8)
                    .map((committee) => (
                      <Card key={committee.id} className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">{committee.name}</h3>
                              <Badge className={getCategoryColor(committee.category)}>
                                {committee.category}
                              </Badge>
                            </div>
                            <Button size="sm" className="flex items-center gap-2">
                              <UserPlus className="w-4 h-4" />
                              Join
                            </Button>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{committee.description}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Head: {committee.head}</span>
                            <span>{committee.totalMembers} members</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Participation Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Your Committee Participation Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Participation Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Memberships</span>
                    <span className="font-medium">{studentMemberships.length} / 27 committees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Contributions</span>
                    <span className="font-medium">{studentMemberships.reduce((sum, m) => sum + m.contributions, 0)} activities</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leadership Roles</span>
                    <span className="font-medium">{studentMemberships.filter(m => m.role === 'Coordinator').length} positions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participation Rate</span>
                    <span className="font-medium">{Math.round((studentMemberships.length / allCommittees.length) * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Category Involvement</h4>
                <div className="space-y-3">
                  {['Cultural', 'Technical', 'Creative', 'Administrative', 'Social'].map(category => {
                    const count = studentMemberships.filter(m => {
                      const committee = allCommittees.find(c => c.id === m.committeeId)
                      return committee?.category === category
                    }).length
                    const total = allCommittees.filter(c => c.category === category).length
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{category}</span>
                          <span className="font-medium">{count}/{total}</span>
                        </div>
                        <Progress value={(count / total) * 100} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Recent Activities</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Photography Exhibition</p>
                    <p className="text-xs text-blue-600">Photography Committee • 3 days ago</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Tech Workshop Coordination</p>
                    <p className="text-xs text-green-600">Technical Committee • 1 week ago</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">Student Council Meeting</p>
                    <p className="text-xs text-purple-600">Student Council • 2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Committee Achievements & Recognition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Your Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Outstanding Contributor</p>
                      <p className="text-sm text-yellow-600">Photography Committee (2024)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Perfect Attendance</p>
                      <p className="text-sm text-green-600">Technical Committee (Semester 1)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Leadership Excellence</p>
                      <p className="text-sm text-blue-600">Student Council (2024)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Committee Impact</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Photography Committee</span>
                      <Badge className="bg-purple-600">Coordinator</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Led 3 major photography exhibitions</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">Event Management</Badge>
                      <Badge variant="outline" className="text-xs">Team Leadership</Badge>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Technical Committee</span>
                      <Badge className="bg-green-600">Volunteer</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Supported 5 technical workshops</p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">Technical Support</Badge>
                      <Badge variant="outline" className="text-xs">Workshop Coordination</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Committee Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Recommended Committees for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Based on your interests and current participation, we recommend these committees:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Innovation Committee', reason: 'Matches your technical background', category: 'Technical' },
                  { name: 'Cultural Committee', reason: 'Complements your creative skills', category: 'Cultural' },
                  { name: 'Debate Committee', reason: 'Build public speaking skills', category: 'Academic' }
                ].map((rec, index) => (
                  <div key={index} className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rec.name}</h4>
                      <Badge className={getCategoryColor(rec.category)}>{rec.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                    <Button size="sm" className="w-full">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Express Interest
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Committee Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Calendar className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">View</div>
                  <div className="text-sm text-gray-600">Meeting Schedule</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Activity className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Track</div>
                  <div className="text-sm text-gray-600">Contributions</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Award className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">View</div>
                  <div className="text-sm text-gray-600">Certificates</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <UserPlus className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Apply</div>
                  <div className="text-sm text-gray-600">New Committee</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}