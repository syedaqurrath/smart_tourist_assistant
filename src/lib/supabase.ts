import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
  )
}

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null

// API functions for your Taj Mahal app
export const api = {
  // Get tour locations from database
  async getLocations(tourMode: string) {
    if (!supabase) throw new Error('Supabase is not configured')
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('tour_mode', tourMode)
      .order('sequence')
    
    if (error) throw error
    return data
  },

  // Save user tour progress
  async saveProgress(userId: string, tourMode: string, currentIndex: number) {
    if (!supabase) throw new Error('Supabase is not configured')
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        tour_mode: tourMode,
        current_index: currentIndex,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  },

  // Get chatbot response from AI service
  async getChatbotResponse(message: string) {
    if (!supabase) throw new Error('Supabase is not configured')
    const { data, error } = await supabase.functions.invoke('chatbot', {
      body: { message }
    })
    
    if (error) throw error
    return data.response
  },

  // Save user feedback
  async saveFeedback(locationId: string, rating: number, comment: string) {
    if (!supabase) throw new Error('Supabase is not configured')
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        location_id: locationId,
        rating,
        comment,
        created_at: new Date().toISOString()
      })
    
    if (error) throw error
    return data
  }
}
