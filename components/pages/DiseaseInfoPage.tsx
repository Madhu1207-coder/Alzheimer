'use client'

import React, { useState } from "react";
import Image from "next/image";
import {
  Dna,
  Microscope,
  Activity,
  Brain,
  Network,
  Cpu,
  CheckCircle2,
  Salad,
  Puzzle,
  Users,
  Flame,
  FileScan,
  TrendingUp,
  Eye,
  Info,
  ChevronRight
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DiseaseInfoPage({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState(0);
  const [showTestOptions, setShowTestOptions] = useState(false);

  const progressionStages = [
    {
      title: t('di.new.s1.title'),
      desc: t('di.new.s1.desc'),
      image: "/datasets/mri/NonDemented/nonDem2540.jpg",
      color: "border-green-400/50 bg-green-500/10"
    },
    {
      title: t('di.new.s2.title'),
      desc: t('di.new.s2.desc'),
      image: "/datasets/mri/VeryMildDemented/verymildDem1776.jpg",
      color: "border-yellow-400/50 bg-yellow-500/10"
    },
    {
      title: t('di.new.s3.title'),
      desc: t('di.new.s3.desc'),
      image: "/datasets/mri/MildDemented/mildDem701.jpg",
      color: "border-orange-400/50 bg-orange-500/10"
    },
    {
      title: t('di.new.s4.title'),
      desc: t('di.new.s4.desc'),
      image: "/datasets/mri/ModerateDemented/moderateDem36.jpg",
      color: "border-red-400/50 bg-red-500/10"
    }
  ];

  return (
    <div className="w-full font-sans">

      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] rounded-full bg-medical-teal/30 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center mr-6 border border-white/20 backdrop-blur-xl" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
                <Brain className="w-10 h-10 text-medical-teal" />
              </div>
              <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter">
                {t('di.new.title')}
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              {t('di.new.subtitle')}
            </p>
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
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">

          {/* Causes of Alzheimer's */}
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center justify-center mb-12">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 border border-white/10">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('di.new.etiology')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t('di.v2.etiology.genetic'), desc: t('di.v2.etiology.genetic.desc'), icon: Dna, color: "text-blue-400" },
                { title: t('di.v2.etiology.protein'), desc: t('di.v2.etiology.protein.desc'), icon: Microscope, color: "text-purple-400" },
                { title: t('di.v2.etiology.inflammation'), desc: t('di.v2.etiology.inflammation.desc'), icon: Flame, color: "text-orange-400" },
                { title: t('di.v2.etiology.lifestyle'), desc: t('di.v2.etiology.lifestyle.desc'), icon: Activity, color: "text-green-400" }
              ].map((cause, idx) => (
                <div key={idx} className="bg-medical-deep/20 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                    <cause.icon className={`w-8 h-8 ${cause.color}`} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{cause.title}</h3>
                  <p className="text-slate-300 font-medium leading-relaxed">{cause.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disease Progression Visualizer */}
          <div className="bg-medical-deep/40 backdrop-blur-xl rounded-[3rem] p-10 lg:p-16 border border-white/10 shadow-2xl">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 flex items-center justify-center text-center">
              <Eye className="w-8 h-8 mr-4 text-medical-teal" />
              {t('di.new.progressionTitle')}
            </h3>
            <p className="text-slate-300 font-medium leading-relaxed text-center max-w-3xl mx-auto mb-12">
              {t('di.new.progressionDesc')}
            </p>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Controls */}
              <div className="lg:w-1/3 flex flex-col gap-4">
                {progressionStages.map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStage(idx)}
                    className={`text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group ${activeStage === idx ? `bg-white/10 border-white/40 shadow-lg` : `bg-white/5 border-white/5 hover:bg-white/10`}`}
                  >
                    <div>
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${activeStage === idx ? 'text-medical-teal' : 'text-slate-400'}`}>{t('di.v2.stage.prefix')} {idx + 1}</div>
                      <h4 className="text-lg font-black text-white tracking-tighter uppercase">{stage.title}</h4>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeStage === idx ? 'text-white translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  </button>
                ))}
              </div>

              {/* View */}
              <div className="lg:w-2/3 flex flex-col sm:flex-row gap-8 items-center bg-black/40 p-8 rounded-[2.5rem] border border-white/5">
                <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2rem] overflow-hidden border-2 transition-all duration-500 shadow-2xl shrink-0 ${progressionStages[activeStage].color}`}>
                  <img
                    src={progressionStages[activeStage].image}
                    alt={progressionStages[activeStage].title}
                    className="w-full h-full object-cover transition-opacity duration-500 hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x300/1e293b/ffffff?text=${progressionStages[activeStage].title.replace(' ', '+')}`
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <span className="text-white font-black text-xs uppercase tracking-widest">Axial T1-Weighted MRI</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 ${progressionStages[activeStage].color} text-white`}>
                    {t('di.new.diagnosticCriteria')}
                  </div>
                  <p className="text-slate-200 text-lg leading-relaxed font-medium">
                    {progressionStages[activeStage].desc}
                  </p>
                </div>
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

      {/* Bottom Section - Light Background */}
      <div className="bg-slate-50 py-24 relative">

        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-medical-teal/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">

          {/* Project Overview & XAI Sections */}
          <div className="space-y-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">{t('di.v2.projectOverview')}</h2>
              <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                {t('di.v2.projectOverview.desc')}
              </p>
            </div>

            {/* About the Project */}
            <div className="bg-white rounded-[3rem] p-10 border border-medical-teal/10 shadow-xl">
              <div className="flex items-center mb-6">
                <span className="w-12 h-12 bg-medical-deep rounded-2xl flex items-center justify-center mr-4 text-white">
                  <Brain className="w-6 h-6" />
                </span>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">🧠 {t('di.v2.about.title')}</h3>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                {t('di.v2.about.desc')}
              </p>
            </div>

            {/* System Architecture */}
            <div className="bg-white rounded-[3rem] p-10 border border-medical-teal/10 shadow-xl overflow-hidden">
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-8 text-center italic underline">{t('di.v2.architecture.title')}</h3>
              <div className="w-full bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden shadow-inner">
                <img src="https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/architecture.png" alt="System Architecture" className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500" />
              </div>
            </div>

            {/* Inspiration & What It Does */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white rounded-[3rem] p-10 border border-medical-teal/10 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <span className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mr-4 text-white">
                    <Flame className="w-6 h-6" />
                  </span>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">💡 {t('di.v2.inspiration.title')}</h3>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {t('di.v2.inspiration.desc')}
                </p>
              </div>
              <div className="bg-white rounded-[3rem] p-10 border border-medical-teal/10 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <span className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-4 text-white">
                    <Eye className="w-6 h-6" />
                  </span>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">🔍 {t('di.v2.whatItDoes.title')}</h3>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {t('di.v2.whatItDoes.desc')}
                </p>
              </div>
            </div>

            {/* Flow Diagram */}
            <div className="bg-white rounded-[4rem] p-12 border border-medical-teal/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-medical-teal/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-8 text-center italic underline relative z-10">{t('di.v2.flow.title')}</h3>
              <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-inner relative z-10">
                <img src="https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/Flow%20diagram.jpg" alt="Flow Diagram" className="w-full h-auto object-contain p-4" />
              </div>
            </div>

            {/* How We Built It */}
            <div className="bg-medical-deep rounded-[3.5rem] p-10 lg:p-14 border border-white/5 shadow-2xl text-white">
              <div className="flex items-center mb-8">
                <span className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 text-medical-teal border border-white/10 backdrop-blur-xl">
                  <Cpu className="w-7 h-7" />
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tighter">🛠️ {t('di.v2.howWeBuilt.title')}</h3>
              </div>
              <p className="text-slate-300 font-medium leading-relaxed text-lg mb-8">
                {t('di.v2.howWeBuilt.desc')}
              </p>
            </div>

            {/* Grad-CAM Visualization */}
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="bg-white rounded-[3rem] p-10 border border-medical-teal/10 shadow-xl h-full flex flex-col justify-center">
                 <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-6 relative">
                  <span className="w-3 h-12 bg-medical-teal absolute -left-10 top-1/2 -translate-y-1/2 rounded-r-full"></span>
                  {t('di.v2.gradcam.title')}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  {t('di.v2.gradcam.desc')}
                </p>
              </div>
              <div className="rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden bg-slate-100 aspect-video flex items-center justify-center">
                <img src="https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/gradcam.png" alt="Grad-CAM Visualization" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Challenges & MRI Analysis */}
            <div className="grid md:grid-cols-2 gap-10">
               {/* Challenges */}
               <div className="bg-white rounded-[3.5rem] p-10 border border-medical-teal/10 shadow-xl flex flex-col">
                <div className="flex items-center mb-6">
                  <span className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mr-4 text-red-600">
                    <Info className="w-6 h-6" />
                  </span>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">⚠️ {t('di.v2.challenges.title')}</h3>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {t('di.v2.challenges.desc')}
                </p>
              </div>

              {/* MRI Analysis */}
              <div className="bg-white rounded-[3.5rem] p-10 border border-medical-teal/10 shadow-xl flex flex-col justify-between">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-6 underline italic">MRI Analysis</h3>
                <div className="w-full bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden mt-auto">
                    <img src="https://raw.githubusercontent.com/tharunkumardeveloper/Neurovision/main/MRI%20Analysis.png" alt="MRI Analysis" className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>

            {/* Accomplishments & Lessons Learned */}
            <div className="flex flex-col lg:flex-row gap-8">
               <div className="flex-1 bg-gradient-to-br from-medical-teal/10 to-transparent p-12 rounded-[4rem] border border-medical-teal/20 shadow-lg">
                <div className="flex items-center mb-6">
                   <div className="p-3 bg-medical-teal/20 rounded-2xl mr-4 text-medical-teal">
                      <TrendingUp className="w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">🏆 {t('di.v2.accomplishments.title')}</h3>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-lg">
                  {t('di.v2.accomplishments.desc')}
                </p>
              </div>
              <div className="flex-1 bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl">
                 <div className="flex items-center mb-6">
                   <div className="p-3 bg-slate-100 rounded-2xl mr-4 text-slate-700">
                      <Puzzle className="w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">📘 {t('di.v2.learned.title')}</h3>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-lg">
                  {t('di.v2.learned.desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Prevention and Early Care */}
          <div>
            <div className="bg-medical-teal/5 rounded-[3rem] p-12 lg:p-16 border border-medical-teal/20 flex flex-col lg:flex-row gap-16 items-center shadow-inner">

              <div className="flex-1 w-full grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Physical Exercise", icon: Activity, color: "text-blue-500" },
                  { title: "Healthy Nutrition", icon: Salad, color: "text-green-500" },
                  { title: "Cognitive Training", icon: Puzzle, color: "text-purple-500" },
                  { title: "Social Engagement", icon: Users, color: "text-orange-500" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-medical-teal/10 shadow-md hover:shadow-xl transition-all flex flex-col items-center justify-center text-center group">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-slate-700">
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{t(item.title === 'Physical Exercise' ? 'di.new.prev1.title' : item.title === 'Healthy Nutrition' ? 'di.new.prev2.title' : item.title === 'Cognitive Training' ? 'di.new.prev3.title' : 'di.new.prev4.title')}</span>
                  </div>
                ))}
              </div>

              <div className="lg:w-1/3">
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6 relative">
                  <span className="relative z-10">{t('di.v2.prevention.subtitle')}</span>
                </h2>
                <p className="text-slate-600 font-medium leading-relaxed text-lg mb-8">
                  {t('di.v2.prevention.desc')}
                </p>
                <div className="relative">
                  <button 
                    onClick={() => setShowTestOptions(!showTestOptions)}
                    className="px-8 py-4 w-full justify-center bg-medical-deep text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all flex items-center group relative z-20"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-3 group-hover:text-medical-teal transition-colors" />
                    {t('di.v2.screening.btn')}
                  </button>

                  {showTestOptions && (
                    <div className="absolute top-full left-0 w-full mt-4 space-y-2 animate-in slide-in-from-top-5 duration-300 z-30">
                      {[
                        { label: 'MRI Scan', tab: 'mri', icon: Brain },
                        { label: 'Handwritten', tab: 'handwriting', icon: Activity },
                        { label: 'Biomarker', tab: 'biomarkers', icon: Microscope }
                      ].map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab?.(opt.tab)}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl shadow-xl flex items-center justify-between group transition-all hover:bg-purple-50 hover:border-purple-300"
                        >
                          <div className="flex items-center text-purple-700">
                            <opt.icon className="w-5 h-5 mr-3 text-purple-600 group-hover:scale-110 transition-transform" />
                            <span className="font-black uppercase tracking-tighter text-sm">{t(opt.label === 'MRI Scan' ? 'nav.mri.short' : opt.label === 'Handwritten' ? 'nav.handwriting.short' : 'nav.biomarkers.short')}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-purple-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>

        {/* Black Decorative Curve at last - transitions to medical-deep footer */}
        <div className="bg-medical-deep pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[90px] fill-slate-50">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 mb-8 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-xl">
               <div className="w-2 h-2 bg-medical-teal rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
               <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{t('di.v2.footer.active')}</span>
            </div>
            <p className="text-slate-400 font-medium text-sm max-w-xl mx-auto leading-relaxed">
              {t('di.v2.footer.desc')}
            </p>
          </div>
        </div>

    </div>
  );
}
