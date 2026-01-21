import { ChevronRight, Search, Brain, BarChart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function QueryUsagePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-8">
            <Link href="/guides" className="hover:text-blue-500">Guides</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>Query Usage</span>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Using Your Generated Query
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to effectively use your search query on X/Twitter and analyze the results with our AI tools.
            </p>
          </div>

          {/* Main Content */}
          <article className="prose prose-slate max-w-none">
            {/* X/Twitter Usage */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Search className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-semibold">Using on X/Twitter</h2>
              </div>
              <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Your generated query can be used directly on X/Twitter with our integrated features:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Search Controls</h3>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">Sort By:</p>
                        <div className="flex gap-2 mb-4">
                          <button className="bg-slate-200 px-3 py-1 rounded text-sm">Latest</button>
                          <button className="bg-slate-200 px-3 py-1 rounded text-sm">Top</button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Then click to search on X/Twitter:
                      </p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search Twitter
                      </button>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Generated URL</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your query is automatically encoded into a X-compatible URL:
                      </p>
                      <code className="block bg-slate-100 p-2 rounded text-sm font-mono overflow-x-auto">
                        https://x.com/search?q=dlite%20(from%3A_gval)&src=typed_query&f=live
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Analysis */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-8 w-8 text-purple-500" />
                <h2 className="text-3xl font-semibold">AI Analysis</h2>
              </div>
              <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    Our AI analysis tool uses GPT-4 to analyze tweets matching your search query:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Analysis Controls</h3>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2">Sort By:</p>
                        <div className="flex gap-2 mb-4">
                          <button className="bg-slate-200 px-3 py-1 rounded text-sm">Latest</button>
                          <button className="bg-slate-200 px-3 py-1 rounded text-sm">Top</button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Then click to start the analysis:
                      </p>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        AI Search
                      </button>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Data Collection</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Select how many tweets to analyze (1-20):
                      </p>
                      <div className="flex gap-2 mb-2">
                        <button className="bg-slate-200 px-3 py-1 rounded text-sm">5</button>
                        <button className="bg-slate-200 px-3 py-1 rounded text-sm">10</button>
                        <button className="bg-slate-200 px-3 py-1 rounded text-sm">20</button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We fetch the tweets using your exact search query through RapidAPI's Twitter API.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">AI Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        GPT-4 analyzes the collected tweets to generate:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>• Summary of key narratives</li>
                        <li>• Main discussion topics</li>
                        <li>• Overall sentiment analysis</li>
                        <li>• Strategic insights</li>
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Results</h3>
                      <p className="text-sm text-muted-foreground">
                        After analysis is completed, you'll see a new results box containing:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>• The matching tweets from your search</li>
                        <li>• Complete AI analysis with all insights</li>
                        <li>• Interactive results you can explore</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

           

            {/* Navigation */}
            <section className="border-t pt-8 mt-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/guides/building-a-search-with-builder">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">Using the Builder</div>
                        <p className="text-muted-foreground">
                        Learn how to easily build a search using the Builder
                        </p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-blue-500 rotate-180" />
                    </div>
                  </div>
                </Link>

               
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>
  )
} 