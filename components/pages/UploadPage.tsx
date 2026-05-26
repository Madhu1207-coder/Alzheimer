'use client'

import { useState, useRef } from 'react'
import { Upload, Brain, FileText, Activity, CheckCircle, AlertCircle } from 'lucide-react'
import { getRandomMRIImages, getRandomHandwritingImages, MRI_CATEGORIES, HANDWRITING_TASKS } from '@/lib/dataService'
import LastMRIAnalysis from '../LastMRIAnalysis'
import AutoMRIDemo from '../AutoMRIDemo'

interface UploadedFile {
  name: string
  type: string
  size: number
  preview?: string
}

export default function UploadPage() {
  const [mriFile, setMriFile] = useState<UploadedFile | null>(null)
  const [handwritingFiles, setHandwritingFiles] = useState<UploadedFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof MRI_CATEGORIES>('NonDemented')
  const [selectedTask, setSelectedTask] = useState<string>('TASK_02')

  const mriInputRef = useRef<HTMLInputElement>(null)
  const handwritingInputRef = useRef<HTMLInputElement>(null)

  const handleMRIUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const uploadedFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file)
      }
      setMriFile(uploadedFile)
    }
  }

  const handleHandwritingUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const uploadedFiles: UploadedFile[] = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file)
    }))
    setHandwritingFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeHandwritingFile = (index: number) => {
    setHandwritingFiles(prev => prev.filter((_, i) => i !== index))
  }

  const exampleMRIImages = getRandomMRIImages(selectedCategory, 6)
  const exampleHandwritingImages = getRandomHandwritingImages(selectedTask, undefined, 6)

  return (
    <div className="w-full">
       {/* Top Section - Navy with Bottom Wave */}
       <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            Upload Medical Data
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Upload your MRI scans and handwriting samples for comprehensive AI-driven diagnostic analysis.
          </p>
        </div>

        {/* Bottom Wave for Top Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-medical-teal">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Middle Section - Teal Background (Upload Areas) */}
      <div className="bg-medical-teal py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* MRI Upload Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-4 border border-white/10">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">MRI Brain Scan</h2>
              </div>

              {!mriFile ? (
                <div
                  onClick={() => mriInputRef.current?.click()}
                  className="group relative border-2 border-dashed border-white/30 rounded-3xl p-12 text-center cursor-pointer hover:border-white hover:bg-white/5 transition-all duration-300 shadow-inner"
                >
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                    Drop MRI Scan here
                  </p>
                  <p className="text-sm text-slate-300 font-medium">
                    Supports DICOM, NIfTI, JPG, PNG
                  </p>
                  <input
                    ref={mriInputRef}
                    type="file"
                    accept=".dcm,.nii,.nii.gz,.jpg,.jpeg,.png"
                    onChange={handleMRIUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border border-green-400 rounded-3xl p-6 bg-green-400/10 backdrop-blur-md animate-in zoom-in duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-black text-white uppercase tracking-tight text-lg leading-tight truncate max-w-[200px]">{mriFile.name}</p>
                        <p className="text-sm text-green-300 font-bold">
                          {(mriFile.size / 1024 / 1024).toFixed(2)} MB • READY
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMriFile(null)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white rounded-xl text-xs font-black uppercase transition-all"
                    >
                      Remove
                    </button>
                  </div>
                  {mriFile.preview && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <img
                        src={mriFile.preview}
                        alt="MRI Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* MRI Examples */}
              <div className="mt-12 bg-medical-deep/20 rounded-[2rem] p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Dataset Reference</h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as keyof typeof MRI_CATEGORIES)}
                    className="bg-medical-deep border border-white/10 text-white px-3 py-1 rounded-lg text-xs font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-medical-teal"
                  >
                    {Object.entries(MRI_CATEGORIES).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {exampleMRIImages.slice(0, 6).map((image) => (
                    <div key={image.id} className="relative group aspect-square rounded-xl overflow-hidden shadow-md">
                      <img
                        src={image.path}
                        alt={`MRI ${image.category}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-medical-deep/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <span className="text-white text-[10px] font-black uppercase tracking-tighter text-center">
                          {MRI_CATEGORIES[image.category].label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Handwriting Upload Section */}
            <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-10 border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mr-4 border border-white/10">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Handwriting Samples</h2>
              </div>

              <div
                onClick={() => handwritingInputRef.current?.click()}
                className="group relative border-2 border-dashed border-white/30 rounded-3xl p-12 text-center cursor-pointer hover:border-white hover:bg-white/5 transition-all duration-300 shadow-inner mb-8"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                  Upload samples
                </p>
                <p className="text-sm text-slate-300 font-medium">
                  Multiple JPG/PNG images supported
                </p>
                <input
                  ref={handwritingInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={handleHandwritingUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              {handwritingFiles.length > 0 && (
                <div className="mb-8 space-y-3 max-h-[200px] overflow-y-auto px-2 custom-scrollbar">
                  {handwritingFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm group hover:border-white/30 transition-all">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-medical-teal mr-3" />
                        <span className="text-sm font-bold text-white truncate max-w-[150px]">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeHandwritingFile(index)}
                        className="text-red-300 hover:text-red-500 transition-colors"
                      >
                         <AlertCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Handwriting Examples */}
              <div className="bg-medical-deep/20 rounded-[2rem] p-6 border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Protocol Reference</h3>
                  <select
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    className="bg-medical-deep border border-white/10 text-white px-3 py-1 rounded-lg text-xs font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-medical-teal"
                  >
                    {Object.entries(HANDWRITING_TASKS).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {exampleHandwritingImages.slice(0, 6).map((image) => (
                    <div key={image.id} className="relative group aspect-square rounded-xl overflow-hidden shadow-md bg-white p-1">
                      <img
                        src={image.path}
                        alt={`Handwriting ${image.condition}`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-medical-deep/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                        <span className="text-white text-[9px] font-black uppercase tracking-tighter">
                          {image.condition} <br/> {HANDWRITING_TASKS[image.task as keyof typeof HANDWRITING_TASKS]?.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  ))}
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

      {/* Bottom Section - Light Background (Demos & Summary) */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Summary Banner */}
            {(mriFile || handwritingFiles.length > 0) && (
              <div className="bg-white rounded-[3rem] p-10 shadow-soft border border-medical-teal/10 flex flex-col md:flex-row items-center justify-between gap-8 animate-in slide-in-from-bottom-10 duration-500">
                <div className="flex items-center">
                   <div className="w-16 h-16 bg-medical-teal/10 rounded-full flex items-center justify-center mr-6">
                      <CheckCircle className="w-8 h-8 text-medical-teal font-black" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Upload Summary</h3>
                      <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">
                        {mriFile ? '1 MRI' : '0 MRI'} • {handwritingFiles.length} HANDWRITING SAMPLES READY
                      </p>
                   </div>
                </div>
                <button className="px-12 py-5 bg-medical-deep text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 group flex items-center">
                  <span>Process All Uploads</span>
                  <Activity className="ml-3 w-5 h-5 group-hover:animate-pulse" />
                </button>
              </div>
            )}

            {/* Demos and History */}
            <div className="grid lg:grid-cols-2 gap-12">
               <div className="transform transition-all hover:scale-[1.01]">
                 <AutoMRIDemo />
               </div>
               <div className="transform transition-all hover:scale-[1.01]">
                 <LastMRIAnalysis />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}