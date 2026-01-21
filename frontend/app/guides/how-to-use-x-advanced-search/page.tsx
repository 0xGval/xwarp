import { ChevronRight, Monitor, Smartphone, Search, Filter, Target, Lightbulb, Info, Users, Calendar, Clock, LineChart, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HowToUseXAdvancedSearch() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb - Following style guide */}
          <div className="text-sm text-muted-foreground mb-8">
            <Link href="/guides" className="hover:text-blue-500">Guides</Link>
            <ChevronRight className="inline h-4 w-4 mx-2" />
            <span>How to Use X Advanced Search</span>
          </div>

          {/* Hero Section - Following style guide */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              How to Use X Advanced Search
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn how to access and navigate X's advanced search interface. This beginner-friendly guide 
              covers everything from finding the search tools to understanding the basic interface.
            </p>
          </div>

          {/* Main Content */}
          <article className="prose prose-slate max-w-none">
            {/* Why Use Advanced Search */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-semibold">Why Use Advanced Search?</h2>
              </div>
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Cards following style guide */}
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Target className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-blue-800 mb-2">More Precise Results</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Find exactly what you're looking for instead of sifting through irrelevant tweets
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Clock className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-blue-800 mb-2">Save Time</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use filters and operators to quickly narrow down your search
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                          <LineChart className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-blue-800 mb-2">Better Research</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perfect for market research, trend analysis, and monitoring conversations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Accessing Advanced Search */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Search className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-semibold">Accessing Advanced Search</h2>
              </div>
              <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Desktop Instructions */}
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-4 flex items-center gap-2">
                        <Monitor className="h-5 w-5 text-blue-500" />
                        On Desktop
                      </h3>
                      <ol className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                          <div>
                            <strong>Visit X.com</strong>
                            <p className="text-sm text-muted-foreground">Open your browser and go to X.com (formerly Twitter.com)</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</span>
                          <div>
                            <strong>Perform a Basic Search</strong>
                            <p className="text-sm text-muted-foreground">Enter any search term in the top search bar</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</span>
                          <div>
                            <strong>Find Advanced Search</strong>
                            <p className="text-sm text-muted-foreground">Click the three-dot menu (⋯) in the search results</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">4</span>
                          <div>
                            <strong>Select Advanced Search</strong>
                            <p className="text-sm text-muted-foreground">Click "Advanced search" from the dropdown menu</p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    {/* Mobile Instructions */}
                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-4 flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-indigo-500" />
                        On Mobile
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                          <p className="text-amber-800 flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Advanced search on mobile is limited.
                          </p>
                        </div>
                        <ol className="space-y-4">
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                            <div>
                              <strong>Open X App</strong>
                              <p className="text-sm text-muted-foreground">Launch the official X mobile app</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                            <div>
                              <strong>Use Search Bar</strong>
                              <p className="text-sm text-muted-foreground">Enter search operators directly in the search bar</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">3</span>
                            <div>
                              <strong>Enter Search Syntax</strong>
                              <p className="text-sm text-muted-foreground">Type operators manually (e.g., "from:username filter:images")</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Understanding the Interface */}
            <section className="my-12">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="h-8 w-8 text-blue-500" />
                <h2 className="text-3xl font-semibold">Understanding the Interface</h2>
              </div>
              <div className="bg-white rounded-xl border p-6 shadow-sm">
                <p className="text-muted-foreground mb-8">
                  The advanced search form is organized into four main sections, each containing different search operators to help you find exactly what you're looking for:
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Words</h4>
                      <p className="text-muted-foreground">Word operators help you find posts containing specific words, exact phrases, or hashtags. You can match all words, any word, or exclude specific terms. Language selection is also available here.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Accounts</h4>
                      <p className="text-muted-foreground">Account operators let you search for posts from specific accounts, find replies to particular users, or locate posts mentioning certain accounts. These are essential for tracking conversations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                      <Filter className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Filters</h4>
                      <p className="text-muted-foreground">Filter operators help refine your search with engagement metrics (minimum likes, replies, or reposts), control reply visibility, and filter for posts containing links.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Dates</h4>
                      <p className="text-muted-foreground">Date operators allow you to narrow your search to a specific time period. Set start and end dates to find posts from any time range, from a specific day to several years.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Footer - Following style guide */}
            <section className="border-t pt-8 mt-12">
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/guides">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">All Guides</div>
                        <p className="text-muted-foreground">Return to all guides</p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </Link>

                <Link href="/guides/advanced-search-operators">
                  <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-semibold mb-2">Advanced Search Operators</div>
                        <p className="text-muted-foreground">Learn fundamental search operators</p>
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