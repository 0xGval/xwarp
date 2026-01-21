import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BookOpen, Code, BarChart, Users, Brain } from "lucide-react"

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              X/Twitter Advanced Search Guides
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master advanced search techniques for X (formerly Twitter) with our comprehensive, 
              step-by-step guides and professional tutorials.
            </p>
          </div>

          {/* Guide Sections */}
          <div className="grid gap-12">
            {/* Getting Started */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-semibold">Getting Started</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/guides/how-to-use-x-advanced-search">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">How to Use X Advanced Search</CardTitle>
                      <CardDescription className="text-sm">
                        Beginner's guide to X/Twitter advanced search
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Why Use Advanced Search?</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Accessing Advanced Search</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Understanding the Interface</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/guides/advanced-search-operators">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">Advanced Search Operators</CardTitle>
                      <CardDescription className="text-sm">
                        Learn fundamental search operators
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Keywords and phrases</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">User-Related</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Media & Links</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Date Ranges</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Engagement & Sentiment</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/guides/building-first-search">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">Building Your First Search</CardTitle>
                      <CardDescription className="text-sm">
                        Create your first advanced search
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Define search goals</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Combine operators</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Real-world examples</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>

            {/* Advanced Techniques */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Code className="h-8 w-8 text-indigo-500" />
                <h2 className="text-3xl font-semibold">Using X Advanced Search Builder</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/guides/building-a-search-with-builder">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl">Building A Search</CardTitle>
                      <CardDescription className="text-base">
                        Learn how to easily build a search using the Builder
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-indigo-500" />
                          <span>Blocks To Query</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-indigo-500" />
                          <span>Natural Language To Query</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/guides/query-usage">
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl">Query Usage</CardTitle>
                      <CardDescription className="text-base">
                        Learn how to use the query you generate
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-indigo-500" />
                          <span>Usage on X/Twitter</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-indigo-500" />
                          <span>AI analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-indigo-500" />
                          <span>Analysis results</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>

      
           
          </div>
        </div>
      </div>
    </main>
  )
} 