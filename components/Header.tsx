import { Brain, Activity, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="bg-medical-deep relative z-50 text-white pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                  alt="NeuroVision Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white truncate ">
                  {t('app.title')}
                </h1>
                <p className="text-xs sm:text-sm text-blue-200 hidden sm:block ">
                  {t('app.subtitle')}
                </p>
                <p className="text-xs text-slate-300 sm:hidden">
                  {t('app.mobileSubtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* System Status Indicator */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <div className="w-2 h-2 bg-medical-teal rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
              <span className="text-xs font-bold text-medical-teal uppercase tracking-widest">{t('header.cdssActive')}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">AI Precision</div>
              <div className="text-xs font-bold text-white tracking-widest">95.0%</div>
            </div>
          </div>

          {/* Center Column - Language Switcher - hidden on smallest screens to prevent overlap */}
          <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-50">
            <LanguageSwitcher />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <button
              className="p-2 text-blue-200 hover:text-white transition-colors lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Auth Links */}
            <div className="ml-4 flex items-center space-x-3">
              <AuthButtons />
            </div>
          </div>
        </div>

        {/* Mobile menu could go here if needed, keeping it simple for now */}
      </div>

      {/* Curved SVG Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-medical-teal">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </header>
  )
}

function AuthButtons() {
  const [user, setUser] = useState<any>(null)
  const [showAccounts, setShowAccounts] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const u = localStorage.getItem('user')
    const accountsRaw = localStorage.getItem('accounts') || '[]'
    try { setAccounts(JSON.parse(accountsRaw)) } catch (e) { setAccounts([]) }
    if (u) setUser(JSON.parse(u))
  }, [])

  function handleLogout() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  function switchAccount(acc: any) {
    if (typeof window === 'undefined') return
    localStorage.setItem('token', acc.token)
    localStorage.setItem('user', JSON.stringify({ email: acc.email, name: acc.name }))
    window.location.href = '/'
  }

  function removeAccount(acc: any) {
    if (typeof window === 'undefined') return
    const raw = localStorage.getItem('accounts') || '[]'
    let arr = []
    try { arr = JSON.parse(raw) } catch (e) { arr = [] }
    arr = arr.filter((a: any) => a.email !== acc.email)
    localStorage.setItem('accounts', JSON.stringify(arr))
    setAccounts(arr)
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-[10px] font-black text-medical-teal uppercase tracking-widest leading-none mb-1">Clinical Lead</span>
          <span className="text-sm font-bold text-white max-w-[120px] truncate">{user.name || user.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2.5 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all shadow-inner"
          title={t('auth.logout')}
        >
          <Menu className="w-5 h-5 rotate-90" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <Link href="/login" className="px-3 py-1.5 sm:px-4 bg-white/10 text-white rounded hover:bg-white/20 transition-colors text-xs sm:text-sm border border-white/20">
        <span className="hidden xs:inline">{t('auth.login')}</span>
        <span className="xs:hidden">In</span>
      </Link>
      <Link href="/signup" className="px-3 py-1.5 sm:px-4 bg-medical-teal text-white rounded shadow-soft hover:bg-purple-500 transition-all font-bold text-xs sm:text-sm">
        <span className="hidden xs:inline">{t('auth.signup')}</span>
        <span className="xs:hidden">Up</span>
      </Link>
    </div>
  )
}