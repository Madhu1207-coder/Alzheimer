"use client"

import { useEffect, useRef, useState } from 'react'

type SSEOptions = {
  url?: string
  mock?: boolean
  mockIntervalMs?: number
  enabled?: boolean
}

export function useSSE(onEvent: (ev: any) => void, options: SSEOptions = {}) {
  const { url = '/api/biomarkers/stream', mock = false, mockIntervalMs = 8000, enabled = true } = options
  const esRef = useRef<EventSource | null>(null)
  const mockTimer = useRef<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'connecting' | 'open' | 'closed' | 'mocking' | 'error'>('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!enabled) {
      setStatus('idle')
      return
    }

    if (!mock && 'EventSource' in window) {
      setStatus('connecting')
      try {
        const es = new EventSource(url)
        esRef.current = es
        es.onopen = () => setStatus('open')
        es.onerror = () => setStatus('error')
        es.onmessage = (e) => {
          try {
            const payload = JSON.parse(e.data)
            onEvent(payload)
          } catch (err) {
            // ignore invalid payloads
            onEvent({ type: 'message', data: e.data })
          }
        }
      } catch (err) {
        setStatus('error')
      }

      return () => {
        if (esRef.current) {
          esRef.current.close()
          esRef.current = null
        }
        setStatus('closed')
      }
    }

    // Fallback mock stream (useful when server doesn't expose SSE)
    setStatus('mocking')
    const makeMockPatient = () => {
      const id = `patient_${Math.floor(100 + Math.random() * 900)}`
      const name = `Live ${id}`
      const payload = {
        type: 'patient',
        patient: { id, label: `${name} - realtime` },
        timestamp: Date.now()
      }
      onEvent(payload)
    }

    mockTimer.current = window.setInterval(makeMockPatient, mockIntervalMs)
    // send one immediately
    makeMockPatient()

    return () => {
      if (mockTimer.current) window.clearInterval(mockTimer.current)
      mockTimer.current = null
      setStatus('closed')
    }

  }, [url, mock, mockIntervalMs, onEvent])

  return { status }
}
