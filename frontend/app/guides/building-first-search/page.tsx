import { ChevronRight, Target, Code, ArrowRight, Lightbulb } from "lucide-react"
import Link from "next/link"

const categories = [
  { title: "Keywords & Phrases", desc: "Words, exact phrases, hashtags, OR operators" },
  { title: "User Filters", desc: "From accounts, mentions, replies" },
  { title: "Content Type", desc: "Images, videos, links, media" },
  { title: "Time Range", desc: "Since date, until date" },
  { title: "Engagement", desc: "Minimum likes, replies, retweets" }
];

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
              Learn how to combine search operators effectively to create powerful, targeted searches.
              From basic combinations to real-world examples.
            </p>
          </div>

          {/* Main Content */}
          <article className="prose prose-slate max-w-none">
            {/* Defining Search Goals */}
            <section className="my-12">
              <h2 className="text-3xl font-semibold mb-6">Defining Search Goals</h2>
              <div className="bg-white rounded-xl border">
                <div className="border-b bg-slate-50 px-4 py-2">
                  <h3 className="text-sm font-medium">Choose operators from these categories to build your search:</h3>
                </div>
                <div className="divide-y">
                  {categories.map((category, index) => (
                    <div key={index} className="px-4 py-2 hover:bg-slate-50">
                      <div className="flex items-center gap-x-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-x-3">
                          <div className="text-base font-semibold">{category.title}</div>
                          <span className="text-sm text-muted-foreground">{category.desc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Combining Operators */}
            <section className="my-12">
              <h2 className="text-3xl font-semibold mb-6">Combining Operators</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Common Combinations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Popular Design Content</h4>
                      <code className="text-sm font-mono text-blue-600 bg-slate-50 p-2 rounded block">
                        design filter:images min_faves:1000 -filter:retweets lang:en
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
                        Finds highly-liked original design images in English
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Account Interactions</h4>
                      <code className="text-sm font-mono text-blue-600 bg-slate-50 p-2 rounded block">
                        from:elonmusk to:tesla min_replies:100
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
                        Shows popular replies from Elon Musk to Tesla
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Tech News</h4>
                      <code className="text-sm font-mono text-blue-600 bg-slate-50 p-2 rounded block">
                        "artificial intelligence" filter:links min_faves:500 since:2024-01-01
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
                        Recent popular AI articles with at least 500 likes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Examples */}
            <section className="my-12">
              <h2 className="text-3xl font-semibold mb-6">Real-World Examples</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl border p-6 shadow-sm">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Market Research</h3>
                      <code className="text-sm font-mono text-blue-600 bg-slate-50 p-2 rounded block">
                        "artificial intelligence" filter:links min_faves:100 since:2024-01-01 lang:en
                      </code>
                      <p className="text-muted-foreground mt-2">
                        Finds popular English posts about AI with links from 2024
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Event Coverage</h3>
                      <code className="text-sm font-mono text-blue-600 bg-slate-50 p-2 rounded block">
                        #WWDC2024 filter:media min_retweets:50 until:2024-06-10
                      </code>
                      <p className="text-muted-foreground mt-2">
                        Tracks media coverage of WWDC with decent engagement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation */}
            <section className="border-t pt-8 mt-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/guides/advanced-search-operators">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">Advanced Search Operators</div>
                        <p className="text-muted-foreground">
                        Learn fundamental search operators
                        </p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-blue-500 rotate-180" />
                    </div>
                  </div>
                </Link>

                <Link href="/guides/building-a-search-with-builder">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">Using the Builder</div>
                        <p className="text-muted-foreground">
                        Learn how to easily build a search using the Builder
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