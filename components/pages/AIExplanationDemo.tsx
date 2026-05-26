import React from 'react'
import { Brain, Sparkles, Eye, BarChart3 } from 'lucide-react'
import AutoMRIDemo from '../AutoMRIDemo'

export default function AIExplanationDemo() {
  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-medical-teal mr-4 animate-pulse" />
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
                Explainable AI
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Demystifying neural opaque boxes through Grad-CAM localization and SHAP additive explanations.
            </p>
          </div>

          {/* Features Grid in Navy Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Deep Synthesis', desc: 'ResNet50-based CNN with 75.47% cross-validation accuracy.', icon: Brain, color: 'text-blue-400' },
              { title: 'Grad-CAM Ops', desc: 'Visual attention maps identifying salient morphological variants.', icon: Eye, color: 'text-green-400' },
              { title: 'SHAP Attribution', desc: 'Quantitative feature importance via additive explanations.', icon: BarChart3, color: 'text-purple-400' }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 hover:bg-white/10 transition-all group">
                <feature.icon className={`w-12 h-12 ${feature.color} mb-6 transition-transform group-hover:scale-110`} />
                <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  {feature.desc}
                </p>
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

      {/* Middle Section - Teal Background (Demo) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-[4rem] p-4 sm:p-10 border border-white/20 shadow-2xl overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Brain className="w-64 h-64" />
             </div>
             <div className="relative z-10">
                <AutoMRIDemo />
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

      {/* Bottom Section - Light Background (Technical Info) */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-white p-12 rounded-[3.5rem] border border-medical-teal/10 shadow-soft">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center">
                   <div className="w-2 h-8 bg-blue-500 mr-4 rounded-full"></div>
                   Visual Synthesis Insight
                </h3>
                <ul className="space-y-4">
                  {[
                    'Automated sample selection from multi-tier dementia dataset.',
                    'Dynamic Grad-CAM generation for region focus validation.',
                    'Additive trait attribution via SHAP values.',
                    'Technical entropy and class activation mapping logs.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-12 rounded-[3.5rem] border border-medical-teal/10 shadow-soft">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center">
                   <div className="w-2 h-8 bg-medical-teal mr-4 rounded-full"></div>
                   Clinical Relevance
                </h3>
                <ul className="space-y-4">
                  {[
                    'Transparent decision support for neuro-radiologists.',
                    'Verification of AI logic against clinical atrophy markers.',
                    'Early deviation detection through neural patterns.',
                    'Enhanced trust through explainable methodology (XAI).'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-medical-teal mt-1.5 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
           </div>

           <div className="bg-medical-deep rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                 <Sparkles className="w-48 h-48" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-12 text-center">Protocol Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                {[
                  { value: '75.47%', label: 'Top-1 Accuracy', color: 'text-medical-teal' },
                  { value: '78.95%', label: 'Macro F1-Score', color: 'text-blue-400' },
                  { value: '2.3s', label: 'Inference Velocity', color: 'text-purple-400' },
                  { value: '1,280', label: 'Dataset Volume', color: 'text-orange-400' }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`text-3xl sm:text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}