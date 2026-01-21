import { TwitterSearchBuilder } from "@/components/twitter-search-builder"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <section className="space-y-6">
        <h2 className="sr-only">Advanced Search Builder Interface</h2>
        <TwitterSearchBuilder />
      </section>
    </main>
  )
}
