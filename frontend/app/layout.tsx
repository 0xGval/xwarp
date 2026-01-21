"use client"

import { siteMetadata } from "@/app/metadata"
import React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Search } from "lucide-react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>X Advanced Search Builder</title>
        <meta name="description" content="Professional X/Twitter search builder with AI analysis. Create advanced searches using drag-and-drop blocks or natural language. Get powerful insights from your search results." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "X Advanced Search Builder",
              "description": siteMetadata.description,
              "applicationCategory": "SearchTool",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm sticky top-0 z-50">
            <div className="container mx-auto py-4 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-blue-500 text-white p-2 rounded-lg">
                      <Search className="h-5 w-5" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">X Search Pro</h1>
                    </div>
                  </Link>
                </div>
                <nav className="flex items-center space-x-3">
                  <Link href="/guides" className="text-xs font-medium hover:text-blue-500 dark:hover:text-blue-400 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Guides
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto py-6 px-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'
