import { ChevronRight, Blocks, Brain, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BuildingFirstSearch() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-8">
            <Link href="/guides" className="hover:text-blue-500">Guides</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>Building Your First Search</span>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Building Your First Search
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to use our visual block builder and AI-powered natural language interface
              to create powerful X/Twitter searches.
            </p>
          </div>

          {/* Builder Interface Image */}
          <section className="my-12">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border bg-slate-50">
              <Image
                src="/builder.png"
                alt="X/Twitter Advanced Search Builder Interface"
                fill
                className="object-contain"
                quality={95}
                priority
              />
            </div>
          </section>

          {/* Main Content */}
          <article className="prose prose-slate max-w-none">
            {/* Block Builder */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Blocks className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-semibold">Visual Block Builder</h2>
              </div>
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    Our visual builder lets you construct searches by combining color-coded blocks:
                  </p>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Blue blocks</span>
                      <span className="text-muted-foreground">for keywords and phrases</span>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Green blocks</span>
                      <span className="text-muted-foreground">for user filters</span>
                    </div>
                    <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">Purple blocks</span>
                      <span className="text-muted-foreground">for media filters</span>
                    </div>
                    <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="font-medium">Orange blocks</span>
                      <span className="text-muted-foreground">for date ranges</span>
                    </div>
                    <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Red blocks</span>
                      <span className="text-muted-foreground">for engagement metrics</span>
                    </div>
                  </div>
                </div>
                <div className="border-t bg-slate-50 p-6">
                  <p className="font-medium mb-2">How it works:</p>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Drag blocks from the sidebar or click to add them</li>
                    <li>2. Fill in required values (words, dates, numbers)</li>
                    <li>3. Combine multiple blocks to refine your search</li>
                    <li>4. Remove blocks you don't need anymore</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Natural Language */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="h-8 w-8 text-purple-500" />
                <h2 className="text-3xl font-semibold">Natural Language Search</h2>
              </div>
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">
                    Simply describe what you're looking for in plain English, and our AI will build the perfect search. 
                    After the AI generates your blocks, you can still add, remove, or adjust any parameters to fine-tune your query.
                  </p>
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Content Discovery</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-blue-600 italic mb-2">
                            "Find viral tweets about AI with images posted this year"
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-sm">
                            AI filter:images since:2024-01-01 min_retweets:1000
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Combines: keywords, media filters, date range, and engagement metrics
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-600 italic mb-2">
                            "Show me trending discussions about climate change with links"
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-sm">
                            "climate change" filter:links min_faves:500
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Handles: exact phrase, URL filtering, and popularity metrics
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">User Interactions</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-blue-600 italic mb-2">
                            "Show me tweets from elonmusk to Tesla with over 1000 likes"
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-sm">
                            (from:elonmusk) (to:Tesla) min_faves:1000
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Understands: user accounts, mentions, and engagement thresholds
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-600 italic mb-2">
                            "Find replies to NASA about Mars with videos"
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-sm">
                            to:NASA Mars filter:videos -filter:retweets
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Processes: reply filtering, account targeting, and media types
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Advanced Combinations</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-blue-600 italic mb-2">
                            "Find viral tech announcements from last week excluding retweets"
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-sm">
                            tech announcement since:2024-02-14 -filter:retweets min_faves:1000
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Handles: date ranges, content type, and tweet filtering
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-600 italic mb-2">
                            "Show popular questions about machine learning with code snippets"
                          </p>
                          <div className="bg-slate-100 p-3 rounded font-mono text-sm">
                            "machine learning" ? filter:links min_faves:100 lang:en
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Combines: question detection, topic filtering, and content analysis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t bg-slate-50 p-6">
                  <p className="font-medium mb-2">The AI understands:</p>
                  <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <li>• Time expressions ("last week", "this year")</li>
                    <li>• Engagement levels ("viral", "trending")</li>
                    <li>• Content types ("images", "videos", "links")</li>
                    <li>• User interactions ("replies", "mentions")</li>
                    <li>• Topics and themes ("tech", "AI", "climate")</li>
                    <li>• Complex combinations of multiple filters</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Navigation */}
            <section className="border-t pt-8 mt-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/guides/building-first-search">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">Building Your First Search</div>
                        <p className="text-muted-foreground">
                        Create your first advanced search
                        </p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-blue-500 rotate-180" />
                    </div>
                  </div>
                </Link>

                <Link href="/guides/query-usage">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">Query Usage</div>
                        <p className="text-muted-foreground">
                        Learn how to use the query you generate
                        </p>
                      </div>
                      <ArrowRight className="h-6 w-6 text-blue-500" />
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