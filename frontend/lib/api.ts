/**
 * Centralized API client for XWarp
 */

import { config } from './config'
import type { SearchResponse, NaturalLanguageResponse, ApiError, SearchMode } from '@/types'

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.api.baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        error: `HTTP error ${response.status}`,
      }))
      throw new Error(error.error || `Request failed with status ${response.status}`)
    }

    return response.json()
  }

  /**
   * Perform AI-powered search with analysis
   */
  async aiSearch(
    query: string,
    section: SearchMode = 'latest',
    limit: number = config.search.defaultLimit
  ): Promise<SearchResponse> {
    // Validate limit
    const validLimit = Math.max(
      config.search.minLimit,
      Math.min(config.search.maxLimit, limit)
    )

    return this.request<SearchResponse>(config.api.endpoints.aiSearch, {
      method: 'POST',
      body: JSON.stringify({ query, section, limit: validLimit }),
    })
  }

  /**
   * Perform AI search with streaming response
   */
  async aiSearchStream(
    query: string,
    section: SearchMode = 'latest',
    limit: number = config.search.defaultLimit,
    onUpdate: (data: Partial<SearchResponse>) => void
  ): Promise<void> {
    const validLimit = Math.max(
      config.search.minLimit,
      Math.min(config.search.maxLimit, limit)
    )

    const url = `${this.baseUrl}${config.api.endpoints.aiSearch}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, section, limit: validLimit }),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('No response body')
    }

    let buffer = ''
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      try {
        const data = JSON.parse(buffer)
        onUpdate(data)
      } catch {
        // Incomplete JSON, continue accumulating
      }
    }
  }

  /**
   * Convert natural language query to search blocks
   */
  async naturalLanguage(query: string): Promise<NaturalLanguageResponse> {
    return this.request<NaturalLanguageResponse>(config.api.endpoints.naturalLanguage, {
      method: 'POST',
      body: JSON.stringify({ query }),
    })
  }
}

// Export singleton instance
export const api = new ApiClient()
