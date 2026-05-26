import { BarChart3, Brain, Edit, Droplets, Database, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface NavigationTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function NavigationTabs({ activeTab, setActiveTab }: NavigationTabsProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { t } = useLanguage()

  const tabs = [
    { id: 'dashboard', name: t('nav.dashboard.name'), shortName: t('nav.dashboard.short'), icon: BarChart3, description: t('nav.dashboard.desc') },
    { id: 'mri', name: t('nav.mri.name'), shortName: t('nav.mri.short'), icon: Brain, description: t('nav.mri.desc') },
    { id: 'datasets', name: t('nav.datasets.name'), shortName: t('nav.datasets.short'), icon: Database, description: t('nav.datasets.desc') },
    { id: 'handwriting', name: t('nav.handwriting.name'), shortName: t('nav.handwriting.short'), icon: Edit, description: t('nav.handwriting.desc') },
    { id: 'biomarkers', name: t('nav.biomarkers.name'), shortName: t('nav.biomarkers.short'), icon: Droplets, description: t('nav.biomarkers.desc') },
    { id: 'disease', name: t('nav.disease.name') || 'Disease Info', shortName: t('nav.disease.short') || 'Disease', icon: Brain, description: t('nav.disease.desc') || 'Information about Alzheimer\'s' }
  ]

  const handleTabClick = (tabId: string) => {
    console.log('NavigationTabs: Handling click for tab:', tabId)
    setActiveTab(tabId)
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    const container = document.getElementById('tabs-container')
    if (container) {
      const scrollAmount = 200
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="bg-medical-teal/5 border-b border-medical-teal/20 relative z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8 ">
        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="relative lg:hidden">
          <button
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-medical-teal/30 shadow-soft rounded-full p-2 hover:bg-slate-50"
            style={{ marginLeft: '-12px' }}
          >
            <ChevronLeft className="w-4 h-4 text-medical-teal" />
          </button>
          
          <div
            id="tabs-container"
            className="flex overflow-x-auto scrollbar-hide space-x-1 py-2 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex-shrink-0 flex flex-col items-center py-3 px-4 rounded-lg font-medium text-xs transition-all duration-200 cursor-pointer min-w-[80px]
                    ${isActive 
                      ? 'bg-medical-teal text-white shadow-md-purple' 
                      : 'text-slate-500 hover:text-medical-teal hover:bg-medical-teal/5 border border-transparent'
                    }
                  `}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  tabIndex={0}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className={`font-semibold text-center leading-tight`}>{tab.shortName}</span>
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-medical-teal/30 shadow-soft rounded-full p-2 hover:bg-slate-50"
            style={{ marginRight: '-12px' }}
          >
            <ChevronRight className="w-4 h-4 text-medical-teal" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center space-x-8" aria-label="Tabs" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTabClick(tab.id)
                  }
                }}
                className={`
                  group flex flex-col items-center py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer
                  hover:bg-medical-teal/5 active:bg-medical-teal/10
                  ${isActive 
                    ? 'border-medical-teal text-medical-teal bg-medical-teal/5' 
                    : 'border-transparent text-slate-500 hover:text-medical-teal hover:border-medical-teal/40'
                  }
                `}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.id}-panel`}
                tabIndex={0}
              >
                <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-medical-teal' : 'text-slate-400 group-hover:text-medical-teal'}`} />
                <span className="font-semibold">{tab.name}</span>
                <span className={`text-xs mt-1 ${isActive ? 'text-medical-teal/80' : 'text-slate-400'}`}>
                  {tab.description}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}