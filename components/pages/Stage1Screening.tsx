'use client'

import { useState, useEffect } from 'react'
import { Users, Activity, FileText, Brain, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { performStage1Assessment, getRandomHandwritingImages, HANDWRITING_TASKS } from '@/lib/dataService'

interface ClinicalForm {
  age: number
  gender: string
  education: number
  mmse: number
  cdr: number
}

interface HandwritingTask {
  id: string
  name: string
  completed: boolean
  velocity: number
  pressure: number
  tremor: number
  fluency: number
  sampleImage: string
}

export default function Stage1Screening() {
  const [currentStep, setCurrentStep] = useState(1)
  const [clinicalData, setClinicalData] = useState<ClinicalForm>({
    age: 65,
    gender: 'M',
    education: 12,
    mmse: 28,
    cdr: 0
  })
  
  const [handwritingTasks, setHandwritingTasks] = useState<HandwritingTask[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    // Initialize handwriting tasks with sample images including spiral and clock
    const taskData = [
      { id: 'TASK_02', name: 'Connect Dots' },
      { id: 'TASK_03', name: 'Vertical Lines' },
      { id: 'TASK_04', name: 'Trace Circle' },
      { id: 'TASK_05', name: 'Draw Clock' }
    ]
    
    const tasks = taskData.map((taskInfo, index) => {
      const samples = getRandomHandwritingImages(taskInfo.id, undefined, 1)
      return {
        id: taskInfo.id,
        name: taskInfo.name,
        completed: false,
        velocity: 0.7 + Math.random() * 0.3,
        pressure: 0.6 + Math.random() * 0.4,
        tremor: Math.random() * 0.3,
        fluency: 0.7 + Math.random() * 0.3,
        sampleImage: samples[0]?.path || ''
      }
    })
    setHandwritingTasks(tasks)
  }, [])

  const handleClinicalSubmit = () => {
    setCurrentStep(2)
  }

  const completeHandwritingTask = (taskId: string) => {
    setHandwritingTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: true, velocity: 0.4 + Math.random() * 0.4, tremor: Math.random() * 0.6 }
          : task
      )
    )
  }

  const performAnalysis = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(async () => {
      const handwritingData = handwritingTasks.map(task => ({
        taskId: task.id,
        taskName: task.name,
        velocity: task.velocity,
        pressure: task.pressure,
        tremor: task.tremor,
        fluency: task.fluency,
        pauseTime: Math.random() * 2,
        strokeWidth: 1 + Math.random() * 2,
        condition: task.tremor > 0.4 ? 'AD' as const : 'HC' as const,
        features: Array.from({length: 10}, () => Math.random())
      }))

      const stage1Results = await performStage1Assessment(clinicalData, handwritingData)
      setResults(stage1Results)
      setIsAnalyzing(false)
      setCurrentStep(3)
    }, 3000)
  }

  const allTasksCompleted = handwritingTasks.every(task => task.completed)

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              Stage 1 Screening
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Low-cost clinical assessment and digital handwriting analysis for early neurodegenerative detection.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, name: 'Clinical', icon: Users },
              { step: 2, name: 'Handwriting', icon: Activity },
              { step: 3, name: 'Risk Profile', icon: Brain }
            ].map((item, index) => {
              const Icon = item.icon
              const isActive = currentStep === item.step
              const isCompleted = currentStep > item.step
              
              return (
                <div key={item.step} className="flex items-center">
                  <div className={`group flex flex-col items-center transition-all duration-500 ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-2xl mb-3 ${
                      isCompleted ? 'bg-green-500 border-green-500 text-white' :
                      isActive ? 'bg-medical-teal border-medical-teal text-white ring-4 ring-medical-teal/20' : 'bg-white/10 border-white/20 text-slate-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {item.name}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className="hidden sm:block mx-8 h-px w-12 bg-white/10 relative">
                       <ArrowRight className="absolute -top-3 -right-3 w-6 h-6 text-white/10" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Wave for Top Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-medical-teal">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Middle Section - Teal Background (Content) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* Step 1: Clinical Assessment */}
            {currentStep === 1 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-10">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 border border-white/10">
                      <Users className="w-8 h-8 text-white" />
                   </div>
                   <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Clinical Intake</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Baseline Demographics</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="group">
                        <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-3 transition-colors group-focus-within:text-medical-teal">Subject Age</label>
                        <input
                          type="number"
                          value={clinicalData.age}
                          onChange={(e) => setClinicalData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                          className="w-full bg-medical-deep/30 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:ring-4 focus:ring-medical-teal/20 transition-all outline-none"
                          min="18"
                          max="100"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-3">Gender Manifestation</label>
                        <select
                          value={clinicalData.gender}
                          onChange={(e) => setClinicalData(prev => ({ ...prev, gender: e.target.value }))}
                          className="w-full bg-medical-deep/30 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:ring-4 focus:ring-medical-teal/20 transition-all outline-none appearance-none"
                        >
                          <option value="M" className="bg-medical-deep">Male</option>
                          <option value="F" className="bg-medical-deep">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Cognitive Baseline</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="group">
                        <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-3">MMSE Index (0-30)</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={clinicalData.mmse}
                            onChange={(e) => setClinicalData(prev => ({ ...prev, mmse: parseInt(e.target.value) }))}
                            className="w-full bg-medical-deep/30 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:ring-4 focus:ring-medical-teal/20 transition-all outline-none"
                            min="0"
                            max="30"
                          />
                          <p className="absolute -bottom-6 left-0 text-[9px] font-bold text-slate-400 uppercase">Mini-Mental State Examination</p>
                        </div>
                      </div>
                      <div className="group mt-4">
                        <label className="block text-[10px] font-black text-white uppercase tracking-widest mb-3">CDR Gradient (0-3)</label>
                        <div className="relative">
                          <select
                            value={clinicalData.cdr}
                            onChange={(e) => setClinicalData(prev => ({ ...prev, cdr: parseFloat(e.target.value) }))}
                            className="w-full bg-medical-deep/30 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:ring-4 focus:ring-medical-teal/20 transition-all outline-none appearance-none"
                          >
                            <option value={0} className="bg-medical-deep">0 - Normal</option>
                            <option value={0.5} className="bg-medical-deep">0.5 - Very Mild</option>
                            <option value={1} className="bg-medical-deep">1 - Mild</option>
                            <option value={2} className="bg-medical-deep">2 - Moderate</option>
                            <option value={3} className="bg-medical-deep">3 - Severe</option>
                          </select>
                          <p className="absolute -bottom-6 left-0 text-[9px] font-bold text-slate-400 uppercase">Clinical Dementia Rating</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-16 text-center">
                  <button
                    onClick={handleClinicalSubmit}
                    className="group relative px-12 py-5 bg-white text-medical-deep rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-mint transition-all active:scale-95 flex items-center mx-auto"
                  >
                    <span>Proceed to Handwriting Tasks</span>
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Handwriting Tasks */}
            {currentStep === 2 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-10">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 border border-white/10">
                      <Activity className="w-8 h-8 text-white" />
                   </div>
                   <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Kinematic signature</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {handwritingTasks.map((task, index) => (
                    <div key={task.id} className={`group relative rounded-[2.5rem] p-10 border-2 transition-all duration-500 hover:shadow-2xl ${
                      task.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-medical-deep/20 border-white/10 hover:border-white/30'
                    }`}>
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">{task.name}</h3>
                        {task.completed && (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {task.sampleImage && (
                        <div className="relative mb-8 rounded-3xl overflow-hidden border-2 border-white/10 bg-white p-2 shadow-inner group-hover:scale-[1.02] transition-transform">
                          <img 
                            src={task.sampleImage} 
                            alt={`${task.name} sample`}
                            className="w-full h-40 object-contain transition-opacity duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x150/4ECDC4/FFFFFF?text=${task.name.replace(' ', '+')}`
                            }}
                          />
                          <div className="absolute top-4 right-4 bg-medical-deep/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">Reference</div>
                        </div>
                      )}
                      
                      {task.completed ? (
                        <div className="grid grid-cols-3 gap-4 animate-in slide-in-from-bottom-4 duration-500">
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Velocity</span>
                            <span className={`text-lg font-black ${task.velocity < 0.5 ? 'text-orange-400' : 'text-green-400'}`}>
                              {(task.velocity * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Tremor</span>
                            <span className={`text-lg font-black ${task.tremor > 0.4 ? 'text-red-400' : 'text-green-400'}`}>
                              {(task.tremor * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Fluency</span>
                            <span className={`text-lg font-black ${task.fluency < 0.5 ? 'text-orange-400' : 'text-green-400'}`}>
                              {(task.fluency * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => completeHandwritingTask(task.id)}
                          className="w-full bg-white/10 hover:bg-white text-white hover:text-medical-deep py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 border border-white/10"
                        >
                          Initiate Test 0{index + 1}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {allTasksCompleted && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={performAnalysis}
                      disabled={isAnalyzing}
                      className="relative px-16 py-6 bg-white text-medical-deep rounded-[2.5rem] font-black text-lg uppercase tracking-tighter shadow-2xl hover:bg-mint transition-all disabled:opacity-50 active:scale-95 group overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center">
                        {isAnalyzing ? (
                          <>
                             <div className="w-6 h-6 border-4 border-medical-deep border-t-transparent rounded-full animate-spin mr-4"></div>
                             <span>Deep Learning Processing...</span>
                          </>
                        ) : (
                          <>
                             <span>Synthesize Stage 1 Profile</span>
                             <Activity className="ml-4 w-6 h-6 group-hover:animate-pulse" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                )}
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

      {/* Bottom Section - Light Background (Results) */}
      <div className="bg-slate-50 py-24 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep === 3 && results ? (
            <div className="animate-in slide-in-from-bottom-12 duration-1000">
               <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                  <div className="flex-1 bg-white rounded-[4rem] p-12 shadow-soft border border-medical-teal/10 flex flex-col justify-center text-center lg:text-left">
                     <div className="flex items-center justify-center lg:justify-start mb-8">
                        <div className="w-14 h-14 bg-medical-teal/10 rounded-full flex items-center justify-center mr-4">
                           <Brain className="w-8 h-8 text-medical-teal" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Derived Inference</h2>
                     </div>

                     <div className="flex flex-col sm:flex-row items-center gap-12">
                        <div className="relative inline-flex items-center justify-center group">
                           <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 transition-all duration-1000 ${
                              results.riskLevel === 'Low' ? 'bg-green-500' :
                              results.riskLevel === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                           }`}></div>
                           <svg className="w-48 h-48 transform -rotate-90">
                              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-100" />
                              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={527} strokeDashoffset={527 - (527 * results.riskScore / 100)} className={`transition-all duration-2000 ease-out ${
                                 results.riskLevel === 'Low' ? 'text-green-500' :
                                 results.riskLevel === 'Moderate' ? 'text-yellow-500' : 'text-red-500'
                              }`} />
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-4xl font-black text-slate-900">{results.riskScore.toFixed(0)}%</span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Global Score</span>
                           </div>
                        </div>

                        <div className="flex-1">
                           <div className={`inline-block px-8 py-3 rounded-2xl text-xl font-black uppercase tracking-widest mb-6 ${
                              results.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                              results.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                           }`}>
                              {results.riskLevel} Risk Profile
                           </div>
                           <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                              The SVM classifier indicates a {results.riskLevel.toLowerCase()} probability of early cognitive deviation based on kinetic signature variance.
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="w-full lg:w-[400px] flex flex-col gap-6">
                    {results.proceedToStage2 ? (
                      <div className="flex-1 bg-medical-deep rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12 transition-transform group-hover:scale-110">
                           <AlertTriangle className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-medical-teal">Clinical Protocol</h3>
                        <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                          Phase 1 variance detected. Transition to Multi-Modal Analysis (Stage 2) is mandatory for definitive diagnosis.
                        </p>
                        <button className="w-full py-5 bg-white text-medical-deep rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-mint transition-all shadow-xl active:scale-95">
                           Initiate Stage 2
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 bg-medical-teal rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 transform -rotate-12 transition-transform group-hover:scale-110">
                           <CheckCircle className="w-32 h-32" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-white">Maintenance Phase</h3>
                        <p className="text-white/80 font-medium mb-8 leading-relaxed">
                          Core signatures within normative range. Recommend routine surveillance and annual cognitive snapshots.
                        </p>
                        <button className="w-full py-5 bg-white/20 border-2 border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/30 transition-all active:scale-95">
                           Export Snapshot
                        </button>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
               <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                  <Activity className="w-12 h-12 text-slate-400" />
               </div>
               <h3 className="text-xl font-black text-slate-400 uppercase tracking-tighter">Synthetic Model Awaiting Intake</h3>
               <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Complete Clinical and Handwriting Assessments to View Inference</p>
            </div>
          )}
        </div>
      </div>

      {/* Global Analysis Loader Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-medical-deep/80 backdrop-blur-xl flex items-center justify-center z-[100] animate-in fade-in duration-500">
          <div className="max-w-md w-full mx-auto px-10 text-center">
            <div className="relative w-32 h-32 mx-auto mb-12">
               <div className="absolute inset-0 border-8 border-white/5 rounded-full"></div>
               <div className="absolute inset-0 border-8 border-medical-teal rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white animate-pulse" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Neural Synthesis</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Proprietary SVM models are extracting high-dimensional kinetic features and clinical correlations...
            </p>
            <div className="mt-12 flex justify-center gap-2">
               {[0, 1, 2].map(i => (
                 <div key={i} className="w-2 h-2 rounded-full bg-medical-teal animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}