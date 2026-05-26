'use client'

import { useState } from 'react'
import { Brain, Activity, FileText, Eye, Grid, List } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function DatasetGallery() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<'mri' | 'handwriting' | 'clinical'>('mri')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Comprehensive MRI dataset - all available images
  const mriImages = [
    // Normal Cognition (NonDemented) - 12 samples
    { category: 'NonDemented', filename: 'nonDem2540.jpg', path: '/datasets/mri/NonDemented/nonDem2540.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2541.jpg', path: '/datasets/mri/NonDemented/nonDem2541.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2542.jpg', path: '/datasets/mri/NonDemented/nonDem2542.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2543.jpg', path: '/datasets/mri/NonDemented/nonDem2543.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2544.jpg', path: '/datasets/mri/NonDemented/nonDem2544.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2545.jpg', path: '/datasets/mri/NonDemented/nonDem2545.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2546.jpg', path: '/datasets/mri/NonDemented/nonDem2546.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: 'nonDem2547.jpg', path: '/datasets/mri/NonDemented/nonDem2547.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: '00a98422-8b63-47e6-8b8f-9119984d87ee.jpg', path: '/datasets/mri/NonDemented/00a98422-8b63-47e6-8b8f-9119984d87ee.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: '00b6998c-266a-4880-b6af-30ca013bdd8c.jpg', path: '/datasets/mri/NonDemented/00b6998c-266a-4880-b6af-30ca013bdd8c.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: '0a42c1ce-7be9-4fc1-886e-2a75dfa03cc8.jpg', path: '/datasets/mri/NonDemented/0a42c1ce-7be9-4fc1-886e-2a75dfa03cc8.jpg', label: t('dataset.normalCognition') },
    { category: 'NonDemented', filename: '0a5063e8-da6a-4037-b41a-25a50d734557.jpg', path: '/datasets/mri/NonDemented/0a5063e8-da6a-4037-b41a-25a50d734557.jpg', label: t('dataset.normalCognition') },

    // Very Mild Dementia (MCI) - 12 samples
    { category: 'VeryMildDemented', filename: 'verymildDem1776.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1776.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: 'verymildDem1777.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1777.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: 'verymildDem1778.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1778.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: 'verymildDem1779.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1779.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: 'verymildDem1780.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1780.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: 'verymildDem1780.jpg', path: '/datasets/mri/VeryMildDemented/verymildDem1780.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: '000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg', path: '/datasets/mri/VeryMildDemented/000a074f-a3a5-4c70-8c94-d7ed7bbe7018.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: '00b4979d-ac1c-40e3-90b2-422511918fc0.jpg', path: '/datasets/mri/VeryMildDemented/00b4979d-ac1c-40e3-90b2-422511918fc0.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: '0a34b82b-ba3d-4320-85bf-d437582e42f4.jpg', path: '/datasets/mri/VeryMildDemented/0a34b82b-ba3d-4320-85bf-d437582e42f4.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: '0a4212bb-09d8-4216-92a3-ffd87f82484a.jpg', path: '/datasets/mri/VeryMildDemented/0a4212bb-09d8-4216-92a3-ffd87f82484a.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: '0a725d64-9ad0-4c7e-851e-c8466983870a.jpg', path: '/datasets/mri/VeryMildDemented/0a725d64-9ad0-4c7e-851e-c8466983870a.jpg', label: t('dataset.veryMildMCI') },
    { category: 'VeryMildDemented', filename: '0a725d64-9ad0-4c7e-851e-c8466983870a.jpg', path: '/datasets/mri/VeryMildDemented/0a725d64-9ad0-4c7e-851e-c8466983870a.jpg', label: t('dataset.veryMildMCI') },

    // Mild Dementia - 12 samples
    { category: 'MildDemented', filename: 'mildDem701.jpg', path: '/datasets/mri/MildDemented/mildDem701.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: 'mildDem702.jpg', path: '/datasets/mri/MildDemented/mildDem702.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: 'mildDem703.jpg', path: '/datasets/mri/MildDemented/mildDem703.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: 'mildDem704.jpg', path: '/datasets/mri/MildDemented/mildDem704.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: 'mildDem705.jpg', path: '/datasets/mri/MildDemented/mildDem705.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: 'mildDem706.jpg', path: '/datasets/mri/MildDemented/mildDem706.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: '000cdcc4-3e54-4034-a538-203c8047b564.jpg', path: '/datasets/mri/MildDemented/000cdcc4-3e54-4034-a538-203c8047b564.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: '00a89d56-bb82-429f-95c4-6f1e661629f5.jpg', path: '/datasets/mri/MildDemented/00a89d56-bb82-429f-95c4-6f1e661629f5.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: '0a0d76a0-9c31-4c5e-bc37-9d050a7a4a7a.jpg', path: '/datasets/mri/MildDemented/0a0d76a0-9c31-4c5e-bc37-9d050a7a4a7a.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: '0a1551a7-efee-4d67-bcd4-4569b3f3b808.jpg', path: '/datasets/mri/MildDemented/0a1551a7-efee-4d67-bcd4-4569b3f3b808.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: '0a285637-76bc-43b6-ae13-a44b41ba7eab.jpg', path: '/datasets/mri/MildDemented/0a285637-76bc-43b6-ae13-a44b41ba7eab.jpg', label: t('dataset.mildAD') },
    { category: 'MildDemented', filename: '0a46ad2f-0049-494b-be9b-d71874e6009e.jpg', path: '/datasets/mri/MildDemented/0a46ad2f-0049-494b-be9b-d71874e6009e.jpg', label: t('dataset.mildAD') },

    // Moderate Dementia - 12 samples
    { category: 'ModerateDemented', filename: 'moderateDem36.jpg', path: '/datasets/mri/ModerateDemented/moderateDem36.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: 'moderateDem37.jpg', path: '/datasets/mri/ModerateDemented/moderateDem37.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: 'moderateDem38.jpg', path: '/datasets/mri/ModerateDemented/moderateDem38.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: 'moderateDem39.jpg', path: '/datasets/mri/ModerateDemented/moderateDem39.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: 'moderateDem40.jpg', path: '/datasets/mri/ModerateDemented/moderateDem40.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: 'moderateDem41.jpg', path: '/datasets/mri/ModerateDemented/moderateDem41.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: '00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg', path: '/datasets/mri/ModerateDemented/00a4080b-0cea-436f-9c97-031ee6d3b5f5.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: '0a0641f9-459e-4aef-bd71-9b6fb20256be.jpg', path: '/datasets/mri/ModerateDemented/0a0641f9-459e-4aef-bd71-9b6fb20256be.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: '0a2db21e-81d3-461c-a23e-c133096d8f0a.jpg', path: '/datasets/mri/ModerateDemented/0a2db21e-81d3-461c-a23e-c133096d8f0a.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: '0a46bec5-3e7a-4184-b04d-06902780768b.jpg', path: '/datasets/mri/ModerateDemented/0a46bec5-3e7a-4184-b04d-06902780768b.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: '0a711361-d399-4343-adba-513182e85203.jpg', path: '/datasets/mri/ModerateDemented/0a711361-d399-4343-adba-513182e85203.jpg', label: t('dataset.moderateAD') },
    { category: 'ModerateDemented', filename: '0a924bf0-65b3-48fb-a1ef-3b53ce56130d.jpg', path: '/datasets/mri/ModerateDemented/0a924bf0-65b3-48fb-a1ef-3b53ce56130d.jpg', label: t('dataset.moderateAD') }
  ]

  const handwritingImages = [
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_001.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_001.png', label: t('dataset.connectDotsHC') },
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_002.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_002.png', label: t('dataset.connectDotsHC') },
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_003.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_003.png', label: t('dataset.connectDotsHC') },
    { task: 'TASK_02', condition: 'HC', filename: 'T02_HC_004.png', path: '/datasets/handwriting/TASK_02/HC/T02_HC_004.png', label: t('dataset.connectDotsHC') },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_001.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_001.png', label: t('dataset.connectDotsAD') },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_002.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_002.png', label: t('dataset.connectDotsAD') },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_003.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_003.png', label: t('dataset.connectDotsAD') },
    { task: 'TASK_02', condition: 'AD', filename: 'T02_AD_004.png', path: '/datasets/handwriting/TASK_02/AD/T02_AD_004.png', label: t('dataset.connectDotsAD') },
    { task: 'TASK_03', condition: 'HC', filename: 'T03_HC_001.png', path: '/datasets/handwriting/TASK_03/HC/T03_HC_001.png', label: t('dataset.verticalLinesHC') },
    { task: 'TASK_03', condition: 'HC', filename: 'T03_HC_002.png', path: '/datasets/handwriting/TASK_03/HC/T03_HC_002.png', label: t('dataset.verticalLinesHC') },
    { task: 'TASK_03', condition: 'AD', filename: 'T03_AD_001.png', path: '/datasets/handwriting/TASK_03/AD/T03_AD_001.png', label: t('dataset.verticalLinesAD') },
    { task: 'TASK_03', condition: 'AD', filename: 'T03_AD_002.png', path: '/datasets/handwriting/TASK_03/AD/T03_AD_002.png', label: t('dataset.verticalLinesAD') }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'NonDemented': return 'border-green-300 bg-green-50'
      case 'VeryMildDemented': return 'border-yellow-300 bg-yellow-50'
      case 'MildDemented': return 'border-orange-300 bg-orange-50'
      case 'ModerateDemented': return 'border-red-300 bg-red-50'
      case 'HC': return 'border-green-300 bg-green-50'
      case 'AD': return 'border-red-300 bg-red-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              {t('dataset.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              {t('dataset.subtitle')}
            </p>
          </div>

          {/* Category Tabs & View Mode */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 p-4 rounded-[3rem] border border-white/10 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'mri', name: t('dataset.mriScans'), icon: Brain, count: mriImages.length, color: 'text-purple-400' },
                { id: 'handwriting', name: t('dataset.handwriting'), icon: Activity, count: handwritingImages.length, color: 'text-orange-400' },
                { id: 'clinical', name: t('dataset.clinical'), icon: FileText, count: null, color: 'text-blue-400' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeCategory === cat.id
                    ? 'bg-white text-medical-deep shadow-xl scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <div className="w-5 h-5 rounded-md overflow-hidden mr-3 border border-white/10 group-hover:scale-110 transition-transform">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                      alt=""
                      className={`w-full h-full object-cover ${activeCategory === cat.id ? '' : 'grayscale opacity-50'}`}
                    />
                  </div>
                  {cat.name}
                  {cat.count !== null && <span className="ml-2 opacity-50">({cat.count})</span>}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 bg-medical-deep/40 p-2 rounded-2xl border border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-medical-teal text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-medical-teal text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                <List className="w-5 h-5" />
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

      {/* Middle Section - Teal Background (Gallery) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* MRI Gallery */}
            {activeCategory === 'mri' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 border border-white/10 overflow-hidden">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('dataset.mriBrainTitle')}</h2>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {mriImages.map((image, index) => (
                      <div key={index} className={`group relative rounded-[2.5rem] p-6 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${getCategoryColor(image.category).replace('bg-', 'bg-').replace('300', '10').replace('50', '10')}`}>
                        <div className="relative mb-6 rounded-3xl overflow-hidden bg-black p-1 shadow-inner aspect-square">
                          <img
                            src={image.path}
                            alt={image.label}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x200/000000/FFFFFF?text=${image.category.slice(0, 8)}`
                            }}
                          />
                          <div className="absolute inset-0 bg-medical-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-black text-white text-sm uppercase tracking-tighter mb-2">{image.label}</h3>
                          <div className={`inline-block px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getCategoryColor(image.category).replace('border-', 'bg-').replace('300', '500')} text-white`}>
                            {image.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mriImages.map((image, index) => (
                      <div key={index} className={`group rounded-3xl p-4 flex items-center gap-6 border-2 transition-all hover:bg-white/5 ${getCategoryColor(image.category).replace('300', '20').replace('50', '5')}`}>
                        <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10">
                          <img
                            src={image.path}
                            alt={image.label}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/80x80/000000/FFFFFF?text=${image.category.slice(0, 4)}`
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-white text-lg uppercase tracking-tighter">{image.label}</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{image.filename}</p>
                        </div>
                        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${getCategoryColor(image.category).replace('border-', 'bg-').replace('300', '500')} text-white shadow-lg`}>
                          {image.category}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Handwriting Gallery */}
            {activeCategory === 'handwriting' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 border border-white/10 overflow-hidden">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                      alt="Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('dataset.handwritingTitle')}</h2>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {handwritingImages.map((image, index) => (
                      <div key={index} className={`group relative rounded-[2.5rem] p-6 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${getCategoryColor(image.condition).replace('bg-', 'bg-').replace('300', '10').replace('50', '10')}`}>
                        <div className="relative mb-6 rounded-3xl overflow-hidden bg-white p-2 shadow-inner aspect-[4/3]">
                          <img
                            src={image.path}
                            alt={image.label}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x150/000000/FFFFFF?text=${image.condition}+${image.task.slice(-2)}`
                            }}
                          />
                          <div className="absolute inset-0 bg-medical-deep/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h3 className="font-black text-white text-sm uppercase tracking-tighter mb-2">{image.label}</h3>
                          <div className="flex justify-center gap-2">
                            <div className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-white/10 text-white border border-white/10">
                              {image.task}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getCategoryColor(image.condition).replace('border-', 'bg-').replace('300', '500')} text-white shadow-md`}>
                              {image.condition}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {handwritingImages.map((image, index) => (
                      <div key={index} className={`group rounded-3xl p-4 flex items-center gap-6 border-2 transition-all hover:bg-white/5 ${getCategoryColor(image.condition).replace('300', '20').replace('50', '5')}`}>
                        <div className="w-24 h-16 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-white/10 p-1">
                          <img
                            src={image.path}
                            alt={image.label}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/80x80/000000/FFFFFF?text=${image.condition}`
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-white text-lg uppercase tracking-tighter">{image.label}</h3>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('dataset.task')} {image.task}</p>
                        </div>
                        <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${getCategoryColor(image.condition).replace('border-', 'bg-').replace('300', '500')} text-white shadow-lg`}>
                          {image.condition}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Clinical Data (Only shown when active) */}
            {activeCategory === 'clinical' && (
              <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                <div className="flex items-center mb-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-6 border border-white/10">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('dataset.clinicalInfoTitle')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-medical-deep/30 rounded-[2.5rem] p-10 border border-white/10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center">
                      <div className="w-2 h-8 bg-medical-teal mr-4 rounded-full"></div>
                      {t('dataset.oasisDataset')}
                    </h3>
                    <div className="space-y-6">
                      {[
                        { title: t('dataset.crossSectional'), desc: t('dataset.crossSectionalDesc'), file: t('dataset.crossSectionalFile') },
                        { title: t('dataset.longitudinal'), desc: t('dataset.longitudinalDesc'), file: t('dataset.longitudinalFile') }
                      ].map((item, i) => (
                        <div key={i} className="group p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-default relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-medical-teal opacity-0 group-hover:opacity-10 transition-opacity"></div>
                          <h4 className="font-black text-slate-100 uppercase tracking-tighter text-lg mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">{item.desc}</p>
                          <div className="inline-block px-4 py-1.5 rounded-full bg-medical-deep/80 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5">{item.file}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-medical-deep/30 rounded-[2.5rem] p-10 border border-white/10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center">
                      <div className="w-2 h-8 bg-medical-teal mr-4 rounded-full"></div>
                      {t('dataset.biomarkerData')}
                    </h3>
                    <div className="space-y-6">
                      {[
                        { title: t('dataset.plasma'), desc: t('dataset.plasmaDesc'), file: t('dataset.plasmaFile') },
                        { title: t('dataset.genetic'), desc: t('dataset.geneticDesc'), file: t('dataset.geneticFile') }
                      ].map((item, i) => (
                        <div key={i} className="group p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-default relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-medical-teal opacity-0 group-hover:opacity-10 transition-opacity"></div>
                          <h4 className="font-black text-slate-100 uppercase tracking-tighter text-lg mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">{item.desc}</p>
                          <div className="inline-block px-4 py-1.5 rounded-full bg-medical-deep/80 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/5">{item.file}</div>
                        </div>
                      ))}
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

      {/* Bottom Section - Light Background (Information) */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Dataset Access', value: 'Open Source', desc: 'Freely available for research replication.' },
              { label: 'Data Integrity', value: 'Peer Reviewed', desc: 'Validated through clinical longitudinal studies.' },
              { label: 'Privacy Protocol', value: 'De-identified', desc: 'All personal identifiers removed for security.' }
            ].map((info, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-medical-teal/10 shadow-soft hover:shadow-xl transition-all">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{info.label}</div>
                <div className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-4">{info.value}</div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}