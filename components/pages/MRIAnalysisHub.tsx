import React, { useState, useRef } from 'react'
import { Upload, Brain, CheckCircle, AlertCircle, Eye, BarChart3, Loader2 } from 'lucide-react'
import { getRandomMRIImages, MRI_CATEGORIES } from '@/lib/dataService'
import MRIUpload from '../MRIUpload'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface UploadedFile {
  name: string
  type: string
  size: number
  preview?: string
}

export default function MRIAnalysisHub() {
  const { t } = useLanguage()
  const [mriFile, setMriFile] = useState<UploadedFile | null>(null)
  const [rawFile, setRawFile] = useState<File | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof MRI_CATEGORIES>('NonDemented')
  const [showResults, setShowResults] = useState(false)

  const mriInputRef = useRef<HTMLInputElement>(null)

  const handleMRIUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setRawFile(file)
      const uploadedFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file)
      }
      setMriFile(uploadedFile)
      setShowResults(true) // Show results after upload
    }
  }

  const handleProcessMRI = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setMriFile(null)
    setRawFile(null)
    setShowResults(false)
  }

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-0">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-12 h-12 text-medical-teal mr-4" />
              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {t('mri.title')}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t('mri.subtitle')}
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

      {/* Middle Section - Teal Background (Interactive Tools) */}
      <div className="bg-medical-teal py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!showResults ? (
            /* Upload Section - Translucent glass design */
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl text-white">
                <div className="flex items-center mb-8 justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                    <Upload className="w-6 h-6 text-medical-teal" />
                  </div>
                  <h2 className="text-3xl font-bold">{t('mri.uploadTitle')}</h2>
                </div>

                {!mriFile ? (
                  <div
                    onClick={() => mriInputRef.current?.click()}
                    className="group border-2 border-dashed border-white/40 rounded-3xl p-8 sm:p-16 text-center cursor-pointer hover:border-white hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">
                      {t('mri.clickToUpload')}
                    </p>
                    <p className="text-white/70 mb-8">
                      {t('mri.supports')}
                    </p>
                    <button className="inline-flex items-center px-10 py-4 bg-white text-medical-teal font-extrabold rounded-full hover:bg-slate-50 transition-all shadow-xl active:scale-95">
                      <Upload className="w-5 h-5 mr-2" />
                      {t('mri.chooseFile')}
                    </button>
                    <input
                      ref={mriInputRef}
                      type="file"
                      accept=".dcm,.nii,.nii.gz,.jpg,.jpeg,.png"
                      onChange={handleMRIUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white/20 border border-white/30 rounded-3xl p-8 backdrop-blur-md">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex items-center">
                          <div className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center mr-5 shadow-lg">
                            <CheckCircle className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <p className="text-xl font-bold text-white mb-1">{mriFile.name}</p>
                            <p className="text-white/80 font-medium">
                              {(mriFile.size / 1024 / 1024).toFixed(2)} MB • {t('mri.readyForAnalysis')}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleReset}
                          className="bg-white/10 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold transition-all border border-white/20"
                        >
                          {t('mri.remove')}
                        </button>
                      </div>
                      {mriFile.preview && (
                        <div className="mt-4 flex justify-center">
                          <div className="relative p-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm">
                            <img
                              src={mriFile.preview}
                              alt="MRI Preview"
                              className="w-full h-auto rounded-2xl object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center pt-4">
                      <button
                        onClick={handleProcessMRI}
                        className="inline-flex items-center px-12 py-5 bg-medical-deep text-white text-xl font-extrabold rounded-full hover:bg-slate-800 transition-all shadow-2xl hover:shadow-medical-teal/40 active:scale-95 border border-white/10"
                      >
                        <Brain className="w-7 h-7 mr-3" />
                        {t('mri.analyzeBtn')}
                      </button>
                      <p className="text-white/70 mt-4 font-medium italic">
                        {t('mri.analyzeHint')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Results Header Section - Styled as a floating results announcement */
            <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-2xl text-white transform hover:scale-[1.01] transition-all">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center px-4 py-1 bg-green-400/20 text-green-300 rounded-full text-sm font-bold mb-4 border border-green-400/30">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t('mri.analysisComplete')}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                    {t('mri.analysisComplete')}
                  </h2>
                  <p className="text-lg text-white/80 font-medium">
                    {t('mri.analysisCompleteDesc')}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-10 py-4 bg-white text-medical-teal rounded-full hover:bg-slate-50 transition-all font-extrabold shadow-xl text-lg whitespace-nowrap active:scale-95"
                >
                  {t('mri.uploadNew')}
                </button>
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

      {/* Bottom Section - Light Gray/White Background (Full Analysis & Details) */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showResults ? (
            <div className="space-y-12">
              {/* MRI Analysis Results Component */}
              <div className="bg-white rounded-[2rem] p-4 sm:p-10 shadow-soft border border-slate-200 overflow-hidden">
                <div className="flex items-center mb-8 border-b border-slate-100 pb-6">
                  <div className="w-10 h-10 bg-medical-teal/10 rounded-xl flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-medical-teal" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{t('mri.resultsTitle')}</h3>
                </div>
                <MRIUpload initialFile={rawFile} />
              </div>

              {/* Technical Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] p-10 shadow-soft border border-slate-200 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                      <Loader2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{t('mri.modelInfo')}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: t('mri.tech.architecture'), value: t('mri.tech.resnet'), icon: CheckCircle, color: 'text-blue-500' },
                      { label: t('mri.tech.accuracy'), value: '75.47%', icon: BarChart3, color: 'text-green-500' },
                      { label: t('mri.tech.f1Score'), value: '78.95%', icon: BarChart3, color: 'text-teal-500' },
                      { label: t('mri.tech.processTime'), value: '~2.3 seconds', icon: Loader2, color: 'text-slate-500' }
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-slate-600 font-medium">{row.label}</span>
                        <span className={`font-extrabold ${row.color}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-10 shadow-soft border border-slate-200 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{t('mri.explanationMethods')}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: t('mri.tech.gradcam'), icon: Eye, color: 'bg-green-100 text-green-700' },
                      { label: t('mri.tech.shap'), icon: BarChart3, color: 'bg-purple-100 text-purple-700' },
                      { label: t('mri.tech.confidence'), icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
                      { label: t('mri.tech.riskAssessment'), icon: AlertCircle, color: 'bg-orange-100 text-orange-700' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <item.icon className={`w-8 h-8 mb-3 ${item.color.split(' ')[1]}`} />
                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Information Grid for the Initial State */
            <div className="space-y-16">
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: t('mri.aiProcessing'), desc: t('mri.aiProcessingDesc'), icon: Loader2, color: 'bg-blue-50 text-blue-600' },
                  { title: t('mri.gradCam'), desc: t('mri.gradCamDesc'), icon: Eye, color: 'bg-green-50 text-green-600' },
                  { title: t('mri.shap'), desc: t('mri.shapDesc'), icon: BarChart3, color: 'bg-purple-50 text-purple-600' }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2rem] shadow-soft border border-slate-200 text-center hover:shadow-lg transition-all group">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 mb-4">{feature.title}</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* MRI Gallery Preview - Comprehensive design for education */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-slate-200 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{t('mri.galleryTitle')}</h3>
                    <p className="text-slate-500 font-medium">{t('mri.galleryDesc')}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key as keyof typeof MRI_CATEGORIES)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                          selectedCategory === key
                            ? 'bg-medical-teal text-white shadow-md-teal'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  {getRandomMRIImages(selectedCategory, 4).map((image) => (
                    <div key={image.id} className="relative group rounded-3xl overflow-hidden shadow-md border border-slate-100 bg-black">
                      <div className="aspect-square opacity-90 group-hover:opacity-100 transition-opacity">
                        <img
                          src={image.path}
                          alt={`MRI ${image.category}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-medical-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                        <div className="text-white">
                          <p className="font-extrabold text-xs mb-1 uppercase tracking-wider">{MRI_CATEGORIES[image.category].label}</p>
                          <p className="text-[10px] text-white/70 font-mono">HASH: {image.id.substring(0, 12)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dataset Stats Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-slate-50 rounded-3xl border border-slate-100">
                  {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
                    <div key={key} className="text-center py-6 px-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-3xl font-black text-medical-teal mb-1">
                        {getRandomMRIImages(key as keyof typeof MRI_CATEGORIES, 1000).length}+
                      </p>
                      <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{value.label}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-center text-slate-400 text-sm mt-8 font-medium">
                  {t(('mri.category.' + selectedCategory.charAt(0).toLowerCase() + selectedCategory.slice(1)) as any)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}