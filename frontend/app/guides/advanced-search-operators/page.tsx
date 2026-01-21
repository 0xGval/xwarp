import { ChevronRight, Code, Search, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AdvancedSearchOperators() {
  const operators = [
    {
      category: "Keywords & Phrases",
      operators: [
        {
          name: "all-words",
          syntax: "word1 word2",
          description: "All of these words",
          example: "breaking news",
        },
        {
          name: "exact-phrase",
          syntax: '"exact phrase"',
          description: "This exact phrase",
          example: '"happy birthday"',
        },
        {
          name: "any-words",
          syntax: "word1 OR word2",
          description: "Any of these words (OR)",
          example: "cats OR dogs",
        },
        {
          name: "none-words",
          syntax: "-word",
          description: "None of these words",
          example: "news -politics",
        },
        {
          name: "hashtags",
          syntax: "#hashtag",
          description: "These hashtags",
          example: "#technology",
        },
      ],
    },
    {
      category: "User-Related",
      operators: [
        {
          name: "from-accounts",
          syntax: "from:username",
          description: "From these accounts",
          example: "from:elonmusk",
        },
        {
          name: "to-accounts",
          syntax: "to:username",
          description: "To these accounts",
          example: "to:twitter",
        },
        {
          name: "mentioning",
          syntax: "@username",
          description: "Mentioning these accounts",
          example: "@nasa",
        },
        {
          name: "list",
          syntax: "list:id",
          description: "From a list",
          example: "list:1234567890",
        },
      ],
    },
    {
      category: "Media & Links",
      operators: [
        {
          name: "has-media",
          syntax: "filter:media",
          description: "Has media",
          example: "sunset filter:media",
        },
        {
          name: "has-images",
          syntax: "filter:images",
          description: "Has images",
          example: "cat filter:images",
        },
        {
          name: "has-videos",
          syntax: "filter:videos",
          description: "Has videos",
          example: "tutorial filter:videos",
        },
        {
          name: "has-links",
          syntax: "filter:links",
          description: "Has links",
          example: "news filter:links",
        },
        {
          name: "url-contains",
          syntax: "url:text",
          description: "URL contains",
          example: "url:github",
        },
      ],
    },
    {
      category: "Date Ranges",
      operators: [
        {
          name: "since-date",
          syntax: "since:YYYY-MM-DD",
          description: "Since date",
          example: "news since:2024-01-01",
        },
        {
          name: "until-date",
          syntax: "until:YYYY-MM-DD",
          description: "Until date",
          example: "event until:2024-03-21",
        },
      ],
    },
    {
      category: "Engagement & Sentiment",
      operators: [
        {
          name: "min-retweets",
          syntax: "min_retweets:number",
          description: "Min retweets",
          example: "breaking min_retweets:1000",
        },
        {
          name: "min-likes",
          syntax: "min_faves:number",
          description: "Min likes",
          example: "meme min_faves:5000",
        },
        {
          name: "min-replies",
          syntax: "min_replies:number",
          description: "Min replies",
          example: "announcement min_replies:100",
        },
        {
          name: "no-retweets",
          syntax: "-filter:retweets",
          description: "No retweets",
          example: "news -filter:retweets",
        },
        {
          name: "is-question",
          syntax: "?",
          description: "Is question",
          example: "who ? what ?",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-8">
            <Link href="/guides" className="hover:text-blue-500">Guides</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>Advanced Search Operators</span>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Advanced Search Operators
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master X/Twitter's powerful search operators to find exactly what you're looking for.
              Complete reference guide with examples.
            </p>
          </div>

          {/* Operators Section */}
          <section className="space-y-6">
            {operators.map((category) => (
              <div key={category.category} className="bg-white rounded-lg border">
                <div className="border-b bg-slate-50 px-4 py-2">
                  <h2 className="text-md font-semibold flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-500" />
                    {category.category}
                  </h2>
                </div>
                <div className="divide-y">
                  {category.operators.map((op) => (
                    <div key={op.name} className="px-4 py-2 hover:bg-slate-50">
                      <div className="flex items-center gap-x-4">
                        <div className="w-1/3">
                          <h3 className="font-medium text-sm">{op.description}</h3>
                        </div>
                        <div className="w-1/3">
                          <code className="text-xs font-mono text-blue-600">{op.syntax}</code>
                        </div>
                        <div className="w-1/3 text-slate-600">
                          <code className="text-xs font-mono">{op.example}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Pro Tip */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Pro Tip</h2>
            <p className="text-blue-700 mb-4">
              Combine multiple operators to create powerful, specific searches. For example:
            </p>
            <div className="bg-white/50 rounded-lg p-4">
              <code className="font-mono text-blue-800">
                from:elonmusk tesla filter:images min_faves:1000 since:2024-01-01
              </code>
            </div>
            <p className="text-blue-700 mt-4">
              This finds highly-liked images about Tesla from Elon Musk posted since January 2024.
            </p>
          </div>

          {/* Next Steps */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-3xl font-semibold mb-6">Next Steps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/guides/how-to-use-x-advanced-search">
                <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">How to Use X Advanced Search</h3>
                      <p className="text-muted-foreground">
                        Return to X Advanced Search basics
                      </p>
                    </div>
                    <ChevronRight className="h-6 w-6 text-blue-500 rotate-180" />
                  </div>
                </div>
              </Link>

              <Link href="/guides/building-first-search">
                <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Building Your First Search</h3>
                      <p className="text-muted-foreground">
                      Create your first advanced search
                      </p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 