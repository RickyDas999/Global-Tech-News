import { useState } from "react"
import Header from "./components/Header"
import CategoryFilter from "./components/CategoryFilter"
import Footer from "./components/Footer"

const PLACEHOLDER_ARTICLES = Array.from({ length: 6 }, (_, i) => i)
const PLACEHOLDER_REPOS = Array.from({ length: 5 }, (_, i) => i)

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        lastUpdatedLabel="Updated just now"
      />
      <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-6 lg:flex-row lg:items-start">
        <section aria-label="Trending news" className="lg:w-[70%]">
          <h1 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Trending News
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PLACEHOLDER_ARTICLES.map((i) => (
              <div
                key={i}
                className="h-56 rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              />
            ))}
          </div>
        </section>

        <aside
          aria-label="GitHub trending repositories"
          className="lg:sticky lg:top-20 lg:w-[30%]"
        >
          <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            GitHub Trending
          </h2>
          <div className="flex flex-col gap-3">
            {PLACEHOLDER_REPOS.map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              />
            ))}
          </div>
        </aside>
      </main>

      <Footer totalCount={0} sourceCount={0} onRefresh={() => {}} />
    </div>
  )
}

export default App
