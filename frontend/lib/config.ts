/**
 * Application configuration
 * Uses environment variables for API URL configuration
 */

const getApiUrl = (): string => {
  // Always prefer environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  // Development fallback only
  return 'http://localhost:3001'
}

export const config = {
  api: {
    baseUrl: getApiUrl(),
    endpoints: {
      aiSearch: '/api/ai-search',
      naturalLanguage: '/api/natural-language',
    },
  },
  search: {
    defaultLimit: 5,
    maxLimit: 20,
    minLimit: 1,
  },
} as const

export type Config = typeof config
