'use client'

import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Maximize } from 'lucide-react';

type DeviceSize = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export default function ResponsivePreviewer({ children }: { children: React.ReactNode }) {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('desktop');

  const getContainerStyles = (): React.CSSProperties => {
    switch (deviceSize) {
      case 'mobile':
        return {
          width: '375px',
          height: '812px',
          border: '12px solid #1f2937',
          borderRadius: '2.5rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          transform: 'scale(1)', // Crucial for containing fixed elements
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          border: '16px solid #1f2937',
          borderRadius: '2rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          transform: 'scale(1)',
        };
      case 'laptop':
        return {
          width: '1024px',
          height: '768px',
          border: '16px solid #1f2937',
          borderBottomWidth: '24px',
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          transform: 'scale(1)',
        };
      case 'desktop':
      default:
        return {
          width: '100%',
          minHeight: '100vh',
        };
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${deviceSize !== 'desktop' ? 'bg-slate-800' : ''}`}>
      {/* Simulation Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-slate-200">
        <span className="text-sm font-bold text-slate-700 mr-2 tracking-wide hidden sm:block">VIEW MODE</span>
        <button
          onClick={() => setDeviceSize('desktop')}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
            deviceSize === 'desktop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'text-slate-600 hover:bg-slate-100 hover:scale-105'
          }`}
          title="Full Screen Custom (Desktop)"
        >
          <Maximize size={22} />
        </button>
        <button
          onClick={() => setDeviceSize('laptop')}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
            deviceSize === 'laptop' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'text-slate-600 hover:bg-slate-100 hover:scale-105'
          }`}
          title="Laptop (1024px)"
        >
          <Monitor size={22} />
        </button>
        <button
          onClick={() => setDeviceSize('tablet')}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
            deviceSize === 'tablet' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'text-slate-600 hover:bg-slate-100 hover:scale-105'
          }`}
          title="Tablet (768px)"
        >
          <Tablet size={22} />
        </button>
        <button
          onClick={() => setDeviceSize('mobile')}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
            deviceSize === 'mobile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 'text-slate-600 hover:bg-slate-100 hover:scale-105'
          }`}
          title="Phone (375px)"
        >
          <Smartphone size={22} />
        </button>
      </div>

      {/* Main Content Area */}
      {deviceSize !== 'desktop' ? (
        <div className="flex-1 w-full h-[100dvh] overflow-y-auto flex items-center justify-center py-12 pb-32">
          <div style={getContainerStyles()} className="bg-white transition-all duration-500 ease-in-out shrink-0">
            {/* Top camera hole mockup for phone/tablet */}
            {(deviceSize === 'mobile' || deviceSize === 'tablet') && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1f2937] rounded-b-xl z-50"></div>
            )}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden relative z-0 scrollbar-hide">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen" style={getContainerStyles()}>
          {children}
        </div>
      )}
    </div>
  );
}
