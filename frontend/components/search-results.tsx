"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Repeat, Heart, Share, AlertCircle, BarChart, Hash, Lightbulb, BrainCircuit, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Analysis, DisplayTweet, SearchMode } from "@/types"

interface TwitterData {
  analysis?: Analysis
  results?: {
    results: Array<{
      id: string
      user_name: string
      user_screen_name: string
      text: string
      created_at: string
      retweet_count: number
      favorite_count: number
      reply_count: number
      user_profile_image_url: string | null
    }>
  }
}

interface SearchResultsProps {
  query: string
  twitterData?: TwitterData
  error?: string
  section?: SearchMode
  isLoading?: boolean
}

export function SearchResults({
  query,
  twitterData,
  error,
  section,
  isLoading = false,
}: SearchResultsProps) {
  const [activeTab, setActiveTab] = useState<string>("results")

  const showTweetsLoading = isLoading && !twitterData?.results
  const showAnalysisLoading = isLoading || (twitterData?.results && !twitterData?.analysis)

  const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return ""

    try {
      const date = new Date(timestamp)

      if (isNaN(date.getTime())) {
        return timestamp.split(" ").slice(0, 3).join(" ")
      }

      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))

      if (diffHrs < 1) {
        const diffMins = Math.floor(diffMs / (1000 * 60))
        return `${diffMins}m`
      } else if (diffHrs < 24) {
        return `${diffHrs}h`
      } else {
        const diffDays = Math.floor(diffHrs / 24)
        return `${diffDays}d`
      }
    } catch {
      return timestamp
    }
  }

  const processTweets = (): DisplayTweet[] => {
    if (!twitterData?.results?.results) {
      return []
    }

    try {
      const tweetsArray = twitterData.results.results

      if (!Array.isArray(tweetsArray)) {
        return []
      }

      return tweetsArray.map((tweet) => ({
        id: tweet.id || Math.random().toString(),
        username: tweet.user_name || "Unknown User",
        handle: tweet.user_screen_name ? `@${tweet.user_screen_name}` : "unknown",
        content: tweet.text || "",
        timestamp: formatTimestamp(tweet.created_at) || "Unknown time",
        retweets: tweet.retweet_count || 0,
        likes: tweet.favorite_count || 0,
        replies: tweet.reply_count || 0,
        avatar: tweet.user_profile_image_url || "/placeholder.svg?height=40&width=40",
      }))
    } catch {
      return []
    }
  }

  const tweets = processTweets()

  const renderTweetResults = () => (
    <div className="space-y-4" role="feed" aria-label="Search results">
      {tweets.length === 0 && !error ? (
        <p className="text-center py-8 text-gray-500" role="status">
          No tweets found for this query.
        </p>
      ) : (
        tweets.map((tweet) => (
          <article
            key={tweet.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            role="article"
            aria-label={`Tweet by ${tweet.username}`}
          >
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={tweet.avatar} alt={`${tweet.username}'s profile picture`} />
                <AvatarFallback>{tweet.username?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{tweet.username}</span>
                  <span className="text-gray-500 text-sm">{tweet.handle}</span>
                  <span className="text-gray-500 text-sm" aria-hidden="true">
                    ·
                  </span>
                  <time className="text-gray-500 text-sm" dateTime={tweet.timestamp}>
                    {tweet.timestamp}
                  </time>
                </div>
                <p className="mt-1">{tweet.content}</p>
                <div className="flex mt-3 text-gray-500 text-sm" role="group" aria-label="Tweet engagement">
                  <button className="flex items-center mr-4" aria-label={`${tweet.replies} replies`}>
                    <MessageCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                    {tweet.replies}
                  </button>
                  <button className="flex items-center mr-4" aria-label={`${tweet.retweets} retweets`}>
                    <Repeat className="h-4 w-4 mr-1" aria-hidden="true" />
                    {tweet.retweets}
                  </button>
                  <button className="flex items-center mr-4" aria-label={`${tweet.likes} likes`}>
                    <Heart className="h-4 w-4 mr-1" aria-hidden="true" />
                    {tweet.likes}
                  </button>
                  <button className="flex items-center" aria-label="Share">
                    <Share className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  )

  const renderAnalysisContent = () => {
    if (!twitterData?.analysis) {
      return (
        <div className="py-8" role="status" aria-label="No analysis available">
          <div className="text-center space-y-4">
            <BarChart className="h-16 w-16 mx-auto text-gray-400" aria-hidden="true" />
            <h3 className="text-xl font-medium">No Analysis Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Analysis could not be generated for these tweets.
            </p>
          </div>
        </div>
      )
    }

    const analysis = twitterData.analysis

    return (
      <div className="space-y-8 py-4" role="region" aria-label="Tweet analysis">
        {/* Summary Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-900">Key Findings</h3>
          <p className="text-gray-800 leading-relaxed">{analysis.summary}</p>
        </section>

        {/* Topics and Sentiment */}
        <section className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Main Topics</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.topics?.map((topic, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700 flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="ml-6 min-w-[200px]">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Sentiment</h3>
              <Badge
                className={`text-sm px-4 py-1 ${
                  String(analysis.sentiment).toLowerCase().includes("positive")
                    ? "bg-green-100 text-green-800"
                    : String(analysis.sentiment).toLowerCase().includes("negative")
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {String(analysis.sentiment)}
              </Badge>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        {analysis.insights && analysis.insights.length > 0 && (
          <section className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Strategic Insights</h3>
            <div className="space-y-4">
              {analysis.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full mt-1">
                    <Lightbulb className="h-4 w-4 text-purple-700" />
                  </div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Search Results</CardTitle>
          {section && (
            <Badge variant="outline" className="capitalize">
              {section === "latest" ? "Latest Tweets" : "Top Tweets"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="results" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6" role="tablist">
            <TabsTrigger value="results" disabled={showTweetsLoading}>
              Search Results
              {showTweetsLoading && (
                <div className="ml-2 animate-spin" aria-hidden="true">
                  ⟳
                </div>
              )}
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={showAnalysisLoading}>
              Analysis
              {showAnalysisLoading && (
                <div className="ml-2 animate-spin" aria-hidden="true">
                  ⟳
                </div>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="results" role="tabpanel">
            {showTweetsLoading ? <LoadingSpinner message="Fetching tweets..." /> : renderTweetResults()}
          </TabsContent>
          <TabsContent value="analysis" role="tabpanel">
            {showAnalysisLoading ? <LoadingSpinner message="Analyzing tweets..." /> : renderAnalysisContent()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function LoadingSpinner({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <BrainCircuit className="h-5 w-5 text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-lg font-medium text-gray-700">{message}</div>
    </div>
  )
}
