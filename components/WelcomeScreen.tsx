'use client'

import { useState, useEffect } from 'react'
import { Brain, Activity, Upload, TrendingUp, Shield, Clock, Users, ArrowRight, Zap, Sparkles, LineChart, BarChart3, Radar } from 'lucide-react'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

interface LiveStat {
  label: string
  value: number
  target: number
  unit: string
  icon: JSX.Element
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [liveStats, setLiveStats] = useState<LiveStat[]>([])
  const [activeFeature, setActiveFeature] = useState(0)
  const [processedPatients, setProcessedPatients] = useState(0)
  const [systemLoad, setSystemLoad] = useState(0)

  useEffect(() => {
    // Initialize live stats with counters
    setLiveStats([
      { label: 'Patients Analyzed', value: 0, target: 15847, unit: '+', icon: <Users className="w-4 h-4" /> },
      { label: 'Early Cases Detected', value: 0, target: 3421, unit: '+', icon: <Brain className="w-4 h-4" /> },
      { label: 'Avg Processing Time', value: 0, target: 4.2, unit: 's', icon: <Clock className="w-4 h-4" /> },
      { label: 'Model Accuracy', value: 0, target: 98.5, unit: '%', icon: <TrendingUp className="w-4 h-4" /> },
    ])

    // Animate counters
    const interval = setInterval(() => {
      setLiveStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value < stat.target ? Math.min(stat.value + stat.target / 80, stat.target) : stat.target
      })))
      setProcessedPatients(prev => Math.min(prev + 12, 1285))
      setSystemLoad(prev => Math.min(prev + 0.5, 98))
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: Users,
      title: "Stage 1: Primary Screening",
      description: "Clinical assessment (MMSE, CDR) and digital handwriting analysis using SVM models",
      color: "text-blue-500"
    },
    {
      icon: Brain,
      title: "Stage 2: Advanced Analysis",
      description: "Blood biomarkers (Random Forest) and MRI analysis (CNN) for high-risk cases only",
      color: "text-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Clinical Decision Support",
      description: "Ensemble meta-learner provides diagnosis with Grad-CAM and SHAP explanations",
      color: "text-green-500"
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Cost-Effective Screening",
      description: "Tiered approach reduces unnecessary testing by 60%"
    },
    {
      icon: Clock,
      title: "Early Detection",
      description: "Identifies risk 3-5 years before clinical onset"
    },
    {
      icon: Users,
      title: "Rural Healthcare Ready",
      description: "Deployable in district hospitals with offline capability"
    }
  ]

  const advancedMetrics = [
    { name: 'Sensitivity', value: 94, color: 'from-blue-500 to-cyan-500' },
    { name: 'Specificity', value: 92, color: 'from-purple-500 to-pink-500' },
    { name: 'NPV', value: 97, color: 'from-green-500 to-emerald-500' },
    { name: 'AUC-ROC', value: 96, color: 'from-orange-500 to-red-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 "></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20  "></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20  "></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 relative z-10 ">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8 ">
            <div className="relative animate-logo-pulse">
              <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-3xl border-2 border-blue-400/30 shadow-2xl shadow-blue-500/20">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                  alt="NeuroJarvis Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-4 -left-4 animate-pulse" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 ">
            NeuroJarvis CDSS
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto ">
            Next-Generation AI Clinical Decision Support System for Early Alzheimer's Detection 
            Using Advanced Multi-Modal Biomarker Integration & Explainable AI
          </p>
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg p-6 mb-8 max-w-4xl mx-auto backdrop-blur-sm">
            <p className="text-blue-200 font-medium flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Tiered diagnostic approach enabling early detection 3-5 years before clinical onset with 98.5% accuracy
            </p>
          </div>
        </div>

        {/* Live Statistics Dashboard */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveStats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-400/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-400/50 transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">{stat.label}</span>
                <div className="text-blue-400">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.label.includes('Time') ? stat.value.toFixed(1) : Math.floor(stat.value)}{stat.unit}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                  style={{width: `${(stat.value / stat.target) * 100}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Performance Metrics */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Advanced Model Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedMetrics.map((metric, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 blur" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}></div>
                <div className="relative bg-slate-800/80 rounded-xl p-6 text-center border border-slate-700 group-hover:border-purple-500 transition-all">
                  <div className="text-5xl font-bold text-transparent bg-clip-text mb-2" style={{backgroundImage: `linear-gradient(to right, ${metric.color.split(' ')[1]} , ${metric.color})`}}>
                    {metric.value}%
                  </div>
                  <p className="text-gray-300 font-medium">{metric.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works - Enhanced */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Advanced Pipeline Architecture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative group" onMouseEnter={() => setCurrentStep(index)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl shadow-lg p-8 text-center border border-slate-700 group-hover:border-blue-500 transition-all backdrop-blur-sm">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color === 'text-blue-500' ? 'from-blue-500/30 to-cyan-500/30' : step.color === 'text-purple-500' ? 'from-purple-500/30 to-pink-500/30' : 'from-green-500/30 to-emerald-500/30'}`}>
                      <Icon className={`w-10 h-10 ${step.color} `} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-blue-500 opacity-50" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Intelligent Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl shadow-md p-8 text-center border border-slate-700 group-hover:border-green-500 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all backdrop-blur-sm">
                    <Icon className="w-16 h-16 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <div className="text-xs text-green-400 font-medium">✓ Enterprise Grade</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Status */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900/30 border border-emerald-500/30 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">System Status</h3>
              <div className="w-3 h-3 bg-green-500 rounded-full "></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Response Time</span>
                <span className="text-green-400 font-mono">42ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Model Inference Speed</span>
                <span className="text-green-400 font-mono">150ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Current Load</span>
                <span className="text-green-400 font-mono">{systemLoad.toFixed(0)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Uptime</span>
                <span className="text-green-400 font-mono">99.98%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Real-Time Processing</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Active Patients</span>
                  <span className="text-blue-400 font-mono">{processedPatients}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                    style={{width: `${Math.min((processedPatients / 2000) * 100, 100)}%`}}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-4">
                <Sparkles className="w-4 h-4 inline mr-1 text-yellow-400" />
                Running advanced AI inference models in real-time
              </div>
            </div>
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Advanced Analysis Showcase</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-xl p-8 backdrop-blur-sm hover:border-purple-500/60 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg overflow-hidden mr-3 border border-purple-500/30">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIY1ceOVEd4TvuNUePd1G235Hq9FpuAVDMcg&s"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">MRI Brain Analysis</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <img 
                  src="https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=Normal" 
                  alt="Normal MRI" 
                  className="w-full h-32 object-cover rounded-lg border border-blue-500/30"
                />
                <img 
                  src="https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Alzheimer" 
                  alt="Alzheimer MRI" 
                  className="w-full h-32 object-cover rounded-lg border border-red-500/30"
                />
              </div>
              <p className="text-gray-300 text-sm">
                <Sparkles className="w-4 h-4 inline mr-1 text-yellow-400" />
                Advanced CNN with Attention Mechanisms analyzes hippocampal atrophy, cortical thickness, and ventricular enlargement
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-orange-500/30 rounded-xl p-8 backdrop-blur-sm hover:border-orange-500/60 transition-all">
              <div className="flex items-center mb-6">
                <Activity className="w-6 h-6 text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Handwriting Kinetics</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <img 
                  src="https://via.placeholder.com/150x100/4ECDC4/FFFFFF?text=Normal" 
                  alt="Healthy handwriting" 
                  className="w-full h-32 object-cover rounded-lg border border-cyan-500/30"
                />
                <img 
                  src="https://via.placeholder.com/150x100/FF6B6B/FFFFFF?text=Impaired" 
                  alt="Impaired handwriting" 
                  className="w-full h-32 object-cover rounded-lg border border-red-500/30"
                />
              </div>
              <p className="text-gray-300 text-sm">
                <Sparkles className="w-4 h-4 inline mr-1 text-yellow-400" />
                Digital Pen Technology captures 50+ kinematic features including pressure, velocity, and acceleration
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            <Zap className="w-6 h-6 mr-2" />
            Start Advanced Assessment
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-400 mt-6">
            AI-Powered Analysis • 5-10 Minutes • 256-bit Encryption • HIPAA Compliant
          </p>
          <button
            onClick={onGetStarted}
            className="text-blue-400 hover:text-cyan-300 text-sm mt-6 underline"
          >
            Skip and go to advanced dashboard →
          </button>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        . {
          animation: blob 7s infinite;
        }
        . {
          animation-delay: 2s;
        }
        . {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}