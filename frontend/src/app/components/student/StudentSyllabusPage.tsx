import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Download, FileText, Calendar } from 'lucide-react'

interface StudentSyllabusPageProps {
  onBack: () => void
}

export function StudentSyllabusPage({ onBack }: StudentSyllabusPageProps) {
  const [selectedStream, setSelectedStream] = useState<string>('BCA')

  const syllabusData = [
    {
      stream: 'BCA',
      year: '1st Year',
      uploadDate: 'Jan 15, 2026',
      fileSize: '2.3 MB',
      subjects: ['Programming in C', 'Mathematics', 'Digital Electronics', 'English'],
      pdfUrl: '#'
    },
    {
      stream: 'BCA',
      year: '2nd Year',
      uploadDate: 'Jan 15, 2026',
      fileSize: '2.8 MB',
      subjects: ['Data Structures', 'Java Programming', 'DBMS', 'Web Technologies'],
      pdfUrl: '#'
    },
    {
      stream: 'BCA',
      year: '3rd Year',
      uploadDate: 'Jan 15, 2026',
      fileSize: '3.1 MB',
      subjects: ['Software Engineering', 'Computer Networks', 'Operating Systems', 'Python'],
      pdfUrl: '#'
    },
    {
      stream: 'BCOM',
      year: '1st Year',
      uploadDate: 'Jan 16, 2026',
      fileSize: '2.5 MB',
      subjects: ['Financial Accounting', 'Business Economics', 'Business Law', 'Business Math'],
      pdfUrl: '#'
    },
    {
      stream: 'BBA',
      year: '1st Year',
      uploadDate: 'Jan 16, 2026',
      fileSize: '2.6 MB',
      subjects: ['Principles of Management', 'Business Communication', 'Marketing', 'Economics'],
      pdfUrl: '#'
    }
  ]

  const filteredSyllabus = syllabusData.filter(s => s.stream === selectedStream)

  const handleDownload = (year: string) => {
    alert(`Downloading ${selectedStream} ${year} syllabus PDF...`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900">Course Syllabus</h1>
            <p className="text-sm text-gray-600">Download syllabus for your course</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Stream Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Select Stream:</span>
              {['BCA', 'BCOM', 'BBA', 'BCOM A&F', 'MCA', 'MBA', 'MCOM'].map((stream) => (
                <Button
                  key={stream}
                  size="sm"
                  variant={selectedStream === stream ? 'default' : 'outline'}
                  onClick={() => setSelectedStream(stream)}
                  className="rounded-full"
                >
                  {stream}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Syllabus Cards */}
        <div className="space-y-4">
          {filteredSyllabus.length > 0 ? (
            filteredSyllabus.map((syllabus, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-semibold mb-2">
                          {syllabus.stream} - {syllabus.year}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span>PDF Document</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{syllabus.uploadDate}</span>
                          </div>
                          <div className="text-gray-600">
                            Size: {syllabus.fileSize}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Subjects Covered:</p>
                          <div className="flex flex-wrap gap-2">
                            {syllabus.subjects.map((subject, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownload(syllabus.year)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex-shrink-0"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 font-semibold mb-2">No Syllabus Available</h3>
                <p className="text-gray-600 text-sm">
                  Syllabus for {selectedStream} has not been uploaded yet. Please check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
