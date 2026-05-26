'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Beaker, TrendingUp, AlertTriangle, CheckCircle, Info, Download, RefreshCw, Target, User } from 'lucide-react'
import { getBiomarkerData, loadClinicalData } from '@/lib/dataService' 
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface BiomarkerResult {
  name: string
  value: number
  unit: string
  normalRange: { min: number; max: number }
  status: 'normal' | 'borderline' | 'abnormal'
  riskLevel: 'low' | 'moderate' | 'high'
  description: string
  clinicalSignificance: string
}

interface PatientProfile {
  id: string
  age: number
  gender: string
  cognitiveStatus: string
  testDate: string
}

export default function BiomarkersAnalysisPage() {
  const { t } = useLanguage()
  const [selectedPatient, setSelectedPatient] = useState<string>('patient_001')
  const [biomarkerResults, setBiomarkerResults] = useState<BiomarkerResult[]>([])
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [overallRisk, setOverallRisk] = useState<{ level: string; score: number; interpretation: string } | null>(null)

  // Manually added patients (persisted)
  const [addedPatients, setAddedPatients] = useState<{ id: string; label: string }[]>([])

  useEffect(() => {
    // Load persisted added patients
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem('addedPatients') || '[]'
    try { setAddedPatients(JSON.parse(raw)) } catch (e) { setAddedPatients([]) }
  }, [])

  const persistAdded = (arr: { id: string; label: string }[]) => {
    try { localStorage.setItem('addedPatients', JSON.stringify(arr)) } catch (e) { /* ignore */ }
  }

  const addPatientToAdded = (p: { id: string; label: string }, select: boolean = false) => {
    setAddedPatients(prev => {
      if (prev.some(x => x.id === p.id)) return prev
      const next = [p, ...prev].slice(0, 50)
      persistAdded(next)
      return next
    })
    if (select) {
      setSelectedPatient(p.id)
      // loadPatientData will run from selectedPatient effect; optionally call explicitly
      loadPatientData()
    }
  }

  const removeAddedPatient = (id: string) => {
    setAddedPatients(prev => {
      const next = prev.filter(x => x.id !== id)
      persistAdded(next)
      return next
    })
  }

  // Add patient form state and helpers
  const [formId, setFormId] = useState<string>('')
  const [formLabel, setFormLabel] = useState<string>('')
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)
  const [selectAfterAdd, setSelectAfterAdd] = useState<boolean>(false)

  const createPatientFromForm = (select: boolean = false) => {
    setFormError(null)
    setFormSuccess(null)
    const id = formId.trim()
    const label = formLabel.trim() || id
    if (!id) {
      setFormError('Patient ID is required')
      return
    }
    // prevent duplicates
    const existsInDefault = patientOptions.some(p => p.id === id)
    const existsInAdded = addedPatients.some(p => p.id === id)
    if (existsInDefault || existsInAdded) {
      setFormError('A patient with this ID already exists')
      return
    }

    const p = { id, label }
    addPatientToAdded(p, select)
    setFormSuccess('Patient added')
    setFormId('')
    setFormLabel('')
    if (!select && selectAfterAdd) {
      setSelectedPatient(id)
      loadPatientData()
    }
    // clear success after short delay
    window.setTimeout(() => setFormSuccess(null), 2500)
  }

  // --- Real-time report form (create patient and optionally publish it to SSE) ---
  const [reportId, setReportId] = useState<string>('')
  const [reportLabel, setReportLabel] = useState<string>('')
  const [reportAge, setReportAge] = useState<string>('')
  const [reportGender, setReportGender] = useState<string>('')
  const [reportAbeta, setReportAbeta] = useState<string>('')
  const [reportPtau, setReportPtau] = useState<string>('')
  const [reportNfl, setReportNfl] = useState<string>('')
  const [reportError, setReportError] = useState<string | null>(null)
  const [reportSuccess, setReportSuccess] = useState<string | null>(null)

  const submitReportAsRealtime = async (select: boolean = false) => {
    setReportError(null)
    setReportSuccess(null)
    const id = reportId.trim()
    const label = reportLabel.trim() || id
    if (!id) {
      setReportError('Patient ID is required')
      return
    }

    // basic numeric parsing
    const abeta = parseFloat(reportAbeta) || 0
    const ptau = parseFloat(reportPtau) || 0
    const nfl = parseFloat(reportNfl) || 0

    // Compose payload (kept for local use, not published)
    const payload = {
      type: 'patient',
      patient: { id, label, age: reportAge || undefined, gender: reportGender || undefined },
      biomarkerReport: { abeta42_40_ratio: abeta, ptau181: ptau, nfl },
      timestamp: Date.now()
    }

    // Add to local storage list
    addPatientToAdded({ id, label }, select)

    setReportSuccess('Patient created from report')
    // clear form
    setReportId('')
    setReportLabel('')
    setReportAge('')
    setReportGender('')
    setReportAbeta('')
    setReportPtau('')
    setReportNfl('')

    if (select) {
      setSelectedPatient(id)
      loadPatientData()
    }

    window.setTimeout(() => setReportSuccess(null), 3000)
  }

  const patientOptions = [
    { id: 'patient_001', label: 'Patient #001 - Normal Control' },
    { id: 'patient_002', label: 'Patient #002 - MCI' },
    { id: 'patient_003', label: 'Patient #003 - Mild AD' },
    { id: 'patient_004', label: 'Patient #004 - Moderate AD' }
  ]

  useEffect(() => {
    loadPatientData()
  }, [selectedPatient])



  const loadPatientData = async () => {
    setIsLoading(true)
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const biomarkerData = getBiomarkerData(selectedPatient)
      const clinicalData = await loadClinicalData()
      
      // Find patient data
      const patientData = clinicalData.find(p => p.id === selectedPatient)
      
      // Generate comprehensive biomarker results
      const results: BiomarkerResult[] = [
        {
          name: t('bio.dyn.abeta.name'),
          value: biomarkerData.abeta42_40_ratio,
          unit: 'ratio',
          normalRange: { min: 0.08, max: 0.12 },
          status: biomarkerData.abeta42_40_ratio < 0.08 ? 'abnormal' : biomarkerData.abeta42_40_ratio < 0.10 ? 'borderline' : 'normal',
          riskLevel: biomarkerData.abeta42_40_ratio < 0.08 ? 'high' : biomarkerData.abeta42_40_ratio < 0.10 ? 'moderate' : 'low',
          description: t('bio.dyn.abeta.desc'),
          clinicalSignificance: t('bio.dyn.abeta.sig')
        },
        {
          name: t('bio.dyn.ptau.name'),
          value: biomarkerData.ptau181,
          unit: 'pg/mL',
          normalRange: { min: 0, max: 25 },
          status: biomarkerData.ptau181 > 25 ? 'abnormal' : biomarkerData.ptau181 > 20 ? 'borderline' : 'normal',
          riskLevel: biomarkerData.ptau181 > 25 ? 'high' : biomarkerData.ptau181 > 20 ? 'moderate' : 'low',
          description: t('bio.dyn.ptau.desc'),
          clinicalSignificance: t('bio.dyn.ptau.sig')
        },
        {
          name: t('bio.dyn.nfl.name'),
          value: biomarkerData.nfl,
          unit: 'pg/mL',
          normalRange: { min: 0, max: 20 },
          status: biomarkerData.nfl > 20 ? 'abnormal' : biomarkerData.nfl > 15 ? 'borderline' : 'normal',
          riskLevel: biomarkerData.nfl > 20 ? 'high' : biomarkerData.nfl > 15 ? 'moderate' : 'low',
          description: t('bio.dyn.nfl.desc'),
          clinicalSignificance: t('bio.dyn.nfl.sig')
        },
        {
          name: t('bio.dyn.apoe4.name'),
          value: biomarkerData.apoe4_status ? 1 : 0,
          unit: 'alleles',
          normalRange: { min: 0, max: 0 },
          status: biomarkerData.apoe4_status ? 'abnormal' : 'normal',
          riskLevel: biomarkerData.apoe4_status ? 'high' : 'low',
          description: t('bio.dyn.apoe4.desc'),
          clinicalSignificance: t('bio.dyn.apoe4.sig')
        },
        {
          name: t('bio.dyn.ttau.name'),
          value: 200 + Math.random() * 300,
          unit: 'pg/mL',
          normalRange: { min: 0, max: 400 },
          status: Math.random() > 0.6 ? 'normal' : Math.random() > 0.3 ? 'borderline' : 'abnormal',
          riskLevel: Math.random() > 0.7 ? 'low' : Math.random() > 0.4 ? 'moderate' : 'high',
          description: t('bio.dyn.ttau.desc'),
          clinicalSignificance: t('bio.dyn.ttau.sig')
        },
        {
          name: t('bio.dyn.ykl40.name'),
          value: 150 + Math.random() * 150,
          unit: 'ng/mL',
          normalRange: { min: 0, max: 200 },
          status: Math.random() > 0.5 ? 'normal' : Math.random() > 0.2 ? 'borderline' : 'abnormal',
          riskLevel: Math.random() > 0.6 ? 'low' : Math.random() > 0.3 ? 'moderate' : 'high',
          description: t('bio.dyn.ykl40.desc'),
          clinicalSignificance: t('bio.dyn.ykl40.sig')
        }
      ]

      // Generate patient profile
      const profile: PatientProfile = {
        id: selectedPatient,
        age: patientData?.age || 65 + Math.floor(Math.random() * 20),
        gender: patientData?.gender || (Math.random() > 0.5 ? 'Female' : 'Male'),
        cognitiveStatus: patientData?.finalDiagnosis || 'Unknown',
        testDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
      }

      // Calculate overall risk
      const riskScore = calculateOverallRisk(results)
      const riskLevel = riskScore > 0.7 ? 'high' : riskScore > 0.4 ? 'moderate' : 'low'
      
      const risk = {
        level: t(`bio.level.${riskLevel}`),
        score: riskScore,
        interpretation: generateRiskInterpretation(riskScore, results)
      }

      setBiomarkerResults(results)
      setPatientProfile(profile)
      setOverallRisk(risk)
    } catch (error) {
      console.error('Error loading patient data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateOverallRisk = (results: BiomarkerResult[]) => {
    const riskWeights = { low: 0.1, moderate: 0.5, high: 0.9 }
    const totalWeight = results.reduce((sum, result) => sum + riskWeights[result.riskLevel], 0)
    return totalWeight / results.length
  }

  const generateRiskInterpretation = (score: number, results: BiomarkerResult[]) => {
    const abnormalCount = results.filter(r => r.status === 'abnormal').length
    const borderlineCount = results.filter(r => r.status === 'borderline').length
    
    if (score > 0.7) {
      return t('bio.highRiskProfile').replace('{abnormalCount}', abnormalCount.toString())
    } else if (score > 0.4) {
      return t('bio.modRiskProfile').replace('{abnormalCount}', abnormalCount.toString()).replace('{borderlineCount}', borderlineCount.toString())
    } else {
      return t('bio.lowRiskProfile')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600'
      case 'borderline': return 'text-yellow-600'
      case 'abnormal': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-50 border-green-200'
      case 'borderline': return 'bg-yellow-50 border-yellow-200'
      case 'abnormal': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600'
      case 'moderate': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getRiskBg = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-green-50 border-green-200'
      case 'moderate': return 'bg-yellow-50 border-yellow-200'
      case 'high': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'borderline':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'abnormal':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="w-full">
      {/* Top Section - Navy with Bottom Wave */}
      <div className="bg-medical-deep pt-12 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Beaker className="w-10 h-10 text-medical-teal mr-4" />
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {t('bio.title')}
                </h1>
              </div>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t('bio.subtitle')}
              </p>
            </div>

            {/* Compact Patient Selector in Navy Header */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 text-white w-full md:w-auto md:min-w-[300px]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-medical-teal mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                {t('bio.selectPatient')}
              </h2>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full bg-medical-deep border border-white/20 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-teal text-sm font-medium"
              >
                {[
                  { id: 'patient_001', label: t('bio.pat1') },
                  { id: 'patient_002', label: t('bio.pat2') },
                  { id: 'patient_003', label: t('bio.pat3') },
                  { id: 'patient_004', label: t('bio.pat4') },
                  ...addedPatients
                ].map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <button
                onClick={loadPatientData}
                disabled={isLoading}
                className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-medical-teal text-medical-deep font-bold rounded-xl hover:bg-mint transition-all disabled:opacity-50 text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{t('bio.refreshData')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Wave for Top Section */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* NEW Top Management Section - Replaces the bottom forms */}
      <div className="bg-slate-50 py-12 relative -mt-4 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-slate-200 h-full">
                <h3 className="text-xl font-black mb-6 flex items-center text-slate-900 border-b border-slate-100 pb-4 uppercase tracking-tighter">
                  <Beaker className="w-6 h-6 text-medical-teal mr-3" />
                  {t('bio.createFromReport')}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input value={reportId} onChange={e => setReportId(e.target.value)} placeholder={t('bio.patientIdReq')} className="px-5 py-3 border border-slate-200 rounded-xl w-full text-sm font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-teal outline-none transition-all" />
                  <input value={reportLabel} onChange={e => setReportLabel(e.target.value)} placeholder={t('bio.labelOpt')} className="px-5 py-3 border border-slate-200 rounded-xl w-full text-sm font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-teal outline-none transition-all" />
                  <input value={reportAge} onChange={e => setReportAge(e.target.value)} placeholder={t('bio.agePlaceholder')} className="px-5 py-3 border border-slate-200 rounded-xl w-full text-sm font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-teal outline-none transition-all" />
                  <input value={reportGender} onChange={e => setReportGender(e.target.value)} placeholder={t('bio.genderPlaceholder')} className="px-5 py-3 border border-slate-200 rounded-xl w-full text-sm font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-teal outline-none transition-all" />
                  <input value={reportAbeta} onChange={e => setReportAbeta(e.target.value)} placeholder={t('bio.dyn.abeta.name')} className="px-5 py-3 border border-slate-200 rounded-xl w-full text-sm font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-teal outline-none transition-all" />
                  <input value={reportPtau} onChange={e => setReportPtau(e.target.value)} placeholder="p-Tau181 (pg/mL)" className="px-5 py-3 border border-slate-200 rounded-xl w-full text-sm font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-teal outline-none transition-all" />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => submitReportAsRealtime(false)} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-black text-xs hover:bg-slate-200 transition-all uppercase tracking-widest">{t('bio.addBtn')}</button>
                  <button onClick={() => submitReportAsRealtime(true)} className="px-6 py-3 bg-medical-teal text-white rounded-xl font-black text-xs hover:bg-teal-500 shadow-lg shadow-medical-teal/20 transition-all uppercase tracking-widest">{t('bio.addSelectBtn')}</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-slate-200 h-full">
                <h3 className="text-xl font-black mb-6 text-slate-900 uppercase tracking-tighter border-b border-slate-100 pb-4 flex items-center">
                  <User className="w-6 h-6 text-medical-teal mr-3" />
                  {t('bio.manualPatients')}
                </h3>
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                  {addedPatients.length > 0 ? (
                    addedPatients.map(ap => (
                      <div key={ap.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:bg-white hover:border-medical-teal/30 transition-all">
                        <span className="font-bold text-slate-700 text-xs truncate max-w-[150px]">{ap.label}</span>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedPatient(ap.id); loadPatientData(); }} className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-medical-teal hover:text-white transition-all"><Target className="w-4 h-4" /></button>
                          <button onClick={() => removeAddedPatient(ap.id)} className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-red-500 hover:text-white transition-all"><AlertTriangle className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400">
                      <p className="text-xs font-bold uppercase tracking-widest">No manual records</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Teal Background (Risk & Profile) */}
      <div className="bg-medical-teal py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Overall Risk Assessment - Glass Card */}
            {overallRisk && (
              <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl border border-white/30 rounded-[2.5rem] p-8 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3" />
                  {t('bio.overallRisk')}
                </h3>
                <div className="text-center mb-8">
                  <div className={`text-5xl font-black mb-1 drop-shadow-md ${getRiskColor(overallRisk.level)}`}>
                    {overallRisk.level}
                  </div>
                  <div className="text-lg font-bold text-white/80">
                    {t('bio.riskScore')} {(overallRisk.score * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 mb-6 relative overflow-hidden border border-white/10">
                  <div
                    className={`h-4 rounded-full transition-all duration-1000 ease-out shadow-lg ${
                      ['Low', 'குறைந்த', 'निम्न'].includes(overallRisk.level) ? 'bg-green-400' :
                      ['Moderate', 'மிதமான', 'मध्यम'].includes(overallRisk.level) ? 'bg-yellow-400' : 'bg-red-500'
                    }`}
                    style={{ width: `${overallRisk.score * 100}%` }}
                  ></div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-sm font-medium leading-relaxed italic text-white/90">"{overallRisk.interpretation}"</p>
                </div>
              </div>
            )}

            {/* Patient Profile & Recommendations - Glass Card */}
            {patientProfile && (
              <div className="lg:col-span-2 bg-medical-deep/20 backdrop-blur-lg border border-white/20 rounded-[2.5rem] p-8 shadow-xl">
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Beaker className="w-6 h-6 mr-3 text-medical-teal" />
                      {t('bio.patientProfile')}
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: t('bio.patientId'), value: patientProfile.id },
                        { label: t('bio.age'), value: t('bio.ageYears').replace('{age}', patientProfile.age.toString()) },
                        { label: t('bio.gender'), value: patientProfile.gender },
                        { label: t('bio.status'), value: patientProfile.cognitiveStatus },
                        { label: t('bio.testDate'), value: patientProfile.testDate }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="text-slate-300 font-medium">{item.label}</span>
                          <span className="font-bold text-white">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-medical-teal" />
                      {t('bio.clinicalSummary')}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-bold uppercase text-slate-400">{t('bio.normalBio')}</span>
                          <span className="text-sm font-black text-green-400">{biomarkerResults.filter(b => b.status === 'normal').length}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-xs font-bold uppercase text-slate-400">{t('bio.borderlineBio')}</span>
                          <span className="text-sm font-black text-yellow-400">{biomarkerResults.filter(b => b.status === 'borderline').length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs font-bold uppercase text-slate-400">{t('bio.abnormalBio')}</span>
                          <span className="text-sm font-black text-red-400">{biomarkerResults.filter(b => b.status === 'abnormal').length}</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-200">
                        Top Recommendation: <span className="text-white font-bold">{['High', 'अதிக', 'उच्च'].includes(overallRisk?.level ?? '') ? t('bio.rec1') : t('bio.rec5')}</span>
                      </p>
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

      {/* Light Section - Detailed Biomarker Analysis Grid */}
      <div className="bg-slate-50 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="bg-white rounded-[3rem] shadow-soft p-24 text-center border border-slate-100">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-medical-teal mx-auto mb-6"></div>
              <p className="text-xl font-bold text-slate-400">{t('bio.loading')}</p>
            </div>
          ) : (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-slate-800 text-center">{t('bio.detailedResults')}</h2>
              {/* Biomarker Results Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {biomarkerResults.map((biomarker, index) => (
                  <div key={index} className={`bg-white border rounded-[2rem] shadow-sm hover:shadow-md transition-all p-8 group ${getStatusBg(biomarker.status)}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{biomarker.unit} analysis</span>
                        <h3 className="text-xl font-black text-slate-800">{biomarker.name}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-slate-100">
                        {getStatusIcon(biomarker.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mb-6">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-4xl font-black text-slate-900">
                            {biomarker.value.toFixed(biomarker.name.includes('Ratio') ? 3 : 1)}
                          </span>
                          <span className="text-base font-bold text-slate-400 uppercase">{biomarker.unit}</span>
                        </div>
                        <div className={`mt-3 inline-flex px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(biomarker.status)} bg-white/60`}>
                          {biomarker.status}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 italic font-medium text-slate-600 text-sm leading-relaxed">
                        "{biomarker.description}"
                      </div>
                    </div>

                    {/* Range indicator */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-black uppercase tracking-tighter text-slate-400 mb-2">
                        <span>Min: {biomarker.normalRange.min}</span>
                        <span>Normal Range</span>
                        <span>Max: {biomarker.normalRange.max}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 relative border border-slate-200 overflow-hidden">
                        <div className="absolute inset-0 bg-green-100 rounded-full" style={{ left: '20%', width: '60%' }}></div>
                        <div
                          className="absolute top-0 w-3 h-3 bg-medical-teal rounded-full border-2 border-white shadow-md transform -translate-x-1/2 transition-all duration-1000"
                          style={{
                            left: `${Math.min(95, Math.max(5,
                              ((biomarker.value - biomarker.normalRange.min * 0.5) /
                               (biomarker.normalRange.max * 1.5 - biomarker.normalRange.min * 0.5)) * 100
                            ))}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-slate-100">
                      <h4 className="text-xs font-black text-medical-teal uppercase tracking-widest mb-1 flex items-center">
                        <Target className="w-3.5 h-3.5 mr-2" />
                        {t('bio.clinicalSig')}
                      </h4>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{biomarker.clinicalSignificance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dark Wavy Section - ONLY Recommendations & About Biomarker Analysis */}
      <div className="bg-medical-deep pt-28 pb-20 relative overflow-hidden">
        {/* Top Wave transition from slate-50 */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[90px] fill-slate-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Recommendations & About Row - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recommendations Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 flex items-center text-white border-b border-white/10 pb-4">
                <TrendingUp className="w-8 h-8 text-medical-teal mr-4" />
                {t('bio.recommendations')}
              </h3>
              <div className="space-y-6">
                {['High', 'அதிக', 'उच्च'].includes(overallRisk?.level ?? '') ? (
                  <div className="space-y-4">
                    {[t('bio.rec1'), t('bio.rec2')].map((rec, i) => (
                      <div key={i} className="flex space-x-4 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                        <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                        <span className="text-sm font-bold text-red-100 leading-tight">{rec}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[t('bio.rec3'), t('bio.rec4')].map((rec, i) => (
                      <div key={i} className="flex space-x-4 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                        <RefreshCw className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                        <span className="text-sm font-bold text-yellow-100 leading-tight">{rec}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-4">
                  {[t('bio.rec5'), t('bio.rec6')].map((rec, i) => (
                    <div key={i} className="flex space-x-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                      <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <span className="text-sm font-bold text-blue-100 leading-tight">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About Biomarker Analysis Card */}
            <div className="bg-medical-deep/30 backdrop-blur-xl border border-white/10 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Info className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-black mb-6 flex items-center">{t('bio.aboutTitle')}</h3>
              <p className="text-slate-300 font-medium text-sm leading-relaxed mb-8">
                {t('bio.aboutDesc')}
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="font-black text-xs text-medical-teal uppercase tracking-widest mb-2">{t('bio.abetaRatio')}</h5>
                  <p className="text-xs text-slate-300">{t('bio.abetaRatioDesc')}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="font-black text-xs text-medical-teal uppercase tracking-widest mb-2">p-Tau / t-Tau</h5>
                  <p className="text-xs text-slate-300">{t('bio.ptauDesc')}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="font-black text-xs text-medical-teal uppercase tracking-widest mb-2">Neurofilament Light</h5>
                  <p className="text-xs text-slate-300">{t('bio.nflDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}
