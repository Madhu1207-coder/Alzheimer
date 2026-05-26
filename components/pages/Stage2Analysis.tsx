'use client'

import { useState } from 'react'
import { Brain, TrendingUp, Upload, Activity } from 'lucide-react'
import MRIUpload from '../MRIUpload'
import ModelPerformanceTab from '../tabs/ModelPerformanceTab'
import { MRIInferenceResult } from '../../lib/modelInference'

export default function Stage2Analysis() {
  const [activeTab, setActiveTab] = useState<'upload' | 'performance'>('upload')
  const [uploadResult, setUploadResult] = useState<MRIInferenceResult | null>(null)

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-4 border border-white/10">
                    <Brain className="w-8 h-8 text-medical-teal" />
                 </div>
                 <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                   Advanced MRI
                 </h1>
              </div>
              <p className="text-xl text-slate-300 max-w-2xl font-medium leading-relaxed mb-8">
                Stage 2 analytical pipeline utilizing deep neural networks for volumetric and textural brain mapping.
              </p>
            </div>

            {/* Navigation Tabs in Navy Header */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white/5 p-3 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-medical-deep shadow-xl scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Upload className={`w-4 h-4 mr-3 ${activeTab === 'upload' ? 'text-medical-teal' : ''}`} />
                Analysis Lab
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`flex items-center px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === 'performance'
                    ? 'bg-white text-medical-deep shadow-xl scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TrendingUp className={`w-4 h-4 mr-3 ${activeTab === 'performance' ? 'text-medical-teal' : ''}`} />
                Neural Metrics
              </button>
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

      {/* Middle Section - Teal Background (Content) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            {activeTab === 'upload' && (
              <div className="space-y-12">
                {/* Upload Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-12 opacity-5">
                     <Brain className="w-48 h-48" />
                  </div>
                  <div className="flex items-center mb-10">
                     <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 border border-white/10">
                        <Upload className="w-8 h-8 text-white" />
                     </div>
                     <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Analytical Intake</h2>
                  </div>
                  
                  <div className="relative z-10 transition-transform group-hover:scale-[1.01] duration-500">
                    <MRIUpload onResult={setUploadResult} />
                  </div>
                </div>

                {/* Sample Grid - Only when no upload */}
                {!uploadResult && (
                  <div className="grid md:grid-cols-2 gap-8">
                     {[
                        { title: 'Sample AD-01', class: 'Mild AD', conf: 82.1, regions: 'Hippocampus (67%)', score: '+0.267', color: 'bg-orange-500/10' },
                        { title: 'Sample HC-04', class: 'Normal', conf: 92.3, regions: 'Normative Profile', score: '-0.156', color: 'bg-green-500/10' },
                        { title: 'Sample MCI-02', class: 'MCI', conf: 76.4, regions: 'Temporal (38%)', score: '+0.234', color: 'bg-yellow-500/10' },
                        { title: 'Sample AD-03', class: 'Moderate AD', conf: 88.7, regions: 'Severe Atrophy', score: '+0.342', color: 'bg-red-500/10' }
                     ].map((sample, i) => (
                        <div key={i} className={`p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md hover:bg-white/5 transition-all ${sample.color}`}>
                           <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">{sample.title}</h3>
                           <div className="flex justify-between items-end">
                              <div>
                                 <div className="text-2xl font-black text-white mb-2">{sample.class}</div>
                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">{sample.regions}</div>
                              </div>
                              <div className="text-right">
                                 <div className="text-lg font-black text-medical-teal">{sample.conf}% <span className="text-[10px] text-slate-500">CONF</span></div>
                                 <div className={`text-xs font-black ${sample.score.startsWith('+') ? 'text-orange-400' : 'text-green-400'}`}>SHAP: {sample.score}</div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                 <ModelPerformanceTab />
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

      {/* Bottom Section - Light Background (Info) */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white rounded-[3.5rem] p-12 border border-medical-teal/10 shadow-soft max-w-4xl mx-auto text-center">
              <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8">Model architecture & synthesis</h4>
              <div className="grid sm:grid-cols-3 gap-8">
                 {[
                    { label: 'Attentional Mapping', value: 'Grad-CAM', icon: Brain },
                    { label: 'Feature Explainability', value: 'SHAP Values', icon: TrendingUp },
                    { label: 'Inference Velocity', value: '2-5 Seconds', icon: Activity }
                 ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                       <div className="w-12 h-12 bg-medical-teal/5 rounded-2xl flex items-center justify-center mb-4">
                          <stat.icon className="w-6 h-6 text-medical-teal" />
                       </div>
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                       <div className="text-lg font-black text-slate-900">{stat.value}</div>
                    </div>
                 ))}
              </div>
              <p className="mt-12 text-slate-500 font-medium leading-relaxed italic text-sm">
                "Our ResNet50 backbone extracts high-dimensional morphological variants, cross-referenced with clinical datasets for state-of-the-art predictive accuracy."
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}