'use client'

import { useState, useEffect } from 'react'
import { Brain, Activity, TrendingUp, Users, Eye, ArrowRight } from 'lucide-react'
import { getRandomMRIImages, getRandomHandwritingImages, MRI_CATEGORIES, HANDWRITING_TASKS, loadClinicalData } from '@/lib/dataService'

interface CaseComparison {
  id: string
  age: number
  gender: string
  diagnosis: string
  riskScore: number
  mriCategory: keyof typeof MRI_CATEGORIES
  handwritingCondition: 'AD' | 'HC'
  similarity: number
}

export default function ComparePage() {
  const [selectedCase, setSelectedCase] = useState<CaseComparison | null>(null)
  const [similarCases, setSimilarCases] = useState<CaseComparison[]>([])
  const [mriExamples, setMriExamples] = useState<any[]>([])
  const [handwritingExamples, setHandwritingExamples] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load example cases from the database
    const exampleCases: CaseComparison[] = [
      {
        id: 'case_001',
        age: 72,
        gender: 'Female',
        diagnosis: 'Mild Cognitive Impairment',
        riskScore: 65,
        mriCategory: 'VeryMildDemented',
        handwritingCondition: 'AD',
        similarity: 0.89
      },
      {
        id: 'case_002',
        age: 68,
        gender: 'Male',
        diagnosis: 'Normal Cognition',
        riskScore: 25,
        mriCategory: 'NonDemented',
        handwritingCondition: 'HC',
        similarity: 0.76
      },
      {
        id: 'case_003',
        age: 75,
        gender: 'Female',
        diagnosis: 'Mild Dementia',
        riskScore: 82,
        mriCategory: 'MildDemented',
        handwritingCondition: 'AD',
        similarity: 0.91
      },
      {
        id: 'case_004',
        age: 71,
        gender: 'Male',
        diagnosis: 'Very Mild Dementia',
        riskScore: 58,
        mriCategory: 'VeryMildDemented',
        handwritingCondition: 'AD',
        similarity: 0.83
      }
    ]
    
    setSimilarCases(exampleCases)
    setSelectedCase(exampleCases[0])
  }, [])

  const handleCaseSelect = (caseData: CaseComparison) => {
    setLoading(true)
    setSelectedCase(caseData)
    
    // Load relevant examples from dataset
    setTimeout(() => {
      const mriImages = getRandomMRIImages(caseData.mriCategory, 4)
      const handwritingImages = getRandomHandwritingImages(undefined, caseData.handwritingCondition, 4)
      
      setMriExamples(mriImages)
      setHandwritingExamples(handwritingImages)
      setLoading(false)
    }, 1000)
  }

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4 border border-white/10">
                    <Users className="w-8 h-8 text-medical-teal" />
                 </div>
                 <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                   Case Match
                 </h1>
              </div>
              <p className="text-xl text-slate-300 font-medium leading-relaxed mb-10">
                Cross-referencing phenotypic signatures against our longitudinal neuro-repository for precision diagnostics.
              </p>
            </div>

            {/* Case Selection Slider/Grid in Navy */}
            <div className="flex overflow-x-auto gap-4 p-2 pb-6 scrollbar-hide no-scrollbar">
               {similarCases.map((caseData) => (
                  <div
                    key={caseData.id}
                    onClick={() => handleCaseSelect(caseData)}
                    className={`flex-shrink-0 w-64 p-6 rounded-[2.5rem] cursor-pointer transition-all duration-500 border-2 ${
                      selectedCase?.id === caseData.id
                        ? 'bg-white border-medical-teal shadow-2xl scale-105'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                       <div className={`text-xs font-black uppercase tracking-widest ${selectedCase?.id === caseData.id ? 'text-medical-teal' : 'text-slate-500'}`}>
                          {(caseData.similarity * 100).toFixed(0)}% Match
                       </div>
                       <div className={`text-xl font-black ${selectedCase?.id === caseData.id ? getRiskColor(caseData.riskScore) : 'text-white'}`}>
                          {caseData.riskScore}%
                       </div>
                    </div>
                    <div className={`text-sm font-black uppercase tracking-tighter mb-1 ${selectedCase?.id === caseData.id ? 'text-slate-900' : 'text-slate-200'}`}>
                       {caseData.gender}, {caseData.age}Y
                    </div>
                    <div className={`text-[10px] font-bold uppercase ${selectedCase?.id === caseData.id ? 'text-slate-500' : 'text-slate-500'}`}>
                       {caseData.diagnosis}
                    </div>
                  </div>
               ))}
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

      {/* Middle Section - Teal Background (Case Analysis) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {selectedCase && (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 space-y-8">
               <div className="grid lg:grid-cols-2 gap-8">
                  {/* MRI Correlation Card */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl overflow-hidden group">
                     <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-6">
                              <Brain className="w-6 h-6 text-white" />
                           </div>
                           <h2 className="text-2xl font-black text-white uppercase tracking-tighter">MRI Correlation</h2>
                        </div>
                        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                           selectedCase.mriCategory === 'NonDemented' ? 'bg-green-500 shadow-green-500/20' :
                           selectedCase.mriCategory === 'VeryMildDemented' ? 'bg-yellow-500 shadow-yellow-500/20' :
                           selectedCase.mriCategory === 'MildDemented' ? 'bg-orange-500 shadow-orange-500/20' :
                           'bg-red-500 shadow-red-500/20'
                        } text-white shadow-xl`}>
                           {MRI_CATEGORIES[selectedCase.mriCategory].label}
                        </div>
                     </div>
                     
                     {loading ? (
                        <div className="h-48 flex items-center justify-center">
                           <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                        </div>
                     ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                           {mriExamples.map((image, index) => (
                              <div key={index} className="aspect-square bg-black rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group-hover:scale-[1.05] duration-500">
                                 <img src={image.path} alt="MRI" className="w-full h-full object-cover" />
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Kinetic Correlation Card */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl overflow-hidden group">
                     <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center">
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-6">
                              <Activity className="w-6 h-6 text-white" />
                           </div>
                           <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Kinetic Correlation</h2>
                        </div>
                        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                           selectedCase.handwritingCondition === 'HC' ? 'bg-green-500 shadow-green-500/20' : 'bg-red-500 shadow-red-500/20'
                        } text-white shadow-xl`}>
                           {selectedCase.handwritingCondition === 'HC' ? 'Healthy Control' : 'Deviant Signature'}
                        </div>
                     </div>
                     
                     {loading ? (
                        <div className="h-48 flex items-center justify-center">
                           <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                        </div>
                     ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                           {handwritingExamples.map((image, index) => (
                              <div key={index} className="aspect-square bg-white rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group-hover:scale-[1.05] duration-500 p-2">
                                 <img src={image.path} alt="Kinetic" className="w-full h-full object-contain" />
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>

               {/* Patient Profile Card */}
               <div className="bg-medical-deep/30 rounded-[3rem] p-10 border border-white/10 backdrop-blur-md">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                     <div className="flex-1 space-y-2">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Clinical Snapshot</div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Case Index: {selectedCase.id}</h3>
                        <p className="text-slate-400 font-medium">{selectedCase.diagnosis}</p>
                     </div>
                     <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {[
                           { label: 'Age Bias', value: selectedCase.age + 'Y' },
                           { label: 'Gender Pheno', value: selectedCase.gender },
                           { label: 'Variance', value: selectedCase.riskScore + '%' }
                        ].map((stat, i) => (
                           <div key={i} className="flex flex-col items-center">
                              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                              <div className="text-2xl font-black text-white">{stat.value}</div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Bottom Curve for Teal Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Bottom Section - Light Background (Insights) */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCase && (
            <div className="grid md:grid-cols-2 gap-12">
               <div className="bg-white p-12 rounded-[3.5rem] border border-medical-teal/10 shadow-soft">
                  <div className="flex items-center mb-8">
                     <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-blue-500" />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Analytical Similarities</h3>
                  </div>
                  <ul className="space-y-4">
                     {[
                        'Matched structural atrophy patterns in hippocampal regions.',
                        'Identical kinetic tremor variance in task-based spirals.',
                        'Aligned demographic risk factors and longitudinal markers.',
                        'Highly congruent global risk profile weighting.'
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-white p-12 rounded-[3.5rem] border border-medical-teal/10 shadow-soft">
                  <div className="flex items-center mb-8">
                     <div className="w-10 h-10 bg-medical-teal/10 rounded-2xl flex items-center justify-center mr-4">
                        <Eye className="w-6 h-6 text-medical-teal" />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Clinical Significance</h3>
                  </div>
                  <ul className="space-y-4">
                     {[
                        'Evidence-based cross-referencing for diagnostic validation.',
                        'Cross-modality pattern matching across MRI and Kinetic data.',
                        'Longitudinal outcome projection based on matched peer cases.',
                        'Enhanced confidence in algorithmic risk attribution.'
                     ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                           <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-1.5 flex-shrink-0"></div>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}