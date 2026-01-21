"use client"

import { useState, useId } from "react"
import { Search, BrainCircuit, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core"
import { BlocksContainer } from "@/components/blocks-container"
import { QueryContainer } from "@/components/query-container"
import { BlockPreview } from "@/components/block-preview"
import { SearchResults } from "@/components/search-results"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import type { SearchBlock, ActiveBlock, SearchMode } from "@/types"
import { AVAILABLE_BLOCKS, getBlockLabel } from "@/lib/blocks"
import { api } from "@/lib/api"

// Re-export types for backward compatibility
export type SearchBlockType = SearchBlock
export type ActiveBlockType = ActiveBlock

export function TwitterSearchBuilder() {
  const [activeBlocks, setActiveBlocks] = useState<ActiveBlock[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [searchMode, setSearchMode] = useState<SearchMode>("latest")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiResults, setAiResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const [tweetLimit, setTweetLimit] = useState<string>("5")
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [naturalQuery, setNaturalQuery] = useState("")
  const [naturalLoading, setNaturalLoading] = useState(false)

  const dndDescribedById = useId()
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) {
      setActiveId(null)
      return
    }
    if (active.id !== over.id) {
      // Drag end logic preserved
    }
    setActiveId(null)
  }

  const handleBlockClick = (blockId: string) => {
    const blockType = AVAILABLE_BLOCKS.find((block) => block.id === blockId)
    if (!blockType) return

    const isAlreadyUsed = activeBlocks.some((block) => block.type === blockType.type)
    if (isAlreadyUsed) return

    const newBlock: ActiveBlock = {
      ...blockType,
      id: `${blockType.id}-${Date.now()}`,
      value: "",
    }
    setActiveBlocks((prev) => [...prev, newBlock])
  }

  const updateBlockValue = (id: string, value: string, value2?: string) => {
    setActiveBlocks((blocks) =>
      blocks.map((block) =>
        block.id === id
          ? { ...block, value, value2: block.type === "or" ? undefined : value2 }
          : block
      )
    )
  }

  const removeBlock = (id: string) => {
    setActiveBlocks((blocks) => blocks.filter((block) => block.id !== id))
  }

  const generateQuery = (): string => {
    const keywordTypes = ["all-words", "exact-phrase", "or", "none-words", "hashtags"]
    const keywordBlocks = activeBlocks.filter((block) => keywordTypes.includes(block.type))
    const otherBlocks = activeBlocks.filter((block) => !keywordTypes.includes(block.type))

    const processWords = (value: string, prefix = "", suffix = "") => {
      return value
        .split(" ")
        .filter(Boolean)
        .map((word) => `${prefix}${word}${suffix}`)
        .join(" ")
    }

    const processBlock = (block: ActiveBlock): string => {
      switch (block.type) {
        case "all-words":
          return block.value
        case "exact-phrase":
          return `"${block.value}"`
        case "or": {
          const terms = block.value.split(" ").filter(Boolean)
          if (terms.length === 0) return ""
          if (terms.length === 1) return terms[0]
          return `(${terms.join(" OR ")})`
        }
        case "none-words":
          return processWords(block.value, "-")
        case "hashtags":
          return processWords(block.value, "#")
        case "from": {
          const users = block.value.split(" ").filter(Boolean)
          if (users.length === 0) return ""
          return `(${users.map((u) => `from:${u}`).join(" OR ")})`
        }
        case "to": {
          const users = block.value.split(" ").filter(Boolean)
          if (users.length === 0) return ""
          return `(${users.map((u) => `to:${u}`).join(" OR ")})`
        }
        case "mention": {
          const users = block.value.split(" ").filter(Boolean)
          if (users.length === 0) return ""
          return `(${users.map((u) => `@${u}`).join(" OR ")})`
        }
        case "list":
          return `list:${block.value}`
        case "filter-media":
          return "filter:media"
        case "filter-images":
          return "filter:images"
        case "filter-video":
          return "filter:native_video"
        case "filter-links":
          return "filter:links"
        case "url":
          return `url:${block.value}`
        case "since":
          return `since:${block.value}`
        case "until":
          return `until:${block.value}`
        case "min-retweets":
          return `min_retweets:${block.value}`
        case "min-faves":
          return `min_faves:${block.value}`
        case "min-replies":
          return `min_replies:${block.value}`
        case "no-retweets":
          return "-filter:retweets"
        case "question":
          return "?"
        default:
          return ""
      }
    }

    const keywordPart = keywordBlocks.map(processBlock).filter(Boolean).join(" ")
    const otherPart = otherBlocks.map(processBlock).filter(Boolean).join(" ")

    return [keywordPart, otherPart].filter(Boolean).join(" ")
  }

  const performSearch = () => {
    const query = generateQuery()
    if (!query) return

    const encodedQuery = encodeURIComponent(query)
    let searchUrl = `https://x.com/search?q=${encodedQuery}&src=typed_query`
    if (searchMode === "latest") {
      searchUrl += "&f=live"
    }
    window.open(searchUrl, "_blank", "noopener,noreferrer")
  }

  const getActiveBlock = () => {
    if (!activeId) return null

    if (activeId.toString().startsWith("active-")) {
      const blockId = activeId.toString().replace("active-", "")
      return activeBlocks.find((b) => b.id === blockId)
    }
    return AVAILABLE_BLOCKS.find((block) => block.id === activeId)
  }

  const activeBlock = getActiveBlock()
  const usedBlockTypes = activeBlocks.map((block) => block.type)

  const performAiSearch = async () => {
    const query = generateQuery()
    if (!query) return

    setAiLoading(true)
    setShowResults(true)
    setAiResults(null)
    setShowLimitDialog(false)

    try {
      await api.aiSearchStream(
        query,
        searchMode,
        parseInt(tweetLimit),
        (data) => {
          setAiResults((prev: any) => ({
            ...prev,
            ...data,
          }))
        }
      )
    } catch (error) {
      setAiResults({
        error: error instanceof Error ? error.message : "Error performing search. Please try again.",
      })
    } finally {
      setAiLoading(false)
    }
  }

  const handleAiSearchClick = () => {
    setShowLimitDialog(true)
  }

  const handleNaturalLanguageSubmit = async () => {
    if (!naturalQuery.trim()) return

    setNaturalLoading(true)
    try {
      const data = await api.naturalLanguage(naturalQuery)

      setActiveBlocks([])

      const newBlocks = data.blocks.map((block) => {
        const baseBlock = AVAILABLE_BLOCKS.find((b) => b.type === block.type) || {
          id: block.type,
          type: block.type,
          category: block.category as any,
          requiresValue: block.requiresValue,
          label: getBlockLabel(block.type),
        }

        return {
          ...baseBlock,
          id: `${block.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          value: block.value,
        }
      })

      setActiveBlocks(newBlocks)

      const queryContainer = document.querySelector(".query-container")
      queryContainer?.scrollIntoView({ behavior: "smooth" })
    } catch (error) {
      // Error handled silently - could add toast notification here
    } finally {
      setNaturalLoading(false)
      setNaturalQuery("")
    }
  }

  return (
    <div className="space-y-6" role="main" aria-label="Twitter Search Builder Interface">
      <Card>
        <CardHeader>
          <CardTitle>
            Natural Language Builder
            <Badge variant="outline" className="ml-2 align-middle">
              Beta
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Describe your search query in plain English..."
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                className="flex-1"
                aria-label="Natural language query input"
              />
              <Button
                onClick={handleNaturalLanguageSubmit}
                disabled={naturalLoading || !naturalQuery.trim()}
                aria-label="Build query from natural language"
              >
                {naturalLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                    Build Query
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground" role="note">
              Example: "Find tweets about climate change from verified users with at least 100
              likes"
            </p>
          </div>
        </CardContent>
      </Card>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        id={dndDescribedById}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Blocks</CardTitle>
              <p className="text-sm text-muted-foreground">
                Drag and drop blocks to build complex Twitter search queries
              </p>
            </CardHeader>
            <CardContent>
              <BlocksContainer
                blocks={AVAILABLE_BLOCKS}
                usedBlockTypes={usedBlockTypes}
                onBlockClickAction={handleBlockClick}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Query</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryContainer
                blocks={activeBlocks}
                updateBlockValueAction={updateBlockValue}
                removeBlockAction={removeBlock}
              />

              {activeBlocks.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Generated Query:</h3>
                      <div
                        className="p-3 bg-gray-100 rounded-md overflow-x-auto"
                        role="region"
                        aria-label="Generated search query"
                      >
                        <code className="text-sm">{generateQuery()}</code>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="search-mode-toggle">
                        Search Results:{" "}
                        <span className="font-bold">
                          {searchMode === "latest" ? "Latest" : "Top"}
                        </span>
                      </Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="search-mode-toggle" className="text-sm text-gray-500">
                          Top
                        </Label>
                        <Switch
                          id="search-mode-toggle"
                          checked={searchMode === "latest"}
                          onCheckedChange={(checked) =>
                            setSearchMode(checked ? "latest" : "top")
                          }
                          aria-label="Toggle between latest and top results"
                        />
                        <Label htmlFor="search-mode-toggle" className="text-sm text-gray-500">
                          Latest
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={performSearch}
                        className="flex-1"
                        aria-label="Search Twitter"
                      >
                        <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                        Search Twitter
                      </Button>

                      <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={handleAiSearchClick}
                            disabled={aiLoading}
                            aria-label="Perform AI analysis"
                          >
                            {aiLoading ? (
                              <>
                                <BrainCircuit
                                  className="h-4 w-4 mr-2 animate-pulse"
                                  aria-hidden="true"
                                />
                                <span>Processing</span>
                                <span className="ml-1 animate-[bounce_1.5s_infinite]">.</span>
                                <span className="ml-0.5 animate-[bounce_1.5s_infinite_.2s]">
                                  .
                                </span>
                                <span className="ml-0.5 animate-[bounce_1.5s_infinite_.4s]">
                                  .
                                </span>
                              </>
                            ) : (
                              <>
                                <BrainCircuit className="h-4 w-4 mr-2" aria-hidden="true" />
                                AI Search
                              </>
                            )}
                          </Button>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Configure AI Search</DialogTitle>
                          </DialogHeader>
                          <div className="py-4 space-y-4">
                            <div>
                              <Label htmlFor="tweet-limit">Number of tweets to analyze</Label>
                              <Select value={tweetLimit} onValueChange={setTweetLimit}>
                                <SelectTrigger id="tweet-limit">
                                  <SelectValue placeholder="Select limit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 tweet</SelectItem>
                                  <SelectItem value="5">5 tweets</SelectItem>
                                  <SelectItem value="10">10 tweets</SelectItem>
                                  <SelectItem value="15">15 tweets</SelectItem>
                                  <SelectItem value="20">20 tweets</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-gray-500 mt-2">
                                Select how many tweets you want to analyze. More tweets will
                                provide better analysis but take longer to process.
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowLimitDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={performAiSearch} disabled={aiLoading}>
                              {aiLoading ? "Processing..." : "Start Analysis"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DragOverlay>
          {activeBlock ? (
            <BlockPreview block={activeBlock} category={activeBlock.category} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {showResults && (
        <div className="mt-8">
          <SearchResults
            query={generateQuery()}
            twitterData={aiResults}
            error={aiResults?.error}
            section={searchMode}
            isLoading={aiLoading}
          />
        </div>
      )}
    </div>
  )
}
