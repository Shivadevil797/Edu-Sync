import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, Calendar, Trophy } from 'lucide-react'

interface StudentExamPageProps {
  onBack: () => void
}

export function StudentExamPage({ onBack }: StudentExamPageProps) {
  const [activeTab, setActiveTab] = useState('upcoming')

  // Mock exam data
  const upcomingExams = [
    {
      id: 1,
      subject: 'Data Structures and Algorithms',
      code: 'CS301',
      date: '2024-12-15',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      room: 'Exam Hall A',
      type: 'Theory',
      marks: 100,
      status: 'scheduled'
    },
    {
      id: 2,
      subject: 'Database Management Systems',
      code: 'CS302',
      date: '2024-12-18',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      room: 'Exam Hall B',
      type: 'Theory',
      marks: 100,
      status: 'scheduled'
    },
    {
      id: 3,
      subject: 'Operating Systems Lab',
      code: 'CS303L',
      date: '2024-12-20',
      time: '9:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Computer Lab 1',
      type: 'Practical',
      marks: 50,
      status: 'scheduled'
    },
    {
      id: 4,
      subject: 'Software Engineering',
      code: 'CS304',
      date: '2024-12-22',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      room: 'Exam Hall C',
      type: 'Theory',
      marks: 100,
      status: 'scheduled'
    }
  ]

  const pastExams = [
    {
      id: 5,
      subject: 'Computer Networks',
      code: 'CS201',
      date: '2024-11-20',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      room: 'Exam Hall A',
      type: 'Theory',
      totalMarks: 100,
      obtainedMarks: 87,
      grade: 'A',
      status: 'completed'
    },
    {
      id: 6,
      subject: 'Object Oriented Programming',
      code: 'CS202',
      date: '2024-11-18',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      room: 'Exam Hall B',
      type: 'Theory',
      totalMarks: 100,
      obtainedMarks: 92,
      grade: 'A+',
      status: 'completed'
    },
    {
      id: 7,
      subject: 'Data Structures Lab',
      code: 'CS203L',
      date: '2024-11-15',
      time: '9:00 AM - 12:00 PM',
      duration: '3 hours',
      room: 'Computer Lab 2',
      type: 'Practical',
      totalMarks: 50,
      obtainedMarks: 45,
      grade: 'A',
      status: 'completed'
    },
    {
      id: 8,
      subject: 'Mathematics III',
      code: 'MA301',
      date: '2024-11-12',
      time: '10:00 AM - 1:00 PM',
      duration: '3 hours',
      room: 'Exam Hall C',
      type: 'Theory',
      totalMarks: 100,
      obtainedMarks: 78,
      grade: 'B+',
      status: 'completed'
    },
    {
      id: 9,
      subject: 'Computer Graphics',
      code: 'CS204',
      date: '2024-11-10',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      room: 'Exam Hall A',
      type: 'Theory',
      totalMarks: 100,
      obtainedMarks: 85,
      grade: 'A',
      status: 'completed'
    }
  ]

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-blue-100 text-blue-800'
      case 'B+': return 'bg-yellow-100 text-yellow-800'
      case 'B': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const calculateOverallPerformance = () => {
    const totalMarks = pastExams.reduce((sum, exam) => sum + exam.totalMarks, 0)
    const obtainedMarks = pastExams.reduce((sum, exam) => sum + exam.obtainedMarks, 0)
    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(1)
    return { totalMarks, obtainedMarks, percentage }
  }

  const performance = calculateOverallPerformance()

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
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-gray-900">Exam Management</h1>
              <p className="text-sm text-gray-600">View your exam schedules and results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{performance.percentage}%</p>
                <p className="text-sm text-gray-600">Overall Performance</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{pastExams.length}</p>
                <p className="text-sm text-gray-600">Exams Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
                <p className="text-sm text-gray-600">Upcoming Exams</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{performance.obtainedMarks}/{performance.totalMarks}</p>
                <p className="text-sm text-gray-600">Total Marks</p>
              </CardContent>
            </Card>
          </div>

          {/* Exam Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Examination Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Upcoming Exams ({upcomingExams.length})
                  </TabsTrigger>
                  <TabsTrigger value="past" className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Past Results ({pastExams.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-6">
                  <div className="space-y-4">
                    {upcomingExams.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Max Marks</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {upcomingExams.map((exam) => (
                            <TableRow key={exam.id}>
                              <TableCell className="font-medium">{exam.subject}</TableCell>
                              <TableCell>{exam.code}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500" />
                                  <div>
                                    <p className="font-medium">{new Date(exam.date).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-600">{exam.time}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{exam.duration}</TableCell>
                              <TableCell>{exam.room}</TableCell>
                              <TableCell>
                                <Badge variant={exam.type === 'Theory' ? 'default' : 'secondary'}>
                                  {exam.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{exam.marks}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-blue-600 border-blue-300">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Scheduled
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No upcoming exams scheduled</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="past" className="mt-6">
                  <div className="space-y-4">
                    {pastExams.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Marks Obtained</TableHead>
                            <TableHead>Total Marks</TableHead>
                            <TableHead>Percentage</TableHead>
                            <TableHead>Grade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pastExams.map((exam) => (
                            <TableRow key={exam.id}>
                              <TableCell className="font-medium">{exam.subject}</TableCell>
                              <TableCell>{exam.code}</TableCell>
                              <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge variant={exam.type === 'Theory' ? 'default' : 'secondary'}>
                                  {exam.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium text-blue-600">{exam.obtainedMarks}</TableCell>
                              <TableCell>{exam.totalMarks}</TableCell>
                              <TableCell>
                                {((exam.obtainedMarks / exam.totalMarks) * 100).toFixed(1)}%
                              </TableCell>
                              <TableCell>
                                <Badge className={getGradeColor(exam.grade)}>
                                  {exam.grade}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No exam results available</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Exam Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Exam Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">General Instructions</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Report to the exam hall 30 minutes before the scheduled time</li>
                    <li>• Carry your student ID card and admit card</li>
                    <li>• Mobile phones and electronic devices are strictly prohibited</li>
                    <li>• Use only blue or black ink pen for writing</li>
                    <li>• Read all instructions carefully before starting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Late entry (after 30 minutes) is not allowed</li>
                    <li>• Early exit is permitted only after 1 hour</li>
                    <li>• Answer sheets must be submitted before leaving</li>
                    <li>• Any malpractice will result in cancellation</li>
                    <li>• Check exam schedule regularly for updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}