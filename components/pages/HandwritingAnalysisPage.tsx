'use client'

import React, { useState, useEffect } from 'react'
import { Activity, Play, Info, TrendingUp, Clock, Target } from 'lucide-react'
import { getRandomHandwritingImages, analyzeHandwritingFeatures, HANDWRITING_TASKS } from '@/lib/dataService'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface HandwritingMetrics {
  velocity: number
  pressure: number
  tremor: number
  fluency: number
  accuracy: number
  consistency: number
}

interface HandwritingResult {
  taskId: string
  taskName: string
  metrics: HandwritingMetrics
  riskScore: number
  interpretation: string
  recommendations: string[]
}

export default function HandwritingAnalysisPage() {
  const { t } = useLanguage()
  const [selectedTask, setSelectedTask] = useState('TASK_02')
  const [handwritingSamples, setHandwritingSamples] = useState<any[]>([])
  const [selectedSample, setSelectedSample] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<HandwritingResult[]>([])
  const [currentResult, setCurrentResult] = useState<HandwritingResult | null>(null)

  useEffect(() => {
    // Load handwriting samples for the selected task
    const samples = getRandomHandwritingImages(selectedTask, undefined, 20)
    setHandwritingSamples(samples)
    if (samples.length > 0) {
      setSelectedSample(samples[0])
    }
  }, [selectedTask])

  const handleAnalyzeSample = async () => {
    if (!selectedSample) return

    setIsAnalyzing(true)
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000))

    const features = analyzeHandwritingFeatures(selectedSample.path)
    
    // Generate comprehensive analysis result
    const result: HandwritingResult = {
      taskId: selectedTask,
      taskName: HANDWRITING_TASKS[selectedTask as keyof typeof HANDWRITING_TASKS],
      metrics: {
        velocity: features.velocity,
        pressure: features.pressure,
        tremor: features.tremor,
        fluency: 0.6 + Math.random() * 0.4,
        accuracy: 0.5 + Math.random() * 0.5,
        consistency: 0.4 + Math.random() * 0.6
      },
      riskScore: calculateRiskScore(features, selectedSample.condition),
      interpretation: generateInterpretation(selectedSample.condition, selectedTask),
      recommendations: generateRecommendations(selectedSample.condition)
    }

    setCurrentResult(result)
    setAnalysisResults(prev => [result, ...prev.slice(0, 4)]) // Keep last 5 results
    setIsAnalyzing(false)
  }

  const calculateRiskScore = (features: any, condition: string) => {
    let baseScore = condition === 'AD' ? 0.7 + Math.random() * 0.25 : 0.1 + Math.random() * 0.3
    
    // Adjust based on features
    if (features.tremor > 0.6) baseScore += 0.1
    if (features.velocity < 0.4) baseScore += 0.1
    if (features.pressure < 0.4) baseScore += 0.1
    
    return Math.min(0.95, Math.max(0.05, baseScore))
  }

  const generateInterpretation = (condition: string, taskId: string) => {
    const taskName = HANDWRITING_TASKS[taskId as keyof typeof HANDWRITING_TASKS]
    
    if (condition === 'AD') {
      return t('hw.interp.ad').replace('{task}', taskName)
    } else {
      return t('hw.interp.hc').replace('{task}', taskName)
    }
  }

  const generateRecommendations = (condition: string) => {
    if (condition === 'AD') {
      return [
        t('hw.rec.ad.1'),
        t('hw.rec.ad.2'),
        t('hw.rec.ad.3'),
        t('hw.rec.ad.4')
      ]
    } else {
      return [
        t('hw.rec.hc.1'),
        t('hw.rec.hc.2'),
        t('hw.rec.hc.3'),
        t('hw.rec.hc.4')
      ]
    }
  }

  const getMetricColor = (value: number, type: string) => {
    if (type === 'tremor') {
      return value < 0.3 ? 'text-green-600' : value < 0.6 ? 'text-yellow-600' : 'text-red-600'
    }
    return value > 0.7 ? 'text-green-600' : value > 0.4 ? 'text-yellow-600' : 'text-red-600'
  }

  const getMetricBg = (value: number, type: string) => {
    if (type === 'tremor') {
      return value < 0.3 ? 'bg-green-100' : value < 0.6 ? 'bg-yellow-100' : 'bg-red-100'
    }
    return value > 0.7 ? 'bg-green-100' : value > 0.4 ? 'bg-yellow-100' : 'bg-red-100'
  }

  const getRiskColor = (risk: number) => {
    if (risk < 0.3) return 'text-green-600'
    if (risk < 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskBg = (risk: number) => {
    if (risk < 0.3) return 'bg-green-50 border-green-200'
    if (risk < 0.6) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Activity className="w-10 h-10 text-medical-teal mr-4" />
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {t('hw.title')}
                </h1>
              </div>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t('hw.subtitle')}
              </p>
            </div>

            {/* Task Selector in Navy Header */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 text-white w-full md:w-auto md:min-w-[320px]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-medical-teal mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                {t('hw.selectTask')}
              </h2>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full bg-medical-deep border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-teal text-sm font-bold appearance-none cursor-pointer"
              >
                {Object.entries(HANDWRITING_TASKS).map(([taskId, taskName]) => (
                  <option key={taskId} value={taskId} className="bg-medical-deep">{taskName}</option>
                ))}
              </select>
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

      {/* Middle Section - Teal Background (Samples & Action) */}
      <div className="bg-medical-teal py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Gallery Panel */}
            <div className="lg:col-span-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-white" />
                  {t('hw.sampleImages')}
                </h3>
                <span className="text-sm font-bold bg-white/10 px-4 py-1 rounded-full border border-white/20">
                   {t('hw.showingSamples').replace('{displayed}', Math.min(16, handwritingSamples.length).toString()).replace('{total}', handwritingSamples.length.toString())}
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {handwritingSamples.slice(0, 16).map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => setSelectedSample(sample)}
                    className={`group cursor-pointer border-2 rounded-2xl p-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedSample?.id === sample.id 
                        ? 'border-white bg-white/20 shadow-lg' 
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                    }`}
                  >
                    <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-2 overflow-hidden shadow-inner p-2">
                      <img
                        src={sample.path}
                        alt={`${sample.condition} sample`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `<div class="text-slate-400 text-[10px] text-center">${t('hw.imageNotFound')}</div>`
                          }
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <div className={`text-[10px] font-black uppercase tracking-widest ${sample.condition === 'AD' ? 'text-red-300' : 'text-green-300'}`}>
                        {sample.condition === 'AD' ? t('hw.alzheimers') : t('hw.healthy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Action Panel */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="flex-1 bg-medical-deep/30 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-xl">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/10 ring-8 ring-white/5 shadow-inner">
                    <Play className={`w-10 h-10 text-white ${isAnalyzing ? 'animate-pulse' : ''}`} />
                 </div>
                 <h4 className="text-lg font-black mb-4">{t('hw.analyzeBtn')}</h4>
                 <p className="text-sm text-slate-300 mb-8 font-medium leading-relaxed">
                   Select a sample on the left to perform kinematic cognitive analysis.
                 </p>
                 <button
                    onClick={handleAnalyzeSample}
                    disabled={!selectedSample || isAnalyzing}
                    className={`w-full group flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                      isAnalyzing 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed border border-white/10' 
                        : 'bg-white text-medical-deep hover:bg-mint hover:shadow-xl'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>{t('hw.analyzing')}</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
                        <span>{t('hw.analyzeBtn')}</span>
                      </>
                    )}
                  </button>
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

      {/* Bottom Section - Light Background (Results & Info) */}
      <div className="bg-slate-50 py-20 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentResult ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
              {/* Analysis Highlights */}
              <div className={`rounded-[3rem] border-2 shadow-soft p-10 overflow-hidden relative ${getRiskBg(currentResult.riskScore)}`}>
                 {/* Decorative background icon */}
                <div className="absolute -right-8 -top-8 opacity-5">
                   <Target className="w-64 h-64" />
                </div>
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start">
                  {/* Risk Gauge */}
                  <div className="flex-shrink-0 bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-xl text-center min-w-[280px]">
                     <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">{t('hw.cognitiveRiskScore')}</h3>
                     <div className="relative inline-flex items-center justify-center mb-6">
                        <svg className="w-40 h-40 transform -rotate-90">
                           <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                           <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * currentResult.riskScore)} className={`transition-all duration-1000 ${currentResult.riskScore < 0.3 ? 'text-green-500' : currentResult.riskScore < 0.6 ? 'text-yellow-500' : 'text-red-500'}`} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className={`text-4xl font-black ${getRiskColor(currentResult.riskScore)}`}>{(currentResult.riskScore * 100).toFixed(0)}%</span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Overall Risk</span>
                        </div>
                     </div>
                     <div className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest ${getRiskColor(currentResult.riskScore).replace('text-', 'bg-').replace('600', '100')} ${getRiskColor(currentResult.riskScore)}`}>
                        {currentResult.riskScore < 0.3 ? 'Low Risk' : currentResult.riskScore < 0.6 ? 'Moderate Risk' : 'High Risk'}
                     </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Object.entries(currentResult.metrics).map(([key, value]) => (
                      <div key={key} className={`bg-white rounded-[2rem] p-6 border shadow-soft group hover:shadow-md transition-all ${getMetricBg(value, key)}`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <div className={`w-2 h-2 rounded-full ${key === 'tremor' ? (value < 0.3 ? 'bg-green-500' : 'bg-red-500') : (value > 0.7 ? 'bg-green-500' : 'bg-red-500')}`}></div>
                        </div>
                        <div className={`text-3xl font-black mb-3 ${getMetricColor(value, key)}`}>
                          {(value * 100).toFixed(0)}%
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              key === 'tremor' 
                                ? (value < 0.3 ? 'bg-green-500' : value < 0.6 ? 'bg-yellow-500' : 'bg-red-500')
                                : (value > 0.7 ? 'bg-green-500' : value > 0.4 ? 'bg-yellow-500' : 'bg-red-500')
                            }`}
                            style={{ width: `${value * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Interpretation Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-slate-200">
                  <h3 className="text-xl font-black mb-8 flex items-center text-slate-900 border-b border-slate-100 pb-4 uppercase tracking-tighter">
                    <Info className="w-6 h-6 text-medical-teal mr-3" />
                    {t('hw.interpretation')}
                  </h3>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-lg font-medium text-slate-700 leading-relaxed italic">
                    "{currentResult.interpretation}"
                  </div>
                </div>

                {/* Recommendations Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-slate-200">
                  <h3 className="text-xl font-black mb-8 flex items-center text-slate-900 border-b border-slate-100 pb-4 uppercase tracking-tighter">
                    <Target className="w-6 h-6 text-medical-teal mr-3" />
                    {t('hw.recommendations')}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {currentResult.recommendations.map((rec, index) => (
                      <div key={index} className="group flex items-center space-x-4 p-4 bg-medical-teal/5 hover:bg-medical-teal/10 rounded-2xl border border-medical-teal/10 transition-all">
                        <div className="w-8 h-8 rounded-full bg-medical-teal flex items-center justify-center text-white font-black text-xs group-hover:scale-110 transition-all">{index + 1}</div>
                        <span className="text-sm font-bold text-slate-800 leading-tight">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent History Panel */}
              {analysisResults.length > 1 && (
                <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-200 shadow-inner">
                   <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">{t('hw.recentAnalyses')}</h3>
                   <div className="flex flex-wrap gap-4">
                      {analysisResults.slice(1).map((result, index) => (
                        <div key={index} className="flex-1 min-w-[200px] bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between group hover:border-medical-teal/30 transition-all">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-slate-400 uppercase">{result.taskName}</span>
                              <span className={`text-sm font-black ${getRiskColor(result.riskScore)}`}>{(result.riskScore * 100).toFixed(0)}% Risk</span>
                           </div>
                           <button
                              onClick={() => setCurrentResult(result)}
                              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-medical-teal hover:text-white transition-all flex items-center justify-center shadow-sm"
                           >
                              <Play className="w-3 h-3 ml-0.5" />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          ) : (
            /* Analysis Placeholder */
            <div className="bg-white rounded-[4rem] shadow-soft border-2 border-dashed border-slate-200 p-24 text-center">
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100">
                <Activity className="w-16 h-16 text-slate-300" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                {t('hw.readyForAnalysis')}
              </h3>
              <p className="text-lg text-slate-400 mb-12 font-medium max-w-sm mx-auto leading-relaxed">
                {t('hw.selectSamplePrompt')}
              </p>
              <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center shadow-sm">
                  <TrendingUp className="w-8 h-8 text-medical-teal mb-4" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{t('hw.kinematicAnalysis')}</span>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center shadow-sm">
                  <Clock className="w-8 h-8 text-medical-teal mb-4" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{t('hw.realTimeProcessing')}</span>
                </div>
              </div>
            </div>
          )}

          {/* About Info Panel */}
          <div className="mt-20 bg-medical-deep text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Info className="w-48 h-48" />
             </div>
             <div className="relative z-10">
                <h4 className="text-2xl font-black mb-8 flex items-center uppercase tracking-tighter">
                   <Info className="w-8 h-8 text-medical-teal mr-4" />
                   {t('hw.aboutTitle')}
                </h4>
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <p className="text-slate-300 font-medium text-sm leading-relaxed">
                         {t('hw.aboutDesc')}
                      </p>
                      <div className="space-y-4">
                         {[
                           { label: t('hw.velocity'), desc: t('hw.velocityDesc') },
                           { label: t('hw.pressure'), desc: t('hw.pressureDesc') },
                           { label: t('hw.tremor'), desc: t('hw.tremorDesc') }
                         ].map((item, i) => (
                           <div key={i} className="flex gap-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-2 shadow-glow"></div>
                              <div className="flex-1">
                                 <h5 className="text-[11px] font-black uppercase text-medical-teal mb-1">{item.label}</h5>
                                 <p className="text-xs text-slate-400 leading-tight">{item.desc}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 ring-1 ring-white/5">
                      <h5 className="text-sm font-black uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">{t('hw.availableTasks')}</h5>
                      <div className="grid grid-cols-1 gap-6">
                         {[
                           { name: t('hw.connectDots'), desc: t('hw.connectDotsDesc') },
                           { name: t('hw.verticalLines'), desc: t('hw.verticalLinesDesc') },
                           { name: t('hw.traceCircle'), desc: t('hw.traceCircleDesc') },
                           { name: t('hw.drawClock'), desc: t('hw.drawClockDesc') }
                         ].map((task, i) => (
                           <div key={i} className="flex flex-col">
                              <span className="text-[10px] font-black text-medical-teal uppercase mb-1">{task.name}</span>
                              <span className="text-xs text-slate-300 font-medium">{task.desc}</span>
                           </div>
                         ))}
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