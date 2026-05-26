"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, ArrowRight, Lock, Mail, User } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function SignupPage() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState<string | null>(null)
   const router = useRouter()
   const { t } = useLanguage()

   async function handleSubmit(e: React.FormEvent) {
      e.preventDefault()
      setLoading(true)
      setMessage(null)

      try {
         const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
         })
         const data = await res.json()
         if (!res.ok) throw new Error(data.error || 'Signup failed')

         localStorage.setItem('user', JSON.stringify({ email, name }))
         router.push('/login')
      } catch (err: any) {
         setMessage(err.message)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
         {/* Top right language switcher */}
         <div className="absolute top-4 right-4 z-50">
            <LanguageSwitcher />
         </div>

         {/* Top Section - Navy with Bottom Wave */}
         <div className="bg-medical-deep pt-16 pb-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
               <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 mb-4 overflow-hidden animate-logo-pulse">
                     <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                        alt="NeuroJarvis"
                        className="w-full h-full object-cover scale-110"
                     />
                  </div>
               </div>
               <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                  NeuroJarvis <span className="text-medical-teal">CDSS</span>
               </h1>
               <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
                  {t('auth.signupDesc')}
               </p>
            </div>

            {/* Bottom Wave for Top Section */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
               <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-medical-teal/30">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
               </svg>
            </div>
         </div>

         {/* Middle Section - Teal Background (Signup Form) */}
         <div className="bg-slate-50 flex-grow py-12 relative flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-medical-teal/5"></div>

            <div className="max-w-md w-full px-4 relative z-10 animate-slide-left-fade">
               <div className="bg-white p-10 sm:p-12 rounded-[3.5rem] border border-medical-teal/10 shadow-2xl relative overflow-hidden group">
                  {/* Decorative background logo */}
                  <div className="absolute -top-12 -right-12 w-64 h-64 opacity-[0.03] transform rotate-12 group-hover:scale-110 transition-transform pointer-events-none">
                     <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                        alt=""
                        className="w-full h-full object-cover"
                     />
                  </div>

                  <div className="mb-10 text-center">
                     <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">{t('auth.createAccount')}</h2>
                     <p className="text-slate-500 text-sm font-medium">{t('auth.signupDesc')}</p>
                  </div>

                  {message && (
                     <div className="mb-8 p-6 rounded-3xl bg-red-50 border border-red-100 flex items-start space-x-4 animate-in fade-in slide-in-from-top-4">
                        <div className="text-red-500 font-bold mt-0.5">!</div>
                        <p className="text-sm text-red-600 font-bold tracking-tight uppercase">{message}</p>
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">{t('auth.fullNameLabel')}</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-medical-teal" />
                           </div>
                           <input
                              type="text"
                              required
                              value={name}
                              onChange={e => setName(e.target.value)}
                              placeholder="Dr. Jane Doe"
                              className="w-full pl-16 pr-8 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-medical-teal/10 focus:border-medical-teal transition-all placeholder:text-slate-400 placeholder:font-normal"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">{t('auth.emailLabel')}</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-medical-teal" />
                           </div>
                           <input
                              type="email"
                              required
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              placeholder="jane.doe@hospital.org"
                              className="w-full pl-16 pr-8 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-medical-teal/10 focus:border-medical-teal transition-all placeholder:text-slate-400 placeholder:font-normal"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">{t('auth.passwordLabel')}</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-medical-teal" />
                           </div>
                           <input
                              type="password"
                              required
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-16 pr-8 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-medical-teal/10 focus:border-medical-teal transition-all placeholder:text-slate-400 placeholder:font-normal"
                           />
                        </div>
                     </div>

                     <div className="pt-2">
                        <button
                           disabled={loading}
                           className="w-full flex items-center justify-center space-x-4 bg-medical-deep hover:bg-medical-teal text-white font-black uppercase tracking-widest py-5 px-8 rounded-[2rem] transition-all transform active:scale-[0.98] disabled:opacity-70 shadow-2xl shadow-medical-deep/20 group"
                        >
                           <span>{loading ? t('auth.creatingAccount') : t('auth.createAccount')}</span>
                           {!loading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />}
                        </button>
                     </div>
                  </form>

                  <div className="mt-10 text-center">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {t('auth.alreadyHaveAccount')}{' '}
                        <Link href="/login" className="text-medical-teal hover:text-medical-deep transition-colors border-b-2 border-medical-teal/20 pb-0.5">
                           {t('auth.login')}
                        </Link>
                     </p>
                  </div>
               </div>

               <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                  {[
                     { label: 'HIPAA', status: 'Compliant' },
                     { label: 'E2EE', status: 'Encrypted' },
                     { label: 'ISO', status: '27001' }
                  ].map((cert, i) => (
                     <div key={i} className="flex items-center space-x-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cert.label}</span>
                        <span className="w-1 h-1 bg-medical-teal rounded-full"></span>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{cert.status}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
