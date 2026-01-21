/**
 * Centralized type definitions for XWarp
 */

// Block category type
export type BlockCategory = 'keyword' | 'user' | 'media' | 'date' | 'engagement'

// Search mode type
export type SearchMode = 'latest' | 'top'

// Base search block definition
export interface SearchBlock {
  id: string
  type: string
  label: string
  category: BlockCategory
  requiresValue: boolean
  requiresSecondValue?: boolean
  placeholder?: string
  placeholder2?: string
  inputType?: string
}

// Active block with user input values
export interface ActiveBlock extends SearchBlock {
  value: string
  value2?: string
}

// Tweet data from API
export interface Tweet {
  id: string
  user_name: string
  user_screen_name: string
  text: string
  created_at: string
  retweet_count: number
  favorite_count: number
  reply_count: number
  user_profile_image_url: string | null
}

// Processed tweet for display
export interface DisplayTweet {
  id: string
  username: string
  handle: string
  content: string
  timestamp: string
  retweets: number
  likes: number
  replies: number
  avatar: string
}

// AI Analysis result
export interface Analysis {
  summary: string
  topics: string[]
  sentiment: string
  insights: string[]
  relatedQuestions?: string[]
}

// API response types
export interface SearchResponse {
  originalQuery: string
  results: {
    results: Tweet[]
  }
  analysis: Analysis
  error?: string
}

export interface NaturalLanguageResponse {
  received: boolean
  query: string
  blocks: Array<{
    type: string
    value: string
    category: string
    requiresValue: boolean
  }>
  generatedQuery: string
  timestamp: string
}

// API error response
export interface ApiError {
  error: string
  errorDetail?: string
}
