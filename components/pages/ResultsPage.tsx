'use client'

import { useState, useEffect } from 'react'
import { Brain, Activity, FileText, TrendingUp, AlertTriangle, CheckCircle, Eye, Download, Info } from 'lucide-react'
import { analyzeMRIFeatures, analyzeHandwritingFeatures, getBiomarkerData } from '@/lib/dataService'

interface AnalysisResult {
  mri: {
    hippocampalVolume: number
    corticalThickness: number
    ventricularSize: number
    whiteMatterLesions: number
  }
  handwriting: {
    velocity: number
    pressure: number
    tremor: number
    fluency: number
  }
  biomarkers: {
    abeta42_40_ratio: number
    ptau181: number
    nfl: number
    apoe4_status: boolean
  }
  riskScore: number
  confidence: number
  recommendation: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedView, setSelectedView] = useState<'overview' | 'mri' | 'handwriting' | 'biomarkers'>('overview')

  useEffect(() => {
    // Simulate loading analysis results
    setTimeout(() => {
      const mockResults: AnalysisResult = {
        mri: analyzeMRIFeatures('/datasets/Image dataset/combined_images/MildDemented/sample.jpg'),
        handwriting: analyzeHandwritingFeatures('/datasets/Handwriting Dataset/offline/TASK_02/AD/sample.png'),
        biomarkers: {
          abeta42_40_ratio: getBiomarkerData('patient_001').abeta42_40_ratio,
          ptau181: getBiomarkerData('patient_001').ptau181,
          nfl: getBiomarkerData('patient_001').nfl,
          apoe4_status: getBiomarkerData('patient_001').apoe4_status
        },
        riskScore: 65,
        confidence: 87,
        recommendation: 'Moderate risk detected. Recommend follow-up with neurologist and cognitive assessment.'
      }
      setResults(mockResults)
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className=" rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your data...</p>
        </div>
      </div>
    )
  }

  if (!results) return null

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600'
    if (score < 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskBgColor = (score: number) => {
    if (score < 30) return 'bg-green-100'
    if (score < 70) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4 border border-white/10">
                    <TrendingUp className="w-8 h-8 text-medical-teal" />
                 </div>
                 <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                   Analysis Results
                 </h1>
              </div>
              <p className="text-xl text-slate-300 max-w-2xl font-medium leading-relaxed mb-8">
                {results.recommendation}
              </p>
            </div>

            {/* Risk Gauge in Navy Header */}
            <div className={`${getRiskBgColor(results.riskScore).replace('bg-', 'bg-').replace('100', '10')} backdrop-blur-xl rounded-[3rem] p-10 border border-white/10 shadow-2xl text-center min-w-[320px] relative overflow-hidden group`}>
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Activity className="w-32 h-32" />
               </div>
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 relative z-10">Overall Risk Scence</h3>
               <div className="relative inline-flex items-center justify-center mb-6 z-10">
                  <svg className="w-40 h-40 transform -rotate-90">
                     <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                     <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * results.riskScore / 100)} className={`transition-all duration-2000 ease-out ${getRiskColor(results.riskScore).replace('text-', 'text-')}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className={`text-5xl font-black ${getRiskColor(results.riskScore)}`}>{results.riskScore}%</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{results.confidence}% Confidence</span>
                  </div>
               </div>
               <div className={`px-6 py-2 rounded-2xl text-sm font-black uppercase tracking-widest relative z-10 ${getRiskColor(results.riskScore).replace('text-', 'bg-').replace('600', '500')} text-white shadow-lg`}>
                  {results.riskScore < 30 ? 'Low Risk' : results.riskScore < 70 ? 'Moderate Risk' : 'High Risk'}
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave for Top Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-medical-teal">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Middle Section - Teal Background (Detailed Analysis) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'mri', name: 'MRI Analysis', icon: Brain },
              { id: 'handwriting', name: 'Handwriting', icon: Activity },
              { id: 'biomarkers', name: 'Biomarkers', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = selectedView === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id as any)}
                  className={`flex items-center px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95 border-2 ${
                    isActive
                      ? 'bg-white text-medical-deep border-white'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-medical-teal' : 'text-white'}`} />
                  {tab.name}
                </button>
              )
            })}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            {selectedView === 'overview' && (
              <div className="grid md:grid-cols-3 gap-8">
                {/* MRI Summary */}
                <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 shadow-2xl group hover:bg-white/15 transition-all">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-4">
                       <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Brain Structure</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Hippocampal</span>
                        <span className={`text-lg font-black ${results.mri.hippocampalVolume > 0.8 ? 'text-green-400' : 'text-orange-400'}`}>
                          {(results.mri.hippocampalVolume * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                         <div className={`h-full ${results.mri.hippocampalVolume > 0.8 ? 'bg-green-400' : 'bg-orange-400'}`} style={{ width: `${results.mri.hippocampalVolume * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Cortical</span>
                        <span className={`text-lg font-black ${results.mri.corticalThickness > 0.8 ? 'text-green-400' : 'text-orange-400'}`}>
                          {(results.mri.corticalThickness * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                         <div className={`h-full ${results.mri.corticalThickness > 0.8 ? 'bg-green-400' : 'bg-orange-400'}`} style={{ width: `${results.mri.corticalThickness * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Handwriting Summary */}
                <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 shadow-2xl group hover:bg-white/15 transition-all">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-4">
                       <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Motor Function</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Fluency</span>
                        <span className={`text-lg font-black ${results.handwriting.fluency > 0.6 ? 'text-green-400' : 'text-orange-400'}`}>
                          {(results.handwriting.fluency * 100).toFixed(0)}%
                        </span>
                      </div>
                       <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                         <div className={`h-full ${results.handwriting.fluency > 0.6 ? 'bg-green-400' : 'bg-orange-400'}`} style={{ width: `${results.handwriting.fluency * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Tremor</span>
                        <span className={`text-lg font-black ${results.handwriting.tremor < 0.4 ? 'text-green-400' : 'text-orange-400'}`}>
                          {(results.handwriting.tremor * 100).toFixed(0)}%
                        </span>
                      </div>
                       <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                         <div className={`h-full ${results.handwriting.tremor < 0.4 ? 'bg-green-400' : 'bg-orange-400'}`} style={{ width: `${results.handwriting.tremor * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biomarkers Summary */}
                <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 shadow-2xl group hover:bg-white/15 transition-all">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-4">
                       <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Blood Markers</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Amyloid Beta</span>
                        <span className={`text-lg font-black ${results.biomarkers.abeta42_40_ratio > 0.08 ? 'text-green-400' : 'text-orange-400'}`}>
                          {results.biomarkers.abeta42_40_ratio.toFixed(3)}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Ratio Level Indicator</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">APOE4 Status</span>
                        <span className={`text-lg font-black ${!results.biomarkers.apoe4_status ? 'text-green-400' : 'text-orange-400'}`}>
                          {results.biomarkers.apoe4_status ? 'POS' : 'NEG'}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase">Genetic Predisposition</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedView === 'mri' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 border border-white/20 shadow-2xl">
                <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center">
                   <Brain className="w-10 h-10 mr-4" />
                   MRI Structural Synthesis
                </h3>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    {Object.entries(results.mri).map(([key, value]) => {
                      const percentage = value * 100
                      const isGood = key === 'hippocampalVolume' || key === 'corticalThickness' 
                        ? percentage > 80 
                        : percentage < 20
                      
                      return (
                        <div key={key} className="bg-medical-deep/30 rounded-3xl p-6 border border-white/10">
                          <div className="flex justify-between mb-4">
                            <span className="text-xs font-black text-white uppercase tracking-widest">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className={`text-xl font-black ${isGood ? 'text-green-400' : 'text-orange-400'}`}>
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-3 shadow-inner overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ease-out rounded-full ${isGood ? 'bg-green-400' : 'bg-orange-400'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="bg-medical-deep/40 rounded-[3rem] p-10 border border-white/10 flex flex-col items-center justify-center text-center shadow-inner group">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/10 ring-8 ring-white/5 transition-all group-hover:scale-110">
                       <Eye className="w-16 h-16 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">3D Visualization</h4>
                    <p className="text-slate-400 font-medium">Cross-sectional volumetric reconstruction is ready for review.</p>
                    <button className="mt-8 px-8 py-3 bg-white text-medical-deep rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-mint transition-all">Launch Viewer</button>
                  </div>
                </div>
              </div>
            )}

            {selectedView === 'handwriting' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 border border-white/20 shadow-2xl">
                <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center">
                   <Activity className="w-10 h-10 mr-4" />
                   Motor Function Profile
                </h3>
                <div className="grid md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    {Object.entries(results.handwriting).map(([key, value]) => {
                      const percentage = value * 100
                      const isGood = key === 'velocity' || key === 'pressure' || key === 'fluency'
                        ? percentage > 60
                        : percentage < 40
                      
                      return (
                        <div key={key} className="bg-medical-deep/30 rounded-3xl p-6 border border-white/10">
                          <div className="flex justify-between mb-4">
                            <span className="text-xs font-black text-white uppercase tracking-widest">
                              {key}
                            </span>
                            <span className={`text-xl font-black ${isGood ? 'text-green-400' : 'text-orange-400'}`}>
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-3 shadow-inner overflow-hidden">
                            <div
                              className={`h-full transition-all duration-1000 ease-out rounded-full ${isGood ? 'bg-green-400' : 'bg-orange-400'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="bg-medical-deep/40 rounded-[3rem] p-10 border border-white/10 flex flex-col items-center justify-center text-center shadow-inner min-h-[400px]">
                    <Activity className="w-20 h-20 text-medical-teal mb-8" />
                    <h4 className="text-xl font-black text-white mb-4 uppercase tracking-tighter">Kinematic signature</h4>
                    <p className="text-slate-400 font-medium mb-8">Temporal writing patterns indicate early-stage motor variance.</p>
                    <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/5 grid grid-cols-2 gap-4">
                       <div className="text-left">
                          <span className="text-[10px] font-black text-slate-500 uppercase">Latency</span>
                          <div className="text-lg font-black text-white">42ms</div>
                       </div>
                       <div className="text-left">
                          <span className="text-[10px] font-black text-slate-500 uppercase">Entropy</span>
                          <div className="text-lg font-black text-white">0.84</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedView === 'biomarkers' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-12 border border-white/20 shadow-2xl">
                <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center">
                   <FileText className="w-10 h-10 mr-4" />
                   Biomarker Panel
                </h3>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className={`p-8 rounded-[2rem] border transition-all ${results.biomarkers.abeta42_40_ratio > 0.08 ? 'bg-green-400/10 border-green-400/20' : 'bg-orange-400/10 border-orange-400/20'}`}>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Aβ42/40 Ratio</span>
                      <div className={`text-3xl font-black mb-4 ${results.biomarkers.abeta42_40_ratio > 0.08 ? 'text-green-400' : 'text-orange-400'}`}>{results.biomarkers.abeta42_40_ratio.toFixed(3)}</div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Status: {results.biomarkers.abeta42_40_ratio > 0.08 ? 'Normal' : 'Abnormal'}</p>
                    </div>
                    
                    <div className={`p-8 rounded-[2rem] border transition-all ${results.biomarkers.ptau181 < 20 ? 'bg-green-400/10 border-green-400/20' : 'bg-orange-400/10 border-orange-400/20'}`}>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">p-Tau181</span>
                      <div className={`text-3xl font-black mb-4 ${results.biomarkers.ptau181 < 20 ? 'text-green-400' : 'text-orange-400'}`}>{results.biomarkers.ptau181.toFixed(1)} <span className="text-sm">pg/mL</span></div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Status: {results.biomarkers.ptau181 < 20 ? 'Normal' : 'Elevated'}</p>
                    </div>

                    <div className={`p-8 rounded-[2rem] border transition-all ${results.biomarkers.nfl < 15 ? 'bg-green-400/10 border-green-400/20' : 'bg-orange-400/10 border-orange-400/20'}`}>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Neurofilament Light</span>
                      <div className={`text-3xl font-black mb-4 ${results.biomarkers.nfl < 15 ? 'text-green-400' : 'text-orange-400'}`}>{results.biomarkers.nfl.toFixed(1)} <span className="text-sm">pg/mL</span></div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Status: {results.biomarkers.nfl < 15 ? 'Normal' : 'Caution'}</p>
                    </div>

                    <div className={`p-8 rounded-[2rem] border transition-all ${!results.biomarkers.apoe4_status ? 'bg-green-400/10 border-green-400/20' : 'bg-orange-400/10 border-orange-400/20'}`}>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">APOE4 Genotype</span>
                      <div className={`text-3xl font-black mb-4 ${!results.biomarkers.apoe4_status ? 'text-green-400' : 'text-orange-400'}`}>{results.biomarkers.apoe4_status ? 'POS' : 'NEG'}</div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Genetic Risk Factor</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10">
                      <h5 className="text-lg font-black text-white mb-6 uppercase tracking-tighter flex items-center">
                         <Info className="w-6 h-6 mr-3 text-medical-teal" />
                         Clinical Significance
                      </h5>
                      <ul className="space-y-4">
                        {[
                          'Proteomic profile suggests early synaptic distress.',
                          'Multi-modal correlation (MRI+Markers) shows high concordance.',
                          'Longitudinal monitoring recommended every 6 months.'
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4 group">
                             <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-2 ring-4 ring-medical-teal/10"></div>
                             <span className="text-slate-300 font-medium leading-relaxed transition-colors group-hover:text-white">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Curve for Teal Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Bottom Section - Light Background (Actions) */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="px-10 py-5 bg-medical-deep text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center">
               <Download className="w-5 h-5 mr-3" />
               Download Report
            </button>
            <button className="px-10 py-5 bg-white text-medical-deep border-2 border-medical-deep/10 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-medical-teal/5 transition-all shadow-lg active:scale-95 flex items-center">
               <Eye className="w-5 h-5 mr-3" />
               Share with Doctor
            </button>
            <button className="px-10 py-5 bg-medical-teal text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-mint hover:text-medical-deep transition-all shadow-xl active:scale-95 flex items-center">
               <Activity className="w-5 h-5 mr-3" />
               Schedule Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}