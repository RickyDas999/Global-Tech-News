import { useEffect, useState } from "react"
import Header from "./components/Header"
import CategoryFilter from "./components/CategoryFilter"
import NewsGrid from "./components/NewsGrid"
import GitHubTrending from "./components/GitHubTrending"
import Footer from "./components/Footer"
import { useDarkMode } from "./hooks/useDarkMode"
import { useBookmarks } from "./hooks/useBookmarks"
import { useInfiniteScroll } from "./hooks/useInfiniteScroll"
import { fetchAllArticles } from "./api/newsService"
import { fetchTrendingRepositories } from "./api/githubTrending"

function matchesArticleQuery(article, query) {
  if (!query.trim()) return true
  const haystack = `${article.title} ${article.description} ${article.source} ${article.categories.join(" ")}`.toLowerCase()
  return haystack.includes(query.trim().toLowerCase())
}

function matchesRepoQuery(repo, query) {
  if (!query.trim()) return true
  const haystack = `${repo.name} ${repo.fullName} ${repo.description} ${repo.language}`.toLowerCase()
  return haystack.includes(query.trim().toLowerCase())
}

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [articles, setArticles] = useState([])
  const [sourceCount, setSourceCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [repositories, setRepositories] = useState([])
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const { theme, toggleTheme } = useDarkMode()
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks()

  useEffect(() => {
    fetchAllArticles()
      .then(({ articles: fetched, failedSources, sourceCount: succeeded }) => {
        setArticles(fetched)
        setSourceCount(succeeded)
        if (failedSources.length > 0) {
          console.warn(`Unavailable sources: ${failedSources.join(", ")}`)
        }
      })
      .finally(() => setLoading(false))

    fetchTrendingRepositories()
      .then(setRepositories)
      .catch((error) => console.error("Failed to load GitHub trending repositories", error))
  }, [])

  function handleToggleBookmark(article) {
    if (isBookmarked(article.id)) {
      removeBookmark(article.id)
    } else {
      addBookmark(article)
    }
  }

  const categoryFiltered =
    activeCategory === "All"
      ? articles
      : articles.filter((article) => article.categories.includes(activeCategory))

  const bookmarkFiltered = bookmarkedOnly
    ? categoryFiltered.filter((article) => isBookmarked(article.id))
    : categoryFiltered

  const visibleArticles = bookmarkFiltered.filter((article) =>
    matchesArticleQuery(article, searchQuery),
  )
  const visibleRepositories = repositories.filter((repo) => matchesRepoQuery(repo, searchQuery))

  const { visibleCount, sentinelRef } = useInfiniteScroll(
    visibleArticles.length,
    `${activeCategory}|${bookmarkedOnly}|${searchQuery}`,
  )
  const paginatedArticles = visibleArticles.slice(0, visibleCount)

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        lastUpdatedLabel="Updated just now"
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <CategoryFilter
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
        bookmarkedOnly={bookmarkedOnly}
        onToggleBookmarkedOnly={() => setBookmarkedOnly((current) => !current)}
        bookmarkCount={bookmarks.length}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-6 lg:flex-row lg:items-start">
        <section aria-label="Trending news" className="lg:w-[70%]">
          <h1 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Trending News
          </h1>
          {loading ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Loading stories…
            </p>
          ) : visibleArticles.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {bookmarkedOnly ? "No bookmarks yet." : "No stories match your filters."}
            </p>
          ) : (
            <>
              <NewsGrid
                articles={paginatedArticles}
                isBookmarked={isBookmarked}
                onToggleBookmark={handleToggleBookmark}
              />
              {visibleCount < visibleArticles.length && (
                <div ref={sentinelRef} className="h-1" aria-hidden="true" />
              )}
            </>
          )}
        </section>

        <GitHubTrending repositories={visibleRepositories} />
      </main>

      <Footer totalCount={articles.length} sourceCount={sourceCount} onRefresh={() => {}} />
    </div>
  )
}

export default App
