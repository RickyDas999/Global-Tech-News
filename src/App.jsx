import { useEffect, useState } from "react"
import Header from "./components/Header"
import CategoryFilter from "./components/CategoryFilter"
import NewsGrid from "./components/NewsGrid"
import Footer from "./components/Footer"
import { useDarkMode } from "./hooks/useDarkMode"
import { fetchHackerNewsArticles } from "./api/hackerNews"

const PLACEHOLDER_REPOS = Array.from({ length: 5 }, (_, i) => i)

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useDarkMode()

  useEffect(() => {
    fetchHackerNewsArticles()
      .then(setArticles)
      .catch((error) => console.error("Failed to load Hacker News stories", error))
      .finally(() => setLoading(false))
  }, [])

  const sourceCount = new Set(articles.map((article) => article.source)).size

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        lastUpdatedLabel="Updated just now"
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-6 lg:flex-row lg:items-start">
        <section aria-label="Trending news" className="lg:w-[70%]">
          <h1 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Trending News
          </h1>
          {loading ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Loading stories…
            </p>
          ) : (
            <NewsGrid articles={articles} />
          )}
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

      <Footer totalCount={articles.length} sourceCount={sourceCount} onRefresh={() => {}} />
    </div>
  )
}

export default App
