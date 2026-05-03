import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Receipt,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react'

interface StudentFeePageProps {
  onBack: () => void
}

export function StudentFeePage({ onBack }: StudentFeePageProps) {
  const [studentData, setStudentData] = useState<any>(null)

  useEffect(() => {
    const registrationData = localStorage.getItem('studentRegistration')
    if (registrationData) {
      const data = JSON.parse(registrationData)
      setStudentData(data)
    }
  }, [])

  // Comprehensive fee structure data
  const feeStructure = {
    academicYear: '2024-25',
    totalFee: 125000,
    paidAmount: 85000,
    pendingAmount: 40000,
    nextDueDate: '2024-12-31',
    paymentMode: 'Installments',
    
    // Detailed fee breakdown
    feeBreakdown: [
      { category: 'Tuition Fee', amount: 75000, percentage: 60, mandatory: true, description: 'Academic instruction and course materials' },
      { category: 'Laboratory Fee', amount: 15000, percentage: 12, mandatory: true, description: 'Lab equipment, chemicals, and practical sessions' },
      { category: 'Library Fee', amount: 5000, percentage: 4, mandatory: true, description: 'Books, digital resources, and library services' },
      { category: 'Sports Fee', amount: 8000, percentage: 6.4, mandatory: true, description: 'Sports facilities, equipment, and tournaments' },
      { category: 'Development Fee', amount: 10000, percentage: 8, mandatory: true, description: 'Infrastructure development and maintenance' },
      { category: 'Examination Fee', amount: 6000, percentage: 4.8, mandatory: true, description: 'Exam conduct, paper setting, and evaluation' },
      { category: 'Activity Fee', amount: 4000, percentage: 3.2, mandatory: false, description: 'Cultural events, clubs, and extracurricular activities' },
      { category: 'Insurance', amount: 2000, percentage: 1.6, mandatory: true, description: 'Student accident and health insurance' }
    ],
    
    // Payment history
    paymentHistory: [
      {
        id: 'PAY001',
        installment: '1st Installment',
        amount: 45000,
        dueDate: '2024-08-15',
        paidDate: '2024-08-12',
        status: 'paid',
        paymentMethod: 'Online Banking',
        transactionId: 'TXN123456789',
        lateFee: 0,
        discount: 2250, // Early payment discount
        finalAmount: 42750,
        receipt: 'REC001'
      },
      {
        id: 'PAY002',
        installment: '2nd Installment',
        amount: 40000,
        dueDate: '2024-11-15',
        paidDate: '2024-11-18',
        status: 'paid',
        paymentMethod: 'Credit Card',
        transactionId: 'TXN987654321',
        lateFee: 500, // Late payment fee
        discount: 0,
        finalAmount: 40500,
        receipt: 'REC002'
      },
      {
        id: 'PAY003',
        installment: '3rd Installment',
        amount: 40000,
        dueDate: '2024-12-31',
        paidDate: null,
        status: 'pending',
        paymentMethod: null,
        transactionId: null,
        lateFee: 0,
        discount: 0,
        finalAmount: 40000,
        receipt: null
      }
    ],
    
    // Fee concessions and scholarships
    concessions: [
      {
        type: 'Merit Scholarship',
        amount: 15000,
        percentage: 12,
        criteria: 'CGPA > 8.5',
        status: 'approved',
        appliedDate: '2024-07-15',
        approvedDate: '2024-07-20',
        validTill: '2025-05-31',
        description: 'Academic excellence scholarship for maintaining high CGPA'
      },
      {
        type: 'Sports Quota',
        amount: 5000,
        percentage: 4,
        criteria: 'State Level Basketball Player',
        status: 'approved',
        appliedDate: '2024-07-10',
        approvedDate: '2024-07-18',
        validTill: '2025-05-31',
        description: 'Sports achievement concession for representing state in basketball'
      }
    ],
    
    // Additional charges
    additionalCharges: [
      {
        description: 'Late Fee (2nd Installment)',
        amount: 500,
        date: '2024-11-18',
        status: 'charged'
      },
      {
        description: 'ID Card Replacement',
        amount: 200,
        date: '2024-10-15',
        status: 'charged'
      },
      {
        description: 'Transcript Fee',
        amount: 300,
        date: '2024-09-20',
        status: 'charged'
      }
    ],
    
    // Refunds if any
    refunds: [
      {
        description: 'Security Deposit Refund',
        amount: 5000,
        reason: 'Course completion',
        status: 'pending',
        requestDate: '2024-11-01',
        expectedDate: '2024-12-15'
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-600'
      case 'pending': return 'bg-yellow-600'
      case 'overdue': return 'bg-red-600'
      case 'approved': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'overdue':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const calculatePaymentProgress = () => {
    return (feeStructure.paidAmount / feeStructure.totalFee) * 100
  }

  const getTotalDiscounts = () => {
    return feeStructure.concessions.reduce((sum, concession) => 
      concession.status === 'approved' ? sum + concession.amount : sum, 0
    )
  }

  const getTotalAdditionalCharges = () => {
    return feeStructure.additionalCharges.reduce((sum, charge) => sum + charge.amount, 0)
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fee information...</p>
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
              <h1 className="text-gray-900">Fee Management</h1>
              <p className="text-sm text-gray-600">Complete fee structure and payment history for {feeStructure.academicYear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Fee Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">₹{feeStructure.totalFee.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Fee</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">₹{feeStructure.paidAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Amount Paid</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">₹{feeStructure.pendingAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Balance Due</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">₹{getTotalDiscounts().toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Scholarships</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Payment Progress
              </div>
              <Badge variant={feeStructure.pendingAmount > 0 ? "destructive" : "default"}>
                {feeStructure.pendingAmount > 0 ? 'Balance Due' : 'Fully Paid'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Progress</span>
                <span className="font-medium text-gray-900">
                  {Math.round(calculatePaymentProgress())}% Complete
                </span>
              </div>
              <Progress value={calculatePaymentProgress()} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Paid: ₹{feeStructure.paidAmount.toLocaleString()}</span>
                <span>Remaining: ₹{feeStructure.pendingAmount.toLocaleString()}</span>
              </div>
              {feeStructure.pendingAmount > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-800">
                      Next payment of ₹{feeStructure.pendingAmount.toLocaleString()} due by {feeStructure.nextDueDate}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Detailed Fee Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="breakdown">Fee Breakdown</TabsTrigger>
                <TabsTrigger value="payments">Payment History</TabsTrigger>
                <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                <TabsTrigger value="additional">Additional Charges</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="space-y-4">
                <div className="space-y-4">
                  {feeStructure.feeBreakdown.map((fee, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{fee.category}</h4>
                            {fee.mandatory && <Badge variant="outline">Mandatory</Badge>}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">₹{fee.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{fee.percentage}% of total</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{fee.description}</p>
                        <div className="mt-2">
                          <Progress value={fee.percentage} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Installment</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Paid Date</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Late Fee</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Final Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeStructure.paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.installment}</TableCell>
                          <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>
                            {payment.paidDate ? payment.paidDate : <span className="text-gray-400">-</span>}
                          </TableCell>
                          <TableCell>
                            {payment.paymentMethod ? payment.paymentMethod : <span className="text-gray-400">-</span>}
                          </TableCell>
                          <TableCell>
                            {payment.lateFee > 0 ? (
                              <span className="text-red-600">₹{payment.lateFee}</span>
                            ) : (
                              <span className="text-green-600">₹0</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {payment.discount > 0 ? (
                              <span className="text-green-600">-₹{payment.discount}</span>
                            ) : (
                              <span className="text-gray-400">₹0</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">₹{payment.finalAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(payment.status)}
                              <Badge className={getStatusColor(payment.status)}>
                                {payment.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            {payment.status === 'paid' ? (
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Receipt
                              </Button>
                            ) : (
                              <Button size="sm" className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Pay Now
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="scholarships" className="space-y-4">
                <div className="space-y-4">
                  {feeStructure.concessions.map((concession, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{concession.type}</h4>
                            <p className="text-sm text-gray-600">{concession.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600 text-lg">₹{concession.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{concession.percentage}% discount</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <label className="text-gray-600">Criteria</label>
                            <p className="font-medium text-gray-900">{concession.criteria}</p>
                          </div>
                          <div>
                            <label className="text-gray-600">Applied Date</label>
                            <p className="font-medium text-gray-900">{concession.appliedDate}</p>
                          </div>
                          <div>
                            <label className="text-gray-600">Approved Date</label>
                            <p className="font-medium text-gray-900">{concession.approvedDate}</p>
                          </div>
                          <div>
                            <label className="text-gray-600">Valid Till</label>
                            <p className="font-medium text-gray-900">{concession.validTill}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Badge className={getStatusColor(concession.status)}>
                            {concession.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-800">Total Scholarships & Concessions</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₹{getTotalDiscounts().toLocaleString()}</p>
                    <p className="text-sm text-green-700">
                      You've saved {Math.round((getTotalDiscounts() / feeStructure.totalFee) * 100)}% on your total fee
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="additional" className="space-y-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Charges</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Description</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {feeStructure.additionalCharges.map((charge, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{charge.description}</TableCell>
                                <TableCell className="text-red-600">₹{charge.amount}</TableCell>
                                <TableCell>{charge.date}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(charge.status)}>
                                    {charge.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          Total Additional Charges: <span className="font-medium">₹{getTotalAdditionalCharges()}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {feeStructure.refunds.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Refunds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {feeStructure.refunds.map((refund, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{refund.description}</p>
                                  <p className="text-sm text-gray-600">Reason: {refund.reason}</p>
                                  <p className="text-sm text-gray-600">
                                    Requested: {refund.requestDate} | Expected: {refund.expectedDate}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-green-600">₹{refund.amount.toLocaleString()}</p>
                                  <Badge className={getStatusColor(refund.status)}>
                                    {refund.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Fee (Original)</span>
                          <span className="font-medium">₹{feeStructure.totalFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Scholarships & Discounts</span>
                          <span className="font-medium">-₹{getTotalDiscounts().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Additional Charges</span>
                          <span className="font-medium">+₹{getTotalAdditionalCharges().toLocaleString()}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-medium text-lg">
                          <span>Net Payable Amount</span>
                          <span>₹{(feeStructure.totalFee - getTotalDiscounts() + getTotalAdditionalCharges()).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Amount Paid</span>
                          <span className="font-medium">₹{feeStructure.paidAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-red-600 font-medium text-lg">
                          <span>Balance Due</span>
                          <span>₹{feeStructure.pendingAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600">Student Name</label>
                          <p className="font-medium text-gray-900">{studentData.fullName}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Student ID</label>
                          <p className="font-medium text-gray-900">{studentData.studentId}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Course</label>
                          <p className="font-medium text-gray-900">{studentData.course}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Academic Year</label>
                          <p className="font-medium text-gray-900">{feeStructure.academicYear}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Payment Mode</label>
                          <p className="font-medium text-gray-900">{feeStructure.paymentMode}</p>
                        </div>
                        {feeStructure.pendingAmount > 0 && (
                          <div>
                            <label className="text-sm text-gray-600">Next Due Date</label>
                            <p className="font-medium text-red-600">{feeStructure.nextDueDate}</p>
                          </div>
                        )}
                      </div>

                      {feeStructure.pendingAmount > 0 && (
                        <div className="pt-4 border-t">
                          <Button className="w-full flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Pay Balance Amount (₹{feeStructure.pendingAmount.toLocaleString()})
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Payment Insights & Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Payment Insights & Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Early Payment Benefits</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 5% discount on early payments</li>
                    <li>• No late fee penalties</li>
                    <li>• Priority registration for courses</li>
                    <li>• Fast-track certificate processing</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Payment Options</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Online banking transfer</li>
                    <li>• Credit/Debit card payments</li>
                    <li>• UPI and digital wallets</li>
                    <li>• Demand draft</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Upcoming Deadlines</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 3rd Installment: Dec 31, 2024</li>
                    <li>• Late fee starts: Jan 1, 2025</li>
                    <li>• Final deadline: Jan 15, 2025</li>
                    <li>• Exam fee due: Jan 30, 2025</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Financial Aid Available</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Merit scholarships (up to 50%)</li>
                    <li>• Need-based financial aid</li>
                    <li>• Educational loan assistance</li>
                    <li>• Work-study programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Comparison & Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Fee Analysis & Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Academic Performance Impact</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Current CGPA</label>
                    <p className="font-medium text-green-600">8.7 (Excellent)</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Scholarship Eligibility</label>
                    <p className="font-medium text-blue-600">Qualified for Merit Award</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Next Review Date</label>
                    <p className="font-medium text-gray-900">January 15, 2025</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Payment Performance</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">On-time Payments</label>
                    <p className="font-medium text-green-600">2 out of 3 (66%)</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Total Late Fees</label>
                    <p className="font-medium text-red-600">₹500</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Savings from Discounts</label>
                    <p className="font-medium text-green-600">₹{getTotalDiscounts().toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Comparative Analysis</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Vs. Course Average</label>
                    <p className="font-medium text-blue-600">12% below (due to scholarships)</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Vs. Previous Year</label>
                    <p className="font-medium text-green-600">5% reduction</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Projected Total Cost</label>
                    <p className="font-medium text-gray-900">₹{(feeStructure.totalFee * 4).toLocaleString()} (4 years)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Download</div>
                  <div className="text-sm text-gray-600">Fee Receipt</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Calendar className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">View</div>
                  <div className="text-sm text-gray-600">Payment Schedule</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Mail className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-600">Statement</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Award className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Apply</div>
                  <div className="text-sm text-gray-600">Scholarship</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}