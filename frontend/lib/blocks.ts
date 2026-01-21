/**
 * Centralized block definitions, labels, and styles
 */

import type { SearchBlock, BlockCategory } from '@/types'

// Block type constants
export const BLOCK_TYPES = {
  // Keywords
  ALL_WORDS: 'all-words',
  EXACT_PHRASE: 'exact-phrase',
  OR: 'or',
  NONE_WORDS: 'none-words',
  HASHTAGS: 'hashtags',
  // Users
  FROM: 'from',
  TO: 'to',
  MENTION: 'mention',
  LIST: 'list',
  // Media
  FILTER_MEDIA: 'filter-media',
  FILTER_IMAGES: 'filter-images',
  FILTER_VIDEO: 'filter-video',
  FILTER_LINKS: 'filter-links',
  URL: 'url',
  // Dates
  SINCE: 'since',
  UNTIL: 'until',
  // Engagement
  MIN_RETWEETS: 'min-retweets',
  MIN_FAVES: 'min-faves',
  MIN_REPLIES: 'min-replies',
  NO_RETWEETS: 'no-retweets',
  QUESTION: 'question',
} as const

// Block labels mapping
export const BLOCK_LABELS: Record<string, string> = {
  [BLOCK_TYPES.ALL_WORDS]: 'All of these words',
  [BLOCK_TYPES.EXACT_PHRASE]: 'Exact Phrase',
  [BLOCK_TYPES.OR]: 'Any of these words (OR)',
  [BLOCK_TYPES.NONE_WORDS]: 'None of these words',
  [BLOCK_TYPES.HASHTAGS]: 'These Hashtags',
  [BLOCK_TYPES.FROM]: 'From these Accounts',
  [BLOCK_TYPES.TO]: 'To these Accounts',
  [BLOCK_TYPES.MENTION]: 'Mentioning these Accounts',
  [BLOCK_TYPES.LIST]: 'List',
  [BLOCK_TYPES.FILTER_MEDIA]: 'Has Media',
  [BLOCK_TYPES.FILTER_IMAGES]: 'Has Images',
  [BLOCK_TYPES.FILTER_VIDEO]: 'Has Videos',
  [BLOCK_TYPES.FILTER_LINKS]: 'Has Links',
  [BLOCK_TYPES.URL]: 'URL Contains',
  [BLOCK_TYPES.SINCE]: 'Since Date',
  [BLOCK_TYPES.UNTIL]: 'Until Date',
  [BLOCK_TYPES.MIN_RETWEETS]: 'Min Retweets',
  [BLOCK_TYPES.MIN_FAVES]: 'Min Likes',
  [BLOCK_TYPES.MIN_REPLIES]: 'Min Replies',
  [BLOCK_TYPES.NO_RETWEETS]: 'No Retweets',
  [BLOCK_TYPES.QUESTION]: 'Is Question',
}

export function getBlockLabel(type: string): string {
  return BLOCK_LABELS[type] || type
}

// Category titles
export const CATEGORY_TITLES: Record<BlockCategory, string> = {
  keyword: 'Keywords & Phrases',
  user: 'User-Related',
  media: 'Media & Links',
  date: 'Date Ranges',
  engagement: 'Engagement & Sentiment',
}

// Category colors for blocks container and preview
export function getCategoryColor(category: string, isUsed = false): string {
  if (isUsed) {
    return 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
  }

  switch (category) {
    case 'keyword':
      return 'bg-blue-100 border-blue-300 hover:bg-blue-200'
    case 'user':
      return 'bg-green-100 border-green-300 hover:bg-green-200'
    case 'media':
      return 'bg-purple-100 border-purple-300 hover:bg-purple-200'
    case 'date':
      return 'bg-orange-100 border-orange-300 hover:bg-orange-200'
    case 'engagement':
      return 'bg-red-100 border-red-300 hover:bg-red-200'
    default:
      return 'bg-gray-100 border-gray-300 hover:bg-gray-200'
  }
}

// Category styles for query container cards
export function getCategoryStyles(category: BlockCategory) {
  switch (category) {
    case 'keyword':
      return {
        headerClasses: 'bg-sky-100 dark:bg-sky-800 text-sky-700 dark:text-sky-200',
        borderClasses: 'border-sky-200 dark:border-sky-700',
      }
    case 'user':
      return {
        headerClasses: 'bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200',
        borderClasses: 'border-emerald-200 dark:border-emerald-700',
      }
    case 'media':
      return {
        headerClasses: 'bg-violet-100 dark:bg-violet-800 text-violet-700 dark:text-violet-200',
        borderClasses: 'border-violet-200 dark:border-violet-700',
      }
    case 'date':
      return {
        headerClasses: 'bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-200',
        borderClasses: 'border-amber-200 dark:border-amber-700',
      }
    case 'engagement':
      return {
        headerClasses: 'bg-rose-100 dark:bg-rose-800 text-rose-700 dark:text-rose-200',
        borderClasses: 'border-rose-200 dark:border-rose-700',
      }
    default:
      return {
        headerClasses: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100',
        borderClasses: 'border-gray-200 dark:border-gray-600',
      }
  }
}

// All available blocks definition
export const AVAILABLE_BLOCKS: SearchBlock[] = [
  // Keyword category
  {
    id: 'all-words',
    type: BLOCK_TYPES.ALL_WORDS,
    label: BLOCK_LABELS[BLOCK_TYPES.ALL_WORDS],
    category: 'keyword',
    requiresValue: true,
    placeholder: 'Enter space-separated words',
  },
  {
    id: 'exact-phrase',
    type: BLOCK_TYPES.EXACT_PHRASE,
    label: BLOCK_LABELS[BLOCK_TYPES.EXACT_PHRASE],
    category: 'keyword',
    requiresValue: true,
    placeholder: 'Enter exact phrase',
  },
  {
    id: 'or',
    type: BLOCK_TYPES.OR,
    label: BLOCK_LABELS[BLOCK_TYPES.OR],
    category: 'keyword',
    requiresValue: true,
    placeholder: 'Enter space-separated words/phrases',
  },
  {
    id: 'none-words',
    type: BLOCK_TYPES.NONE_WORDS,
    label: BLOCK_LABELS[BLOCK_TYPES.NONE_WORDS],
    category: 'keyword',
    requiresValue: true,
    placeholder: 'Enter space-separated words to exclude',
  },
  {
    id: 'hashtags',
    type: BLOCK_TYPES.HASHTAGS,
    label: BLOCK_LABELS[BLOCK_TYPES.HASHTAGS],
    category: 'keyword',
    requiresValue: true,
    placeholder: 'Enter space-separated hashtags (without #)',
  },
  // User category
  {
    id: 'from',
    type: BLOCK_TYPES.FROM,
    label: BLOCK_LABELS[BLOCK_TYPES.FROM],
    category: 'user',
    requiresValue: true,
    placeholder: 'Enter space-separated usernames',
  },
  {
    id: 'to',
    type: BLOCK_TYPES.TO,
    label: BLOCK_LABELS[BLOCK_TYPES.TO],
    category: 'user',
    requiresValue: true,
    placeholder: 'Enter space-separated usernames',
  },
  {
    id: 'mention',
    type: BLOCK_TYPES.MENTION,
    label: BLOCK_LABELS[BLOCK_TYPES.MENTION],
    category: 'user',
    requiresValue: true,
    placeholder: 'Enter space-separated usernames',
  },
  {
    id: 'list',
    type: BLOCK_TYPES.LIST,
    label: BLOCK_LABELS[BLOCK_TYPES.LIST],
    category: 'user',
    requiresValue: true,
    placeholder: 'username/listname',
  },
  // Media category
  {
    id: 'filter-media',
    type: BLOCK_TYPES.FILTER_MEDIA,
    label: BLOCK_LABELS[BLOCK_TYPES.FILTER_MEDIA],
    category: 'media',
    requiresValue: false,
  },
  {
    id: 'filter-images',
    type: BLOCK_TYPES.FILTER_IMAGES,
    label: BLOCK_LABELS[BLOCK_TYPES.FILTER_IMAGES],
    category: 'media',
    requiresValue: false,
  },
  {
    id: 'filter-video',
    type: BLOCK_TYPES.FILTER_VIDEO,
    label: BLOCK_LABELS[BLOCK_TYPES.FILTER_VIDEO],
    category: 'media',
    requiresValue: false,
  },
  {
    id: 'filter-links',
    type: BLOCK_TYPES.FILTER_LINKS,
    label: BLOCK_LABELS[BLOCK_TYPES.FILTER_LINKS],
    category: 'media',
    requiresValue: false,
  },
  {
    id: 'url',
    type: BLOCK_TYPES.URL,
    label: BLOCK_LABELS[BLOCK_TYPES.URL],
    category: 'media',
    requiresValue: true,
    placeholder: 'URL text',
  },
  // Date category
  {
    id: 'since',
    type: BLOCK_TYPES.SINCE,
    label: BLOCK_LABELS[BLOCK_TYPES.SINCE],
    category: 'date',
    requiresValue: true,
    placeholder: 'YYYY-MM-DD',
    inputType: 'date',
  },
  {
    id: 'until',
    type: BLOCK_TYPES.UNTIL,
    label: BLOCK_LABELS[BLOCK_TYPES.UNTIL],
    category: 'date',
    requiresValue: true,
    placeholder: 'YYYY-MM-DD',
    inputType: 'date',
  },
  // Engagement category
  {
    id: 'min-retweets',
    type: BLOCK_TYPES.MIN_RETWEETS,
    label: BLOCK_LABELS[BLOCK_TYPES.MIN_RETWEETS],
    category: 'engagement',
    requiresValue: true,
    placeholder: 'Number',
    inputType: 'number',
  },
  {
    id: 'min-faves',
    type: BLOCK_TYPES.MIN_FAVES,
    label: BLOCK_LABELS[BLOCK_TYPES.MIN_FAVES],
    category: 'engagement',
    requiresValue: true,
    placeholder: 'Number',
    inputType: 'number',
  },
  {
    id: 'min-replies',
    type: BLOCK_TYPES.MIN_REPLIES,
    label: BLOCK_LABELS[BLOCK_TYPES.MIN_REPLIES],
    category: 'engagement',
    requiresValue: true,
    placeholder: 'Number',
    inputType: 'number',
  },
  {
    id: 'no-retweets',
    type: BLOCK_TYPES.NO_RETWEETS,
    label: BLOCK_LABELS[BLOCK_TYPES.NO_RETWEETS],
    category: 'engagement',
    requiresValue: false,
  },
  {
    id: 'question',
    type: BLOCK_TYPES.QUESTION,
    label: BLOCK_LABELS[BLOCK_TYPES.QUESTION],
    category: 'engagement',
    requiresValue: false,
  },
]
