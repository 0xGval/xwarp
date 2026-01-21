"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface QueryBlock {
  id: string
  type: string
  value: string
  value2?: string
  requiresValue: boolean
}

interface SearchBlockProps {
  block: QueryBlock
  onUpdateAction: (id: string, value: string, value2?: string) => void
  onRemoveAction: (id: string) => void
}

export function SearchBlock({ block, onUpdateAction, onRemoveAction }: SearchBlockProps) {
  const getBlockLabel = () => {
    switch (block.type) {
      case "all-words":
        return "All of these words"
      case "exact-phrase":
        return "Exact Phrase"
      case "or":
        return "Any of these words (OR)"
      case "none-words":
        return "None of these words"
      case "hashtags":
        return "These Hashtags"
      case "from":
        return "From these Accounts"
      case "to":
        return "To these Accounts"
      case "mention":
        return "Mentioning these Accounts"
      case "list":
        return "List"
      case "filter-media":
        return "Has Media"
      case "filter-images":
        return "Has Images"
      case "filter-video":
        return "Has Videos"
      case "filter-links":
        return "Has Links"
      case "url":
        return "URL Contains"
      case "since":
        return "Since Date"
      case "until":
        return "Until Date"
      case "min-retweets":
        return "Min Retweets"
      case "min-faves":
        return "Min Likes"
      case "min-replies":
        return "Min Replies"
      case "no-retweets":
        return "No Retweets"
      case "question":
        return "Is Question"
      default:
        return block.type
    }
  }

  const renderBlockContent = () => {
    const label = getBlockLabel()
    const inputId = `${block.type}-${block.id}`

    switch (block.type) {
      case "all-words":
        return <Input id={inputId} placeholder="Enter space-separated words" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter all words to search for" />
      case "exact-phrase":
        return <Input id={inputId} placeholder="Enter exact phrase" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter exact phrase to search for" />
      case "or":
        return <Input id={inputId} placeholder="Enter space-separated words/phrases" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter words or phrases to search for (OR)" />
      case "none-words":
        return <Input id={inputId} placeholder="Enter space-separated words to exclude" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter words to exclude from search" />
      case "hashtags":
        return <Input id={inputId} placeholder="Enter space-separated hashtags (without #)" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter hashtags to search for" />
      case "from":
        return <Input id={inputId} placeholder="Enter space-separated usernames" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter usernames to search from" />
      case "to":
        return <Input id={inputId} placeholder="Enter space-separated usernames" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter usernames to search to" />
      case "mention":
        return <Input id={inputId} placeholder="Enter space-separated usernames" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter usernames to search mentions" />
      case "list":
        return <Input id={inputId} placeholder="username/listname" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter list in username/listname format" />
      case "url":
        return <Input id={inputId} placeholder="URL text" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter URL text to search for" />
      case "since":
        return (
          <Input id={inputId} type="date" placeholder="YYYY-MM-DD" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Select since date" />
        )
      case "until":
        return (
          <Input id={inputId} type="date" placeholder="YYYY-MM-DD" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Select until date" />
        )
      case "min-retweets":
        return (
          <Input id={inputId} type="number" placeholder="Number" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter minimum retweets" />
        )
      case "min-faves":
        return (
          <Input id={inputId} type="number" placeholder="Number" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter minimum likes" />
        )
      case "min-replies":
        return (
          <Input id={inputId} type="number" placeholder="Number" value={block.value} onChange={(e) => onUpdateAction(block.id, e.target.value)} aria-label="Enter minimum replies" />
        )
      case "filter-media":
      case "filter-images":
      case "filter-video":
      case "filter-links":
      case "no-retweets":
      case "question":
        return <div className="text-sm text-gray-600" role="status">No additional configuration needed</div>
      default:
        if (!block.requiresValue) {
          return <div className="text-sm text-gray-600" role="status">No additional configuration needed</div>
        }
        return null
    }
  }

  const handleUpdate = (value: string, value2?: string) => {
    onUpdateAction(block.id, value, value2)
  }

  const handleRemove = () => {
    onRemoveAction(block.id)
  }

  return (
    <Card className="p-4 relative" role="group" aria-label={`Search block: ${getBlockLabel()}`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge>{getBlockLabel()}</Badge>
          <Button 
            onClick={handleRemove} 
            className="h-8 w-8 p-0"
            aria-label={`Remove ${getBlockLabel()} block`}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        <div>{renderBlockContent()}</div>
      </div>
    </Card>
  )
}
