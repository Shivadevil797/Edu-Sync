import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Clock, Filter, ChevronDown, Trash2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { apiUploadWorkload, apiGetTimetables, apiGetWorkloads, apiDeleteTimetable } from '@/services/api'

interface TimetableManagementModalProps {
  onClose: () => void
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const PERIODS = [
  { period: 1, label: '9:00-10:00' },
  { period: 2, label: '10:00-11:00' },
  { period: 3, label: '11:15-12:15' },
  { period: 4, label: '12:15-1:15' },
  { period: 5, label: '2:00-3:00' },
  { period: 6, label: '3:00-4:00' },
  { period: 7, label: '4:15-5:15' },
  { period: 8, label: '5:15-6:15' },
]

export function TimetableManagementModal({ onClose }: TimetableManagementModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'view' | 'history'>('upload')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [uploadError, setUploadError] = useState('')
  const [timetables, setTimetables] = useState<any[]>([])
  const [workloads, setWorkloads] = useState<any[]>([])
  const [selectedTimetable, setSelectedTimetable] = useState<any>(null)
  const [filterDept, setFilterDept] = useState('')
  const [isLoadingTT, setIsLoadingTT] = useState(false)
  const [isLoadingWL, setIsLoadingWL] = useState(false)
  const [isDeletingTT, setIsDeletingTT] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0])
      setUploadError('')
      setUploadResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  })

  useEffect(() => {
    if (activeTab === 'view') loadTimetables()
    if (activeTab === 'history') loadWorkloads()
  }, [activeTab])

  const loadTimetables = async () => {
    setIsLoadingTT(true)
    try {
      const filters: any = {}
      if (filterDept) filters.department = filterDept
      const data = await apiGetTimetables(filters)
      setTimetables(data.timetables || [])
      if (data.timetables?.length && !selectedTimetable) {
        setSelectedTimetable(data.timetables[0])
      }
    } catch { setTimetables([]) }
    finally { setIsLoadingTT(false) }
  }

  const loadWorkloads = async () => {
    setIsLoadingWL(true)
    try {
      const data = await apiGetWorkloads()
      setWorkloads(data.workloads || [])
    } catch { setWorkloads([]) }
    finally { setIsLoadingWL(false) }
  }

  const handleUpload = async () => {
    if (!uploadFile) return
    setIsUploading(true)
    setUploadError('')
    try {
      const data = await apiUploadWorkload(uploadFile)
      setUploadResult(data)
      setUploadFile(null)
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => { if (filterDept !== undefined && activeTab === 'view') loadTimetables() }, [filterDept])

  // Build timetable grid from slots
  const buildGrid = (slots: any[]) => {
    const grid: Record<string, Record<number, any>> = {}
    for (const day of DAYS) grid[day] = {}
    for (const slot of slots) {
      if (grid[slot.day]) grid[slot.day][slot.period] = slot
    }
    return grid
  }

  const tabs = [
    { key: 'upload', label: 'Upload Workload', icon: Upload },
    { key: 'view', label: 'View Timetables', icon: FileSpreadsheet },
    { key: 'history', label: 'Upload History', icon: Clock },
  ] as const

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Timetable Management</h3>
            <p className="text-xs text-gray-500">Upload workload CSV → auto-generate timetables</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-5 shrink-0">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Dropzone */}
              <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragActive ? 'border-blue-500 bg-blue-50' : uploadFile ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'}`}>
                <input {...getInputProps()} />
                {uploadFile ? (
                  <div className="space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                      <FileSpreadsheet className="w-7 h-7 text-emerald-600" />
                    </div>
                    <p className="font-semibold text-emerald-700">{uploadFile.name}</p>
                    <p className="text-xs text-gray-500">{(uploadFile.size / 1024).toFixed(1)} KB • Click to change file</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                      <Upload className="w-7 h-7 text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-700">{isDragActive ? 'Drop the file here' : 'Drag & drop your workload file'}</p>
                    <p className="text-xs text-gray-500">CSV or Excel (.xlsx, .xls) • Max 500 rows</p>
                  </div>
                )}
              </div>

              {/* CSV Format Guide */}
              <Card className="border-blue-100 bg-blue-50/50">
                <CardContent className="p-4">
                  <h5 className="font-semibold text-sm text-blue-800 mb-2">📋 Required CSV Format</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead><tr className="bg-blue-100">
                        <th className="p-1.5 text-left border border-blue-200">Serial No</th>
                        <th className="p-1.5 text-left border border-blue-200">Teacher Name</th>
                        <th className="p-1.5 text-left border border-blue-200">Department</th>
                        <th className="p-1.5 text-left border border-blue-200">Subjects</th>
                        <th className="p-1.5 text-left border border-blue-200">Year</th>
                        <th className="p-1.5 text-left border border-blue-200">Section</th>
                        <th className="p-1.5 text-left border border-blue-200">Weekly Hours</th>
                      </tr></thead>
                      <tbody><tr className="bg-white">
                        <td className="p-1.5 border border-blue-200">1</td>
                        <td className="p-1.5 border border-blue-200">Dr. Priya Sharma</td>
                        <td className="p-1.5 border border-blue-200">BCA</td>
                        <td className="p-1.5 border border-blue-200">Data Structures, OS Lab</td>
                        <td className="p-1.5 border border-blue-200">2</td>
                        <td className="p-1.5 border border-blue-200">A</td>
                        <td className="p-1.5 border border-blue-200">20</td>
                      </tr></tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Upload Button */}
              <Button onClick={handleUpload} disabled={!uploadFile || isUploading} className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25">
                {isUploading ? <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing & Generating...</div> : <div className="flex items-center gap-2"><Upload className="w-4 h-4" />Upload & Generate Timetables</div>}
              </Button>

              {/* Results */}
              {uploadResult && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-emerald-800">{uploadResult.message}</p>
                    {uploadResult.timetableIds && <p className="text-xs text-emerald-600 mt-1">{uploadResult.timetableIds.length} timetable(s) generated. Switch to "View Timetables" to see them.</p>}
                  </div>
                </div>
              )}
              {uploadError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              )}
            </div>
          )}

          {/* View Timetables Tab */}
          {activeTab === 'view' && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2"><Filter className="w-4 h-4 text-gray-400" /><span className="text-sm font-medium text-gray-600">Filter:</span></div>
                <div className="relative">
                  <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="h-9 pl-3 pr-8 rounded-lg border border-gray-200 text-sm bg-white appearance-none">
                    <option value="">All Departments</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BCOM">BCOM</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <Button size="sm" variant="outline" className="h-9 rounded-lg" onClick={loadTimetables}>Refresh</Button>
              </div>

              {isLoadingTT ? (
                <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" /></div>
              ) : timetables.length === 0 ? (
                <div className="text-center py-16">
                  <FileSpreadsheet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No timetables generated yet</p>
                  <p className="text-xs text-gray-400 mt-1">Upload a workload CSV to auto-generate timetables</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Timetable Selector */}
                  <div className="flex gap-2 flex-wrap">
                    {timetables.map((tt: any) => (
                      <button key={tt._id} onClick={() => setSelectedTimetable(tt)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTimetable?._id === tt._id ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        {tt.department || tt.departmentId?.name || 'N/A'} — Year {tt.year} {tt.section}
                      </button>
                    ))}
                  </div>

                  {/* Timetable Grid */}
                  {selectedTimetable && (
                    <Card className="shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-gray-900">
                            {selectedTimetable.department || selectedTimetable.departmentId?.name} — Year {selectedTimetable.year}, Section {selectedTimetable.section}
                          </h5>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${selectedTimetable.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {selectedTimetable.isPublished ? 'Published' : 'Draft'}
                            </span>
                            <button
                              onClick={async () => {
                                if (!window.confirm(`Delete timetable for ${selectedTimetable.department || selectedTimetable.departmentId?.name} — Year ${selectedTimetable.year}, Section ${selectedTimetable.section}? This cannot be undone.`)) return
                                setIsDeletingTT(selectedTimetable._id)
                                try {
                                  await apiDeleteTimetable(selectedTimetable._id)
                                  setSelectedTimetable(null)
                                  loadTimetables()
                                } catch (err: any) {
                                  alert(err.message || 'Failed to delete timetable')
                                } finally {
                                  setIsDeletingTT(null)
                                }
                              }}
                              disabled={isDeletingTT === selectedTimetable._id}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              {isDeletingTT === selectedTimetable._id ? (
                                <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <th className="p-2 text-left border font-semibold text-gray-700 min-w-[80px]">Day</th>
                                {PERIODS.map(p => (
                                  <th key={p.period} className="p-2 text-center border font-semibold text-gray-700 min-w-[100px]">{p.label}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(() => {
                                const grid = buildGrid(selectedTimetable.slots || [])
                                return DAYS.map(day => (
                                  <tr key={day} className="hover:bg-gray-50/50">
                                    <td className="p-2 border font-semibold text-gray-800 bg-gray-50">{day}</td>
                                    {PERIODS.map(p => {
                                      const slot = grid[day]?.[p.period]
                                      if (!slot) return <td key={p.period} className="p-2 border text-center text-gray-300">—</td>
                                      const isLab = slot.type === 'lab'
                                      const isLeave = slot.isOnLeave
                                      return (
                                        <td key={p.period} className={`p-1.5 border ${isLeave ? 'bg-red-50' : isLab ? 'bg-violet-50' : 'bg-white'}`}>
                                          <div className="font-medium text-gray-900 leading-tight">{slot.subject}</div>
                                          <div className="text-gray-500 mt-0.5">{slot.facultyName || 'TBD'}</div>
                                          <div className="text-gray-400">{slot.room}</div>
                                          {isLab && <span className="inline-block mt-0.5 px-1 py-0.5 bg-violet-100 text-violet-600 rounded text-[10px]">Lab</span>}
                                          {isLeave && <span className="inline-block mt-0.5 px-1 py-0.5 bg-red-100 text-red-600 rounded text-[10px]">On Leave</span>}
                                        </td>
                                      )
                                    })}
                                  </tr>
                                ))
                              })()}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Upload History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {isLoadingWL ? (
                <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" /></div>
              ) : workloads.length === 0 ? (
                <div className="text-center py-16">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No uploads yet</p>
                  <p className="text-xs text-gray-400 mt-1">Upload a workload file to see history here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workloads.map((wl: any) => (
                    <Card key={wl._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${wl.status === 'processed' ? 'bg-emerald-100' : wl.status === 'failed' ? 'bg-red-100' : 'bg-amber-100'}`}>
                              <FileSpreadsheet className={`w-5 h-5 ${wl.status === 'processed' ? 'text-emerald-600' : wl.status === 'failed' ? 'text-red-600' : 'text-amber-600'}`} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{wl.fileName}</p>
                              <p className="text-xs text-gray-500">
                                {wl.department} • {wl.records?.length || 0} records • {new Date(wl.createdAt || wl.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${wl.status === 'processed' ? 'bg-emerald-100 text-emerald-700' : wl.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                              {wl.status}
                            </span>
                            {wl.generatedTimetableIds?.length > 0 && (
                              <span className="text-xs text-gray-500">{wl.generatedTimetableIds.length} TTs</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
