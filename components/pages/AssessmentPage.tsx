'use client'

import { useState } from 'react'
import { Upload, Brain, FileText, Activity, AlertCircle, CheckCircle } from 'lucide-react'

interface AssessmentData {
  mriUploaded: boolean
  handwritingUploaded: boolean
  clinicalCompleted: boolean
  riskScore?: number
  diagnosis?: string
}

export default function AssessmentPage() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    mriUploaded: false,
    handwritingUploaded: false,
    clinicalCompleted: false
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const steps = [
    { id: 1, name: 'Clinical Information', icon: FileText, completed: assessmentData.clinicalCompleted },
    { id: 2, name: 'MRI Scan Upload', icon: Brain, completed: assessmentData.mriUploaded },
    { id: 3, name: 'Handwriting Sample', icon: Activity, completed: assessmentData.handwritingUploaded },
    { id: 4, name: 'AI Analysis', icon: AlertCircle, completed: false }
  ]

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setAssessmentData(prev => ({
        ...prev,
        riskScore: Math.random() * 100,
        diagnosis: Math.random() > 0.5 ? 'Low Risk' : 'Moderate Risk'
      }))
      setIsAnalyzing(false)
      setCurrentStep(4)
    }, 3000)
  }

  const canAnalyze = assessmentData.mriUploaded && assessmentData.handwritingUploaded && assessmentData.clinicalCompleted

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            Risk Assessment
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Upload your medical data and get AI-powered risk analysis for neurodegenerative conditions.
          </p>

          {/* Progress Tracker in Navy Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-between relative px-4">
               {/* Background line */}
               <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-[22px] z-0"></div>
               
               {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = step.completed
                
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 shadow-xl border-2
                      ${isCompleted ? 'bg-green-500 border-white text-white rotate-[360deg]' : 
                        isActive ? 'bg-medical-teal border-white text-white scale-110 shadow-glow' : 'bg-medical-deep border-white/20 text-slate-500'}
                    `}>
                      {isCompleted ? <CheckCircle className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-medical-teal' : 'text-slate-500'}`}>
                      {step.name}
                    </span>
                  </div>
                )
              })}
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

      {/* Middle Section - Teal Background (Assessment Cards) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Clinical Information Card */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
              assessmentData.clinicalCompleted ? 'border-green-400 bg-green-400/10' : 'border-white/20'
            }`}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                <FileText className={`w-10 h-10 ${assessmentData.clinicalCompleted ? 'text-green-400' : 'text-white'}`} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Clinical Info</h3>
              <p className="text-slate-200 mb-8 font-medium leading-relaxed">
                Provide basic medical information and cognitive test scores.
              </p>
              <button
                onClick={() => {
                  setAssessmentData(prev => ({ ...prev, clinicalCompleted: true }))
                  setCurrentStep(2)
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${
                  assessmentData.clinicalCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-medical-deep hover:bg-mint hover:shadow-xl'
                }`}
              >
                {assessmentData.clinicalCompleted ? 'Completed' : 'Fill Form'}
              </button>
            </div>

            {/* MRI Upload Card */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
              assessmentData.mriUploaded ? 'border-green-400 bg-green-400/10' : 'border-white/20'
            }`}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                <Brain className={`w-10 h-10 ${assessmentData.mriUploaded ? 'text-green-400' : 'text-white'}`} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">MRI Scan</h3>
              <p className="text-slate-200 mb-8 font-medium leading-relaxed">
                Upload your brain MRI scan for structural analysis.
              </p>
              <button
                onClick={() => {
                  setAssessmentData(prev => ({ ...prev, mriUploaded: true }))
                  setCurrentStep(3)
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${
                  assessmentData.mriUploaded
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-medical-deep hover:bg-mint hover:shadow-xl'
                }`}
              >
                {assessmentData.mriUploaded ? 'Uploaded' : 'Upload MRI'}
              </button>
            </div>

            {/* Handwriting Card */}
            <div className={`bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
              assessmentData.handwritingUploaded ? 'border-green-400 bg-green-400/10' : 'border-white/20'
            }`}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                <Activity className={`w-10 h-10 ${assessmentData.handwritingUploaded ? 'text-green-400' : 'text-white'}`} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Handwriting</h3>
              <p className="text-slate-200 mb-8 font-medium leading-relaxed">
                Upload handwriting samples for motor analysis.
              </p>
              <button
                onClick={() => {
                  setAssessmentData(prev => ({ ...prev, handwritingUploaded: true }))
                }}
                className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${
                  assessmentData.handwritingUploaded
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-medical-deep hover:bg-mint hover:shadow-xl'
                }`}
              >
                {assessmentData.handwritingUploaded ? 'Uploaded' : 'Upload Sample'}
              </button>
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

      {/* Bottom Section - Light Background (Results & Start Analysis) */}
      <div className="bg-slate-50 py-20 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Analysis Button */}
          {canAnalyze && !assessmentData.riskScore && (
            <div className="text-center mb-20 animate-in fade-in zoom-in duration-500">
               <div className="inline-block p-1 rounded-[2.5rem] bg-gradient-to-r from-medical-deep via-medical-teal to-mint shadow-xl">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-medical-deep text-white px-12 py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-widest hover:bg-transparent hover:text-white transition-all duration-300 disabled:opacity-50 flex items-center space-x-4"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Activity className="w-8 h-8" />
                        <span>Start AI Analysis</span>
                      </>
                    )}
                  </button>
               </div>
               <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs">All data uploaded. Ready for multi-modal synthesis.</p>
            </div>
          )}

          {/* Results Display */}
          {assessmentData.riskScore && (
            <div className="bg-white rounded-[3rem] shadow-soft border border-slate-200 p-12 lg:p-16 animate-in slide-in-from-bottom-10 fade-in duration-700">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Result Gauge */}
                <div className="flex-shrink-0 relative w-64 h-64 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-slate-100" />
                      <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="20" fill="transparent" strokeDasharray={691} strokeDashoffset={691 - (691 * (assessmentData.riskScore / 100))} className={`transition-all duration-2000 ease-out ${assessmentData.diagnosis === 'Low Risk' ? 'text-green-500' : 'text-orange-500'}`} />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-6xl font-black ${assessmentData.diagnosis === 'Low Risk' ? 'text-green-600' : 'text-orange-600'}`}>
                        {assessmentData.riskScore.toFixed(0)}%
                      </span>
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Risk Score</span>
                   </div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Analysis Results</h3>
                  <div className="grid sm:grid-cols-2 gap-8 mb-8">
                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Assessment Outcome</span>
                        <div className={`text-2xl font-black uppercase ${assessmentData.diagnosis === 'Low Risk' ? 'text-green-600' : 'text-orange-600'}`}>
                          {assessmentData.diagnosis}
                        </div>
                     </div>
                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Data Confidence</span>
                        <div className="text-2xl font-black text-medical-teal uppercase">High</div>
                     </div>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    The AI has completed a comprehensive analysis of your clinical data, MRI scans, and handwriting patterns. Based on the multi-modal synthesis, the risk level is determined to be <span className="font-black text-slate-900">{assessmentData.diagnosis}</span>.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                     <button className="px-8 py-4 bg-medical-deep text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">Download Full Report</button>
                     <button className="px-8 py-4 bg-slate-200 text-slate-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-300 transition-all">Consult Specialist</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!canAnalyze && (
             <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem] p-16 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                   <AlertCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-slate-400 uppercase tracking-tighter">Complete all steps above to unlock AI Analysis</h4>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}