'use client'

import { useState } from 'react'
import { Brain, Users, Activity, TrendingUp, Clock, Shield, Zap } from 'lucide-react'
import { modelPerformanceResults } from '../../lib/modelResults'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface SystemMetrics {
  totalPatients: number
  stage1Completed: number
  stage2Completed: number
  accuracy: number
  avgProcessingTime: number
  systemStatus: 'Online' | 'Offline' | 'Maintenance'
}

interface RecentCase {
  id: string
  age: number
  gender: string
  stage1Risk: number
  stage2Risk?: number
  diagnosis: string
  timestamp: Date
  status: 'Stage 1' | 'Stage 2' | 'Complete'
}

export default function CDSSDashboard() {
  const { t } = useLanguage()
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalPatients: 1270,
    stage1Completed: 1270,
    stage2Completed: 635,
    accuracy: modelPerformanceResults.ensemble.accuracy,
    avgProcessingTime: 4.3,
    systemStatus: 'Online'
  })

  const [recentCases, setRecentCases] = useState<RecentCase[]>([
    {
      id: 'P001',
      age: 72,
      gender: 'F',
      stage1Risk: 65,
      stage2Risk: 78,
      diagnosis: 'Mild AD',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'Complete'
    },
    {
      id: 'P002',
      age: 68,
      gender: 'M',
      stage1Risk: 25,
      diagnosis: 'Normal',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'Stage 1'
    },
    {
      id: 'P003',
      age: 75,
      gender: 'F',
      stage1Risk: 82,
      stage2Risk: 89,
      diagnosis: 'Moderate AD',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: 'Complete'
    }
  ])

  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcessNewCase = () => {
    if (isProcessing) {
      setIsProcessing(false)
      return
    }

    setIsProcessing(true)

    // Simulate processing a new case
    setTimeout(() => {
      const newCase: RecentCase = {
        id: `P${String(recentCases.length + 1).padStart(3, '0')}`,
        age: 65 + Math.floor(Math.random() * 20),
        gender: Math.random() > 0.5 ? 'F' : 'M',
        stage1Risk: Math.floor(Math.random() * 100),
        stage2Risk: Math.random() > 0.3 ? Math.floor(Math.random() * 100) : undefined,
        diagnosis: ['Normal', 'MCI', 'Mild AD', 'Moderate AD'][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        status: Math.random() > 0.5 ? 'Complete' : Math.random() > 0.5 ? 'Stage 2' : 'Stage 1'
      }

      setRecentCases(prev => [newCase, ...prev.slice(0, 4)]) // Keep only 5 most recent
      setIsProcessing(false)
    }, 3000)
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return 'text-green-600'
    if (risk < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskBg = (risk: number) => {
    if (risk < 30) return 'bg-green-100'
    if (risk < 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  const translateStatus = (status: string) => {
    if (status === 'Complete') return t('dashboard.statusComplete')
    if (status === 'Stage 1') return t('dashboard.statusStage1')
    if (status === 'Stage 2') return t('dashboard.statusStage2')
    return status
  }

  const translateDiagnosis = (diagnosis: string) => {
    if (diagnosis === 'Normal') return t('dashboard.diagNormal')
    if (diagnosis === 'MCI') return t('dashboard.diagMCI')
    if (diagnosis === 'Mild AD') return t('dashboard.diagMildAD')
    if (diagnosis === 'Moderate AD') return t('dashboard.diagModAD')
    return diagnosis
  }

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-8 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              {t('dashboard.subtitle')}
            </p>
          </div>

          {/* System Status - Compact row in top section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
            {[
              { label: t('dashboard.systemStatus'), value: metrics.systemStatus, icon: Shield, color: 'teal' },
              { label: t('dashboard.modelAccuracy'), value: `${metrics.accuracy}%`, icon: TrendingUp, color: 'teal' },
              { label: t('dashboard.avgProcessing'), value: `${metrics.avgProcessingTime}min`, icon: Clock, color: 'teal' },
              { label: t('dashboard.totalPatients'), value: metrics.totalPatients, icon: Users, color: 'teal' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-slate-300 truncate">{stat.label}</p>
                  <stat.icon className="w-4 h-4 text-medical-teal" />
                </div>
                {typeof stat.value === 'string' && stat.value.includes('Online') ? (
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 rounded-full mr-2 bg-green-400"></div>
                    <span className="text-sm font-bold text-green-400">{t('dashboard.systemStatusOnline')}</span>
                  </div>
                ) : (
                  <p className="text-lg font-bold">{stat.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Wave for Top Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-medical-teal">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Middle Section - Teal Background */}
      <div className="bg-medical-teal py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{t('dashboard.tieredApproach')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Stage 1 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white text-medical-teal rounded-full flex items-center justify-center font-extrabold text-xl mr-4 shadow-lg">1</div>
                <h3 className="text-2xl font-bold">{t('dashboard.stage1')}</h3>
              </div>
              <div className="space-y-4 text-white/90">
                <div className="flex items-center"><Users className="w-6 h-6 mr-3 text-white" /><span>{t('dashboard.stage1.desc1')}</span></div>
                <div className="flex items-center"><Activity className="w-6 h-6 mr-3 text-white" /><span>{t('dashboard.stage1.desc2')}</span></div>
                <div className="flex items-center"><Zap className="w-6 h-6 mr-3 text-white" /><span>{t('dashboard.stage1.desc3')}</span></div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-lg"><strong>{metrics.stage1Completed}</strong> {t('dashboard.stage1.screened')}</p>
                <p className="text-sm opacity-80 mt-1">{t('dashboard.stage1.note')}</p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-medical-deep text-white rounded-full flex items-center justify-center font-extrabold text-xl mr-4 shadow-lg">2</div>
                <h3 className="text-2xl font-bold">{t('dashboard.stage2')}</h3>
              </div>
              <div className="space-y-4 text-white/90">
                <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 border border-white/20 bg-white/10 p-1">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                    alt="Logo"
                    className="w-full h-full object-cover invert brightness-200"
                  />
                </div>
                <span>{t('dashboard.stage2.desc1')}</span>
                <div className="flex items-center"><Activity className="w-6 h-6 mr-3 text-white" /><span>{t('dashboard.stage2.desc2')}</span></div>
                <div className="flex items-center"><TrendingUp className="w-6 h-6 mr-3 text-white" /><span>{t('dashboard.stage2.desc3')}</span></div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-lg"><strong>{metrics.stage2Completed}</strong> {t('dashboard.stage2.analyzed')}</p>
                <p className="text-sm opacity-80 mt-1">{t('dashboard.stage2.note')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curve for Teal Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Bottom Section - Light Gray/White Background */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Insights Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-slate-800">{t('dashboard.performanceInsights')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: t('dashboard.mriCnnModel'), model: modelPerformanceResults.mriCNN, icon: Brain, bg: 'bg-white' },
                { title: t('dashboard.genomicXgb'), model: modelPerformanceResults.genomicXGB, icon: Activity, bg: 'bg-white' },
                { title: t('dashboard.ensembleModel'), model: modelPerformanceResults.ensemble, icon: TrendingUp, bg: 'bg-medical-teal/5 border-medical-teal/20' }
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-3xl shadow-soft border border-slate-200 transition-all hover:shadow-lg ${item.bg}`}>
                  <div className="w-10 h-10 rounded-xl overflow-hidden mb-4 border border-medical-teal/20 shadow-sm">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between"><span>{t('dashboard.accuracy')}</span><span className="font-bold text-slate-900">{item.model.accuracy.toFixed(2)}%</span></div>
                    <div className="flex justify-between"><span>{t('dashboard.macroF1')}</span><span className="font-bold text-slate-900">{item.model.macroF1.toFixed(2)}%</span></div>
                    {item.title === t('dashboard.mriCnnModel') && <div><strong>{t('dashboard.architecture')}</strong> ResNet50</div>}
                    {item.title === t('dashboard.genomicXgb') && <div><strong>{t('dashboard.features')}</strong> 1000+ variants</div>}
                    {item.title === t('dashboard.ensembleModel') && <div className="text-green-600 font-medium">+{modelPerformanceResults.ensemble.improvement.accuracyVsMRI.toFixed(2)}% {t('dashboard.vsMri')}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-soft border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-4 text-lg">{t('dashboard.keyFindings')}</h4>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• {t('dashboard.finding1').replace('{ensAcc}', modelPerformanceResults.ensemble.accuracy.toFixed(2)).replace('{mriAcc}', modelPerformanceResults.mriCNN.accuracy.toFixed(2))}</li>
                <li>• {t('dashboard.finding2').replace('{imp}', modelPerformanceResults.ensemble.improvement.macroF1VsMRI.toFixed(2))}</li>
                <li>• {t('dashboard.finding3')}</li>
                <li>• {t('dashboard.finding4')}</li>
              </ul>
            </div>
          </div>

          {/* Recent Cases Section */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-slate-900">{t('dashboard.recentCases')}</h2>
              <button
                onClick={handleProcessNewCase}
                disabled={isProcessing}
                className="bg-medical-teal text-white px-8 py-3 rounded-full font-bold shadow-md-purple hover:bg-purple-500 transition-all disabled:opacity-50"
              >
                {isProcessing ? t('dashboard.processing') : t('dashboard.processNewCase')}
              </button>
            </div>

            {isProcessing && (
              <div className="mb-6 p-4 bg-medical-teal/5 border border-medical-teal/20 shadow-soft rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                  <span className="text-blue-700 font-medium text-base">{t('dashboard.processing')}</span>
                </div>
              </div>
            )}

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-medical-teal text-base">{case_.id}</span>
                    <span className="text-xs text-slate-500">{formatTimeAgo(case_.timestamp)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-500">{t('dashboard.demographics')}:</span>
                      <div className="font-medium text-slate-800">{case_.gender}, {case_.age}y</div>
                    </div>
                    <div>
                      <span className="text-slate-500">{t('dashboard.status')}:</span>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${case_.status === 'Complete' ? 'bg-green-100 text-green-800' :
                            case_.status === 'Stage 2' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-slate-600'
                          }`}>
                          {translateStatus(case_.status)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">{t('dashboard.stage1Risk')}:</span>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(case_.stage1Risk)} ${getRiskColor(case_.stage1Risk)}`}>
                          {case_.stage1Risk}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500">{t('dashboard.diagnosis')}:</span>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${case_.diagnosis === 'Normal' ? 'bg-green-100 text-green-800' :
                            case_.diagnosis === 'MCI' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {translateDiagnosis(case_.diagnosis)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {case_.stage2Risk && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="text-sm text-slate-500">{t('dashboard.stage2Risk')}:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(case_.stage2Risk)} ${getRiskColor(case_.stage2Risk)}`}>
                        {case_.stage2Risk}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.patientId')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.demographics')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.stage1Risk')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.stage2Risk')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.diagnosis')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.status')}</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 text-sm">{t('dashboard.time')}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCases.map((case_) => (
                    <tr key={case_.id} className="border-b border-gray-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-medical-teal text-sm">{case_.id}</td>
                      <td className="py-3 px-4 text-slate-700 text-sm">
                        {case_.gender}, {case_.age}y
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(case_.stage1Risk)} ${getRiskColor(case_.stage1Risk)}`}>
                          {case_.stage1Risk}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {case_.stage2Risk ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBg(case_.stage2Risk)} ${getRiskColor(case_.stage2Risk)}`}>
                            {case_.stage2Risk}%
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${case_.diagnosis === 'Normal' ? 'bg-green-100 text-green-800' :
                            case_.diagnosis === 'MCI' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {translateDiagnosis(case_.diagnosis)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${case_.status === 'Complete' ? 'bg-green-100 text-green-800' :
                            case_.status === 'Stage 2' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-slate-600'
                          }`}>
                          {translateStatus(case_.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-sm">
                        {formatTimeAgo(case_.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 - Dataset Preview (Dark Navy Background) */}
      <div className="bg-medical-deep py-20 relative overflow-hidden">
        {/* Top Wave for Data Section */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-soft">
            <h2 className="text-3xl font-bold mb-10 text-white text-center">{t('dashboard.datasetPreview')}</h2>
            <div className="grid grid-cols-1 gap-12 text-white">
              {/* MRI Dataset */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <div className="w-6 h-6 rounded-md overflow-hidden mr-2 border border-medical-teal/20">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  MRI Brain Scans Dataset - All Categories
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Normal Cognition */}
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">Normal Cognition</h4>
                    <div className="space-y-2">
                      <div className="relative group">
                        <img
                          src="/datasets/mri/NonDemented/nonDem2540.jpg"
                          alt="Normal Cognition MRI 1"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+1'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">nonDem2540.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/NonDemented/nonDem2541.jpg"
                          alt="Normal Cognition MRI 2"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+2'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">nonDem2541.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/NonDemented/00a98422-8b63-47e6-8b8f-9119984d87ee.jpg"
                          alt="Normal Cognition MRI 3"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=Normal+MRI+3'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">00a98422...87ee.jpg</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Healthy brain structure</p>
                  </div>

                  {/* Very Mild Dementia (MCI) */}
                  <div>
                    <h4 className="text-sm font-medium text-yellow-700 mb-2">Very Mild (MCI)</h4>
                    <div className="space-y-2">
                      <div className="relative group">
                        <img
                          src="/datasets/mri/VeryMildDemented/verymildDem1776.jpg"
                          alt="Very Mild Dementia MRI 1"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+1'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">verymildDem1776.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/VeryMildDemented/verymildDem1777.jpg"
                          alt="Very Mild Dementia MRI 2"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+2'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">verymildDem1777.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/VeryMildDemented/000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg"
                          alt="Very Mild Dementia MRI 3"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=MCI+MRI+3'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">000a074f...7018.jpg</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Early cognitive decline</p>
                  </div>

                  {/* Mild Dementia */}
                  <div>
                    <h4 className="text-sm font-medium text-orange-700 mb-2">Mild Dementia</h4>
                    <div className="space-y-2">
                      <div className="relative group">
                        <img
                          src="/datasets/mri/MildDemented/mildDem701.jpg"
                          alt="Mild Dementia MRI 1"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+1'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">mildDem701.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/MildDemented/mildDem702.jpg"
                          alt="Mild Dementia MRI 2"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+2'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">mildDem702.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/MildDemented/000cdcc4-3e54-4034-a538-203c8047b564.jpg"
                          alt="Mild Dementia MRI 3"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Mild+AD+3'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">000cdcc4...b564.jpg</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Moderate atrophy</p>
                  </div>

                  {/* Moderate Dementia */}
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-2">Moderate Dementia</h4>
                    <div className="space-y-2">
                      <div className="relative group">
                        <img
                          src="/datasets/mri/ModerateDemented/moderateDem36.jpg"
                          alt="Moderate Dementia MRI 1"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+1'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">moderateDem36.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/ModerateDemented/moderateDem37.jpg"
                          alt="Moderate Dementia MRI 2"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+2'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">moderateDem37.jpg</span>
                        </div>
                      </div>
                      <div className="relative group">
                        <img
                          src="/datasets/mri/ModerateDemented/00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg"
                          alt="Moderate Dementia MRI 3"
                          className="w-3/4 h-20 object-contain rounded-md border bg-black mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200/DC143C/FFFFFF?text=Mod+AD+3'
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">00a4080b...b5f5.jpg</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Severe tissue loss</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  Real MRI scans showing progressive structural brain changes across all dementia stages
                </p>
              </div>

              {/* Handwriting Dataset */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-orange-500 mr-2" />
                  Handwriting Analysis Dataset - Multiple Tasks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Task 02 - Connect Dots */}
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-3">TASK_02: Connect Dots</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_02/HC/T02_HC_001.png"
                            alt="HC Task 02 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T02'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T02_HC_001</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_02/AD/T02_AD_001.png"
                            alt="AD Task 02 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T02'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T02_AD_001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task 03 - Vertical Lines */}
                  <div>
                    <h4 className="text-sm font-medium text-purple-700 mb-3">TASK_03: Vertical Lines</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_03/HC/T03_HC_001.png"
                            alt="HC Task 03 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T03'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T03_HC_001</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_03/AD/T03_AD_001.png"
                            alt="AD Task 03 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T03'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T03_AD_001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task 05 - Draw Spirals */}
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-3">TASK_05: Draw Spirals</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_05/HC/T05_HC_001.png"
                            alt="HC Task 05 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T05'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T05_HC_001</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_05/AD/T05_AD_001.png"
                            alt="AD Task 05 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T05'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T05_AD_001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Tasks Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {/* Task 04 - Trace Circle */}
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700 mb-3">TASK_04: Trace Circle</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_04/HC/T04_HC_001.png"
                            alt="HC Task 04 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T04'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T04_HC_001</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_04/AD/T04_AD_001.png"
                            alt="AD Task 04 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T04'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T04_AD_001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task 21 - Complex Drawings */}
                  <div>
                    <h4 className="text-sm font-medium text-pink-700 mb-3">TASK_21: Complex Drawings</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_21/HC/T21_HC_001.png"
                            alt="HC Task 21 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T21'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T21_HC_001</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_21/AD/T21_AD_001.png"
                            alt="AD Task 21 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T21'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T21_AD_001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Task 24 - Clock Drawing */}
                  <div>
                    <h4 className="text-sm font-medium text-teal-700 mb-3">TASK_24: Clock Drawing</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-green-600 mb-1">Healthy Control</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_24/HC/T24_HC_001.png"
                            alt="HC Task 24 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=HC+T24'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T24_HC_001</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-red-600 mb-1">Alzheimer's</p>
                        <div className="relative group">
                          <img
                            src="/datasets/handwriting/TASK_24/AD/T24_AD_001.png"
                            alt="AD Task 24 Sample 1"
                            className="w-full h-20 object-contain rounded-md border bg-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=AD+T24'
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs text-center px-1">T24_AD_001</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-500 mt-4">
                  Real handwriting samples across 6 different tasks showing motor control and cognitive differences between healthy controls and Alzheimer's patients
                </p>
              </div>

              {/* Dataset Statistics */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Dataset Statistics</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-900 mb-2">MRI Dataset</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• <strong>Total Images:</strong> 6,400+ brain scans</li>
                      <li>• <strong>Normal Cognition:</strong> 3,200 cases</li>
                      <li>• <strong>Very Mild Dementia:</strong> 2,240 cases</li>
                      <li>• <strong>Mild Dementia:</strong> 896 cases</li>
                      <li>• <strong>Moderate Dementia:</strong> 64 cases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900 mb-2">Handwriting Dataset</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• <strong>Total Samples:</strong> 1,800+ handwriting tasks</li>
                      <li>• <strong>Healthy Controls (HC):</strong> 900 samples</li>
                      <li>• <strong>Alzheimer's Disease (AD):</strong> 900 samples</li>
                      <li>• <strong>Task Types:</strong> 6 different cognitive tasks</li>
                      <li>• <strong>Features:</strong> Velocity, pressure, tremor analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}