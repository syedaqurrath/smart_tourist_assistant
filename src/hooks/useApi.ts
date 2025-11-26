import { useState, useEffect } from 'react'
import { api } from '../lib/supabase'
import type { Location } from '../data/locations'

// Custom hook for API calls
export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeApiCall = async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await apiCall()
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, executeApiCall }
}

// Hook for fetching tour locations
export function useTourLocations(tourMode: string) {
  const [locations, setLocations] = useState<Location[]>([])
  const { loading, error, executeApiCall } = useApi()

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await executeApiCall(() => api.getLocations(tourMode))
      if (data) setLocations(data)
    }
    
    fetchLocations()
  }, [tourMode, executeApiCall])

  return { locations, loading, error }
}

// Hook for chatbot API
export function useChatbot() {
  const { loading, error, executeApiCall } = useApi()

  const sendMessage = async (message: string) => {
    return await executeApiCall(() => api.getChatbotResponse(message))
  }

  return { sendMessage, loading, error }
}


