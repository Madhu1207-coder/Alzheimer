'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import NavigationTabs from '@/components/NavigationTabs'
import CDSSDashboard from '@/components/pages/CDSSDashboard'
import DatasetGallery from '@/components/pages/DatasetGallery'
import MRIAnalysisHub from '@/components/pages/MRIAnalysisHub'
import HandwritingAnalysisPage from '@/components/pages/HandwritingAnalysisPage'
import BiomarkersAnalysisPage from '@/components/pages/BiomarkersAnalysisPage'
import DiseaseInfoPage from '@/components/pages/DiseaseInfoPage'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  const handleTabChange = (newTab: string) => {
    console.log('Changing tab from', activeTab, 'to', newTab)
    setActiveTab(newTab)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CDSSDashboard />
      case 'mri':
        return <MRIAnalysisHub />
      case 'handwriting':
        return <HandwritingAnalysisPage />
      case 'biomarkers':
        return <BiomarkersAnalysisPage />
      case 'datasets':
        return <DatasetGallery />
      case 'disease':
        return <DiseaseInfoPage setActiveTab={handleTabChange} />
      default:
        return <CDSSDashboard />
    }
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <main className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 ">
        <div role="tabpanel" id={`${activeTab}-panel`} aria-labelledby={`${activeTab}-tab`}>
          {renderTabContent()}
        </div>
      </main>
    </div>
  )
}