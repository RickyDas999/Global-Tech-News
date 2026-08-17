import GitHubCard from "./GitHubCard"

function GitHubTrending({ repositories }) {
  return (
    <aside aria-label="GitHub trending repositories" className="lg:sticky lg:top-20 lg:w-[30%]">
      <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        GitHub Trending
      </h2>
      <div className="flex flex-col gap-3">
        {repositories.length === 0 ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No repositories match right now.
          </p>
        ) : (
          repositories.map((repo) => <GitHubCard key={repo.id} repo={repo} />)
        )}
      </div>
    </aside>
  )
}

export default GitHubTrending
