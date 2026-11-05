// Vercel serverless function: GET /api/github
// Public GitHub profile stats, cached by Vercel's CDN for an hour
// (keeps us far below GitHub's unauthenticated rate limit).

const USERNAME = 'Tripti129'

export async function getGitHub(username = USERNAME) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-stats' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
  ])
  if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub responded ${userRes.status}/${reposRes.status}`)
  const user = await userRes.json()
  const repos = (await reposRes.json()).filter((r) => !r.fork)

  // Approximate language mix, weighted by repository size
  const weights = {}
  for (const r of repos) {
    if (!r.language) continue
    weights[r.language] = (weights[r.language] || 0) + Math.max(r.size, 1)
  }
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 1
  const languages = Object.entries(weights)
    .map(([name, w]) => ({ name, percent: Math.round((w / total) * 100) }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 4)

  return {
    username,
    url: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    stars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
    languages,
    recent: repos
      .filter((r) => r.name.toLowerCase() !== username.toLowerCase())
      .slice(0, 4)
      .map((r) => ({ name: r.name, url: r.html_url, pushedAt: r.pushed_at })),
    fetchedAt: new Date().toISOString(),
  }
}

export default async function handler(req, res) {
  try {
    const stats = await getGitHub()
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(stats))
  } catch (err) {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 502
    res.end(JSON.stringify({ error: err.message }))
  }
}
