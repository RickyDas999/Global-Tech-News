import { useState } from "react"
import Header from "./components/Header"
import CategoryFilter from "./components/CategoryFilter"
import NewsGrid from "./components/NewsGrid"
import Footer from "./components/Footer"
import { useDarkMode } from "./hooks/useDarkMode"

// Temporary mock data — replaced by real source adapters in a later commit.
const MOCK_ARTICLES = [
  {
    id: "mock-1",
    title: "OpenAI launches new developer platform for agentic workflows",
    url: "https://example.com/openai-platform",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    description:
      "The new platform gives developers tighter control over tool use, memory, and multi-step reasoning in production agents.",
    image: null,
    categories: ["AI", "Cloud"],
    readingTime: 5,
  },
  {
    id: "mock-2",
    title: "Rust adoption climbs among systems programmers in 2026 survey",
    url: "https://example.com/rust-survey",
    source: "Ars Technica",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description:
      "Respondents cited memory safety and tooling maturity as the leading reasons for switching from C++.",
    image: null,
    categories: ["Programming"],
    readingTime: 4,
  },
  {
    id: "mock-3",
    title: "Seed-stage climate startups raised $2.1B in the last quarter",
    url: "https://example.com/climate-funding",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    description:
      "Investors are betting on carbon capture and grid-scale storage despite a broader slowdown in venture funding.",
    image: null,
    categories: ["Startups"],
    readingTime: 3,
  },
  {
    id: "mock-4",
    title: "Critical vulnerability disclosed in widely used SSH library",
    url: "https://example.com/ssh-cve",
    source: "The Verge",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    description:
      "Maintainers have shipped a patch; researchers urge immediate upgrades for internet-facing servers.",
    image: null,
    categories: ["Cybersecurity"],
    readingTime: 6,
  },
  {
    id: "mock-5",
    title: "Google Cloud adds serverless GPU scheduling to Kubernetes",
    url: "https://example.com/gke-gpu",
    source: "Ars Technica",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "The feature aims to cut idle GPU costs for bursty machine learning training workloads.",
    image: null,
    categories: ["Cloud", "AI"],
    readingTime: 4,
  },
  {
    id: "mock-6",
    title: "Android 17 developer preview focuses on battery and animations",
    url: "https://example.com/android-17",
    source: "The Verge",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description:
      "Early builds show smoother transitions and a redesigned notification shade.",
    image: null,
    categories: ["Mobile"],
    readingTime: 3,
  },
]

const PLACEHOLDER_REPOS = Array.from({ length: 5 }, (_, i) => i)

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const { theme, toggleTheme } = useDarkMode()

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
          <NewsGrid articles={MOCK_ARTICLES} />
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

      <Footer totalCount={MOCK_ARTICLES.length} sourceCount={4} onRefresh={() => {}} />
    </div>
  )
}

export default App
